import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from 'react'
import { SEED_NEXT_ID, SEED_REPAIRS } from '../data/seedRepairs'
import type { RepairRecord, RepairStatus, RepairStore } from '../types/repair'
import { formatRepairId } from '../utils/repairIds'

const STORAGE_KEY = 'techpalace_repairs_v1'

function loadStore(): RepairStore {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as RepairStore
      if (parsed?.repairs && typeof parsed.nextNumericId === 'number') {
        return parsed
      }
    }
  } catch {
    /* use seed */
  }
  return { repairs: [...SEED_REPAIRS], nextNumericId: SEED_NEXT_ID }
}

function saveStore(store: RepairStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

let store: RepairStore = typeof window !== 'undefined' ? loadStore() : { repairs: SEED_REPAIRS, nextNumericId: SEED_NEXT_ID }
const listeners = new Set<() => void>()

function emit() {
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

function getSnapshot() {
  return store
}

export type NewRepairInput = {
  customerName: string
  customerPhone: string
  deviceType: string
  deviceBrandModel: string
  reportedIssue: string
  dateReceived: string
  status: RepairStatus
  repairCost?: number
}

export type RepairContextValue = {
  repairs: RepairRecord[]
  getByRepairId: (id: string) => RepairRecord | undefined
  addRepair: (input: NewRepairInput) => RepairRecord
  updateRepair: (repairId: string, patch: Partial<RepairRecord>) => RepairRecord | undefined
  stats: {
    total: number
    inProgress: number
    completed: number
    readyForCollection: number
  }
}

const RepairContext = createContext<RepairContextValue | null>(null)

function computeStats(repairs: RepairRecord[]) {
  const inProgress = repairs.filter(
    (r) => r.status === 'Received' || r.status === 'Diagnosing' || r.status === 'Repairing',
  ).length
  const completed = repairs.filter((r) => r.status === 'Completed').length
  const readyForCollection = repairs.filter(
    (r) => r.status === 'Completed' && !r.collected,
  ).length
  return { total: repairs.length, inProgress, completed, readyForCollection }
}

export function RepairProvider({ children }: { children: ReactNode }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getSnapshot)

  const getByRepairId = useCallback(
    (id: string) => snapshot.repairs.find((r) => r.repairId === id),
    [snapshot.repairs],
  )

  const addRepair = useCallback((input: NewRepairInput) => {
    const current = getSnapshot()
    const repairId = formatRepairId(current.nextNumericId)
    const record: RepairRecord = {
      repairId,
      customerName: input.customerName.trim(),
      customerPhone: input.customerPhone.trim(),
      deviceType: input.deviceType.trim(),
      deviceBrandModel: input.deviceBrandModel.trim(),
      reportedIssue: input.reportedIssue.trim(),
      dateReceived: input.dateReceived,
      status: input.status,
      latestStatusUpdate: `Device registered. Current status: ${input.status}.`,
      repairCost: input.repairCost,
      isSample: false,
    }
    store = {
      repairs: [record, ...current.repairs],
      nextNumericId: current.nextNumericId + 1,
    }
    saveStore(store)
    emit()
    return record
  }, [])

  const updateRepair = useCallback((repairId: string, patch: Partial<RepairRecord>) => {
    const current = getSnapshot()
    let updated: RepairRecord | undefined
    store = {
      ...current,
      repairs: current.repairs.map((r) => {
        if (r.repairId !== repairId) return r
        updated = { ...r, ...patch, repairId: r.repairId }
        if (patch.status && patch.status !== r.status) {
          updated.latestStatusUpdate =
            patch.latestStatusUpdate ??
            `Status updated to ${patch.status}.`
        }
        if (patch.status === 'Completed' && updated.finalRepairCost == null && updated.repairCost != null) {
          updated.finalRepairCost = updated.repairCost
        }
        return updated
      }),
    }
    if (updated) {
      saveStore(store)
      emit()
    }
    return updated
  }, [])

  const stats = useMemo(() => computeStats(snapshot.repairs), [snapshot.repairs])

  const value = useMemo(
    () => ({
      repairs: snapshot.repairs,
      getByRepairId,
      addRepair,
      updateRepair,
      stats,
    }),
    [snapshot.repairs, getByRepairId, addRepair, updateRepair, stats],
  )

  return <RepairContext.Provider value={value}>{children}</RepairContext.Provider>
}

export function useRepairs() {
  const ctx = useContext(RepairContext)
  if (!ctx) throw new Error('useRepairs must be used within RepairProvider')
  return ctx
}
