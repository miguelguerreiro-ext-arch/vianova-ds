import { useState } from 'react'
import SectionHeader from '../components/SectionHeader'

function rgbToHex(rgb) {
  const m = rgb.match(/\d+/g)
  if (!m) return rgb
  return '#' + m.slice(0, 3).map(n => parseInt(n).toString(16).padStart(2, '0')).join('').toUpperCase()
}

function copyHexFromVar(varName) {
  const el = document.createElement('div')
  el.style.color = `var(--${varName})`
  document.body.appendChild(el)
  const computed = getComputedStyle(el).color
  document.body.removeChild(el)
  const hex = rgbToHex(computed)
  navigator.clipboard.writeText(hex)
  return hex
}

function Swatch({ token, usage }) {
  const [copied, setCopied] = useState(null)

  function handleClick() {
    const hex = copyHexFromVar(token)
    setCopied(hex)
    setTimeout(() => setCopied(null), 1500)
  }

  return (
    <div
      onClick={handleClick}
      title="Click to copy hex"
      style={{
        borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)',
        overflow: 'hidden', cursor: 'pointer', position: 'relative',
      }}
    >
      <div style={{ height: 56, backgroundColor: `var(--${token})`, position: 'relative' }}>
        {copied && (
          <div style={{
            position: 'absolute', inset: 0, display: 'flex', alignItems: 'center',
            justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.35)',
          }}>
            <span style={{ fontSize: '0.7rem', fontWeight: 700, fontFamily: 'monospace', color: '#fff' }}>
              {copied}
            </span>
          </div>
        )}
      </div>
      <div style={{ padding: '8px 12px 10px' }}>
        <p style={{ margin: 0, fontSize: '0.72rem', fontWeight: 600, fontFamily: 'monospace', color: 'var(--foreground)' }}>
          --{token}
        </p>
        {usage && (
          <p style={{ margin: '3px 0 0', fontSize: '0.7rem', color: 'var(--muted-foreground)', lineHeight: 1.4 }}>
            {usage}
          </p>
        )}
      </div>
    </div>
  )
}

function GroupLabel({ children }) {
  return (
    <h2 style={{
      margin: '0 0 16px',
      fontSize: '0.65rem', fontWeight: 600,
      textTransform: 'uppercase', letterSpacing: '0.08em',
      color: 'var(--muted-foreground)',
    }}>
      {children}
    </h2>
  )
}

const SEMANTIC = [
  { token: 'background',             usage: 'Page background' },
  { token: 'foreground',             usage: 'Body text' },
  { token: 'primary',                usage: 'Primary CTAs' },
  { token: 'primary-foreground',     usage: 'On primary' },
  { token: 'secondary',              usage: 'Secondary buttons' },
  { token: 'secondary-foreground',   usage: 'On secondary' },
  { token: 'muted',                  usage: 'Passive bg, skeletons' },
  { token: 'muted-foreground',       usage: 'Secondary text' },
  { token: 'accent',                 usage: 'Hover backgrounds' },
  { token: 'accent-foreground',      usage: 'On accent' },
  { token: 'card',                   usage: 'Card surfaces' },
  { token: 'card-foreground',        usage: 'On card' },
  { token: 'destructive',            usage: 'Errors, delete' },
  { token: 'destructive-foreground', usage: 'On destructive' },
  { token: 'border',                 usage: 'Dividers, outlines' },
  { token: 'input',                  usage: 'Input borders' },
  { token: 'ring',                   usage: 'Focus ring' },
]

const SYNTAX = [
  { token: 'syntax-string',   usage: 'String literals' },
  { token: 'syntax-number',   usage: 'Numeric values' },
  { token: 'syntax-property', usage: 'Property / key names' },
]

