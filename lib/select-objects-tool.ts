import { JBoard } from './board-manager'
import { UndoRedoManager, ModifyOp, BundleOp } from './undo-redo'

type JEl = any;

function dist2(a: { x: number, y: number }, b: { x: number, y: number }) {
  return (a.x - b.x) * (a.x - b.x) + (a.y - b.y) * (a.y - b.y)
}

export default class SelectObjectsTool {
  private board: JBoard
  private onFeedback?: ((msg: string) => void) | undefined
  private undoRedo?: UndoRedoManager | undefined

  // Handlers
  private onDown?: ((e: any) => void) | undefined
  private onMove?: ((e: any) => void) | undefined
  private onUp?: ((e: any) => void) | undefined
  private onKey?: ((e: KeyboardEvent) => void) | undefined

  // Hover & click-cycle
  private hoverObj: JEl | null = null
  private cycleCandidates: JEl[] = []
  private cycleIndex = 0
  private lastClickWorld = { x: 0, y: 0 }
  private lastClickWasCycle = false

  // Selection
  private selected = new Set<JEl>()
  private savedStyle = new Map<JEl, Partial<any>>()

  // Marquee
  private dragging = false
  private dragStartWorld: { x: number, y: number } | null = null
  private marqueeCurve: any | null = null
  private selectionHelperIds = new Set<string>()

  private isGroupDragging = false;
  private dragStartPointer: { x: number; y: number } | null = null;
  private dragStartObjPositions: Map<JEl, any> = new Map();
  private dragTargetObj: JEl | null = null;

  constructor(board: JBoard, onFeedback?: (msg: string) => void, undoRedo?: UndoRedoManager) {
    this.board = board
    this.onFeedback = onFeedback
    this.undoRedo = undoRedo
  }

  activate() {
    if (this.onDown) return;
    this.onDown = this.handleDown;
    this.onMove = this.handleMove;
    this.onUp = this.handleUp;
    this.board.on('down', this.onDown as (e:any)=>void);
    this.board.on('move', this.onMove as (e:any)=>void);
    this.board.on('up', this.onUp as (e:any)=>void);

    // 🔒 Kill native selection / drag on the container (Safari-friendly)
    const el = (this.board as any).containerObj as HTMLElement | undefined;
    if (el) {
      el.style.cursor = 'default';
      el.style.userSelect = 'none';
      (el.style as any).webkitUserSelect = 'none';
      (el.style as any).msUserSelect = 'none';
      el.style.touchAction = 'none';
      (el.style as any).webkitUserDrag = 'none';
      el.setAttribute('draggable', 'false');
    }

    this.onKey = this.handleKey;
    window.addEventListener('keydown', this.onKey as EventListener, { capture: true });
  }

  deactivate() {
    if (this.onDown) this.board.off('down', this.onDown as (e:any)=>void)
    if (this.onMove) this.board.off('move', this.onMove as (e:any)=>void)
    if (this.onUp) this.board.off('up', this.onUp as (e:any)=>void)
    this.onDown = this.onMove = this.onUp = undefined
    if (this.onKey) window.removeEventListener('keydown', this.onKey as EventListener, { capture: true })
    this.clearSelection()
    this.clearHover()
    this.destroyMarquee()
    if ((this.board as any).containerObj) {
      (this.board as any).containerObj.style.cursor = ''
    }
  }

  /**
   * Identify grid lines created by GridManager regardless of stroke width.
   * Matches exact properties set in GridManager: layer 0, fixed, no label/infobox, not draggable.
   */
  private isGridLine(obj: any): boolean {
    if (!obj) return false
    // Prefer authoritative ID-based check written by GridManager
    try {
      const gridIds: Set<string> | undefined = (this.board as any).__gridIds
      if (gridIds && gridIds.has(((obj as any).id as string))) return true
    } catch {}
    // Fallback: property-based detection
    if (obj.elType !== 'line') return false
    const vp: any = (obj as any).visProp || {}
    if (vp.layer !== 0) return false
    if (vp.fixed !== true) return false
    if (vp.withLabel !== false) return false
    if (vp.showInfobox !== false) return false
    if (vp.draggable !== false) return false
    return true
  }

