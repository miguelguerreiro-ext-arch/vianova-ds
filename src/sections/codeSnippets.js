// ─── Buttons ────────────────────────────────────────────────────────────────

export const BTN_USAGE =
`<Btn variant="primary">Primary</Btn>
<Btn variant="secondary">Secondary</Btn>
<Btn variant="outline">Outline</Btn>
<Btn variant="ghost">Ghost</Btn>
<Btn variant="destructive">Destructive</Btn>

{/* Icons — 16px slots, leading and/or trailing */}
<Btn variant="primary" icon={<MapPin />}>Leading</Btn>
<Btn variant="primary" iconRight={<ArrowUpRight />}>Trailing</Btn>
<Btn variant="primary" icon={<MapPin />} iconRight={<ArrowUpRight />}>Both</Btn>

{/* Sizes — md is the Figma "Default" 36px */}
<Btn variant="primary" size="sm">Small</Btn>
<Btn variant="primary" size="md">Default</Btn>
<Btn variant="primary" size="lg">Large</Btn>

<Btn variant="primary" disabled>Disabled</Btn>`

export const BTN_SOURCE =
`function Btn({ variant = 'primary', size = 'md', disabled = false, icon, iconRight, children }) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [pressed, setPressed] = useState(false)

  // Figma "Default" size = 36px. Other sizes are DS extensions.
  const sizes = {
    sm: { height: 32, padding: '6px 12px',  fontSize: '13px', lineHeight: '18px', gap: 6, iconSize: 14 },
    md: { height: 36, padding: '8px 16px',  fontSize: '14px', lineHeight: '20px', gap: 8, iconSize: 16 },
    lg: { height: 44, padding: '10px 20px', fontSize: '15px', lineHeight: '22px', gap: 10, iconSize: 18 },
  }
  const s = sizes[size]

  const variantStyles = (() => {
    if (variant === 'primary') {
      return {
        backgroundColor: 'var(--primary)',
        // Figma hover shifts TEXT color from primary-foreground → secondary (subtle)
        color: hovered && !disabled ? 'var(--secondary)' : 'var(--primary-foreground)',
        border: '1px solid ' + (focused && !disabled ? 'var(--border)' : 'transparent'),
        boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
      }
    }
    if (variant === 'secondary') {
      return {
        backgroundColor: (hovered || pressed || focused) && !disabled
          ? 'var(--accent)' : 'var(--background)',
        color: 'var(--foreground)',
        border: '1px solid ' + (focused && !disabled ? 'var(--ring)' : 'var(--border)'),
        boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
      }
    }
    if (variant === 'outline') {
      return {
        backgroundColor: hovered && !disabled ? 'var(--accent)' : 'var(--background)',
        color: 'var(--foreground)',
        border: '1px solid ' + (focused && !disabled ? 'var(--ring)' : 'var(--border)'),
        boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
      }
    }
    if (variant === 'ghost') {
      return {
        backgroundColor: hovered && !disabled ? 'var(--accent)' : 'transparent',
        color: 'var(--foreground)',
        border: '1px solid ' + (focused && !disabled ? 'var(--ring)' : 'transparent'),
        boxShadow: 'none',
      }
    }
    // destructive — DS extension
    return {
      backgroundColor: pressed && !disabled
        ? 'color-mix(in srgb, var(--destructive), black 18%)'
        : hovered && !disabled
          ? 'color-mix(in srgb, var(--destructive), black 8%)'
          : 'var(--destructive)',
      color: 'var(--destructive-foreground)',
      border: '1px solid ' + (focused && !disabled ? 'var(--border)' : 'transparent'),
      boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
    }
  })()

  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    height: s.height, padding: s.padding, gap: s.gap,
    fontFamily: 'inherit', fontWeight: 500,
    fontSize: s.fontSize, lineHeight: s.lineHeight,
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none', borderRadius: 'var(--radius-md)',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color var(--motion-fast), color var(--motion-fast), border-color var(--motion-fast), box-shadow var(--motion-fast), opacity var(--motion-fast)',
    boxSizing: 'border-box', whiteSpace: 'nowrap',
  }

  // Icon slot — Figma uses 16×16. We size lucide icons via cloneElement.
  const IconSlot = ({ node }) => {
    if (!node) return null
    const sized = isValidElement(node)
      ? cloneElement(node, { size: node.props.size ?? s.iconSize })
      : node
    return (
      <span style={{
        display: 'inline-flex', flexShrink: 0,
        width: s.iconSize, height: s.iconSize,
        alignItems: 'center', justifyContent: 'center',
      }}>{sized}</span>
    )
  }

  return (
    <button
      disabled={disabled}
      style={{ ...base, ...variantStyles }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setHovered(false); setPressed(false) }}
      onMouseDown={() => setPressed(true)}
      onMouseUp={() => setPressed(false)}
      onFocus={(e) => { if (e.target.matches(':focus-visible')) setFocused(true) }}
      onBlur={() => setFocused(false)}
    >
      <IconSlot node={icon} />
      {children}
      <IconSlot node={iconRight} />
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

// ─── Topbar ──────────────────────────────────────────────────────────────────

export const TOPBAR_USAGE =
`<Topbar />`

export const TOPBAR_SOURCE =
`function Topbar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '12px 16px', width: '100%',
      backgroundColor: 'transparent',
    }}>
      {/* Left: back + sidebar (segmented) + map name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', height: 32,
          border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
          overflow: 'hidden', backgroundColor: 'var(--background)',
        }}>
          <button style={{
            width: 32, height: 30, border: 'none', background: 'transparent',
            color: 'var(--muted-foreground)', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <ChevronLeft size={14} />
          </button>
          <button style={{
            width: 32, height: 30, border: 'none', background: 'transparent',
            color: 'var(--muted-foreground)', cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <PanelLeft size={14} />
          </button>
        </div>
        <span style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)' }}>
          Map name 01
        </span>
      </div>

      {/* Centre: layer · search · filter · pointer */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 8,
        flex: 1, justifyContent: 'center',
      }}>
        <ToolBtn icon={<Layers size={14} />} />
        <div style={{ position: 'relative', width: 280 }}>
          <Search size={13} style={{
            position: 'absolute', left: 10, top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--muted-foreground)', pointerEvents: 'none',
          }} />
          <input placeholder="Search for places, POIs" style={{
            width: '100%', padding: '7px 12px 7px 30px', height: 32,
            fontSize: '0.8125rem', fontFamily: 'inherit',
            backgroundColor: 'var(--background)', color: 'var(--foreground)',
            border: '1px solid var(--border)',
            borderRadius: 'var(--radius-sm)', outline: 'none',
            boxSizing: 'border-box',
          }} />
        </div>
        <ToolBtn icon={<SlidersHorizontal size={14} />} />
        <ToolBtn icon={<MousePointer2 size={14} />} dropdown />
      </div>

      {/* Right: export */}
      <div style={{ flexShrink: 0 }}>
        <Btn variant="primary" size="sm" icon={<FileDown size={13} />}>
          Export report
        </Btn>
      </div>
    </div>
  )
}`

// ─── Tool buttons ─────────────────────────────────────────────────────────────

export const TOOLBTN_USAGE =
`<ToolBtn icon={<Layers size={14} />} />
<ToolBtn icon={<SlidersHorizontal size={14} />} dropdown />
<ToolBtn icon={<Layers size={14} />} active />
<ToolBtn icon={<SlidersHorizontal size={14} />} dropdown active />`

export const TOOLBTN_SOURCE =
`function ToolBtn({ icon, dropdown = false, active = false }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', gap: 3,
        padding: '0 8px', height: 32,
        backgroundColor: active || hovered ? 'var(--accent)' : 'transparent',
        color: active ? 'var(--foreground)' : 'var(--muted-foreground)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-sm)', cursor: 'pointer',
        transition: 'background-color var(--motion-fast), color var(--motion-fast)',
      }}
    >
      {icon}
      {dropdown && <ChevronDown size={11} />}
    </button>
  )
}`

// ─── Menu tools ───────────────────────────────────────────────────────────────

export const MENUTOOL_USAGE =
`<MenuTools />`

export const MENUTOOL_SOURCE =
`function MenuTools() {
  const [active, setActive] = useState('Profile')
  const items = [
    { label: 'Profile',  shortcut: '⇧P', Icon: User    },
    { label: 'Freehand', shortcut: 'F',  Icon: Pen     },
    { label: 'Circle',   shortcut: 'C',  Icon: Circle  },
    { label: 'Polygon',  shortcut: 'P',  Icon: Polygon },
  ]

  return (
    <div style={{
      width: 200, backgroundColor: 'var(--popover)',
      border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)', padding: '4px 0',
    }}>
      {items.map(({ label, shortcut, Icon }) => (
        <button key={label} onClick={() => setActive(label)} style={{
          display: 'flex', alignItems: 'center', gap: 8,
          width: '100%', padding: '7px 12px',
          fontSize: '0.875rem', fontFamily: 'inherit',
          backgroundColor: active === label ? 'var(--accent)' : 'transparent',
          color: 'var(--foreground)', border: 'none', cursor: 'pointer',
        }}>
          <Icon size={14} style={{ color: 'var(--muted-foreground)' }} />
          <span style={{ flex: 1 }}>{label}</span>
          <kbd style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>{shortcut}</kbd>
        </button>
      ))}
    </div>
  )
}`

// ─── Menu item ────────────────────────────────────────────────────────────────

export const MENUITEM_USAGE =
`<MenuItem label="Profile" shortcut="⇧⌘P" checked />
<MenuItem label="Profile" shortcut="⇧⌘P" />
<MenuItem label="Profile" shortcut="⇧⌘P" />
<MenuItem label="Profile" shortcut="⇧⌘P" disabled />`

export const MENUITEM_SOURCE =
`function MenuItem({ label, shortcut, checked = false, disabled = false }) {
  const [hovered, setHovered] = useState(false)
  return (
    <div
      role="menuitem"
      aria-checked={checked}
      aria-disabled={disabled}
      onMouseEnter={() => !disabled && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 8,
        padding: '0 12px', height: 32, minWidth: 200,
        backgroundColor: hovered && !disabled ? 'var(--accent)' : 'transparent',
        opacity: disabled ? 0.4 : 1,
        cursor: disabled ? 'not-allowed' : 'pointer',
        borderRadius: 'var(--radius-sm)',
        transition: 'background-color var(--motion-fast)',
        userSelect: 'none',
      }}
    >
      <Check size={12} style={{
        color: 'var(--primary)', flexShrink: 0,
        opacity: checked ? 1 : 0,
        transition: 'opacity var(--motion-fast)',
      }} />
      <span style={{ flex: 1, fontSize: '0.875rem', color: 'var(--foreground)' }}>{label}</span>
      <kbd style={{ fontSize: '0.7rem', color: 'var(--muted-foreground)', fontWeight: 500 }}>{shortcut}</kbd>
    </div>
  )
}`


// ─── Data panel ──────────────────────────────────────────────────────────────

export const DATAPANEL_USAGE =
`<DataPanel />`

export const DATAPANEL_SOURCE =
`// 1:1 port of VIP-DS data-panel (Figma node 86:1426).
// Width 380, padding 8, border + 12px radius, transparent bg.
// Composed of: TabSelector · IconButton · DataLayer.

