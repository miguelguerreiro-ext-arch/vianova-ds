import { useState, isValidElement, cloneElement } from 'react'
import { AlertCircle, CheckCircle2, Info, Search, ChevronDown, MapPin, ArrowUpRight,
  ChevronLeft, Layers, SlidersHorizontal, FileDown, Pen, Check, User,
  PanelLeft, MousePointer2, Plus, Eye, EyeOff,
  MoreHorizontal, BarChart3, ListFilter, Calendar } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'
import CustomDatePicker from '../components/CustomDatePicker'
import {
  BTN_USAGE, BTN_SOURCE,
  BADGE_USAGE, BADGE_SOURCE,
  INPUTS_USAGE, INPUTS_SOURCE,
  ALERTS_USAGE, ALERTS_SOURCE,
  CARDS_USAGE, CARDS_SOURCE,
  DATEPICKER_USAGE, DATEPICKER_SOURCE,
  TOPBAR_USAGE, TOPBAR_SOURCE,
  TOOLBTN_USAGE, TOOLBTN_SOURCE,
  MENUTOOL_USAGE, MENUTOOL_SOURCE,
  MENUITEM_USAGE, MENUITEM_SOURCE,
  DATAPANEL_USAGE, DATAPANEL_SOURCE,
} from './codeSnippets'

const DATEPICKER_FIGMA =
  'https://www.figma.com/embed?embed_host=share&url=https://www.figma.com/design/YZFAMAbSiLQw6ARLwhNnIk/Vianova-DS-%E2%80%93-Custom-Date-Picker?node-id=17-2'

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
// 1:1 port of VIP-DS button (Figma node 20:14984).
// Token map: action/primary→--primary, action/primary-foreground→--primary-foreground,
// action/secondary→--secondary (used as primary hover text color), surface/background→--background,
// surface/accent→--accent, text/foreground→--foreground, border/border→--border,
// border/ring→--ring, button/radius→--radius-md (6px), shadow-sm→--shadow-sm.
function Btn({ variant = 'primary', size = 'md', disabled = false, icon, iconRight, children }) {
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [pressed, setPressed] = useState(false)

  // Figma "Default" size = 36px. sm/lg are DS extensions sharing the same proportions.
  const sizes = {
    sm: { height: 32, padding: '6px 12px',  fontSize: '13px', lineHeight: '18px', gap: 6, iconSize: 14 },
    md: { height: 36, padding: '8px 16px',  fontSize: '14px', lineHeight: '20px', gap: 8, iconSize: 16 },
    lg: { height: 44, padding: '10px 20px', fontSize: '15px', lineHeight: '22px', gap: 10, iconSize: 18 },
  }
  const s = sizes[size]

  // State resolution per Figma spec.
  const variantStyles = (() => {
    if (variant === 'primary') {
      return {
        backgroundColor: 'var(--primary)',
        // Figma hover only shifts the TEXT color from primary-foreground (#fafafa)
        // to secondary (#e4e4e7). The bg stays the same.
        color: hovered && !disabled ? 'var(--secondary)' : 'var(--primary-foreground)',
        // Focus-visible adds a 1px border of --border (per Figma 20:14993).
        border: `1px solid ${focused && !disabled ? 'var(--border)' : 'transparent'}`,
        boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
      }
    }
    if (variant === 'secondary') {
      return {
        // default: --background; hover/active/focus: --accent
        backgroundColor: (hovered || pressed) && !disabled ? 'var(--accent)'
          : focused && !disabled ? 'var(--accent)'
          : 'var(--background)',
        color: 'var(--foreground)',
        // default/hover: --border; focus-visible: --ring (dark)
        border: `1px solid ${focused && !disabled ? 'var(--ring)' : 'var(--border)'}`,
        boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
      }
    }
    if (variant === 'outline') {
      return {
        backgroundColor: hovered && !disabled ? 'var(--accent)' : 'var(--background)',
        color: 'var(--foreground)',
        border: `1px solid ${focused && !disabled ? 'var(--ring)' : 'var(--border)'}`,
        boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
      }
    }
    if (variant === 'ghost') {
      return {
        backgroundColor: hovered && !disabled ? 'var(--accent)' : 'transparent',
        color: 'var(--foreground)',
        border: `1px solid ${focused && !disabled ? 'var(--ring)' : 'transparent'}`,
        boxShadow: 'none',
      }
    }
    // destructive — DS extension, mirrors primary semantics with destructive token
    return {
      backgroundColor: pressed && !disabled
        ? 'color-mix(in srgb, var(--destructive), black 18%)'
        : hovered && !disabled
          ? 'color-mix(in srgb, var(--destructive), black 8%)'
          : 'var(--destructive)',
      color: 'var(--destructive-foreground)',
      border: `1px solid ${focused && !disabled ? 'var(--border)' : 'transparent'}`,
      boxShadow: disabled ? 'none' : 'var(--shadow-sm)',
    }
  })()

  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    height: s.height, padding: s.padding, gap: s.gap,
    fontFamily: 'inherit', fontWeight: 500, fontSize: s.fontSize, lineHeight: s.lineHeight,
    cursor: disabled ? 'not-allowed' : 'pointer',
    outline: 'none', borderRadius: 'var(--radius-md)',
    opacity: disabled ? 0.5 : 1,
    transition: 'background-color var(--motion-fast) var(--ease-default), color var(--motion-fast), border-color var(--motion-fast), box-shadow var(--motion-fast), opacity var(--motion-fast)',
    boxSizing: 'border-box', whiteSpace: 'nowrap',
  }

  // Icon slot — Figma uses 16×16. We clone the passed lucide icon to set size.
  const IconSlot = ({ node }) => {
    if (!node) return null
    const sized = isValidElement(node)
      ? cloneElement(node, { size: node.props.size ?? s.iconSize })
      : node
    return (
      <span style={{ display: 'inline-flex', flexShrink: 0, width: s.iconSize, height: s.iconSize, alignItems: 'center', justifyContent: 'center' }}>
        {sized}
      </span>
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

// ── ToolBtn ───────────────────────────────────────────────────────────────────
function ToolBtn({ icon, dropdown = false, active = false }) {
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
        fontFamily: 'inherit',
      }}
    >
      {icon}
      {dropdown && <ChevronDown size={11} />}
    </button>
  )
}

