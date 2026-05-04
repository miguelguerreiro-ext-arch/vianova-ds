// ─── Buttons ────────────────────────────────────────────────────────────────

export const BTN_USAGE =
`<Btn variant="primary">Primary</Btn>
<Btn variant="secondary">Secondary</Btn>
<Btn variant="outline">Outline</Btn>
<Btn variant="ghost">Ghost</Btn>
<Btn variant="destructive">Destructive</Btn>
<Btn variant="primary" icon={<MapPin size={14} />}>With icon</Btn>
<Btn variant="primary" size="sm">Small</Btn>
<Btn variant="primary" size="lg">Large</Btn>
<Btn variant="primary" disabled>Disabled</Btn>`

export const BTN_SOURCE =
`function Btn({ variant = 'primary', size = 'md', disabled = false, icon, children }) {
  const [hovered, setHovered] = useState(false)

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '6px',
    fontFamily: 'inherit',
    fontWeight: 500,
    cursor: disabled ? 'not-allowed' : 'pointer',
    border: 'none',
    outline: 'none',
    opacity: disabled ? 0.5 : 1,
    borderRadius: 'var(--radius-md)',
    transition: 'background-color var(--motion-fast) var(--ease-default), opacity var(--motion-fast)',
  }

  const sizes = {
    sm: { padding: '4px 10px',  fontSize: '0.75rem' },
    md: { padding: '8px 16px',  fontSize: '0.875rem' },
    lg: { padding: '10px 20px', fontSize: '1rem' },
  }

  const variants = {
    primary:     { backgroundColor: hovered && !disabled ? 'rgba(20,183,165,0.9)' : 'var(--primary)',     color: 'var(--primary-foreground)' },
    secondary:   { backgroundColor: hovered && !disabled ? 'var(--accent)'         : 'var(--secondary)',   color: 'var(--secondary-foreground)' },
    ghost:       { backgroundColor: hovered && !disabled ? 'var(--accent)'         : 'transparent',       color: 'var(--foreground)' },
    destructive: { backgroundColor: hovered && !disabled ? 'rgba(239,68,68,0.85)'  : 'var(--destructive)', color: 'var(--destructive-foreground)' },
    outline:     { backgroundColor: hovered && !disabled ? 'var(--accent)'         : 'transparent',       color: 'var(--foreground)', border: '1px solid var(--border)' },
  }

  return (
    <button
      disabled={disabled}
      style={{ ...base, ...sizes[size], ...variants[variant] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {icon && <span>{icon}</span>}
      {children}
    </button>
  )
}`

// ─── Badges ─────────────────────────────────────────────────────────────────

export const BADGE_USAGE =
`<Badge variant="default">Default</Badge>
<Badge variant="brand">Active</Badge>
<Badge variant="success">Online</Badge>
<Badge variant="destructive">Alert</Badge>
<Badge variant="muted">Archived</Badge>`

export const BADGE_SOURCE =
`function Badge({ variant = 'default', children }) {
  const variants = {
    default:     { backgroundColor: 'var(--secondary)',          color: 'var(--secondary-foreground)' },
    brand:       { backgroundColor: 'rgba(20,183,165,0.15)',     color: 'var(--primary)' },
    destructive: { backgroundColor: 'rgba(239,68,68,0.12)',      color: 'var(--destructive)' },
    success:     { backgroundColor: 'rgba(34,197,94,0.12)',      color: '#16a34a' },
    muted:       { backgroundColor: 'var(--muted)',              color: 'var(--muted-foreground)' },
  }

  return (
    <span
      style={{
        ...variants[variant],
        display: 'inline-flex',
        alignItems: 'center',
        padding: '2px 8px',
        borderRadius: 'var(--radius-full)',
        fontSize: '0.75rem',
        fontWeight: 500,
        lineHeight: 1.6,
      }}
    >
      {children}
    </span>
  )
}`

// ─── Form inputs ─────────────────────────────────────────────────────────────

export const INPUTS_USAGE =
`<Input placeholder="Search locations…" icon={<Search size={14} />} />
<Input placeholder="Zone name" />
<Select />
<Toggle label="Live data" />
<Toggle />`

