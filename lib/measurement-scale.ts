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