  /** Return true if object is user-selectable (not a grid line or selection helper). */
  private isSelectableObject(obj: any): boolean {
    if (!obj || obj.visProp?.visible === false) return false
    try { if (this.selectionHelperIds.has(((obj as any).id as string))) return false } catch {}
    if (this.isGridLine(obj)) return false
    return true
  }

  // -----------------------
  // Core interaction
  // -----------------------
  private handleMove = (e: any) => {
    // When dragging marquee, always block native behavior
    if (this.dragging) {
      if (e?.ev) { e.ev.preventDefault?.(); e.ev.stopPropagation?.(); }
      this.updateMarquee(e);
      return;
    }
    // Group dragging block
    if (this.isGroupDragging && this.dragStartPointer) {
      if (e?.ev) { e.ev.preventDefault?.(); e.ev.stopPropagation?.(); }
      const pointer = this.toWorld(e);
      const dx = pointer.x - this.dragStartPointer.x;
      const dy = pointer.y - this.dragStartPointer.y;
      for (const obj of this.selected) {
        if (obj.visProp?.fixed) continue;
        const start = this.dragStartObjPositions.get(obj);
        switch (obj.elType) {
          case 'point':
            if (start) obj.moveTo([start.x + dx, start.y + dy]);
            break;
          case 'line':
          case 'segment':
            if (start && obj.points && obj.points.length === start.length) {
              obj.points.forEach((pt:any, idx:number) => {
                pt.moveTo([start[idx].x + dx, start[idx].y + dy]);
              });
            }
            break;
          case 'circle':
            if (start && obj.center?.moveTo) {
              obj.center.moveTo([start.center.x + dx, start.center.y + dy]);
            }
            break;
          case 'polygon':
            if (start && obj.vertices && obj.vertices.length === start.length) {
              obj.vertices.forEach((pt:any, idx:number) => {
                pt.moveTo([start[idx].x + dx, start[idx].y + dy]);
              });
            }
            break;
          default:
            if (start && obj.moveTo) obj.moveTo([start.x + dx, start.y + dy]);
        }
      }
      this.board.update();
      return;
    }
    // Hover highlight
    const under = this.getUnderMouse(e);
    const top = under[0] || null;
    this.setHover(top);
  };

