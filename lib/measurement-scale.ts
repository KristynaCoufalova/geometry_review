// lib/measurement-scale.ts
// Centralized logical measurement scale: 1 world unit = 1 cm

export const WORLD_PER_CM = 1
export const CM_PER_WORLD = 1 / WORLD_PER_CM
export const WORLD_PER_MM = WORLD_PER_CM / 10

export const UNIT_LABEL = 'cm'

export function toCm(valueInWorld: number): number {
  return valueInWorld * CM_PER_WORLD
}

export function fromCm(valueInCm: number): number {
  return valueInCm * WORLD_PER_CM
}

export function defaultBoundingBoxCm(widthCm: number, heightCm: number, marginCm = 0): [number, number, number, number] {
  return [
    0 - marginCm,
    heightCm + marginCm,
    widthCm + marginCm,
    0 - marginCm
  ]
}

/**
 * Calculate a bounding box in whole centimeters, centered at (0,0)
 * that fits within the given screen dimensions while maintaining aspect ratio.
 * 
 * @param screenWidthPx Screen width in pixels
 * @param screenHeightPx Screen height in pixels
 * @param minSizeCm Minimum size in centimeters (default: 10cm)
 * @returns JSXGraph bounding box format: [left, top, right, bottom] where center is (0,0)
 */
export function calculateCenteredBoundingBoxCm(
  screenWidthPx: number,
  screenHeightPx: number,
  minSizeCm: number = 10
): [number, number, number, number] {
  // Calculate aspect ratio
  const screenAspect = screenWidthPx / screenHeightPx
  
  // Start with a reasonable default size
  // We'll calculate whole centimeters that fit
  const idealWidthCm = Math.max(minSizeCm, Math.floor(screenWidthPx / 30)) // ~30px per cm minimum
  const idealHeightCm = Math.max(minSizeCm, Math.floor(screenHeightPx / 30))
  
  // Determine which dimension to constrain by
  let widthCm: number
  let heightCm: number
  
  if (screenAspect > 1) {
    // Landscape: width is larger, constrain by height
    heightCm = idealHeightCm
    widthCm = Math.floor(heightCm * screenAspect)
  } else {
    // Portrait: height is larger, constrain by width
    widthCm = idealWidthCm
    heightCm = Math.floor(widthCm / screenAspect)
  }
  
  // Ensure we have at least minSizeCm in both dimensions
  widthCm = Math.max(widthCm, minSizeCm)
  heightCm = Math.max(heightCm, minSizeCm)
  
  // Ensure both are whole centimeters (already are from Math.floor, but be explicit)
  widthCm = Math.floor(widthCm)
  heightCm = Math.floor(heightCm)
  
  // Create bounding box centered at (0,0)
  // JSXGraph format: [left, top, right, bottom]
  const halfWidth = widthCm / 2
  const halfHeight = heightCm / 2
  
  return [
    -halfWidth,  // left
    halfHeight,  // top
    halfWidth,   // right
    -halfHeight  // bottom
  ]
}