const TAILWIND_PALETTE = [
  {
    family: 'Slate',
    shades: [
      { shade: '50',  hex: '#F8FAFC' }, { shade: '100', hex: '#F1F5F9' },
      { shade: '200', hex: '#E2E8F0' }, { shade: '300', hex: '#CBD5E1' },
      { shade: '400', hex: '#94A3B8' }, { shade: '500', hex: '#64748B' },
      { shade: '600', hex: '#475569' }, { shade: '700', hex: '#334155' },
      { shade: '800', hex: '#1E293B' }, { shade: '900', hex: '#0F172A' },
      { shade: '950', hex: '#020617' },
    ],
  },
  {
    family: 'Gray',
    shades: [
      { shade: '50',  hex: '#F9FAFB' }, { shade: '100', hex: '#F3F4F6' },
      { shade: '200', hex: '#E5E7EB' }, { shade: '300', hex: '#D1D5DB' },
      { shade: '400', hex: '#9CA3AF' }, { shade: '500', hex: '#6B7280' },
      { shade: '600', hex: '#4B5563' }, { shade: '700', hex: '#374151' },
      { shade: '800', hex: '#1F2937' }, { shade: '900', hex: '#111827' },
      { shade: '950', hex: '#030712' },
    ],
  },
  {
    family: 'Zinc',
    shades: [
      { shade: '50',  hex: '#FAFAFA' }, { shade: '100', hex: '#F4F4F5' },
      { shade: '200', hex: '#E4E4E7' }, { shade: '300', hex: '#D4D4D8' },
      { shade: '400', hex: '#A1A1AA' }, { shade: '500', hex: '#71717A' },
      { shade: '600', hex: '#52525B' }, { shade: '700', hex: '#3F3F46' },
      { shade: '800', hex: '#27272A' }, { shade: '900', hex: '#18181B' },
      { shade: '950', hex: '#09090B' },
    ],
  },
  {
    family: 'Neutral',
    shades: [
      { shade: '50',  hex: '#FAFAFA' }, { shade: '100', hex: '#F5F5F5' },
      { shade: '200', hex: '#E5E5E5' }, { shade: '300', hex: '#D4D4D4' },
      { shade: '400', hex: '#A3A3A3' }, { shade: '500', hex: '#737373' },
      { shade: '600', hex: '#525252' }, { shade: '700', hex: '#404040' },
      { shade: '800', hex: '#262626' }, { shade: '900', hex: '#171717' },
      { shade: '950', hex: '#0A0A0A' },
    ],
  },
  {
    family: 'Stone',
    shades: [
      { shade: '50',  hex: '#FAFAF9' }, { shade: '100', hex: '#F5F5F4' },
      { shade: '200', hex: '#E7E5E4' }, { shade: '300', hex: '#D6D3D1' },
      { shade: '400', hex: '#A8A29E' }, { shade: '500', hex: '#78716C' },
      { shade: '600', hex: '#57534E' }, { shade: '700', hex: '#44403C' },
      { shade: '800', hex: '#292524' }, { shade: '900', hex: '#1C1917' },
      { shade: '950', hex: '#0C0A09' },
    ],
  },
  {
    family: 'Red',
    shades: [
      { shade: '50',  hex: '#FEF2F2' }, { shade: '100', hex: '#FEE2E2' },
      { shade: '200', hex: '#FECACA' }, { shade: '300', hex: '#FCA5A5' },
      { shade: '400', hex: '#F87171' }, { shade: '500', hex: '#EF4444' },
      { shade: '600', hex: '#DC2626' }, { shade: '700', hex: '#B91C1C' },
      { shade: '800', hex: '#991B1B' }, { shade: '900', hex: '#7F1D1D' },
      { shade: '950', hex: '#450A0A' },
    ],
  },
  {
    family: 'Orange',
    shades: [
      { shade: '50',  hex: '#FFF7ED' }, { shade: '100', hex: '#FFEDD5' },
      { shade: '200', hex: '#FED7AA' }, { shade: '300', hex: '#FDBA74' },
      { shade: '400', hex: '#FB923C' }, { shade: '500', hex: '#F97316' },
      { shade: '600', hex: '#EA580C' }, { shade: '700', hex: '#C2410C' },
      { shade: '800', hex: '#9A3412' }, { shade: '900', hex: '#7C2D12' },
      { shade: '950', hex: '#431407' },
    ],
  },
  {
    family: 'Amber',
    shades: [
      { shade: '50',  hex: '#FFFBEB' }, { shade: '100', hex: '#FEF3C7' },
      { shade: '200', hex: '#FDE68A' }, { shade: '300', hex: '#FCD34D' },
      { shade: '400', hex: '#FBBF24' }, { shade: '500', hex: '#F59E0B' },
      { shade: '600', hex: '#D97706' }, { shade: '700', hex: '#B45309' },
      { shade: '800', hex: '#92400E' }, { shade: '900', hex: '#78350F' },
      { shade: '950', hex: '#451A03' },
    ],
  },
  {
    family: 'Yellow',
    shades: [
      { shade: '50',  hex: '#FEFCE8' }, { shade: '100', hex: '#FEF9C3' },
      { shade: '200', hex: '#FEF08A' }, { shade: '300', hex: '#FDE047' },
      { shade: '400', hex: '#FACC15' }, { shade: '500', hex: '#EAB308' },
      { shade: '600', hex: '#CA8A04' }, { shade: '700', hex: '#A16207' },
      { shade: '800', hex: '#854D0E' }, { shade: '900', hex: '#713F12' },
      { shade: '950', hex: '#422006' },
    ],
  },
  {
    family: 'Lime',
    shades: [
      { shade: '50',  hex: '#F7FEE7' }, { shade: '100', hex: '#ECFCCB' },
      { shade: '200', hex: '#D9F99D' }, { shade: '300', hex: '#BEF264' },
      { shade: '400', hex: '#A3E635' }, { shade: '500', hex: '#84CC16' },
      { shade: '600', hex: '#65A30D' }, { shade: '700', hex: '#4D7C0F' },
      { shade: '800', hex: '#3F6212' }, { shade: '900', hex: '#365314' },
      { shade: '950', hex: '#1A2E05' },
    ],
  },
  {
    family: 'Green',
    shades: [
      { shade: '50',  hex: '#F0FDF4' }, { shade: '100', hex: '#DCFCE7' },
      { shade: '200', hex: '#BBF7D0' }, { shade: '300', hex: '#86EFAC' },
      { shade: '400', hex: '#4ADE80' }, { shade: '500', hex: '#22C55E' },
      { shade: '600', hex: '#16A34A' }, { shade: '700', hex: '#15803D' },
      { shade: '800', hex: '#166534' }, { shade: '900', hex: '#14532D' },
      { shade: '950', hex: '#052E16' },
    ],
  },
  {
    family: 'Emerald',
    shades: [
      { shade: '50',  hex: '#ECFDF5' }, { shade: '100', hex: '#D1FAE5' },
      { shade: '200', hex: '#A7F3D0' }, { shade: '300', hex: '#6EE7B7' },
      { shade: '400', hex: '#34D399' }, { shade: '500', hex: '#10B981' },
      { shade: '600', hex: '#059669' }, { shade: '700', hex: '#047857' },
      { shade: '800', hex: '#065F46' }, { shade: '900', hex: '#064E3B' },
      { shade: '950', hex: '#022C22' },
    ],
  },
  {
    family: 'Teal',
    shades: [
      { shade: '50',  hex: '#F0FDFA' }, { shade: '100', hex: '#CCFBF1' },
      { shade: '200', hex: '#99F6E4' }, { shade: '300', hex: '#5EEAD4' },
      { shade: '400', hex: '#2DD4BF' }, { shade: '500', hex: '#14B8A6' },
      { shade: '600', hex: '#0D9488' }, { shade: '700', hex: '#0F766E' },
      { shade: '800', hex: '#115E59' }, { shade: '900', hex: '#134E4A' },
      { shade: '950', hex: '#042F2E' },
    ],
  },
  {
    family: 'Cyan',
    shades: [
      { shade: '50',  hex: '#ECFEFF' }, { shade: '100', hex: '#CFFAFE' },
      { shade: '200', hex: '#A5F3FC' }, { shade: '300', hex: '#67E8F9' },
      { shade: '400', hex: '#22D3EE' }, { shade: '500', hex: '#06B6D4' },
      { shade: '600', hex: '#0891B2' }, { shade: '700', hex: '#0E7490' },
      { shade: '800', hex: '#155E75' }, { shade: '900', hex: '#164E63' },
      { shade: '950', hex: '#083344' },
    ],
  },
  {
    family: 'Sky',
    shades: [
      { shade: '50',  hex: '#F0F9FF' }, { shade: '100', hex: '#E0F2FE' },
      { shade: '200', hex: '#BAE6FD' }, { shade: '300', hex: '#7DD3FC' },
      { shade: '400', hex: '#38BDF8' }, { shade: '500', hex: '#0EA5E9' },
      { shade: '600', hex: '#0284C7' }, { shade: '700', hex: '#0369A1' },
      { shade: '800', hex: '#075985' }, { shade: '900', hex: '#0C4A6E' },
      { shade: '950', hex: '#082F49' },
    ],
  },
  {
    family: 'Blue',
    shades: [
      { shade: '50',  hex: '#EFF6FF' }, { shade: '100', hex: '#DBEAFE' },
      { shade: '200', hex: '#BFDBFE' }, { shade: '300', hex: '#93C5FD' },
      { shade: '400', hex: '#60A5FA' }, { shade: '500', hex: '#3B82F6' },
      { shade: '600', hex: '#2563EB' }, { shade: '700', hex: '#1D4ED8' },
      { shade: '800', hex: '#1E40AF' }, { shade: '900', hex: '#1E3A8A' },
      { shade: '950', hex: '#172554' },
    ],
  },
  {
    family: 'Indigo',
    shades: [
      { shade: '50',  hex: '#EEF2FF' }, { shade: '100', hex: '#E0E7FF' },
      { shade: '200', hex: '#C7D2FE' }, { shade: '300', hex: '#A5B4FC' },
      { shade: '400', hex: '#818CF8' }, { shade: '500', hex: '#6366F1' },
      { shade: '600', hex: '#4F46E5' }, { shade: '700', hex: '#4338CA' },
      { shade: '800', hex: '#3730A3' }, { shade: '900', hex: '#312E81' },
      { shade: '950', hex: '#1E1B4B' },
    ],
  },
  {
    family: 'Violet',
    shades: [
      { shade: '50',  hex: '#F5F3FF' }, { shade: '100', hex: '#EDE9FE' },
      { shade: '200', hex: '#DDD6FE' }, { shade: '300', hex: '#C4B5FD' },
      { shade: '400', hex: '#A78BFA' }, { shade: '500', hex: '#8B5CF6' },
      { shade: '600', hex: '#7C3AED' }, { shade: '700', hex: '#6D28D9' },
      { shade: '800', hex: '#5B21B6' }, { shade: '900', hex: '#4C1D95' },
      { shade: '950', hex: '#2E1065' },
    ],
  },
  {
    family: 'Purple',
    shades: [
      { shade: '50',  hex: '#FAF5FF' }, { shade: '100', hex: '#F3E8FF' },
      { shade: '200', hex: '#E9D5FF' }, { shade: '300', hex: '#D8B4FE' },
      { shade: '400', hex: '#C084FC' }, { shade: '500', hex: '#A855F7' },
      { shade: '600', hex: '#9333EA' }, { shade: '700', hex: '#7E22CE' },
      { shade: '800', hex: '#6B21A8' }, { shade: '900', hex: '#581C87' },
      { shade: '950', hex: '#3B0764' },
    ],
  },
  {
    family: 'Fuchsia',
    shades: [
      { shade: '50',  hex: '#FDF4FF' }, { shade: '100', hex: '#FAE8FF' },
      { shade: '200', hex: '#F5D0FE' }, { shade: '300', hex: '#F0ABFC' },
      { shade: '400', hex: '#E879F9' }, { shade: '500', hex: '#D946EF' },
      { shade: '600', hex: '#C026D3' }, { shade: '700', hex: '#A21CAF' },
      { shade: '800', hex: '#86198F' }, { shade: '900', hex: '#701A75' },
      { shade: '950', hex: '#4A044E' },
    ],
  },
  {
    family: 'Pink',
    shades: [
      { shade: '50',  hex: '#FDF2F8' }, { shade: '100', hex: '#FCE7F3' },
      { shade: '200', hex: '#FBCFE8' }, { shade: '300', hex: '#F9A8D4' },
      { shade: '400', hex: '#F472B6' }, { shade: '500', hex: '#EC4899' },
      { shade: '600', hex: '#DB2777' }, { shade: '700', hex: '#BE185D' },
      { shade: '800', hex: '#9D174D' }, { shade: '900', hex: '#831843' },
      { shade: '950', hex: '#500724' },
    ],
  },
  {
    family: 'Rose',
    shades: [
      { shade: '50',  hex: '#FFF1F2' }, { shade: '100', hex: '#FFE4E6' },
      { shade: '200', hex: '#FECDD3' }, { shade: '300', hex: '#FDA4AF' },
      { shade: '400', hex: '#FB7185' }, { shade: '500', hex: '#F43F5E' },
      { shade: '600', hex: '#E11D48' }, { shade: '700', hex: '#BE123C' },
      { shade: '800', hex: '#9F1239' }, { shade: '900', hex: '#881337' },
      { shade: '950', hex: '#4C0519' },
    ],
  },
]

