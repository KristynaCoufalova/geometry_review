// lib/board-manager.ts
import JXG from 'jsxgraph'
import { GridManager, GridMode } from './grid-manager'

export type JBoard = JXG.Board & { renderer: any }

export interface BoardOptions {
  boundingbox?: [number, number, number, number]
  axis?: boolean
  showNavigation?: boolean
  showCopyright?: boolean
  grid?: boolean
  pan?: { enabled: boolean }
  zoom?: boolean
  keepaspectratio?: boolean
}

export interface BoardManagerOptions extends BoardOptions {
  container: HTMLElement
  defaultGridMode?: GridMode
}

export class BoardManager {
  private board: JBoard | null = null
  private gridManager: GridManager | null = null
  private container: HTMLElement | null = null
  private options: BoardOptions

  constructor(options: BoardManagerOptions) {
    this.container = options.container
    const { container, defaultGridMode, ...boardOptions } = options
    this.options = {
      boundingbox: [-1, 8, 11, -1],
      axis: false,
      showNavigation: false,
      showCopyright: false,
      grid: false,
      pan: { enabled: false },
      zoom: false,
      keepaspectratio: true,
      ...boardOptions
    }
    this.init(boardOptions, defaultGridMode)
  }

  private init(boardOptions: BoardOptions, defaultGridMode?: GridMode) {
    if (!this.container) {
      throw new Error('Container element is required')
    }

    if (this.board) {
      throw new Error('Board already initialized')
    }

    // Create board
    this.board = JXG.JSXGraph.initBoard(this.container, {
      ...this.options,
      ...boardOptions
    }) as JBoard

    // Create grid manager
    this.gridManager = new GridManager(this.board, this.container)

    // Set initial grid mode if provided
    if (defaultGridMode) {
      this.gridManager.setMode(defaultGridMode)
    }

    // Set up global event wiring for future pan/zoom support
    // This can be extended later for pan/zoom functionality
    this.setupGlobalEvents()
  }

  /**
   * Get the board instance (typed getter)
   */
  getBoard(): JBoard {
    if (!this.board) {
      throw new Error('Board not initialized')
    }
    return this.board
  }

  /**
   * Get the grid manager instance
   */
  getGridManager(): GridManager {
    if (!this.gridManager) {
      throw new Error('GridManager not initialized')
    }
    return this.gridManager
  }

  /**
   * Set grid mode via GridManager
   */
  setGridMode(mode: GridMode) {
    this.gridManager?.setMode(mode)
  }

  /**
   * Setup global event wiring (for later pan/zoom support)
   */
  private setupGlobalEvents() {
    if (!this.board) return

    // If you ever enable pan/zoom, keep the dot grid in sync:
    // this.board.on('boundingbox', () => {
    //   this.gridManager?.sync()
    // })

    // Add other global event handlers here as needed
  }

  /**
   * Update board options (for dynamic changes like pan/zoom)
   */
  updateOptions(options: Partial<BoardOptions>) {
    if (!this.board) {
      throw new Error('Board not initialized')
    }
    this.options = { ...this.options, ...options }
    // Apply options to board as needed
    // Note: Some options may require board recreation
  }

  /**
   * Free the board and clean up resources
   */
  free() {
    if (this.board) {
      try {
        JXG.JSXGraph.freeBoard(this.board)
      } catch (e) {
        // Ignore errors during cleanup
      }
      this.board = null
    }
    this.gridManager = null
    this.container = null
  }
}