export const INPUTS_SOURCE =
`function Input({ placeholder, icon, type = 'text' }) {
  const [focused, setFocused] = useState(false)
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      {icon && (
        <span style={{ position: 'absolute', left: 10, color: 'var(--muted-foreground)', pointerEvents: 'none' }}>
          {icon}
        </span>
      )}
      <input
        type={type}
        placeholder={placeholder}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        style={{
          padding: '8px 12px 8px ' + (icon ? '34px' : '12px'),
          fontSize: '0.875rem',
          fontFamily: 'inherit',
          backgroundColor: 'var(--background)',
          color: 'var(--foreground)',
          border: '1px solid ' + (focused ? 'var(--primary)' : 'var(--input)'),
          borderRadius: 'var(--radius-sm)',
          outline: 'none',
          boxShadow: focused ? '0 0 0 2px rgba(20,183,165,0.2)' : 'none',
          width: '220px',
        }}
      />
    </div>
  )
}

function Select() {
  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      <select style={{ appearance: 'none', padding: '8px 32px 8px 12px', fontSize: '0.875rem',
        fontFamily: 'inherit', backgroundColor: 'var(--background)', color: 'var(--foreground)',
        border: '1px solid var(--input)', borderRadius: 'var(--radius-sm)', outline: 'none', width: '180px' }}>
        <option>All zones</option>
        <option>Central district</option>
        <option>Waterfront</option>
        <option>North ring</option>
      </select>
      <ChevronDown size={14} style={{ position: 'absolute', right: 10, color: 'var(--muted-foreground)', pointerEvents: 'none' }} />
    </div>
  )
}

function Toggle({ label }) {
  const [on, setOn] = useState(false)
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <button
        role="switch"
        aria-checked={on}
        onClick={() => setOn(v => !v)}
        style={{
          width: 36, height: 20,
          borderRadius: 'var(--radius-full)',
          backgroundColor: on ? 'var(--primary)' : 'var(--muted-foreground)',
          border: 'none', cursor: 'pointer', position: 'relative',
          transition: 'background-color var(--motion-fast) var(--ease-default)',
        }}
      >
        <span style={{
          position: 'absolute', top: 2, left: on ? 18 : 2,
          width: 16, height: 16, borderRadius: '50%', backgroundColor: '#fff',
          transition: 'left var(--motion-fast) var(--ease-default)',
        }} />
      </button>
      {label && <span style={{ fontSize: '0.875rem', color: 'var(--foreground)' }}>{label}</span>}
    </div>
  )
}`

// ─── Alerts ──────────────────────────────────────────────────────────────────

export const ALERTS_USAGE =
`<Alert variant="info"    title="Data synced"          message="All sensor feeds updated 2 minutes ago." />
<Alert variant="success" title="Export complete"       message="Trip count report saved to your downloads." />
<Alert variant="warning" title="Sensor offline"        message="Zone B sensor has been unresponsive for 12 min." />
<Alert variant="error"   title="Authentication failed" message="Check your API key and try again." />`

export const ALERTS_SOURCE =
`function Alert({ variant = 'info', title, message }) {
  const variants = {
    info:    { color: 'var(--primary)',    bg: 'rgba(20,183,165,0.08)',  Icon: Info },
    warning: { color: '#f59e0b',           bg: 'rgba(245,158,11,0.08)',  Icon: AlertCircle },
    success: { color: '#22c55e',           bg: 'rgba(34,197,94,0.08)',   Icon: CheckCircle2 },
    error:   { color: 'var(--destructive)', bg: 'rgba(239,68,68,0.08)', Icon: AlertCircle },
  }
  const v = variants[variant]

  return (
    <div style={{ display: 'flex', gap: 12, padding: 16,
      backgroundColor: v.bg, borderRadius: 'var(--radius-md)',
      border: '1px solid ' + v.color + '22' }}>
      <v.Icon size={16} style={{ color: v.color, flexShrink: 0, marginTop: 1 }} />
      <div>
        {title && <p style={{ margin: '0 0 2px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}>{title}</p>}
        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--muted-foreground)' }}>{message}</p>
      </div>
    </div>
  )
}`

// ─── Data cards ───────────────────────────────────────────────────────────────

export const CARDS_USAGE =
`<DataCard title="Trip count"    value="24,819" delta="+12% vs last week" positive />
<DataCard title="Avg speed"     value="18.4"   unit="km/h" delta="-2% vs last week" positive={false} />
<DataCard title="Active zones"  value="47"     delta="+3 this month" positive />
<DataCard title="Sensors online" value="98%" />`

export const CARDS_SOURCE =
`function DataCard({ title, value, delta, unit, positive }) {
  return (
    <div style={{ padding: 20, border: '1px solid var(--border)',
      borderRadius: 'var(--radius-xl)', backgroundColor: 'var(--card)', minWidth: 180 }}>
      <p style={{ margin: '0 0 8px', fontSize: '0.625rem', fontWeight: 500,
        textTransform: 'uppercase', letterSpacing: '0.08em', color: 'var(--muted-foreground)' }}>
        {title}
      </p>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 6 }}>
        <span style={{ fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.1, color: 'var(--foreground)' }}>{value}</span>
        {unit && <span style={{ fontSize: '0.875rem', marginBottom: 2, color: 'var(--muted-foreground)' }}>{unit}</span>}
      </div>
      {delta && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginTop: 8 }}>
          <ArrowUpRight size={12} style={{ color: positive ? '#22c55e' : 'var(--destructive)',
            transform: positive ? 'none' : 'rotate(90deg)' }} />
          <span style={{ fontSize: '0.75rem', color: positive ? '#22c55e' : 'var(--destructive)' }}>{delta}</span>
        </div>
      )}
    </div>
  )
}`

// ─── Date picker ─────────────────────────────────────────────────────────────

export const DATEPICKER_USAGE =
`<CustomDatePicker
  onClose={() => {}}
  onApply={(value) => {
    console.log('Applied:', value)
    // value: {
    //   dateFrom: Date,
    //   dateTo:   Date,
    //   interval: 'day' | 'week' | 'month',
    //   days:     string[],   // e.g. ['Mo','Tu','Fr']
    //   hourFrom: string,     // e.g. '09:00 AM'
    //   hourTo:   string,     // e.g. '05:00 PM'
    // }
  }}
/>`

export const DATEPICKER_SOURCE = '// Source lives in src/components/CustomDatePicker.jsx\n// ~570 lines — open the file directly for the full implementation.'
