import { useState } from 'react'
import { AlertCircle, CheckCircle2, Info, Search, ChevronDown, MapPin, ArrowUpRight } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import CustomDatePicker from '../components/CustomDatePicker'
import {
  BTN_USAGE, BTN_SOURCE,
  BADGE_USAGE, BADGE_SOURCE,
  INPUTS_USAGE, INPUTS_SOURCE,
  ALERTS_USAGE, ALERTS_SOURCE,
  CARDS_USAGE, CARDS_SOURCE,
  DATEPICKER_USAGE, DATEPICKER_SOURCE,
} from './codeSnippets'

const DATEPICKER_FIGMA =
  'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/YZFAMAbSiLQw6ARLwhNnIk/Vianova-DS-%E2%80%93-Custom-Date-Picker?node-id=6-2'

// ── Group label ───────────────────────────────────────────────────────────────
function GroupLabel({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest mb-5 mt-10"
      style={{ color: 'var(--muted-foreground)' }}>
      {children}
    </h2>
  )
}

// ── Code block ────────────────────────────────────────────────────────────────
function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false)

  function copy() {
    navigator.clipboard.writeText(code || '')
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div style={{ position: 'relative', backgroundColor: '#16161a' }}>
      <button
        onClick={copy}
        style={{
          position: 'absolute', top: 12, right: 12,
          padding: '3px 10px', fontSize: '0.7rem', fontWeight: 500,
          color: copied ? 'var(--primary)' : 'var(--muted-foreground)',
          backgroundColor: 'transparent',
          border: `1px solid ${copied ? 'rgba(20,183,165,0.4)' : 'rgba(255,255,255,0.08)'}`,
          borderRadius: 'var(--radius-sm)', cursor: 'pointer', fontFamily: 'inherit',
          transition: 'color 120ms, border-color 120ms',
        }}
      >
        {copied ? '✓ Copied' : 'Copy'}
      </button>
      <pre style={{
        margin: 0, padding: '20px 24px',
        fontSize: '0.78rem', lineHeight: 1.8,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        color: '#e4e4e7', overflowX: 'auto', whiteSpace: 'pre',
      }}>
        <code>{code}</code>
      </pre>
    </div>
  )
}