  private handleDown = (e: any) => {
    // 🚫 stop native selection right away
    if (e?.ev) { e.ev.preventDefault?.(); e.ev.stopPropagation?.(); }

    const under = this.getUnderMouse(e);
    const world = this.toWorld(e);

    // --- check for marquee init as before ---
    if (under.length) {
      // Drag start on a selected object: prep group drag
      const top = under[0];
      if (this.selected.has(top) && !top.visProp?.fixed) {
        this.isGroupDragging = true;
        this.dragStartPointer = { ...world };
        this.dragTargetObj = top;
        // Record each selected's initial world position(s)
        this.dragStartObjPositions.clear();
        // Collect all point IDs that will be moved, so we can clear their pending moves
        const pointIdsToClear: string[] = [];
        for (const obj of this.selected) {
          switch (obj.elType) {
            case 'point':
              this.dragStartObjPositions.set(obj, { x: obj.X(), y: obj.Y() });
              if (obj.id) pointIdsToClear.push(obj.id);
              break;
            case 'line':
            case 'segment':
              // PATCH: Only if points exists and is array
              if (Array.isArray(obj.points)) {
                this.dragStartObjPositions.set(obj, obj.points.map((pt:any) => {
                  if (pt && pt.id) pointIdsToClear.push(pt.id);
                  return { x: pt.X(), y: pt.Y() };
                }));
              }
              break;
            case 'circle':
              {
                const onPt: any = (obj as any).point2 || (obj as any).points?.[1]
                const centerPos = { x: obj.center.X(), y: obj.center.Y() };
                const radiusPtPos = onPt && typeof onPt.X === 'function' && typeof onPt.Y === 'function'
                  ? { x: onPt.X(), y: onPt.Y() }
                  : null;
                if (obj.center && obj.center.id) pointIdsToClear.push(obj.center.id);
                if (onPt && onPt.id) pointIdsToClear.push(onPt.id);
                this.dragStartObjPositions.set(obj, {
                  center: centerPos,
                  radiusPoint: radiusPtPos,
                  radius: (typeof obj.R === 'function')
                    ? obj.R()
                    : (radiusPtPos ? Math.hypot(radiusPtPos.x - centerPos.x, radiusPtPos.y - centerPos.y) : undefined)
                });
              }
              break;
            case 'polygon':
              this.dragStartObjPositions.set(obj, obj.vertices.map((pt:any) => {
                if (pt && pt.id) pointIdsToClear.push(pt.id);
                return { x: pt.X(), y: pt.Y() };
              }));
              break;
            default:
              // Fallback: try to record all .X(), .Y() if any
              if (obj.X && obj.Y) {
                this.dragStartObjPositions.set(obj, { x: obj.X(), y: obj.Y() });
                if (obj.id) pointIdsToClear.push(obj.id);
              }
          }
        }
        // Mark all points as being group-dragged and clear their pending moves
        // This prevents individual point tracking from creating separate undo operations
        if (this.undoRedo && pointIdsToClear.length > 0) {
          this.undoRedo.markPointsForGroupDrag(pointIdsToClear);
        }
        // PREVENT DEFAULT: don't allow picked object's drag
        if (e?.ev) { e.ev.preventDefault?.(); e.ev.stopPropagation?.(); }
        return;
      }
      // ... normal select/cycle/additive ...
      const sameSpot = dist2(world, this.lastClickWorld) < 1e-6;
      if (!sameSpot) {
        this.cycleCandidates = this.sortByPreference(under);
        this.cycleIndex = 0;
      }
      const candidate = this.cycleCandidates[this.cycleIndex] ?? this.sortByPreference(under)[0];
      const additive = e?.ev?.shiftKey || e?.ev?.metaKey || e?.ev?.ctrlKey;
      if (additive) {
        this.toggleSelect(candidate);
      } else {
        if (sameSpot) {
          this.cycleIndex = (this.cycleIndex + 1) % this.cycleCandidates.length;
        }
        const chosen = sameSpot ? this.cycleCandidates[this.cycleIndex] : candidate;
        this.replaceSelectionWith(chosen);
      }
      this.lastClickWorld = world;
      this.lastClickWasCycle = true;
      this.board.update();
      return;
    } else {
      // If blank space and not already dragging marquee, clear selection
      if (!this.dragging && !this.isGroupDragging) {
        this.clearSelection();
        this.board.update(); // ensure immediate deselect
      }
      // Empty space -> start marquee
      this.lastClickWasCycle = false;
      this.dragging = true;
      this.dragStartWorld = world;
      this.createMarquee(world);

      // extra safety for Safari holding click-and-drag
      if (e?.ev) { e.ev.preventDefault?.(); e.ev.stopPropagation?.(); }
    }
  };

