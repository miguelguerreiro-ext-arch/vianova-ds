import SectionHeader from '../components/SectionHeader'

function Swatch({ token, light, dark, usage }) {
  return (
    <div
      className="flex flex-col overflow-hidden"
      style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)' }}
    >
      <div className="h-16 w-full" style={{ backgroundColor: light }} />
      <div className="px-3 py-2.5">
        <p className="text-xs font-medium font-mono" style={{ color: 'var(--foreground)' }}>
          {token}
        </p>
        <p className="text-xs mt-0.5 font-mono" style={{ color: 'var(--muted-foreground)' }}>
          {light}
        </p>
        {usage && (
          <p className="text-xs mt-1" style={{ color: 'var(--muted-foreground)' }}>
            {usage}
          </p>
        )}
      </div>
    </div>
  )
}

function ZincSwatch({ step, hex }) {
  const isLight = ['50', '100', '200', '300'].includes(step)
  return (
    <div
      className="flex items-center justify-between px-4 py-3"
      style={{
        backgroundColor: hex,
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border)',
      }}
    >
      <span
        className="text-xs font-mono font-medium"
        style={{ color: isLight ? '#09090b' : '#fafafa' }}
      >
        zinc/{step}
      </span>
      <span
        className="text-xs font-mono"
        style={{ color: isLight ? '#52525b' : '#a1a1aa' }}
      >
        {hex}
      </span>
    </div>
  )
}

const BRAND_TOKENS = [
  { token: 'vn-brand/100', light: '#14b7a5', usage: 'Primary brand mark, key CTAs' },
  { token: 'vn-brand/80', light: 'rgba(20,183,165,0.80)', usage: 'Subtle emphasis on dark surfaces' },
  { token: 'vn-brand/40', light: 'rgba(20,183,165,0.40)', usage: 'Ghost states' },
  { token: 'vn-brand/20', light: 'rgba(20,183,165,0.20)', usage: 'Background washes' },
]

const SEMANTIC_TOKENS = [
  { token: 'primary', light: '#14b7a5', usage: 'Primary actions, active states' },
  { token: 'secondary', light: '#f4f4f5', usage: 'Secondary buttons, chips' },
  { token: 'muted', light: '#eeeeee', usage: 'Passive backgrounds' },
  { token: 'accent', light: '#f4f4f5', usage: 'Hover backgrounds' },
  { token: 'destructive', light: '#ef4444', usage: 'Errors, destructive actions' },
  { token: 'background', light: '#ffffff', usage: 'Page background' },
  { token: 'foreground', light: '#09090b', usage: 'Body text' },
  { token: 'border', light: '#e4e4e7', usage: 'Dividers, outlines' },
  { token: 'muted-foreground', light: '#71717a', usage: 'Secondary text, captions' },
]

const ZINC_SCALE = [
  { step: '50', hex: '#fafafa' },
  { step: '100', hex: '#f4f4f5' },
  { step: '200', hex: '#e4e4e7' },
  { step: '300', hex: '#d4d4d8' },
  { step: '400', hex: '#a1a1aa' },
  { step: '500', hex: '#71717a' },
  { step: '600', hex: '#52525b' },
  { step: '700', hex: '#3f3f46' },
  { step: '800', hex: '#27272a' },
  { step: '900', hex: '#18181b' },
  { step: '950', hex: '#09090b' },
]

function GroupLabel({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest mb-4"
      style={{ color: 'var(--muted-foreground)' }}>
      {children}
    </h2>
  )
}

export default function ColorSection() {
  return (
    <div>
      <SectionHeader
        title="Color"
        description="Three layers: brand tokens for marketing moments, semantic tokens for all product components, and a zinc neutral ramp."
      />

      <div className="mb-12">
        <GroupLabel>Brand</GroupLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {BRAND_TOKENS.map(t => <Swatch key={t.token} {...t} />)}
        </div>
      </div>

      <div className="mb-12">
        <GroupLabel>Semantic tokens</GroupLabel>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {SEMANTIC_TOKENS.map(t => <Swatch key={t.token} {...t} />)}
        </div>
      </div>

      <div>
        <GroupLabel>Zinc neutral scale</GroupLabel>
        <div className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
          {ZINC_SCALE.map(z => <ZincSwatch key={z.step} {...z} />)}
        </div>
      </div>
    </div>
  )
}
