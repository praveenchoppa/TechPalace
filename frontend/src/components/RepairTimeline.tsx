import { REPAIR_STAGES, type RepairStatus } from '../types/repair'

type RepairTimelineProps = {
  current: RepairStatus
}

export function RepairTimeline({ current }: RepairTimelineProps) {
  const currentIndex = REPAIR_STAGES.indexOf(current)

  return (
    <ol className="timeline" aria-label="Repair progress">
      {REPAIR_STAGES.map((stage, index) => {
        const state =
          index < currentIndex ? 'done' : index === currentIndex ? 'active' : 'upcoming'
        return (
          <li key={stage} className={`timeline__step timeline__step--${state}`}>
            <span className="timeline__dot" aria-hidden />
            <span className="timeline__label">{stage}</span>
          </li>
        )
      })}
    </ol>
  )
}