// ── Topbar ────────────────────────────────────────────────────────────────────
function Topbar() {
  return (
    <div style={{
      display: 'flex', alignItems: 'center', gap: 16,
      padding: '12px 16px', width: '100%',
      backgroundColor: 'transparent',
    }}>
      {/* Left: back + sidebar + map name */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexShrink: 0 }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', height: 32,
          border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
          overflow: 'hidden',
          backgroundColor: 'var(--background)',
        }}>
          <button style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 30, border: 'none', background: 'transparent',
            color: 'var(--muted-foreground)', cursor: 'pointer',
          }}>
            <ChevronLeft size={14} />
          </button>
          <button style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 32, height: 30, border: 'none', background: 'transparent',
            color: 'var(--muted-foreground)', cursor: 'pointer',
          }}>
            <PanelLeft size={14} />
          </button>
        </div>
        <span style={{
          fontSize: '0.875rem', fontWeight: 500, color: 'var(--foreground)',
          whiteSpace: 'nowrap',
        }}>
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
            position: 'absolute', left: 10, top: '50%', transform: 'translateY(-50%)',
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
        <Btn variant="primary" size="sm" icon={<FileDown size={13} />}>Export report</Btn>
      </div>
    </div>
  )
}

// ── MenuTools ─────────────────────────────────────────────────────────────────
function MenuTools() {
  const [active, setActive] = useState('Profile')
  const CircleIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="9" />
    </svg>
  )
  const PolygonIcon = ({ size }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 3 20 9 17 19 7 19 4 9" />
    </svg>
  )
  const items = [
    { label: 'Profile',  shortcut: '⇧P', Icon: User        },
    { label: 'Freehand', shortcut: 'F',  Icon: Pen         },
    { label: 'Circle',   shortcut: 'C',  Icon: CircleIcon  },
    { label: 'Polygon',  shortcut: 'P',  Icon: PolygonIcon },
  ]

  return (
    <div style={{
      width: 200, backgroundColor: 'var(--popover)',
      border: '1px solid var(--border)', borderRadius: 'var(--radius-md)',
      boxShadow: 'var(--shadow-lg)', overflow: 'hidden', padding: '4px 0',
    }}>
      {items.map(({ label, shortcut, Icon }) => (
        <button
          key={label}
          onClick={() => setActive(label)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            width: '100%', padding: '7px 12px',
            fontSize: '0.875rem', fontFamily: 'inherit', textAlign: 'left',
            backgroundColor: active === label ? 'var(--accent)' : 'transparent',
            color: 'var(--foreground)', border: 'none', cursor: 'pointer',
          }}
        >
          <Icon size={14} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
          <span style={{ flex: 1 }}>{label}</span>
          <kbd style={{
            fontSize: '0.7rem', color: 'var(--muted-foreground)',
            fontFamily: 'inherit', fontWeight: 500,
          }}>{shortcut}</kbd>
        </button>
      ))}
    </div>
  )
}

