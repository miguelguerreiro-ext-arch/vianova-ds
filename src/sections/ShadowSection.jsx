import SectionHeader from '../components/SectionHeader'

const SHADOWS = [
  { token: 'shadow-sm',    use: 'Subtle lift — inputs, chips',  x: 0, y: 1,  blur: 2,  spread: 0,   opacity: 5,  inset: false },
  { token: 'shadow-md',    use: 'Cards, dropdowns',             x: 0, y: 4,  blur: 6,  spread: -1,  opacity: 10, inset: false },
  { token: 'shadow-lg',    use: 'Popovers, tooltips',           x: 0, y: 10, blur: 15, spread: -3,  opacity: 10, inset: false },
  { token: 'shadow-xl',    use: 'Modals, sheet overlays',       x: 0, y: 20, blur: 25, spread: -5,  opacity: 10, inset: false },
  { token: 'shadow-2xl',   use: 'Maximum elevation',            x: 0, y: 25, blur: 50, spread: -12, opacity: 25, inset: false },
  { token: 'shadow-inner', use: 'Inset / pressed states',       x: 0, y: 2,  blur: 4,  spread: 0,   opacity: 5,  inset: true  },
]

function Chip({ label, value }) {
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'baseline', gap: 3,
      padding: '2px 7px', borderRadius: 'var(--radius-sm)',
      backgroundColor: 'var(--muted)', fontSize: '0.7rem', lineHeight: 1.6,
    }}>
      <span style={{ color: 'var(--muted-foreground)', fontWeight: 500 }}>{label}</span>
      <span style={{ color: 'var(--foreground)', fontFamily: 'monospace' }}>{value}</span>
    </span>
  )
}

export default function ShadowSection() {
  return (
    <div>
      <SectionHeader
        title="Shadow"
        description="Six elevation levels mapping directly to Tailwind CSS v4 shadow tokens. Use the lowest level that establishes hierarchy."
      />

      <div className="space-y-2">
        {SHADOWS.map(({ token, use, x, y, blur, spread, opacity, inset }) => (
          <div
            key={token}
            className="flex items-center gap-8 py-5 border-b"
            style={{ borderColor: 'var(--border)' }}
          >
            <div
              style={{
                width: 96,
                height: 56,
                flexShrink: 0,
                backgroundColor: 'var(--card)',
                borderRadius: 'var(--radius-lg)',
                boxShadow: `var(--${token})`,
                border: '1px solid var(--border)',
              }}
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-3 flex-wrap">
                <p className="text-sm font-mono font-medium" style={{ color: 'var(--foreground)' }}>
                  --{token}
                </p>
                <p className="text-xs" style={{ color: 'var(--muted-foreground)' }}>
                  {use}
                </p>
              </div>
              <div className="flex flex-wrap gap-1.5 mt-2">
                {inset && <Chip label="Type" value="Inset" />}
                <Chip label="X" value={x} />
                <Chip label="Y" value={y} />
                <Chip label="Blur" value={blur} />
                <Chip label="Spread" value={spread} />
                <Chip label="Color" value={`#000000 · ${opacity}%`} />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-10 p-5 rounded-lg"
        style={{ backgroundColor: 'var(--muted)', borderRadius: 'var(--radius-lg)' }}
      >
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Principles</p>
        <ul className="space-y-1.5">
          {[
            'Use the lowest shadow that establishes the needed hierarchy.',
            'Shadows are always black — never coloured.',
            'Dark themes rely on surface lightness, not shadow depth.',
            'shadow-inner communicates pressed or inset states.',
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
