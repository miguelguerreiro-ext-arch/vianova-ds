import SectionHeader from '../components/SectionHeader'

const RADII = [
  { token: 'radius/rounded-sm', value: '4px', use: 'Inputs, chips, small buttons', r: 4 },
  { token: 'radius/rounded-md', value: '6px', use: 'Default for buttons', r: 6 },
  { token: 'radius/rounded-lg', value: '8px', use: 'Cards, modals', r: 8 },
  { token: 'radius/rounded-xl', value: '12px', use: 'Large surfaces, feature cards', r: 12 },
  { token: 'radius/rounded-full', value: '9999px', use: 'Pills, avatars, toggles', r: 9999 },
]

export default function RadiusSection() {
  return (
    <div>
      <SectionHeader
        title="Radius"
        description="Four radii plus a fully-rounded. Scale the radius to the element: small elements get small radii, pills get full."
      />

      <div className="space-y-4">
        {RADII.map(r => (
          <div key={r.token} className="flex items-center gap-6 py-3 border-b" style={{ borderColor: 'var(--border)' }}>
            <div
              className="flex-shrink-0"
              style={{
                width: '64px',
                height: '40px',
                backgroundColor: 'var(--primary)',
                borderRadius: `${r.r}px`,
                opacity: 0.85,
              }}
            />
            <div className="flex-1">
              <p className="text-sm font-mono font-medium" style={{ color: 'var(--foreground)' }}>
                {r.token}
              </p>
              <p className="text-xs font-mono mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
                {r.value} · {r.use}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