// ── MenuItem ──────────────────────────────────────────────────────────────────
function MenuItem({ label = 'Profile', shortcut = '⇧⌘P', checked = false, disabled = false }) {
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
      <kbd style={{
        fontSize: '0.7rem', color: 'var(--muted-foreground)',
        fontFamily: 'inherit', fontWeight: 500,
      }}>{shortcut}</kbd>
    </div>
  )
}

// ── DataPanel ─────────────────────────────────────────────────────────────────
// 1:1 port of VIP-DS data-panel (Figma node 86:1426).
// Token map: surface/background→--background, surface/muted→--muted,
// text/foreground→--foreground, text/muted-foreground→--muted-foreground,
// border/border→--border, radius/rounded-sm (4)→--radius-sm,
// radius/rounded-md (6)→--radius-md, radius/xl (12)→12px literal.

function IconButton({ icon, bordered = false, ariaLabel, onClick }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button
      aria-label={ariaLabel}
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 32, height: 32, padding: 0,
        borderRadius: 'var(--radius-md)',
        border: bordered ? '1px solid var(--border)' : '1px solid transparent',
        backgroundColor: bordered
          ? (hovered ? 'var(--accent)' : 'var(--background)')
          : (hovered ? 'var(--accent)' : 'transparent'),
        color: 'var(--foreground)', cursor: 'pointer',
        transition: 'background-color var(--motion-fast)',
        boxSizing: 'border-box', flexShrink: 0,
      }}
    >
      {icon}
    </button>
  )
}

function TabSelector({ tabs, active, onChange }) {
  return (
    <div style={{
      // Figma: container bg = surface/muted-40 (#f4f4f5), active tab = surface/accent (#fafafa)
      display: 'inline-flex', alignItems: 'flex-start', padding: 2,
      backgroundColor: 'var(--muted)', borderRadius: 'var(--radius-md)',
    }}>
      {tabs.map(t => {
        const isActive = t === active
        return (
          <button
            key={t}
            onClick={() => onChange(t)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              gap: 6, height: 28, padding: '4px 12px',
              backgroundColor: isActive ? 'var(--background)' : 'transparent',
              color: 'var(--foreground)',
              border: 'none', borderRadius: 'var(--radius-sm)',
              fontFamily: 'inherit', fontSize: 14, fontWeight: 500, lineHeight: 'normal',
              cursor: 'pointer', whiteSpace: 'nowrap',
              transition: 'background-color var(--motion-fast)',
            }}
          >
            {t}
          </button>
        )
      })}
    </div>
  )
}

// ── Visualization tab strip (Figma 165:29837) ────────────────────────────────
// Container: 348w × 36h, padding 4, radius 6, bg --surface/muted-40
// Tab: 48w × 28h, radius 4 (--radius/sm). Three states:
//   default  — no bg, full-color icon
//   selected — bg --surface/accent (#fafafa) + drop-shadow(0 1 1 rgba 0,0,0,.05)
//   disabled — opacity 0.3, no bg
// Icons are hand-authored inline SVGs matching the Figma bespoke art.

