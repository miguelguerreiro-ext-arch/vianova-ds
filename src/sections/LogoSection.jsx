import { useState } from 'react'
import { Download, Copy, Check } from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

const BASE = import.meta.env.BASE_URL

const VARIANTS = [
  {
    group: 'Full lockup',
    items: [
      { id: 'full-original',   label: 'Original',   sub: 'Default — light surfaces',   bg: 'var(--background)' },
      { id: 'full-white-text', label: 'White text', sub: 'Symbol gradient + white wordmark', bg: '#1F2937' },
      { id: 'full-white',      label: 'White',      sub: 'On photography & dark fills', bg: '#1F2937' },
      { id: 'full-black',      label: 'Black',      sub: 'Single-color print, embossing', bg: 'var(--background)' },
    ],
  },
  {
    group: 'Symbol only',
    items: [
      { id: 'symbol-original', label: 'Original',   sub: 'App icon, avatar, favicon',   bg: 'var(--background)' },
      { id: 'symbol-white',    label: 'White',      sub: 'On photography & dark fills', bg: '#1F2937' },
      { id: 'symbol-black',    label: 'Black',      sub: 'Single-color print',          bg: 'var(--background)' },
    ],
  },
]

function LogoCard({ item }) {
  const [copied, setCopied] = useState(false)
  const url = `${BASE}logos/${item.id}.svg`
  const isSymbol = item.id.startsWith('symbol')

  async function copy() {
    try {
      const txt = await fetch(url).then(r => r.text())
      await navigator.clipboard.writeText(txt)
      setCopied(true)
      setTimeout(() => setCopied(false), 1400)
    } catch {}
  }

  return (
    <div style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
      <div
        style={{
          backgroundColor: item.bg,
          padding: 24,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: isSymbol ? 140 : 110,
        }}
      >
        <img
          src={url}
          alt={`Vianova logo · ${item.label}`}
          style={{ maxHeight: isSymbol ? 96 : 64, maxWidth: '100%', display: 'block' }}
        />
      </div>
      <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid var(--border)', backgroundColor: 'var(--card)' }}>
        <div>
          <p className="text-sm font-medium" style={{ color: 'var(--foreground)' }}>{item.label}</p>
          <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{item.sub}</p>
        </div>
        <div className="flex items-center gap-1">
          <button
            onClick={copy}
            title="Copy SVG markup"
            style={{
              padding: 6, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              background: 'transparent', cursor: 'pointer', color: 'var(--muted-foreground)',
            }}
          >
            {copied ? <Check size={14} strokeWidth={1.33} /> : <Copy size={14} strokeWidth={1.33} />}
          </button>
          <a
            href={url}
            download={`vianova-${item.id}.svg`}
            title="Download SVG"
            style={{
              padding: 6, border: '1px solid var(--border)', borderRadius: 'var(--radius-sm)',
              background: 'transparent', color: 'var(--muted-foreground)', display: 'inline-flex',
            }}
          >
            <Download size={14} strokeWidth={1.33} />
          </a>
        </div>
      </div>
    </div>
  )
}

export default function LogoSection() {
  return (
    <div>
      <SectionHeader
        title="Logo"
        description="The Vianova brand lockup and symbol mark. Use the full lockup wherever space allows; fall back to the symbol for app icons, avatars, and tight UI surfaces."
      />

      {VARIANTS.map(group => (
        <div key={group.group} className="mb-10">
          <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--muted-foreground)' }}>
            {group.group}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            {group.items.map(item => <LogoCard key={item.id} item={item} />)}
          </div>
        </div>
      ))}

      <div className="p-5 rounded-lg" style={{ backgroundColor: 'var(--muted)', borderRadius: 'var(--radius-lg)' }}>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Usage rules</p>
        <ul className="space-y-1.5">
          {[
            'Maintain clear space equal to the height of the symbol around the lockup.',
            'Never recolor, rotate, distort, or apply effects to the mark.',
            'Use the original (gradient) variant on neutral light surfaces only.',
            'Use the white variant on photography, video, and saturated dark fills.',
            'Use the single-color black variant for print, engraving, and embossing.',
            'Minimum size: 24px height for the symbol, 96px width for the full lockup.',
          ].map(r => (
            <li key={r} className="text-sm flex gap-2" style={{ color: 'var(--muted-foreground)' }}>
              <span style={{ color: 'var(--primary)' }}>·</span>{r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