function PaletteSwatch({ family, shade, hex }) {
  const [copied, setCopied] = useState(false)

  function handleClick() {
    navigator.clipboard.writeText(hex)
    setCopied(true)
    setTimeout(() => setCopied(false), 1200)
  }

  return (
    <div
      key={shade}
      title={`${family}/${shade} · ${hex}`}
      onClick={handleClick}
      style={{
        flex: 1, height: 28, backgroundColor: hex,
        borderRadius: 3, cursor: 'pointer', position: 'relative',
        outline: copied ? '2px solid white' : 'none',
        outlineOffset: '-2px',
      }}
    >
      {copied && (
        <div style={{
          position: 'absolute', inset: 0, display: 'flex',
          alignItems: 'center', justifyContent: 'center',
          backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: 3,
        }}>
          <span style={{ fontSize: '0.45rem', fontWeight: 700, fontFamily: 'monospace', color: '#fff', whiteSpace: 'nowrap' }}>
            ✓
          </span>
        </div>
      )}
    </div>
  )
}

function PaletteRow({ family, shades }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
      <div style={{ width: 64, fontSize: '0.7rem', fontWeight: 500, color: 'var(--foreground)', flexShrink: 0 }}>
        {family}
      </div>
      <div style={{ display: 'flex', gap: 2, flex: 1 }}>
        {shades.map(({ shade, hex }) => (
          <PaletteSwatch key={shade} family={family} shade={shade} hex={hex} />
        ))}
      </div>
    </div>
  )
}