// ── Component frame ───────────────────────────────────────────────────────────
function ComponentFrame({ label, code, figmaUrl, children }) {
  const [tab, setTab] = useState('preview')
  const [codeView, setCodeView] = useState('usage')

  const MAIN_TABS = ['preview', 'code', 'figma']
  const CODE_VIEWS = ['usage', 'source']
  const activeCode = codeView === 'usage' ? code?.usage : code?.source

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>

      {/* Main tab bar */}
      <div style={{ display: 'flex', backgroundColor: 'var(--muted)', borderBottom: '1px solid var(--border)' }}>
        {MAIN_TABS.map(t => (
          <button
            key={t}
            onClick={() => setTab(t)}
            style={{
              padding: '9px 16px',
              fontSize: '0.75rem',
              fontWeight: tab === t ? 600 : 400,
              color: tab === t ? 'var(--foreground)' : 'var(--muted-foreground)',
              background: 'none', border: 'none',
              borderBottom: `2px solid ${tab === t ? 'var(--primary)' : 'transparent'}`,
              cursor: 'pointer', fontFamily: 'inherit', textTransform: 'capitalize',
              marginBottom: -1,
              transition: 'color 120ms, border-color 120ms',
            }}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Preview */}
      {tab === 'preview' && (
        <div style={{
          padding: 32, display: 'flex', flexWrap: 'wrap',
          gap: 16, alignItems: 'center', backgroundColor: 'var(--background)',
        }}>
          {children}
        </div>
      )}

      {/* Code */}
      {tab === 'code' && (
        <div>
          {/* Sub-tab bar */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 4,
            padding: '8px 12px', backgroundColor: '#1e1e22',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            {CODE_VIEWS.map(v => (
              <button
                key={v}
                onClick={() => setCodeView(v)}
                style={{
                  padding: '3px 10px', fontSize: '0.7rem',
                  fontWeight: codeView === v ? 600 : 400,
                  color: codeView === v ? 'var(--primary)' : 'var(--muted-foreground)',
                  backgroundColor: codeView === v ? 'rgba(20,183,165,0.1)' : 'transparent',
                  border: `1px solid ${codeView === v ? 'rgba(20,183,165,0.3)' : 'transparent'}`,
                  borderRadius: 'var(--radius-sm)', cursor: 'pointer',
                  fontFamily: 'inherit', textTransform: 'capitalize',
                  transition: 'color 120ms, background-color 120ms',
                }}
              >
                {v}
              </button>
            ))}
          </div>
          <CodeBlock code={activeCode} />
        </div>
      )}

      {/* Figma */}
      {tab === 'figma' && (
        figmaUrl ? (
          <iframe
            src={figmaUrl}
            style={{ width: '100%', height: 500, border: 'none', display: 'block' }}
            allowFullScreen
          />
        ) : (
          <div style={{
            padding: 48, textAlign: 'center', fontSize: '0.875rem',
            color: 'var(--muted-foreground)', backgroundColor: 'var(--background)',
          }}>
            No Figma design linked yet
          </div>
        )
      )}

      {/* Label bar */}
      <div style={{ padding: '6px 16px', borderTop: '1px solid var(--border)', backgroundColor: 'var(--muted)' }}>
        <span style={{
          fontSize: '0.7rem',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
          color: 'var(--muted-foreground)',
        }}>
          {label}
        </span>
      </div>
    </div>
  )
}

// ── Btn ───────────────────────────────────────────────────────────────────────
function Btn({ variant = 'primary', size = 'md', disabled = false, icon, children }) {
  const [hovered, setHovered] = useState(false)
  const base = {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    fontFamily: 'inherit', fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none', outline: 'none',
    transition: `background-color var(--motion-fast) var(--ease-default), opacity var(--motion-fast)`,
    opacity: disabled ? 0.5 : 1, borderRadius: 'var(--radius-md)',
  }
  const sizes = {
    sm: { padding: '4px 10px',  fontSize: '0.75rem' },
    md: { padding: '8px 16px',  fontSize: '0.875rem' },
    lg: { padding: '10px 20px', fontSize: '1rem' },
  }
  const variants = {
    primary:     { backgroundColor: hovered && !disabled ? 'rgba(20,183,165,0.9)' : 'var(--primary)',      color: 'var(--primary-foreground)' },
    secondary:   { backgroundColor: hovered && !disabled ? 'var(--accent)'         : 'var(--secondary)',    color: 'var(--secondary-foreground)' },
    ghost:       { backgroundColor: hovered && !disabled ? 'var(--accent)'         : 'transparent',        color: 'var(--foreground)' },
    destructive: { backgroundColor: hovered && !disabled ? 'rgba(239,68,68,0.85)'  : 'var(--destructive)', color: 'var(--destructive-foreground)' },
    outline:     { backgroundColor: hovered && !disabled ? 'var(--accent)'         : 'transparent',        color: 'var(--foreground)', border: '1px solid var(--border)' },
  }
  return (
    <button disabled={disabled} style={{ ...base, ...sizes[size], ...variants[variant] }}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}

// ── Badge ─────────────────────────────────────────────────────────────────────
function Badge({ variant = 'default', children }) {
  const variants = {
    default:     { backgroundColor: 'var(--secondary)',      color: 'var(--secondary-foreground)' },
    brand:       { backgroundColor: 'rgba(20,183,165,0.15)', color: 'var(--primary)' },
    destructive: { backgroundColor: 'rgba(239,68,68,0.12)',  color: 'var(--destructive)' },
    success:     { backgroundColor: 'rgba(34,197,94,0.12)',  color: '#16a34a' },
    muted:       { backgroundColor: 'var(--muted)',          color: 'var(--muted-foreground)' },
  }
  return (
    <span style={{ ...variants[variant], display: 'inline-flex', alignItems: 'center',
      padding: '2px 8px', borderRadius: 'var(--radius-full)', fontSize: '0.75rem', fontWeight: 500, lineHeight: 1.6 }}>
      {children}
    </span>
  )
}

// ── Input ─────────────────────────────────────────────────────────────────────
function Input({ placeholder, icon, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      {icon && (
        <span style={{ position: 'absolute', left: 10, color: 'var(--muted-foreground)', pointerEvents: 'none' }}>
          {icon}
        </span>
      )}
      <input type={type} placeholder={placeholder}
        onFocus={() => setFocused(true)} onBlur={() => setFocused(false)}
        style={{
          padding: `8px 12px 8px ${icon ? '34px' : '12px'}`,
          fontSize: '0.875rem', fontFamily: 'inherit',
          backgroundColor: 'var(--background)', color: 'var(--foreground)',
          border: `1px solid ${focused ? 'var(--primary)' : 'var(--input)'}`,
          borderRadius: 'var(--radius-sm)', outline: 'none',
          boxShadow: focused ? '0 0 0 2px rgba(20,183,165,0.2)' : 'none',
          transition: 'border-color var(--motion-fast), box-shadow var(--motion-fast)',
          width: '220px',
        }}
      />
    </div>
  )
}

// ── Select ────────────────────────────────────────────────────────────────────
function Select() {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select style={{
        appearance: 'none', padding: '8px 32px 8px 12px', fontSize: '0.875rem',
        fontFamily: 'inherit', backgroundColor: 'var(--background)', color: 'var(--foreground)',
        border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)', outline: 'none',
        cursor: 'pointer', width: '180px',
      }}>
        <option>All zones</option>
        <option>Central district</option>
        <option>Waterfront</option>
        <option>North ring</option>
      </select>
      <ChevronDown size={14} style={{ position: 'absolute', right: 10, color: 'var(--muted-foreground)', pointerEvents: 'none' }} />
    </div>
  )
}

// ── Toggle ────────────────────────────────────────────────────────────────────
function Toggle({ label }) {
  const [on, setOn] = useState(false)
  return (
    <div className="flex items-center gap-2">
      <button role="switch" aria-checked={on} onClick={() => setOn(v => !v)} style={{
        width: 36, height: 20, borderRadius: 'var(--radius-full)',
        backgroundColor: on ? 'var(--primary)' : 'var(--muted-foreground)',
        border: 'none', cursor: 'pointer', position: 'relative',
        transition: `background-color var(--motion-fast) var(--ease-default)`, flexShrink: 0,
      }}>
        <span style={{
          position: 'absolute', top: 2, left: on ? 18 : 2,
          width: 16, height: 16, borderRadius: '50%', backgroundColor: '#fff',
          transition: `left var(--motion-fast) var(--ease-default)`,
        }} />
      </button>
      {label && <span className="text-sm" style={{ color: 'var(--foreground)' }}>{label}</span>}
    </div>
  )
}

// ── Alert ─────────────────────────────────────────────────────────────────────
function Alert({ variant = 'info', title, message }) {
  const variants = {
    info:    { color: 'var(--primary)',     bg: 'rgba(20,183,165,0.08)',  Icon: Info },
    warning: { color: '#f59e0b',            bg: 'rgba(245,158,11,0.08)',  Icon: AlertCircle },
    success: { color: '#22c55e',            bg: 'rgba(34,197,94,0.08)',   Icon: CheckCircle2 },
    error:   { color: 'var(--destructive)', bg: 'rgba(239,68,68,0.08)',   Icon: AlertCircle },
  }
  const v = variants[variant]
  return (
    <div className="flex gap-3 p-4 rounded" style={{
      backgroundColor: v.bg, borderRadius: 'var(--radius-md)',
      border: `1px solid ${v.color}22`,
    }}>
      <v.Icon size={16} style={{ color: v.color, flexShrink: 0, marginTop: 1 }} />
      <div>
        {title && <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{title}</p>}
        <p className="text-sm" style={{ color: 'var(--muted-foreground)' }}>{message}</p>
      </div>
    </div>
  )
}

// ── DataCard ──────────────────────────────────────────────────────────────────
function DataCard({ title, value, delta, unit, positive }) {
  return (
    <div className="p-5" style={{
      border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)',
      backgroundColor: 'var(--card)', minWidth: 180,
    }}>
      <p className="text-xs font-medium uppercase tracking-widest mb-2"
        style={{ color: 'var(--muted-foreground)', fontSize: '0.625rem' }}>
        {title}
      </p>
      <div className="flex items-end gap-1.5">
        <span style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.1, color: 'var(--foreground)' }}>{value}</span>
        {unit && <span className="text-sm mb-0.5" style={{ color: 'var(--muted-foreground)' }}>{unit}</span>}
      </div>
      {delta && (
        <div className="flex items-center gap-1 mt-2">
          <ArrowUpRight size={12} style={{
            color: positive ? '#22c55e' : 'var(--destructive)',
            transform: positive ? 'none' : 'rotate(90deg)',
          }} />
          <span className="text-xs" style={{ color: positive ? '#22c55e' : 'var(--destructive)' }}>{delta}</span>
        </div>
      )}
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function ComponentsSection() {
  return (
    <div>
      <SectionHeader
        title="Components"
        description="Reference implementations using semantic tokens. All interactive states, focus rings, and motion follow the system."
      />

      <GroupLabel>Buttons</GroupLabel>
      <ComponentFrame
        label="variant · size · disabled"
        code={{ usage: BTN_USAGE, source: BTN_SOURCE }}
      >
        <Btn variant="primary">Primary</Btn>
        <Btn variant="secondary">Secondary</Btn>
        <Btn variant="outline">Outline</Btn>
        <Btn variant="ghost">Ghost</Btn>
        <Btn variant="destructive">Destructive</Btn>
        <Btn variant="primary" icon={<MapPin size={14} />}>With icon</Btn>
        <Btn variant="primary" size="sm">Small</Btn>
        <Btn variant="primary" size="lg">Large</Btn>
        <Btn variant="primary" disabled>Disabled</Btn>
      </ComponentFrame>

      <GroupLabel>Badges</GroupLabel>
      <ComponentFrame
        label="variant"
        code={{ usage: BADGE_USAGE, source: BADGE_SOURCE }}
      >
        <Badge variant="default">Default</Badge>
        <Badge variant="brand">Active</Badge>
        <Badge variant="success">Online</Badge>
        <Badge variant="destructive">Alert</Badge>
        <Badge variant="muted">Archived</Badge>
      </ComponentFrame>

      <GroupLabel>Form inputs</GroupLabel>
      <ComponentFrame
        label="input · select · toggle"
        code={{ usage: INPUTS_USAGE, source: INPUTS_SOURCE }}
      >
        <Input placeholder="Search locations…" icon={<Search size={14} />} />
        <Input placeholder="Zone name" />
        <Select />
        <Toggle label="Live data" />
        <Toggle />
      </ComponentFrame>

      <GroupLabel>Alerts</GroupLabel>
      <ComponentFrame
        label="variant"
        code={{ usage: ALERTS_USAGE, source: ALERTS_SOURCE }}
      >
        <div className="w-full space-y-3">
          <Alert variant="info"    title="Data synced"          message="All sensor feeds updated 2 minutes ago." />
          <Alert variant="success" title="Export complete"       message="Trip count report saved to your downloads." />
          <Alert variant="warning" title="Sensor offline"        message="Zone B sensor has been unresponsive for 12 min." />
          <Alert variant="error"   title="Authentication failed" message="Check your API key and try again." />
        </div>
      </ComponentFrame>

      <GroupLabel>Data cards</GroupLabel>
      <ComponentFrame
        label="title · value · delta · unit"
        code={{ usage: CARDS_USAGE, source: CARDS_SOURCE }}
      >
        <DataCard title="Trip count"     value="24,819" delta="+12% vs last week" positive />
        <DataCard title="Avg speed"      value="18.4"   unit="km/h" delta="-2% vs last week" positive={false} />
        <DataCard title="Active zones"   value="47"     delta="+3 this month" positive />
        <DataCard title="Sensors online" value="98%" />
      </ComponentFrame>

      <GroupLabel>Date picker</GroupLabel>
      <ComponentFrame
        label="CustomDatePicker · range · distribution · day-of-week · hour"
        code={{ usage: DATEPICKER_USAGE, source: DATEPICKER_SOURCE }}
        figmaUrl={DATEPICKER_FIGMA}
      >
        <CustomDatePicker onClose={() => {}} onApply={(v) => console.log('Applied:', v)} />
      </ComponentFrame>
    </div>
  )
}
