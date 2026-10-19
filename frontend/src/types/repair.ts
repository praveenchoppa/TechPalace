export const REPAIR_STAGES = [
  'Received',
  'Diagnosing',
  'Repairing',
  'Completed',
] as const

export type RepairStatus = (typeof REPAIR_STAGES)[number]

export type RepairRecord = {
  repairId: string
  customerName: string
  customerPhone: string
  deviceType: string
  deviceBrandModel: string
  reportedIssue: string
  dateReceived: string
  status: RepairStatus
  latestStatusUpdate: string
  repairCost?: number
  finalRepairCost?: number
  collected?: boolean
  isSample?: boolean
}

export type RepairStore = {
  repairs: RepairRecord[]
  nextNumericId: number
}