function DataPanel() {
  const [tab, setTab] = useState("Data")
  return (
    <div style={{
      display: "flex", flexDirection: "column", width: 380,
      maxHeight: 900, padding: 8,
      backgroundColor: "transparent",
      border: "1px solid var(--border)",
      borderRadius: 12,
      boxShadow: "0 1px 2px -1px rgba(0,0,0,0.1), 0 1px 3px 0 rgba(0,0,0,0.1)",
      overflow: "hidden", boxSizing: "border-box",
    }}>
      <div style={{
        position: "sticky", top: 0, width: "100%",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        <TabSelector tabs={["Data", "Zones"]} active={tab} onChange={setTab} />
        <IconButton bordered icon={<Box size={16} />} ariaLabel="3D view" />
      </div>

      <div style={{ width: "100%" }}>
        {/* Search — 48px tall, gap 10 */}
        <div style={{ display: "flex", alignItems: "center", height: 48, gap: 10, padding: "0 12px" }}>
          <Search size={16} style={{ color: "var(--muted-foreground)" }} />
          <input placeholder="Search data" style={{
            flex: 1, border: "none", outline: "none", background: "transparent",
            fontSize: 14, fontWeight: 500, color: "var(--foreground)",
          }} />
        </div>

        {/* Layers — gap 8 */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8, width: "100%" }}>
          <DataLayer label="Layer label" />
          <DataLayer label="Layer label" />
          <DataLayer label="Layer label" />
        </div>
      </div>
    </div>
  )
}

function DataLayer({ label }) {
  const [visible, setVisible] = useState(true)
  return (
    <div style={{
      display: "flex", flexDirection: "column", width: "100%",
      backgroundColor: "var(--muted)",
      border: "1px solid var(--border)",
      borderRadius: "var(--radius-md)", overflow: "hidden",
    }}>
      <div style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        width: "100%", padding: "4px 6px",
      }}>
        <p style={{
          flex: 1, margin: 0, padding: "7px 6px 8px 6px",
          fontSize: 14, fontWeight: 500, color: "var(--muted-foreground)",
        }}>{label}</p>
        <IconButton
          icon={visible ? <Eye size={16} /> : <EyeOff size={16} />}
          ariaLabel={visible ? "Hide" : "Show"}
        />
      </div>
    </div>
  )
}

function TabSelector({ tabs, active, onChange }) {
  return (
    <div style={{
      display: "inline-flex", padding: 2,
      backgroundColor: "var(--background)", borderRadius: "var(--radius-md)",
    }}>
      {tabs.map(t => (
        <button key={t} onClick={() => onChange(t)} style={{
          height: 28, padding: "4px 12px", border: "none",
          backgroundColor: t === active ? "var(--muted)" : "transparent",
          color: "var(--foreground)",
          borderRadius: "var(--radius-sm)", cursor: "pointer",
          fontSize: 14, fontWeight: 500,
        }}>{t}</button>
      ))}
    </div>
  )
}

function IconButton({ icon, bordered = false, ariaLabel }) {
  return (
    <button aria-label={ariaLabel} style={{
      width: 32, height: 32, padding: "8px 16px",
      display: "inline-flex", alignItems: "center", justifyContent: "center",
      borderRadius: "var(--radius-md)",
      border: bordered ? "1px solid var(--border)" : "1px solid transparent",
      backgroundColor: bordered ? "var(--background)" : "transparent",
      cursor: "pointer", boxSizing: "border-box",
    }}>{icon}</button>
  )
}`
