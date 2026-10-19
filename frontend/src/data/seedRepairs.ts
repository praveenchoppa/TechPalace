import type { RepairRecord } from '../types/repair'

/** Fictional sample records for the prototype demo. */
export const SEED_REPAIRS: RepairRecord[] = [
  {
    repairId: 'TP-1001',
    customerName: 'Sample Customer A',
    customerPhone: '9800000001',
    deviceType: 'Laptop',
    deviceBrandModel: 'Dell Inspiron 15',
    reportedIssue: 'No power, suspected charging port damage.',
    dateReceived: '2026-10-01',
    status: 'Repairing',
    latestStatusUpdate:
      'Motherboard trace repair in progress. Estimated completion within 2 days.',
    repairCost: 2500,
    isSample: true,
  },
  {
    repairId: 'TP-1002',
    customerName: 'Sample Customer B',
    customerPhone: '9800000002',
    deviceType: 'Desktop',
    deviceBrandModel: 'Custom PC',
    reportedIssue: 'Intermittent shutdown under load.',
    dateReceived: '2026-10-03',
    status: 'Diagnosing',
    latestStatusUpdate:
      'Running stress tests and checking PSU output. Will confirm parts needed shortly.',
    isSample: true,
  },
  {
    repairId: 'TP-1003',
    customerName: 'Sample Customer C',
    customerPhone: '9800000003',
    deviceType: 'Printer',
    deviceBrandModel: 'HP LaserJet',
    reportedIssue: 'Paper jam sensor error.',
    dateReceived: '2026-09-28',
    status: 'Completed',
    latestStatusUpdate: 'Repair completed. Device tested and ready for collection.',
    repairCost: 800,
    finalRepairCost: 850,
    collected: false,
    isSample: true,
  },
]

export const SEED_NEXT_ID = 1004