// 24×16 viewBox — fits inside 28w × ~19h Figma icon area.
const VizIconPoints = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="currentColor" aria-hidden="true">
    <circle cx="8" cy="4"  r="1.4" />
    <circle cx="12" cy="3" r="0.9" />
    <circle cx="14" cy="6" r="1.6" />
    <circle cx="10" cy="7" r="1.1" />
    <circle cx="7"  cy="9" r="1.3" />
    <circle cx="11" cy="11" r="1.5" />
    <circle cx="15" cy="10" r="0.9" />
    <circle cx="13" cy="13" r="1.1" />
    <circle cx="17" cy="8"  r="1.1" />
    <circle cx="5"  cy="12" r="1.0" />
    <circle cx="9"  cy="13" r="0.8" />
  </svg>
)
const VizIconClusters = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="currentColor" aria-hidden="true">
    <circle cx="7"  cy="9" r="3.6" />
    <circle cx="13" cy="6" r="2.8" opacity="0.55" />
    <circle cx="16" cy="11" r="2" opacity="0.8" />
    <circle cx="11" cy="11" r="1.4" opacity="0.7" />
  </svg>
)
// Honeycomb grid — 7 hexagons (1 + 6)
const VizIconGrid = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden="true">
    {[[12,8],[6,8],[18,8],[9,3],[15,3],[9,13],[15,13]].map(([cx,cy], i) => (
      <polygon key={i} points={`${cx-2.6},${cy-1.5} ${cx},${cy-3} ${cx+2.6},${cy-1.5} ${cx+2.6},${cy+1.5} ${cx},${cy+3} ${cx-2.6},${cy+1.5}`} />
    ))}
  </svg>
)
// Heatmap — 3 overlapping radial blobs
const VizIconHeatmap = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden="true">
    <defs>
      <radialGradient id="hm1" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="currentColor" stopOpacity="0.9" />
        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="9"  cy="8" r="7" fill="url(#hm1)" />
    <circle cx="15" cy="6" r="5" fill="url(#hm1)" />
    <circle cx="16" cy="11" r="3.5" fill="url(#hm1)" />
  </svg>
)
// Lines — abstract criss-cross segments
const VizIconLines = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" aria-hidden="true">
    <path d="M3 13 L9 4" />
    <path d="M6 12 L15 6" />
    <path d="M10 14 L20 8" />
    <path d="M5 3 L17 13" />
    <path d="M14 4 L21 11" />
  </svg>
)
// Zones — irregular closed polygon
const VizIconZones = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinejoin="round" aria-hidden="true">
    <polygon points="4,5 8,2 14,3 19,6 21,10 17,14 11,14 5,12 3,9" />
  </svg>
)
// Trips — node + connector network
const VizIconTrips = () => (
  <svg width="24" height="16" viewBox="0 0 24 16" aria-hidden="true">
    <g fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <line x1="5" y1="12" x2="11" y2="8" />
      <line x1="11" y1="8" x2="17" y2="11" />
      <line x1="11" y1="8" x2="14" y2="3" />
      <line x1="17" y1="11" x2="20" y2="6" />
    </g>
    <g fill="currentColor">
      <circle cx="5"  cy="12" r="1.5" />
      <circle cx="11" cy="8"  r="2.2" />
      <circle cx="17" cy="11" r="1.5" />
      <circle cx="14" cy="3"  r="1.4" />
      <circle cx="20" cy="6"  r="1.2" />
    </g>
  </svg>
)

const VIZ_TYPES = [
  { key: 'points',   Icon: VizIconPoints },
  { key: 'clusters', Icon: VizIconClusters },
  { key: 'grid',     Icon: VizIconGrid },
  { key: 'heatmap',  Icon: VizIconHeatmap },
  { key: 'lines',    Icon: VizIconLines },
  { key: 'zones',    Icon: VizIconZones },
  { key: 'trips',    Icon: VizIconTrips },
]

function VizTab({ type, state = 'default', onClick }) {
  const Icon = VIZ_TYPES.find(v => v.key === type)?.Icon ?? VizIconPoints
  const isSelected = state === 'selected'
  const isDisabled = state === 'disabled'
  return (
    <button
      onClick={isDisabled ? undefined : onClick}
      aria-label={type}
      aria-pressed={isSelected}
      aria-disabled={isDisabled}
      disabled={isDisabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
        width: 48, height: 28, padding: '4px 12px',
        border: 'none', cursor: isDisabled ? 'not-allowed' : 'pointer', flexShrink: 0,
        borderRadius: 'var(--radius-sm)',
        backgroundColor: isSelected ? 'var(--background)' : 'transparent',
        color: 'var(--foreground)',
        opacity: isDisabled ? 0.3 : 1,
        boxShadow: isSelected ? '0 1px 1px rgba(0,0,0,0.05)' : 'none',
        transition: 'background-color var(--motion-fast), box-shadow var(--motion-fast), opacity var(--motion-fast)',
        boxSizing: 'border-box',
      }}
    >
      <Icon />
    </button>
  )
}

function TabVisualization({ active = 'points', onChange, disabled = [] }) {
  const disabledSet = new Set(disabled)
  return (
    <div style={{
      display: 'flex', alignItems: 'flex-start', padding: 4,
      backgroundColor: 'var(--muted)', borderRadius: 'var(--radius-md)',
      width: 348, height: 36, boxSizing: 'border-box',
    }}>
      {VIZ_TYPES.map(({ key }) => {
        let state = 'default'
        if (disabledSet.has(key)) state = 'disabled'
        else if (key === active) state = 'selected'
        return (
          <VizTab
            key={key}
            type={key}
            state={state}
            onClick={() => onChange?.(key)}
          />
        )
      })}
    </div>
  )
}

