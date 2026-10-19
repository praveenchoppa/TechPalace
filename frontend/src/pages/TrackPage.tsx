import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { ContactActions } from '../components/ContactActions'
import { RepairTimeline } from '../components/RepairTimeline'
import { useRepairs } from '../context/RepairContext'
import { normalizeRepairIdInput } from '../utils/repairIds'

function formatCurrency(amount: number) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatDate(iso: string) {
  return new Date(iso + 'T12:00:00').toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export function TrackPage() {
  const { getByRepairId } = useRepairs()
  const [input, setInput] = useState('')
  const [searchedId, setSearchedId] = useState<string | null>(null)
  const [submitted, setSubmitted] = useState(false)

  const record =
    submitted && searchedId ? getByRepairId(searchedId) : undefined

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    const id = normalizeRepairIdInput(input)
    if (!id) return
    setSearchedId(id)
    setSubmitted(true)
  }

  return (
    <section className="page-hero section">
      <div className="container container--narrow">
        <p className="eyebrow">Customer portal</p>
        <h1>Track your repair</h1>
        <p className="page-hero__lead">
          Use the repair ID printed on your receipt or shared by our team (for example{' '}
          <strong>TP-1001</strong>).
        </p>

        <form className="track-form card" onSubmit={handleSubmit}>
          <label htmlFor="repair-id">Repair ID</label>
          <div className="track-form__row">
            <input
              id="repair-id"
              name="repairId"
              type="text"
              placeholder="TP-1001"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              autoComplete="off"
              spellCheck={false}
              required
            />
            <button type="submit" className="btn btn--primary">
              Track Repair
            </button>
          </div>
          <p className="form-hint">
            Your ID is on the job card we provide when you hand in your device. Contact us if you
            cannot find it.
          </p>
        </form>

        {submitted && !record && (
          <div className="card track-result track-result--empty" role="status">
            <h2>No record found</h2>
            <p>
              We could not find a repair matching <strong>{searchedId}</strong>. Check the ID and
              try again, or call us for assistance.
            </p>
            <ContactActions />
          </div>
        )}

        {record && (
          <div className="card track-result animate-in">
            {record.isSample && (
              <p className="sample-banner">Sample demo record — fictional customer data.</p>
            )}
            <div className="track-result__header">
              <div>
                <p className="track-result__label">Repair ID</p>
                <h2>{record.repairId}</h2>
              </div>
              <span className={`status-pill status-pill--${record.status.toLowerCase()}`}>
                {record.status}
              </span>
            </div>

            <RepairTimeline current={record.status} />

            <dl className="detail-grid">
              <div>
                <dt>Device</dt>
                <dd>
                  {record.deviceType} · {record.deviceBrandModel}
                </dd>
              </div>
              <div>
                <dt>Date received</dt>
                <dd>{formatDate(record.dateReceived)}</dd>
              </div>
              <div className="detail-grid__full">
                <dt>Reported issue</dt>
                <dd>{record.reportedIssue}</dd>
              </div>
              <div className="detail-grid__full">
                <dt>Latest update</dt>
                <dd>{record.latestStatusUpdate}</dd>
              </div>
              {record.repairCost != null && record.status !== 'Completed' && (
                <div>
                  <dt>Estimated repair cost</dt>
                  <dd>{formatCurrency(record.repairCost)}</dd>
                </div>
              )}
              {record.status === 'Completed' && record.finalRepairCost != null && (
                <div>
                  <dt>Final repair cost</dt>
                  <dd>{formatCurrency(record.finalRepairCost)}</dd>
                </div>
              )}
              {record.status === 'Completed' && (
                <div>
                  <dt>Collection</dt>
                  <dd>{record.collected ? 'Collected' : 'Ready for collection'}</dd>
                </div>
              )}
            </dl>
          </div>
        )}

        <div className="track-help">
          <span>Need help?</span>
          <ContactActions layout="row" />
          <span>
            or <Link to="/#contact">view full contact details</Link>.
          </span>
        </div>
      </div>
    </section>
  )
}
