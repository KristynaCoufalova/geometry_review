import JXG from 'jsxgraph'

// Keep your local JBoard type in one place
export type JBoard = JXG.Board & { renderer: any }

export interface RenameManagerOptions {
	/** Max movement (world units) to still treat the interaction as a "click" */
	clickEps?: number
	/** Prompt label shown to the user */
	promptLabel?: string
	/** Called after a successful rename (consumer can push an undo op) */
	onRenamed?: (args: { pointId: string; beforeRaw: string; afterRaw: string }) => void
	/** If true, board.update() is called after rename (default: true) */
	updateBoard?: boolean
	/**
	 * Return true to allow the event to trigger rename mode.
	 * Useful to ignore clicks on your "physical tools" overlay etc.
	 */
	eventGuard?: (ev: any) => boolean
}

export class RenameManager {
	private brd: JBoard
	private opts: Required<RenameManagerOptions>
	private enabled = false

	// internal state for down/up logic
	private armed: { pt: any | null; wasFixed: boolean } = { pt: null, wasFixed: false }
	private downPos: { x: number; y: number } | null = null

	// handlers references so we can cleanly detach
	private downHandler: ((e: any) => void) | null = null
	private upHandler: ((e: any) => void) | null = null

	constructor(board: JBoard, options?: RenameManagerOptions) {
		this.brd = board
		this.opts = {
			clickEps: options?.clickEps ?? 0.12,
			promptLabel: options?.promptLabel ?? 'Název bodu (např. A, B, C, A_1, A_2):',
			onRenamed: options?.onRenamed ?? (() => {}),
			updateBoard: options?.updateBoard ?? true,
			eventGuard: options?.eventGuard ?? defaultEventGuard,
		}
	}

	/** Attach event listeners */
	enable() {
		if (this.enabled) return
		this.enabled = true

		this.downHandler = (e: any) => {
			if (!this.opts.eventGuard(e)) return

			const pt = this.pointUnder(e) as any
			if (!pt) return

			// Freeze to prevent accidental drags while we decide if it's a click
			const wasFixed = !!pt.visProp.fixed
			pt.setAttribute({ fixed: true })

			this.armed = { pt, wasFixed }
			this.downPos = this.getMouseXY(e)

			// stop normal board interaction for this click
			stopEvent(e)
		}

		this.upHandler = (e: any) => {
			if (!this.armed.pt) return
			const up = this.getMouseXY(e)
			const down = this.downPos ?? up
			const moved = Math.hypot(up.x - down.x, up.y - down.y)

			if (moved <= this.opts.clickEps) {
				// Treat as click -> prompt & rename
				this.promptAndRename(this.armed.pt, e)
			} else {
				// Treat as drag -> restore and do nothing
				this.armed.pt.setAttribute({ fixed: this.armed.wasFixed })
			}

			// clear arm
			this.armed = { pt: null, wasFixed: false }
			this.downPos = null
		}

		this.brd.on('down', this.downHandler)
		this.brd.on('up', this.upHandler)
	}

	/** Detach event listeners */
	disable() {
		if (!this.enabled) return
		this.enabled = false
		try {
			if (this.downHandler) this.brd.off('down', this.downHandler)
			if (this.upHandler) this.brd.off('up', this.upHandler)
		} catch {}
		this.downHandler = null
		this.upHandler = null
		this.armed = { pt: null, wasFixed: false }
		this.downPos = null
	}

	toggle() {
		this.enabled ? this.disable() : this.enable()
	}

	destroy() {
		this.disable()
	}

	// ---------- helpers ----------

	private getMouseXY(e: any) {
		const c = this.brd.getUsrCoordsOfMouse(e)
		return { x: c[0], y: c[1] }
	}

	private pointUnder(e: any) {
		const under = this.brd.getAllObjectsUnderMouse(e)
		return under.find((o: any) => o.elType === 'point') || null
	}

	private isNameTaken(raw: string, exceptId?: string) {
		for (const key in this.brd.objects) {
			const o: any = (this.brd.objects as any)[key]
			if (o?.elType === 'point' && o.id !== exceptId) {
				if ((o._rawName ?? '') === raw) return true
			}
		}
		return false
	}

	private toSubscript(name: string) {
		const map: Record<string, string> = {
			'0': '₀', '1': '₁', '2': '₂', '3': '₃', '4': '₄',
			'5': '₅', '6': '₆', '7': '₇', '8': '₈', '9': '₉',
		}
		return (name || '').replace(/_(\d+)/g, (_: string, d: string) => d.split('').map((ch: string) => map[ch] ?? ch).join(''))
	}

	private normalizeAndApplyName(pt: any, raw: string) {
		const trimmed = (raw || '').trim()
		const pretty = this.toSubscript(trimmed)
		pt.setAttribute({ name: pretty, withLabel: !!trimmed })
		pt._rawName = trimmed
	}

	private promptAndRename(pt: any, e: any) {
		const beforeRaw = pt._rawName || ''
		let proposed = (window.prompt(this.opts.promptLabel, beforeRaw) ?? '').trim()

		// Deduplicate if necessary
		if (proposed) {
			if (this.isNameTaken(proposed, pt.id)) {
				let i = 2
				while (this.isNameTaken(`${proposed}_${i}`, pt.id)) i++
				proposed = `${proposed}_${i}`
			}
		}

		this.normalizeAndApplyName(pt, proposed)

		// Restore mobility
		pt.setAttribute({ fixed: this.armed.wasFixed })

		// Push the rename event upward for undo/redo
		this.opts.onRenamed({
			pointId: pt.id,
			beforeRaw,
			afterRaw: proposed || '',
		})

		if (this.opts.updateBoard) this.brd.update()

		// stop this click from leaking into normal handlers
		stopEvent(e)
	}
}

// ---------- small utilities ----------

function stopEvent(e: any) {
	if (e?.originalEvent) {
		e.originalEvent.stopPropagation?.()
		e.originalEvent.preventDefault?.()
	}
}

/** Default guard: ignore clicks on anything inside your physical tools (elements with .group) */
function defaultEventGuard(e: any) {
	const t = e?.originalEvent?.target as HTMLElement | null
	if (!t) return true
	return !(t.closest('.group') || t.classList?.contains('group'))
}