// ── Collapsible section row (used by Visualization & Filters) ────────────────
function CollapsibleRow({ open, onToggle, label, badge, action, children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 6,
        height: 40, padding: '7px 0 8px 0', overflow: 'hidden',
      }}>
        <button
          onClick={onToggle}
          aria-expanded={open}
          aria-label={`${open ? 'Collapse' : 'Expand'} ${label}`}
          style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: 16, height: 16, padding: 0,
            border: 'none', background: 'transparent', cursor: 'pointer',
            color: 'var(--foreground)', flexShrink: 0,
          }}
        >
          <ChevronDown size={16} style={{
            transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
            transition: 'transform var(--motion-fast)',
          }} />
        </button>
        <div style={{ display: 'flex', flex: '1 0 0', alignItems: 'center', gap: 6, minWidth: 0 }}>
          <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)', whiteSpace: 'nowrap' }}>
            {label}
          </span>
          {badge != null && (
            <span style={{
              display: 'inline-flex', alignItems: 'flex-start',
              padding: '2px 10px', backgroundColor: 'var(--secondary)',
              color: 'var(--foreground)',
              fontSize: 12, fontWeight: 600, lineHeight: '16px',
              borderRadius: 9999, whiteSpace: 'nowrap',
            }}>{badge}</span>
          )}
        </div>
        {action}
      </div>
      {open && children}
    </div>
  )
}

// ── Filter row (60h: title 24h + select 24h) ─────────────────────────────────
function FilterRow({ icon = <Calendar size={16} />, name = 'Filter name', value = '3/8/2026 - 3/15/2026' }) {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      width: '100%', height: 60, padding: '6px 10px',
      borderRadius: 'var(--radius-md)', boxSizing: 'border-box',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, height: 24, width: '100%' }}>
        <span style={{ display: 'inline-flex', width: 16, height: 16, flexShrink: 0, color: 'var(--foreground)' }}>
          {icon}
        </span>
        <span style={{ flex: 1, minWidth: 0, fontSize: 14, fontWeight: 500, color: 'var(--foreground)', whiteSpace: 'nowrap' }}>
          {name}
        </span>
      </div>
      <div style={{
        display: 'flex', alignItems: 'center', width: '100%', height: 24,
        padding: '4px 0', overflow: 'hidden',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 1px 1px rgba(0,0,0,0.05)',
      }}>
        <span style={{
          flex: 1, minWidth: 0, fontSize: 14, fontWeight: 500,
          color: 'var(--muted-foreground)', whiteSpace: 'nowrap',
        }}>{value}</span>
      </div>
    </div>
  )
}