  private handleUp = (e: any) => {
    // End group drag if active
    if (this.isGroupDragging) {
      // Collect all moved points and create undo operation
      if (this.undoRedo && this.dragStartObjPositions.size > 0) {
        const movedPoints = new Map<any, { before: { x: number; y: number; name: string }, after: { x: number; y: number; name: string } }>();
        
        // Collect all points that were moved
        for (const obj of this.selected) {
          if (obj.visProp?.fixed) continue;
          
          const startPos = this.dragStartObjPositions.get(obj);
          if (!startPos) continue;
          
          const posOf = (pt: any) => ({
            x: pt.X(),
            y: pt.Y(),
            name: (pt as any)._rawName || (pt as any).getName?.() || ''
          });
          
          switch (obj.elType) {
            case 'point':
              {
                const before = { x: startPos.x, y: startPos.y, name: posOf(obj).name };
                const after = posOf(obj);
                // Only record if actually moved
                if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                  movedPoints.set(obj.id, { before, after });
                }
              }
              break;
            case 'line':
            case 'segment':
              if (Array.isArray(obj.points) && Array.isArray(startPos)) {
                obj.points.forEach((pt: any, idx: number) => {
                  if (!pt || !pt.id) return;
                  const before = { x: startPos[idx].x, y: startPos[idx].y, name: posOf(pt).name };
                  const after = posOf(pt);
                  if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                    movedPoints.set(pt.id, { before, after });
                  }
                });
              }
              break;
            case 'circle':
              {
                const center = obj.center;
                if (center && center.id && startPos.center) {
                  const before = { x: startPos.center.x, y: startPos.center.y, name: posOf(center).name };
                  const after = posOf(center);
                  if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                    movedPoints.set(center.id, { before, after });
                  }
                }
                // Also check radius point if it exists
                const radiusPt: any = (obj as any).point2 || (obj as any).points?.[1];
                if (radiusPt && radiusPt.id && startPos.radiusPoint) {
                  const before = { 
                    x: startPos.radiusPoint.x, 
                    y: startPos.radiusPoint.y, 
                    name: posOf(radiusPt).name 
                  };
                  const after = posOf(radiusPt);
                  if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                    movedPoints.set(radiusPt.id, { before, after });
                  }
                }
              }
              break;
            case 'polygon':
              if (Array.isArray(obj.vertices) && Array.isArray(startPos)) {
                obj.vertices.forEach((pt: any, idx: number) => {
                  if (!pt || !pt.id) return;
                  const before = { x: startPos[idx].x, y: startPos[idx].y, name: posOf(pt).name };
                  const after = posOf(pt);
                  if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                    movedPoints.set(pt.id, { before, after });
                  }
                });
              }
              break;
            default:
              if (obj.X && obj.Y && obj.id && startPos.x !== undefined && startPos.y !== undefined) {
                const before = { x: startPos.x, y: startPos.y, name: posOf(obj).name };
                const after = posOf(obj);
                if (Math.abs(before.x - after.x) > 0.001 || Math.abs(before.y - after.y) > 0.001 || before.name !== after.name) {
                  movedPoints.set(obj.id, { before, after });
                }
              }
          }
        }
        
        // Create bundle operation if there are multiple moves, or single operation if only one
        // Suppress tracking during this operation to prevent duplicate entries
        if (movedPoints.size > 0 && this.undoRedo) {
          const undoRedo = this.undoRedo; // Store in local variable for closure
          const pointIdsMoved = Array.from(movedPoints.keys());
          
          // Unmark points from group drag tracking before creating the operation
          undoRedo.unmarkPointsForGroupDrag(pointIdsMoved);
          
          undoRedo.suppressTrackingDuring(() => {
            const ops: ModifyOp[] = [];
            movedPoints.forEach(({ before, after }, pointId) => {
              ops.push({
                kind: 'modify',
                pointId,
                before,
                after
              });
            });
            
            if (ops.length === 1 && ops[0]) {
              undoRedo.pushOperation(ops[0]);
            } else if (ops.length > 1) {
              undoRedo.pushOperation({ kind: 'bundle', ops } as BundleOp);
            }
          });
        } else if (this.undoRedo) {
          // Even if no points moved, unmark them to clean up
          const pointIdsToUnmark: string[] = [];
          for (const obj of this.selected) {
            if (obj.visProp?.fixed) continue;
            const collectPointIds = (pts: any[]) => {
              if (Array.isArray(pts)) {
                pts.forEach((pt: any) => {
                  if (pt && pt.id) pointIdsToUnmark.push(pt.id);
                });
              }
            };
            switch (obj.elType) {
              case 'point':
                if (obj.id) pointIdsToUnmark.push(obj.id);
                break;
              case 'line':
              case 'segment':
                collectPointIds(obj.points);
                break;
              case 'circle':
                if (obj.center && obj.center.id) pointIdsToUnmark.push(obj.center.id);
                const onPt: any = (obj as any).point2 || (obj as any).points?.[1];
                if (onPt && onPt.id) pointIdsToUnmark.push(onPt.id);
                break;
              case 'polygon':
                collectPointIds(obj.vertices);
                break;
            }
          }
          if (pointIdsToUnmark.length > 0) {
            this.undoRedo.unmarkPointsForGroupDrag(pointIdsToUnmark);
          }
        }
      }
      
      this.isGroupDragging = false;
      this.dragTargetObj = null;
      this.dragStartPointer = null;
      this.dragStartObjPositions.clear();
      return;
    }
    if (!this.dragging) {
      // If we released without dragging and didn't cycle-select anything, clear selection
      if (!this.lastClickWasCycle && !(e?.ev?.shiftKey || e?.ev?.metaKey || e?.ev?.ctrlKey)) {
        // Selection was already cleared in handleDown for empty space
        this.onFeedback?.('');
      }
      return;
    }
    this.dragging = false;
    const chosen = this.objectsInMarquee();
    this.destroyMarquee();
    if (chosen.length) {
      const additive = e?.ev?.shiftKey || e?.ev?.metaKey || e?.ev?.ctrlKey;
      if (!additive) this.clearSelection();
      chosen.forEach(o => this.addToSelection(o));
      this.onFeedback?.(`${this.selected.size} objekt(y) vybrány`);
    } else {
      // No objects in marquee - clear selection
      this.clearSelection();
      this.onFeedback?.('');
    }
    this.board.update();
  };

  private handleKey = (e: KeyboardEvent) => {
    if (e.key === 'Backspace' || e.key === 'Delete') {
      if (!this.selected.size) return
      Array.from(this.selected).forEach(o => {
        try { o.remove?.() } catch { }
      })
      this.selected.clear()
      this.board.update()
      e.preventDefault()
    }
  }

  // -----------------------
  // Hover logic
  // -----------------------
  private setHover(obj: JEl | null) {
    if (obj === this.hoverObj) return
    if (this.hoverObj) this.setTempHighlight(this.hoverObj, false)
    this.hoverObj = obj
    if (obj) this.setTempHighlight(obj, true)
    this.board.update()
  }

  private clearHover() { this.setHover(null) }

  // -----------------------
  // Selection logic
  // -----------------------
  private replaceSelectionWith(obj: JEl) {
    this.clearSelection()
    this.addToSelection(obj)
    this.onFeedback?.('Objekt vybrán')
  }

  private toggleSelect(obj: JEl) {
    if (this.selected.has(obj)) {
      this.removeFromSelection(obj)
    } else {
      this.addToSelection(obj)
    }
    this.onFeedback?.(`${this.selected.size} vybráno`)
  }

  private addToSelection(obj: JEl) {
    if (this.selected.has(obj)) return
    this.selected.add(obj)
    if (!this.savedStyle.has(obj)) {
      const vp = (obj as any).visProp ?? {}
      this.savedStyle.set(obj, {
        strokeColor: vp.strokeColor,
        strokeWidth: vp.strokeWidth,
        fillColor: vp.fillColor,
        fillOpacity: vp.fillOpacity,
        highlight: vp.highlight,
        size: vp.size // Save point size for restoration
      })
    }
    this.applySelectedStyle(obj, true)
  }

  private removeFromSelection(obj: JEl) {
    if (!this.selected.has(obj)) return
    this.applySelectedStyle(obj, false)
    this.selected.delete(obj)
  }

  private clearSelection() {
    this.selected.forEach(o => this.applySelectedStyle(o, false))
    this.selected.clear()
    this.board.update(); // ensure deselection happens instantly
  }

  private applySelectedStyle(obj: JEl, on: boolean) {
    const saved = this.savedStyle.get(obj)
    const vp = (obj as any).visProp ?? {}
    
    if (typeof obj.setProperty === 'function') {
      if (on) {
        // For points: enlarge them
        if (obj.elType === 'point') {
          const originalSize = (saved as any)?.size ?? vp.size ?? 2
          obj.setProperty({
            highlight: true,
            size: Math.max(originalSize * 1.8, 4) // Enlarge point by 80% or minimum 4
          })
        } else {
          // For other objects: keep original color, increase stroke width slightly, add highlight
          const originalStrokeWidth = (saved as any)?.strokeWidth ?? vp.strokeWidth ?? 1
          obj.setProperty({
            highlight: true,
            strokeWidth: Math.max(originalStrokeWidth * 1.5, originalStrokeWidth + 1)
          })
        }
      } else {
        // Restore original style
        obj.setProperty({
          strokeColor: (saved as any)?.strokeColor ?? vp.strokeColor,
          strokeWidth: (saved as any)?.strokeWidth ?? vp.strokeWidth,
          fillColor: (saved as any)?.fillColor ?? vp.fillColor,
          fillOpacity: (saved as any)?.fillOpacity ?? vp.fillOpacity,
          highlight: false,
          size: (saved as any)?.size ?? vp.size
        })
      }
    } else if ((obj as any).visProp) {
      if (on) {
        if (obj.elType === 'point') {
          // Enlarge point
          const originalSize = (saved as any)?.size ?? vp.size ?? 2
          ;(obj as any).visProp.highlight = true
          ;(obj as any).visProp.size = Math.max(originalSize * 1.8, 4)
        } else {
          // Keep original color, increase stroke width slightly, add highlight
          const originalStrokeWidth = (saved as any)?.strokeWidth ?? vp.strokeWidth ?? 1
          ;(obj as any).visProp.highlight = true
          ;(obj as any).visProp.strokeWidth = Math.max(originalStrokeWidth * 1.5, originalStrokeWidth + 1)
        }
      } else {
        // Restore original style
        const objVp = (obj as any).visProp
        objVp.strokeColor = (saved as any)?.strokeColor ?? objVp.strokeColor
        objVp.strokeWidth = (saved as any)?.strokeWidth ?? objVp.strokeWidth
        objVp.fillColor = (saved as any)?.fillColor ?? objVp.fillColor
        objVp.fillOpacity = (saved as any)?.fillOpacity ?? objVp.fillOpacity
        objVp.highlight = false
        objVp.size = (saved as any)?.size ?? objVp.size
      }
      obj.update?.()
    }
  }

  private setTempHighlight(obj: JEl, on: boolean) {
    if (this.selected.has(obj)) return
    if (typeof obj.setProperty === 'function') {
      obj.setProperty(on ? { highlight: true } : { highlight: false })
    } else if ((obj as any).visProp) {
      (obj as any).visProp.highlight = !!on
      obj.update?.()
    }
  }

  // -----------------------
  // Marquee helpers
  // -----------------------
  private createMarquee(start: { x: number, y: number }) {
    const data = { x1: start.x, y1: start.y, x2: start.x, y2: start.y };
    (this as any)._marqueeData = data;

    // Create 4 corner points for the rectangle
    const p1 = this.board.create('point', [() => data.x1, () => data.y1], {
      visible: false,
      fixed: true,
      withLabel: false
    });
    try { this.selectionHelperIds.add((p1 as any).id as string) } catch {}
    const p2 = this.board.create('point', [() => data.x2, () => data.y1], {
      visible: false,
      fixed: true,
      withLabel: false
    });
    try { this.selectionHelperIds.add((p2 as any).id as string) } catch {}
    const p3 = this.board.create('point', [() => data.x2, () => data.y2], {
      visible: false,
      fixed: true,
      withLabel: false
    });
    try { this.selectionHelperIds.add((p3 as any).id as string) } catch {}
    const p4 = this.board.create('point', [() => data.x1, () => data.y2], {
      visible: false,
      fixed: true,
      withLabel: false
    });
    try { this.selectionHelperIds.add((p4 as any).id as string) } catch {}

    // Create polygon from the 4 points - GeoGebra style (purple/blue with low opacity)
    this.marqueeCurve = this.board.create('polygon', [p1, p2, p3, p4], {
      strokeColor: '#7c3aed',  // Purple color like GeoGebra
      strokeWidth: 2,
      dash: 1,
      fillColor: '#c4b5fd',    // Light purple fill
      fillOpacity: 0.2,
      highlight: false,
      fixed: true,
      layer: 100,
      borders: {
        strokeColor: '#7c3aed',
        strokeWidth: 2,
        dash: 1
      }
    });
    try { this.selectionHelperIds.add(((this.marqueeCurve as any).id as string)) } catch {}

    // Store the corner points for cleanup
    (this.marqueeCurve as any)._marqueePoints = [p1, p2, p3, p4];

    try {
      (this.marqueeCurve as any)._noHighlight = true;
      const vp = (this.marqueeCurve as any).visProp || ((this.marqueeCurve as any).visProp = {});
      (vp as any).pointerEvents = 'none';
      const node = (this.marqueeCurve as any).rendNode;
      if (node) {
        node.style.pointerEvents = 'none';
      }
    } catch {}
    try { (this.board as any).containerObj.style.cursor = 'crosshair' } catch {}
    this.board.update();
  }

  private updateMarquee(e: any) {
    if (!this.marqueeCurve || !this.dragStartWorld) return;
    const p = this.toWorld(e);
    const d = (this as any)._marqueeData;
    if (!d) return;
    d.x2 = p.x; 
    d.y2 = p.y;

    this.board.update();
  }

  private destroyMarquee() {
    if (this.marqueeCurve) {
      try { 
        // Remove the corner points first
        const points = (this.marqueeCurve as any)._marqueePoints;
        if (points && Array.isArray(points)) {
          points.forEach((pt: any) => {
            try { this.board.removeObject(pt) } catch {}
          });
        }
        // Then remove the polygon
        this.board.removeObject(this.marqueeCurve);
      } catch {}
      this.marqueeCurve = null;
    }
    ;(this as any)._marqueeData = null;
    // Restore pointer
    try {(this.board as any).containerObj.style.cursor = 'default'} catch {}
  }

  private objectsInMarquee(): JEl[] {
    // Get box data from the Tool class instance, not the polygon
    const d = (this as any)._marqueeData;
    if (!this.marqueeCurve || !d) return [];
    const minx = Math.min(d.x1, d.x2), maxx = Math.max(d.x1, d.x2);
    const miny = Math.min(d.y1, d.y2), maxy = Math.max(d.y1, d.y2);
    const objs = Object.values(this.board.objects) as JEl[];
    const inside: JEl[] = [];

    for (const o of objs) {
      if (!this.isSelectableObject(o)) continue;
      if (o.elType === 'point') {
        const x = o.X(), y = o.Y();
        if (x >= minx && x <= maxx && y >= miny && y <= maxy) inside.push(o);
      } else if (o.elType === 'segment' || o.elType === 'line' || o.elType === 'circle' || o.elType === 'polygon') {
        const bb = (o as any).bounds && (o as any).bounds();
        if (bb) {
          const [lx, ux, ly, uy] = bb;
          if (ux >= minx && lx <= maxx && uy >= miny && ly <= maxy) inside.push(o);
        } else {
          inside.push(o);
        }
      }
    }
    return this.sortByPreference(inside);
  }

  // -----------------------
  // Utilities
  // -----------------------
  private getUnderMouse(e: any): JEl[] {
    const arr = this.board.getAllObjectsUnderMouse(e) as JEl[]
    return this.sortByPreference(arr.filter(o => this.isSelectableObject(o)))
  }

  private sortByPreference(arr: JEl[]): JEl[] {
    const rank = (o: JEl) => {
      if (o.elType === 'point' && !o.visProp?.fixed) return 0
      if (o.elType === 'segment') return 1
      if (o.elType === 'line') return 2
      if (o.elType === 'circle') return 3
      return 4
    }
    return [...arr].sort((a, b) => rank(a) - rank(b))
  }

  private toWorld(e: any) {
    // Preferred: use JSXGraph's helper with event
    if (typeof (this.board as any).getUsrCoordsOfMouse === 'function') {
      const coords = (this.board as any).getUsrCoordsOfMouse(e?.ev ?? e);
      return { x: coords[0] ?? 0, y: coords[1] ?? 0 };
    }
    // Fallback: canvasToXS/YS with clientX/clientY
    if (typeof (this.board as any).canvasToXS === 'function' &&
        typeof (this.board as any).canvasToYS === 'function') {
      const c = (this.board as any).getCoordsTopLeftCorner(e?.ev ?? e);
      const ev = e?.ev ?? e;
      const absX = ev?.clientX - c[0];
      const absY = ev?.clientY - c[1];
      return {
        x: (this.board as any).canvasToXS(absX),
        y: (this.board as any).canvasToYS(absY)
      };
    }
    return { x: 0, y: 0 };
  }
}
