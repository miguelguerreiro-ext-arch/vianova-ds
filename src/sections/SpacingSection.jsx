import SectionHeader from '../components/SectionHeader'

const SPACING = [
  { token: 'spacing/1', value: '4px', px: 4 },
  { token: 'spacing/2', value: '8px', px: 8 },
  { token: 'spacing/3', value: '12px', px: 12 },
  { token: 'spacing/4', value: '16px', px: 16 },
  { token: 'spacing/5', value: '20px', px: 20 },
  { token: 'spacing/6', value: '24px', px: 24 },
  { token: 'spacing/7', value: '28px', px: 28 },
  { token: 'spacing/8', value: '32px', px: 32 },
  { token: 'spacing/9', value: '36px', px: 36 },
  { token: 'spacing/10', value: '40px', px: 40 },
  { token: 'spacing/11', value: '44px', px: 44 },
  { token: 'spacing/12', value: '48px', px: 48 },
]

export default function SpacingSection() {
  return (
    <div>
      <SectionHeader
        title="Spacing"
        description="Strict 4px base unit. Every margin, padding, and gap is a multiple of 4. Off-scale values (6px, 14px) require design review."
      />

      <div className="space-y-2">
        {SPACING.map(s => (
          <div key={s.token} className="flex items-center gap-4 py-2">
            <div className="w-24 text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>
              {s.token}
            </div>
            <div
              className="flex-shrink-0"
              style={{
                width: `${s.px}px`,
                height: '16px',
                backgroundColor: 'var(--primary)',
                borderRadius: '2px',
              }}
            />
            <div className="text-xs font-mono" style={{ color: 'var(--foreground)' }}>
              {s.value}
            </div>
          </div>
        ))}
      </div>

      <div
        className="mt-10 p-6 rounded-lg"
        style={{ backgroundColor: 'var(--muted)', borderRadius: 'var(--radius-lg)' }}
      >
        <p className="text-sm font-medium mb-3" style={{ color: 'var(--foreground)' }}>Rules</p>
        <ul className="space-y-1.5">
          {[
            'Compact UI: 8px (spacing/2) vertical rhythm, 12px (spacing/3) horizontal.',
            'Marketing sections: 48px (spacing/12) between blocks, 32px (spacing/8) between elements.',
            'Never introduce off-scale values (6px, 14px). Raise in design review.',
          ].map(r => (
            <li key={r} className="text-sm flex gap-2" style={{ color: 'var(--muted-foreground)' }}>
              <span style={{ color: 'var(--primary)' }}>·</span>
              {r}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