// ── DataLayer (Figma node 99:1848) ───────────────────────────────────────────
// visible=false: collapsed row, bg --muted, label muted-foreground, eye-off icon
// visible=true : expanded card, bg --background, label foreground, 3 actions (... / chart / eye)
//                + body: legend, visualization picker, filters list
function DataLayer({
  label = 'Layer label',
  defaultVisible = false,
  dateRange = 'January 1st, 2019 - December 31st, 2024',
  legendDot = '#3b81f5',
  legendValue = 'All values',
  viz = 'points',
  filterCount = 3,
}) {
  const [visible, setVisible] = useState(defaultVisible)
  const [vizOpen, setVizOpen] = useState(true)
  const [filtersOpen, setFiltersOpen] = useState(true)
  const [activeViz, setActiveViz] = useState(viz)

  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'center',
      width: '100%', maxHeight: 988,
      backgroundColor: visible ? 'var(--background)' : 'var(--muted)',
      border: '1px solid var(--border)',
      borderRadius: 'var(--radius-md)',
      overflow: 'hidden',
      transition: 'background-color var(--motion-fast)',
    }}>
      {/* Header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        width: '100%', padding: '4px 6px',
      }}>
        <div style={{
          display: 'flex', flex: '1 0 0', alignItems: 'center', minWidth: 0,
          padding: '7px 6px 8px 6px', borderRadius: 'var(--radius-md)',
        }}>
          <p style={{
            margin: 0, fontFamily: 'inherit',
            fontSize: 14, fontWeight: 500, lineHeight: 'normal',
            color: visible ? 'var(--foreground)' : 'var(--muted-foreground)',
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            width: '100%',
          }}>{label}</p>
        </div>
        {visible ? (
          <div style={{ display: 'inline-flex', alignItems: 'center' }}>
            <IconButton icon={<MoreHorizontal size={16} />} ariaLabel="More" />
            <IconButton icon={<BarChart3 size={16} />} ariaLabel="Chart" />
            <IconButton
              icon={<Eye size={16} />}
              ariaLabel="Hide layer"
              onClick={() => setVisible(false)}
            />
          </div>
        ) : (
          <IconButton
            icon={<EyeOff size={16} />}
            ariaLabel="Show layer"
            onClick={() => setVisible(true)}
          />
        )}
      </div>

      {/* Body (only when expanded) */}
      {visible && (
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          gap: 10, padding: 8, width: '100%', boxSizing: 'border-box',
        }}>
          {/* Legend */}
          <div style={{
            display: 'flex', flexDirection: 'column', gap: 6,
            height: 40, width: '100%',
          }}>
            <p style={{
              margin: 0, fontSize: 12, fontWeight: 500,
              color: 'var(--muted-foreground)', height: 16, lineHeight: 'normal',
            }}>{dateRange}</p>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4, height: 16 }}>
              <div style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 18, height: 14,
              }}>
                <div style={{ width: 12, height: 12, borderRadius: 9999, backgroundColor: legendDot }} />
              </div>
              <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--foreground)', whiteSpace: 'nowrap' }}>
                {legendValue}
              </span>
            </div>
          </div>

          {/* Visualization */}
          <CollapsibleRow
            open={vizOpen}
            onToggle={() => setVizOpen(o => !o)}
            label="Visualization"
            badge={activeViz[0].toUpperCase() + activeViz.slice(1)}
          >
            <TabVisualization active={activeViz} onChange={setActiveViz} />
          </CollapsibleRow>

          {/* Filters */}
          <CollapsibleRow
            open={filtersOpen}
            onToggle={() => setFiltersOpen(o => !o)}
            label="Filters"
            badge={String(filterCount)}
            action={<IconButton icon={<ListFilter size={16} />} ariaLabel="Filter options" />}
          >
            <div style={{
              display: 'flex', flexDirection: 'column', width: '100%',
              borderRadius: 'var(--radius-md)', overflow: 'hidden',
            }}>
              <FilterRow icon={<Calendar size={16} />} name="Date" />
              <FilterRow icon={<Calendar size={16} />} name="Filter name" />
              <FilterRow icon={<Calendar size={16} />} name="Filter name" />
            </div>
          </CollapsibleRow>
        </div>
      )}
    </div>
  )
}

