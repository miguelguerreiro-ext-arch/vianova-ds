import { useMemo, useState } from 'react'
import { ChevronDown, ChevronRight, GitCommit } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import { CHANGELOG } from '../changelog-data'

const DAY_FMT = new Intl.DateTimeFormat('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })
const TIME_FMT = new Intl.DateTimeFormat('en-US', { hour: '2-digit', minute: '2-digit', hour12: false })

function groupByDay(entries) {
  const map = new Map()
  for (const e of entries) {
    const d = new Date(e.iso)
    const key = d.toISOString().slice(0, 10)
    if (!map.has(key)) map.set(key, { key, date: d, items: [] })
    map.get(key).items.push(e)
  }
  return [...map.values()].sort((a, b) => b.date - a.date)
}

function Entry({ e }) {
  const [open, setOpen] = useState(false)
  const hasBody = !!e.body
  const time = TIME_FMT.format(new Date(e.iso))
  const bodyLines = hasBody ? e.body.split('\n').filter(Boolean) : []

  return (
    <div style={{ position: 'relative', paddingLeft: 28 }}>
      {/* Dot on the timeline */}
      <div
        style={{
          position: 'absolute',
          left: 5,
          top: 8,
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: 'var(--background)',
          border: '2px solid var(--primary)',
        }}
      />
      <button
        onClick={() => hasBody && setOpen(o => !o)}
        disabled={!hasBody}
        style={{
          width: '100%',
          textAlign: 'left',
          background: 'none',
          border: 'none',
          padding: '4px 0 10px',
          cursor: hasBody ? 'pointer' : 'default',
          display: 'flex',
          alignItems: 'baseline',
          gap: 10,
        }}
      >
        <span className="font-mono text-xs" style={{ color: 'var(--muted-foreground)', flexShrink: 0, minWidth: 40 }}>
          {time}
        </span>
        <span className="text-sm" style={{ color: 'var(--foreground)', flex: 1, lineHeight: 1.4 }}>
          {e.title}
        </span>
        <span className="font-mono text-xs" style={{ color: 'var(--muted-foreground)', flexShrink: 0 }}>
          {e.sha}
        </span>
        {hasBody && (
          <span style={{ color: 'var(--muted-foreground)', flexShrink: 0, display: 'inline-flex' }}>
            {open
              ? <ChevronDown size={14} strokeWidth={1.33} />
              : <ChevronRight size={14} strokeWidth={1.33} />}
          </span>
        )}
      </button>

      {open && hasBody && (
        <div style={{ marginLeft: 50, marginBottom: 12, paddingLeft: 12, borderLeft: '2px solid var(--border)' }}>
          {bodyLines.map((line, i) => (
            <p
              key={i}
              className="text-xs"
              style={{
                color: 'var(--muted-foreground)',
                lineHeight: 1.6,
                fontFamily: line.startsWith('-') || line.startsWith('  ') ? 'inherit' : 'inherit',
                whiteSpace: 'pre-wrap',
              }}
            >
              {line}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ChangelogSection() {
  const days = useMemo(() => groupByDay(CHANGELOG), [])

  return (
    <div>
      <SectionHeader
        title="Changelog"
        description={
          <>
            Every change to Vianova Product DS, in reverse chronological order.
            {' '}{CHANGELOG.length} {CHANGELOG.length === 1 ? 'commit' : 'commits'} tracked since the initial release.
          </>
        }
      />

      <div style={{ position: 'relative' }}>
        {/* Vertical timeline rule */}
        <div
          style={{
            position: 'absolute',
            left: 9,
            top: 6,
            bottom: 6,
            width: 2,
            backgroundColor: 'var(--border)',
          }}
        />

        {days.map(day => (
          <div key={day.key} className="mb-8">
            <div
              className="flex items-center gap-2 mb-3"
              style={{ position: 'relative', paddingLeft: 28 }}
            >
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  width: 20,
                  height: 20,
                  borderRadius: '50%',
                  backgroundColor: 'var(--primary)',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--primary-foreground)',
                }}
              >
                <GitCommit size={11} strokeWidth={1.5} />
              </div>
              <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--foreground)' }}>
                {DAY_FMT.format(day.date)}
              </h2>
              <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                · {day.items.length} {day.items.length === 1 ? 'change' : 'changes'}
              </span>
            </div>

            <div>
              {day.items.map(e => <Entry key={e.sha} e={e} />)}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
