import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'

const DURATIONS = [
  { token: 'motion/duration/fast', value: '120ms', use: 'Micro-interactions, hover', ms: 120 },
  { token: 'motion/duration/base', value: '180ms', use: 'Default transitions', ms: 180 },
  { token: 'motion/duration/slow', value: '240ms', use: 'Larger surface changes', ms: 240 },
]

const EASINGS = [
  { label: 'motion/easing/default', value: 'cubic-bezier(0.2, 0, 0, 1)', use: 'Default' },
  { label: 'motion/easing/enter',   value: 'cubic-bezier(0.16, 1, 0.3, 1)', use: 'Entering content' },
]

function DemoButton({ label, ms, easing }) {
  const [active, setActive] = useState(false)

  return (
    <button
      onMouseEnter={() => setActive(true)}
      onMouseLeave={() => setActive(false)}
      className="px-4 py-2 text-sm font-medium"
      style={{
        backgroundColor: active ? 'var(--primary)' : 'var(--secondary)',
        color: active ? 'var(--primary-foreground)' : 'var(--secondary-foreground)',
        borderRadius: 'var(--radius-md)',
        transition: `background-color ${ms}ms ${easing}, color ${ms}ms ${easing}`,
        border: 'none',
        cursor: 'pointer',
      }}
    >
      {label}
    </button>
  )
}

export default function MotionSection() {
  return (
    <div>
      <SectionHeader
        title="Motion"
        description="Motion reinforces spatial logic — nothing ornamental. Short, functional, and deferential on data."
      />

      <div className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--muted-foreground)' }}>
          Duration tokens
        </h2>
        <div className="space-y-1">
          {DURATIONS.map(d => (
            <div key={d.token} className="flex items-center justify-between py-4 border-b" style={{ borderColor: 'var(--border)' }}>
              <div>
                <p className="text-sm font-mono font-medium" style={{ color: 'var(--foreground)' }}>{d.token}</p>
                <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{d.use}</p>
              </div>
              <div className="flex items-center gap-4">
                <span className="text-sm font-mono" style={{ color: 'var(--foreground)' }}>{d.value}</span>
                <DemoButton label="Hover me" ms={d.ms} easing="cubic-bezier(0.2, 0, 0, 1)" />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mb-12">
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--muted-foreground)' }}>
          Easing
        </h2>
        <div className="space-y-3">
          {EASINGS.map(e => (
            <div
              key={e.label}
              className="p-4"
              style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{e.label}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>{e.use}</p>
                </div>
              </div>
              <p className="text-xs font-mono mt-3" style={{ color: 'var(--primary)' }}>{e.value}</p>
            </div>
          ))}
        </div>
      </div>

      <div
        className="p-5 rounded-lg"
        style={{ backgroundColor: 'var(--muted)', borderRadius: 'var(--radius-lg)' }}
      >
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Principles</p>
        <ul className="space-y-1.5">
          {[
            'No transition exceeds 240ms. Most land at 120–180ms.',
            'Motion communicates state change, not personality.',
            'Maps and charts never auto-animate data on load.',
            'Honor prefers-reduced-motion — replace slides/fades with instant changes.',
            'Never use ease-in alone; entering elements always decelerate.',
          ].map(p => (
            <li key={p} className="text-sm flex gap-2" style={{ color: 'var(--muted-foreground)' }}>
              <span style={{ color: 'var(--primary)' }}>·</span>{p}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