function DataPanel() {
  const [tab, setTab] = useState('Data')
  return (
    <div style={{
      display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
      width: 380, maxHeight: 900, padding: 8,
      backgroundColor: 'transparent',
      border: '1px solid var(--border)',
      borderRadius: 12,
      boxShadow: '0 1px 2px -1px rgba(0,0,0,0.1), 0 1px 3px 0 rgba(0,0,0,0.1)',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Header — sticky */}
      <div style={{
        position: 'sticky', top: 0, width: '100%',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        overflow: 'hidden',
      }}>
        <TabSelector tabs={['Data', 'Zones']} active={tab} onChange={setTab} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
          {/* Figma header right icon = plus (add layer) */}
          <IconButton bordered icon={<Plus size={16} />} ariaLabel="Add layer" />
        </div>
      </div>

      {/* Scroll area */}
      <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
        {/* Search */}
        <div style={{
          display: 'flex', alignItems: 'center',
          width: '100%', paddingRight: 8,
        }}>
          <div style={{
            display: 'flex', flex: '1 0 0', minWidth: 0,
            gap: 10, alignItems: 'center', height: 48, padding: '0 12px',
          }}>
            <Search size={16} style={{ color: 'var(--muted-foreground)', flexShrink: 0 }} />
            <input
              placeholder="Search data"
              style={{
                flex: 1, padding: '8px 0', minWidth: 0,
                border: 'none', outline: 'none', background: 'transparent',
                fontFamily: 'inherit', fontSize: 14, fontWeight: 500,
                color: 'var(--foreground)',
              }}
            />
          </div>
        </div>

        {/* Layers */}
        <div style={{
          display: 'flex', flexDirection: 'column', alignItems: 'flex-start',
          gap: 8, width: '100%',
        }}>
          <DataLayer label="Layer label" defaultVisible />
          <DataLayer label="Layer label" />
          <DataLayer label="Layer label" />
        </div>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
const VIEWS = {
  buttons: {
    title: 'Buttons',
    description: 'Primary action triggers. Variants, sizes, and disabled state share the same focus ring and motion.',
  },
  badges: {
    title: 'Badges',
    description: 'Compact status indicators. Variants map to semantic tokens (brand, success, destructive, muted).',
  },
  inputs: {
    title: 'Form inputs',
    description: 'Text inputs, selects, and toggles. All share the same border, radius, and focus ring.',
  },
  alerts: {
    title: 'Alerts',
    description: 'Inline feedback for system events. Variants: info, success, warning, error.',
  },
  cards: {
    title: 'Data cards',
    description: 'Numeric KPIs with optional delta and unit. Used in dashboards and side panels.',
  },
  datepicker: {
    title: 'Date picker',
    description: 'Custom range picker with distribution chart, day-of-week, and hour-of-day controls.',
  },
  topbar: {
    title: 'Topbar',
    description: 'Product navigation bar — back, sidebar toggle, map name, layer/search/filter/pointer tools, and export.',
  },
  toolbuttons: {
    title: 'Tool buttons',
    description: 'Compact icon buttons for map tools. Supports icon-only, with-dropdown, and active states.',
  },
  menutools: {
    title: 'Menu tools',
    description: 'Popup menu used for drawing-tool selection. Keyboard shortcuts and active-state indicator.',
  },
  menuitem: {
    title: 'Menu item',
    description: 'Single row inside a menu — checked, default, hover, and disabled states.',
  },
  datapanel: {
    title: 'Data panel',
    description: 'Side panel listing map data layers — tabs (Data / Zones), search field, and toggleable layer cards.',
  },
  datalayer: {
    title: 'Data layer',
    description: 'Single layer card inside a Data panel. Two variants — collapsed (visible=false) and expanded (visible=true) with legend, visualization picker, and filters.',
  },
  tabviz: {
    title: 'Tab visualization',
    description: 'Visualization-type picker — 7 viz types (points, clusters, grid, heatmap, lines, zones, trips) × 3 states (default, selected, disabled). Lives inside an expanded Data layer.',
  },
}

export default function ComponentsSection({ view = 'buttons' }) {
  const meta = VIEWS[view] || VIEWS.buttons

  return (
    <div>
      <SectionHeader title={meta.title} description={meta.description} />

      {view === 'buttons' && (
        <>
          <ComponentFrame
            label="primary · secondary · outline · ghost · destructive"
            code={{ usage: BTN_USAGE, source: BTN_SOURCE }}
          >
            <Btn variant="primary">Primary</Btn>
            <Btn variant="secondary">Secondary</Btn>
            <Btn variant="outline">Outline</Btn>
            <Btn variant="ghost">Ghost</Btn>
            <Btn variant="destructive">Destructive</Btn>
          </ComponentFrame>

          <ComponentFrame label="with icons · leading · trailing · both">
            <Btn variant="primary" icon={<MapPin />}>Leading</Btn>
            <Btn variant="primary" iconRight={<ArrowUpRight />}>Trailing</Btn>
            <Btn variant="primary" icon={<MapPin />} iconRight={<ArrowUpRight />}>Both</Btn>
            <Btn variant="secondary" icon={<MapPin />}>Leading</Btn>
            <Btn variant="secondary" iconRight={<ArrowUpRight />}>Trailing</Btn>
          </ComponentFrame>

          <ComponentFrame label="sizes · sm 32 · md 36 (Figma default) · lg 44">
            <Btn variant="primary" size="sm">Small</Btn>
            <Btn variant="primary" size="md">Default</Btn>
            <Btn variant="primary" size="lg">Large</Btn>
          </ComponentFrame>

          <ComponentFrame label="disabled">
            <Btn variant="primary" disabled>Primary</Btn>
            <Btn variant="secondary" disabled>Secondary</Btn>
            <Btn variant="outline" disabled>Outline</Btn>
          </ComponentFrame>
        </>
      )}

      {view === 'badges' && (
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
      )}

      {view === 'inputs' && (
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
      )}

      {view === 'alerts' && (
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
      )}

      {view === 'cards' && (
        <ComponentFrame
          label="title · value · delta · unit"
          code={{ usage: CARDS_USAGE, source: CARDS_SOURCE }}
        >
          <DataCard title="Trip count"     value="24,819" delta="+12% vs last week" positive />
          <DataCard title="Avg speed"      value="18.4"   unit="km/h" delta="-2% vs last week" positive={false} />
          <DataCard title="Active zones"   value="47"     delta="+3 this month" positive />
          <DataCard title="Sensors online" value="98%" />
        </ComponentFrame>
      )}

      {view === 'datepicker' && (
        <ComponentFrame
          label="CustomDatePicker · range · distribution · day-of-week · hour"
          code={{ usage: DATEPICKER_USAGE, source: DATEPICKER_SOURCE }}
          figmaUrl={DATEPICKER_FIGMA}
        >
          <CustomDatePicker onClose={() => {}} onApply={(v) => console.log('Applied:', v)} />
        </ComponentFrame>
      )}

      {view === 'topbar' && (
        <ComponentFrame
          label="back · sidebar · map-name · layer · search · filter · pointer · export"
          code={{ usage: TOPBAR_USAGE, source: TOPBAR_SOURCE }}
        >
          <div style={{ width: '100%' }}>
            <Topbar />
          </div>
        </ComponentFrame>
      )}

      {view === 'toolbuttons' && (
        <ComponentFrame
          label="icon · dropdown · active"
          code={{ usage: TOOLBTN_USAGE, source: TOOLBTN_SOURCE }}
        >
          <ToolBtn icon={<Layers size={14} />} />
          <ToolBtn icon={<SlidersHorizontal size={14} />} dropdown />
          <ToolBtn icon={<Layers size={14} />} active />
          <ToolBtn icon={<SlidersHorizontal size={14} />} dropdown active />
        </ComponentFrame>
      )}

      {view === 'menutools' && (
        <ComponentFrame
          label="label · shortcut · active-state"
          code={{ usage: MENUTOOL_USAGE, source: MENUTOOL_SOURCE }}
        >
          <MenuTools />
        </ComponentFrame>
      )}

      {view === 'menuitem' && (
        <ComponentFrame
          label="checked · disabled · shortcut"
          code={{ usage: MENUITEM_USAGE, source: MENUITEM_SOURCE }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <MenuItem label="Profile" shortcut="⇧⌘P" checked />
            <MenuItem label="Profile" shortcut="⇧⌘P" />
            <MenuItem label="Profile" shortcut="⇧⌘P" />
            <MenuItem label="Profile" shortcut="⇧⌘P" disabled />
          </div>
        </ComponentFrame>
      )}

      {view === 'datapanel' && (
        <ComponentFrame
          label="380w · tabs · search · layer cards"
          code={{ usage: DATAPANEL_USAGE, source: DATAPANEL_SOURCE }}
        >
          <DataPanel />
        </ComponentFrame>
      )}

      {view === 'datalayer' && (
        <>
          <ComponentFrame label="visible=false · collapsed (eye-off · muted bg)">
            <div style={{ width: 364 }}>
              <DataLayer label="Layer label" />
            </div>
          </ComponentFrame>

          <ComponentFrame label="visible=true · expanded (legend · visualization · filters)">
            <div style={{ width: 364 }}>
              <DataLayer label="Layer label" defaultVisible />
            </div>
          </ComponentFrame>
        </>
      )}

      {view === 'tabviz' && (
        <>
          <ComponentFrame label="assembled · 348w · default points selected">
            <TabVisualization active="points" />
          </ComponentFrame>

          <ComponentFrame label="state matrix · 7 types × 3 states">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, width: '100%' }}>
              {/* header */}
              <div style={{
                display: 'grid', gridTemplateColumns: '80px repeat(7, 48px)', gap: 8,
                alignItems: 'center',
              }}>
                <div />
                {VIZ_TYPES.map(v => (
                  <div key={v.key} style={{
                    fontSize: 11, color: 'var(--muted-foreground)',
                    textAlign: 'center', textTransform: 'capitalize',
                  }}>{v.key}</div>
                ))}
              </div>
              {/* rows per state */}
              {['default', 'selected', 'disabled'].map(state => (
                <div key={state} style={{
                  display: 'grid', gridTemplateColumns: '80px repeat(7, 48px)', gap: 8,
                  alignItems: 'center',
                  padding: 8, backgroundColor: 'var(--muted)', borderRadius: 'var(--radius-md)',
                }}>
                  <div style={{ fontSize: 12, fontWeight: 500, color: 'var(--foreground)' }}>
                    {state}
                  </div>
                  {VIZ_TYPES.map(v => (
                    <VizTab key={v.key} type={v.key} state={state} />
                  ))}
                </div>
              ))}
            </div>
          </ComponentFrame>

          <ComponentFrame label="per-tab disabled · disabled={['lines','zones']}">
            <TabVisualization active="points" disabled={['lines', 'zones']} />
          </ComponentFrame>
        </>
      )}
    </div>
  )
}