export default function ColorSection() {
  const [paletteOpen, setPaletteOpen] = useState(false)

  return (
    <div>
      <SectionHeader
        title="Color"
        description="Semantic tokens that adapt across all themes. Switch themes from the sidebar to see how each token resolves."
      />

      <div style={{ marginBottom: 48 }}>
        <GroupLabel>Semantic tokens</GroupLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {SEMANTIC.map(t => <Swatch key={t.token} {...t} />)}
        </div>
      </div>

      <div style={{ marginBottom: 48 }}>
        <GroupLabel>Syntax highlighting</GroupLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {SYNTAX.map(t => <Swatch key={t.token} {...t} />)}
        </div>
      </div>

      <div>
        <button
          onClick={() => setPaletteOpen(o => !o)}
          style={{
            display: 'flex', alignItems: 'center', gap: 8,
            background: 'none', border: 'none', padding: 0,
            cursor: 'pointer', marginBottom: 16, width: '100%',
          }}
        >
          <h2 style={{
            margin: 0, fontSize: '0.65rem', fontWeight: 600,
            textTransform: 'uppercase', letterSpacing: '0.08em',
            color: 'var(--muted-foreground)',
          }}>
            Tailwind CSS v4 palette
          </h2>
          <span style={{ fontSize: '0.65rem', color: 'var(--muted-foreground)', marginLeft: 'auto' }}>
            {paletteOpen ? '▲ collapse' : '▼ expand'}
          </span>
        </button>

        {paletteOpen && (
          <div>
            <div style={{ display: 'flex', gap: 2, marginBottom: 6, paddingLeft: 68 }}>
              {TAILWIND_PALETTE[0].shades.map(({ shade }) => (
                <div key={shade} style={{ flex: 1, fontSize: '0.55rem', color: 'var(--muted-foreground)', textAlign: 'center' }}>
                  {shade}
                </div>
              ))}
            </div>
            {TAILWIND_PALETTE.map(({ family, shades }) => (
              <PaletteRow key={family} family={family} shades={shades} />
            ))}
            <p style={{ marginTop: 12, fontSize: '0.7rem', color: 'var(--muted-foreground)' }}>
              Hover any swatch to see the token name and hex value. Reference: Tailwind CSS v4.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
