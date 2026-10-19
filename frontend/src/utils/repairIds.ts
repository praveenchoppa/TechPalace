export function formatRepairId(numericId: number) {
  return `TP-${numericId}`
}

export function normalizeRepairIdInput(raw: string) {
  return raw.trim().toUpperCase()
}
