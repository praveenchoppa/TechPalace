import { useMemo, useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { useRepairs } from '../context/RepairContext'
import { REPAIR_STAGES, type RepairRecord, type RepairStatus } from '../types/repair'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

const emptyForm = {
  customerName: '',
  customerPhone: '',
  deviceType: '',
  deviceBrandModel: '',
  reportedIssue: '',
  dateReceived: new Date().toISOString().slice(0, 10),
  status: 'Received' as RepairStatus,
  repairCost: '',
}

export function AdminPage() {
  const { repairs, stats, addRepair, updateRepair } = useRepairs()
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<'all' | RepairStatus>('all')
  const [form, setForm] = useState(emptyForm)
  const [formError, setFormError] = useState<string | null>(null)
  const [addSuccess, setAddSuccess] = useState<string | null>(null)
  const [editing, setEditing] = useState<RepairRecord | null>(null)
  const [editMessage, setEditMessage] = useState<string | null>(null)
  const [editForm, setEditForm] = useState({
    reportedIssue: '',
    status: 'Received' as RepairStatus,
    latestStatusUpdate: '',
    repairCost: '',
    finalRepairCost: '',
    collected: false,
  })

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return repairs.filter((r) => {
      if (statusFilter !== 'all' && r.status !== statusFilter) return false
      if (!q) return true
      return (
        r.repairId.toLowerCase().includes(q) ||
        r.customerName.toLowerCase().includes(q) ||
        r.deviceBrandModel.toLowerCase().includes(q)
      )
    })
  }, [repairs, search, statusFilter])

  function openEdit(record: RepairRecord) {
    setEditing(record)
    setEditMessage(null)
    setEditForm({
      reportedIssue: record.reportedIssue,
      status: record.status,
      latestStatusUpdate: record.latestStatusUpdate,
      repairCost: record.repairCost?.toString() ?? '',
      finalRepairCost: record.finalRepairCost?.toString() ?? '',
      collected: record.collected ?? false,
    })
  }

  function handleAdd(e: FormEvent) {
    e.preventDefault()
    setFormError(null)
    setAddSuccess(null)
    if (!form.customerName.trim() || !form.customerPhone.trim()) {
      setFormError('Customer name and phone are required.')
      return
    }
    if (!/^\d{10}$/.test(form.customerPhone.trim())) {
      setFormError('Enter a 10-digit phone number (demo validation).')
      return
    }
    if (!form.deviceType.trim() || !form.deviceBrandModel.trim() || !form.reportedIssue.trim()) {
      setFormError('Device details and reported issue are required.')
      return
    }
    const cost = form.repairCost.trim() ? Number(form.repairCost) : undefined
    if (form.repairCost.trim() && (Number.isNaN(cost) || cost! < 0)) {
      setFormError('Repair cost must be a valid number.')
      return
    }
    const created = addRepair({
      customerName: form.customerName,
      customerPhone: form.customerPhone,
      deviceType: form.deviceType,
      deviceBrandModel: form.deviceBrandModel,
      reportedIssue: form.reportedIssue,
      dateReceived: form.dateReceived,
      status: form.status,
      repairCost: cost,
    })
    setForm(emptyForm)
    setAddSuccess(`Repair ${created.repairId} created. Share this ID with the customer for tracking.`)
  }

  function handleSaveEdit(e: FormEvent) {
    e.preventDefault()
    if (!editing) return
    setEditMessage(null)
    const repairCost = editForm.repairCost.trim() ? Number(editForm.repairCost) : undefined
    const finalRepairCost = editForm.finalRepairCost.trim()
      ? Number(editForm.finalRepairCost)
      : undefined
    if (editForm.repairCost.trim() && Number.isNaN(repairCost)) {
      setEditMessage('Repair cost must be a valid number.')
      return
    }
    if (editForm.finalRepairCost.trim() && Number.isNaN(finalRepairCost)) {
      setEditMessage('Final cost must be a valid number.')
      return
    }
    const patch: Partial<RepairRecord> = {
      reportedIssue: editForm.reportedIssue.trim(),
      status: editForm.status,
      latestStatusUpdate: editForm.latestStatusUpdate.trim() || undefined,
      repairCost,
      finalRepairCost,
      collected: editForm.status === 'Completed' ? editForm.collected : false,
    }
    if (editForm.status === 'Completed' && finalRepairCost == null && repairCost != null) {
      patch.finalRepairCost = repairCost
    }
    updateRepair(editing.repairId, patch)
    setEditMessage('Changes saved. Customer tracking reflects updates immediately in this browser.')
    setEditing({ ...editing, ...patch, repairId: editing.repairId })
  }

  return (
    <div className="admin">
      <header className="admin-header">
        <div className="container admin-header__inner">
          <div>
            <p className="demo-badge">Demo admin — not secure for production</p>
            <h1>Repair dashboard</h1>
            <p className="admin-header__sub">Tech Palace Systems prototype</p>
          </div>
          <nav className="admin-header__nav">
            <Link to="/" className="btn btn--ghost btn--sm">
              Public site
            </Link>
            <Link to="/track" className="btn btn--secondary btn--sm">
              Tracking page
            </Link>
          </nav>
        </div>
      </header>

      <div className="container admin-body">
        <div className="stat-grid">
          <div className="stat-card">
            <p className="stat-card__label">Total records</p>
            <p className="stat-card__value">{stats.total}</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">In progress</p>
            <p className="stat-card__value">{stats.inProgress}</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">Completed</p>
            <p className="stat-card__value">{stats.completed}</p>
          </div>
          <div className="stat-card">
            <p className="stat-card__label">Ready for collection</p>
            <p className="stat-card__value">{stats.readyForCollection}</p>
          </div>
        </div>

        <div className="admin-grid">
          <section className="card admin-panel">
            <h2>Add repair</h2>
            <p className="form-hint">Creates a new repair ID and stores it in this browser only.</p>
            <form className="admin-form" onSubmit={handleAdd}>
              <div className="form-row">
                <label>
                  Customer name
                  <input
                    value={form.customerName}
                    onChange={(e) => setForm({ ...form, customerName: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Customer phone
                  <input
                    value={form.customerPhone}
                    onChange={(e) => setForm({ ...form, customerPhone: e.target.value })}
                    inputMode="numeric"
                    required
                  />
                </label>
              </div>
              <div className="form-row">
                <label>
                  Device type
                  <input
                    value={form.deviceType}
                    onChange={(e) => setForm({ ...form, deviceType: e.target.value })}
                    placeholder="Laptop"
                    required
                  />
                </label>
                <label>
                  Brand / model
                  <input
                    value={form.deviceBrandModel}
                    onChange={(e) => setForm({ ...form, deviceBrandModel: e.target.value })}
                    required
                  />
                </label>
              </div>
              <label>
                Reported issue
                <textarea
                  value={form.reportedIssue}
                  onChange={(e) => setForm({ ...form, reportedIssue: e.target.value })}
                  rows={3}
                  required
                />
              </label>
              <div className="form-row">
                <label>
                  Date received
                  <input
                    type="date"
                    value={form.dateReceived}
                    onChange={(e) => setForm({ ...form, dateReceived: e.target.value })}
                    required
                  />
                </label>
                <label>
                  Initial status
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value as RepairStatus })}
                  >
                    {REPAIR_STAGES.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Repair cost (optional)
                  <input
                    value={form.repairCost}
                    onChange={(e) => setForm({ ...form, repairCost: e.target.value })}
                    inputMode="decimal"
                    placeholder="INR"
                  />
                </label>
              </div>
              {formError && (
                <p className="form-error" role="alert">
                  {formError}
                </p>
              )}
              {addSuccess && (
                <p className="form-success" role="status">
                  {addSuccess}
                </p>
              )}
              <button type="submit" className="btn btn--primary">
                Create repair record
              </button>
            </form>
          </section>

          <section className="card admin-panel admin-panel--wide">
            <div className="admin-panel__toolbar">
              <h2>Repair records</h2>
              <div className="toolbar-controls">
                <input
                  type="search"
                  placeholder="Search ID, customer, device…"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  aria-label="Search repairs"
                />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as 'all' | RepairStatus)}
                  aria-label="Filter by status"
                >
                  <option value="all">All statuses</option>
                  {REPAIR_STAGES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="table-wrap">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Repair ID</th>
                    <th>Customer</th>
                    <th>Device</th>
                    <th>Received</th>
                    <th>Status</th>
                    <th>Cost</th>
                    <th />
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="table-empty">
                        No records match your filters.
                      </td>
                    </tr>
                  ) : (
                    filtered.map((r) => (
                      <tr key={r.repairId}>
                        <td>
                          <code>{r.repairId}</code>
                          {r.isSample && <span className="table-tag">Sample</span>}
                        </td>
                        <td>{r.customerName}</td>
                        <td>
                          {r.deviceType} · {r.deviceBrandModel}
                        </td>
                        <td>{r.dateReceived}</td>
                        <td>
                          <span className={`status-pill status-pill--${r.status.toLowerCase()}`}>
                            {r.status}
                          </span>
                        </td>
                        <td>
                          {r.finalRepairCost != null
                            ? formatCurrency(r.finalRepairCost)
                            : r.repairCost != null
                              ? formatCurrency(r.repairCost)
                              : '—'}
                        </td>
                        <td>
                          <button
                            type="button"
                            className="btn btn--ghost btn--sm"
                            onClick={() => openEdit(r)}
                          >
                            Edit
                          </button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </div>

      {editing && (
        <div className="modal-backdrop" role="presentation" onClick={() => setEditing(null)}>
          <div
            className="modal card"
            role="dialog"
            aria-labelledby="edit-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal__header">
              <h2 id="edit-title">Edit {editing.repairId}</h2>
              <button type="button" className="modal__close" onClick={() => setEditing(null)}>
                Close
              </button>
            </div>
            <form className="admin-form" onSubmit={handleSaveEdit}>
              <label>
                Reported issue
                <textarea
                  value={editForm.reportedIssue}
                  onChange={(e) => setEditForm({ ...editForm, reportedIssue: e.target.value })}
                  rows={3}
                  required
                />
              </label>
              <label>
                Status
                <select
                  value={editForm.status}
                  onChange={(e) =>
                    setEditForm({ ...editForm, status: e.target.value as RepairStatus })
                  }
                >
                  {REPAIR_STAGES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                Latest status update (customer-visible)
                <textarea
                  value={editForm.latestStatusUpdate}
                  onChange={(e) =>
                    setEditForm({ ...editForm, latestStatusUpdate: e.target.value })
                  }
                  rows={2}
                />
              </label>
              <div className="form-row">
                <label>
                  Repair cost
                  <input
                    value={editForm.repairCost}
                    onChange={(e) => setEditForm({ ...editForm, repairCost: e.target.value })}
                  />
                </label>
                <label>
                  Final repair cost
                  <input
                    value={editForm.finalRepairCost}
                    onChange={(e) =>
                      setEditForm({ ...editForm, finalRepairCost: e.target.value })
                    }
                    disabled={editForm.status !== 'Completed'}
                  />
                </label>
              </div>
              {editForm.status === 'Completed' && (
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={editForm.collected}
                    onChange={(e) => setEditForm({ ...editForm, collected: e.target.checked })}
                  />
                  Mark as collected
                </label>
              )}
              {editMessage && (
                <p className={editMessage.startsWith('Changes') ? 'form-success' : 'form-error'}>
                  {editMessage}
                </p>
              )}
              <div className="modal__actions">
                <button type="button" className="btn btn--ghost" onClick={() => setEditing(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn btn--primary">
                  Save changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
