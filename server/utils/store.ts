import type { VerticalDetail } from '~/types/market'

// In-memory storage for latest analysis results
const store = new Map<string, VerticalDetail>()

export function getStored(verticalId: string): VerticalDetail | null {
  return store.get(verticalId) || null
}

export function setStored(verticalId: string, data: VerticalDetail): void {
  store.set(verticalId, data)
}

export function getAllStored(): VerticalDetail[] {
  return Array.from(store.values())
}
