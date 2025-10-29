// lib/selection-manager.ts
/**
 * SelectionManager - manages temporary selection state for multi-step tools
 * 
 * Responsibility: hold "first click" temporary selection, expose select, clear, getFirst.
 * Why: simplifies selected state + refs and makes it tool-agnostic.
 */

export class SelectionManager {
  private first: any = null

  /**
   * Select an item (typically used for first click in multi-step tools)
   */
  select(item: any): void {
    this.first = item
  }

  /**
   * Get the first selected item (for two-click tools like segment/line/circle)
   */
  getFirst(): any {
    return this.first
  }

  /**
   * Clear the selection
   */
  clear(): void {
    this.first = null
  }

  /**
   * Check if there is a selection
   */
  hasSelection(): boolean {
    return this.first !== null
  }

  /**
   * Get all selected items (for potential future multi-selection support)
   * Currently returns array with first item or empty array
   */
  getAll(): any[] {
    return this.first ? [this.first] : []
  }
}

