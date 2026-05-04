import SectionHeader from '../components/SectionHeader'

const TYPE_SCALE = [
  { token: 'text-xxs', size: '10px', rem: '0.625', use: 'Dense labels, metric units' },
  { token: 'text-xs', size: '12px', rem: '0.75', use: 'Captions, table cells' },
  { token: 'text-sm', size: '14px', rem: '0.875', use: 'Body default in compact UI' },
  { token: 'text-base', size: '16px', rem: '1.0', use: 'Body default in marketing' },
  { token: 'text-lg', size: '18px', rem: '1.125', use: 'Lead paragraphs' },
  { token: 'text-xl', size: '20px', rem: '1.25', use: 'Section subheads' },
  { token: 'text-2xl', size: '24px', rem: '1.5', use: 'H4' },
  { token: 'text-3xl', size: '30px', rem: '1.875', use: 'H3' },
  { token: 'text-4xl', size: '36px', rem: '2.25', use: 'H2' },
  { token: 'text-5xl', size: '48px', rem: '3.0', use: 'H1' },
  { token: 'text-6xl', size: '60px', rem: '3.75', use: 'Hero headlines' },
]

const WEIGHTS = [
  { label: 'Thin', weight: 100 },
  { label: 'Extra Light', weight: 200 },
  { label: 'Light', weight: 300 },
  { label: 'Regular', weight: 400 },
  { label: 'Medium', weight: 500 },
  { label: 'Semi Bold', weight: 600 },
  { label: 'Bold', weight: 700 },
  { label: 'Extra Bold', weight: 800 },
  { label: 'Black', weight: 900 },
]

const RECIPES = [
  {
    label: 'Hero',
    spec: 'text-6xl / semi bold + text-lg / regular',
    title: 'Make cities smarter.',
    body: 'AI-native spatial intelligence for urban planners and mobility operators.',
    titleStyle: { fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2 },
    bodyStyle: { fontSize: '1.125rem', fontWeight: 400, lineHeight: 1.5 },
  },
  {
    label: 'Section',
    spec: 'text-4xl / semi bold + text-base / regular',
    title: 'How it works',
    body: 'Connect your data sources and get a live view of how your streets perform.',
    titleStyle: { fontSize: '2.25rem', fontWeight: 600, lineHeight: 1.2 },
    bodyStyle: { fontSize: '1rem', fontWeight: 400, lineHeight: 1.5 },
  },
  {
    label: 'Card',
    spec: 'text-lg / medium + text-sm / regular + text-xs metadata',
    title: 'Trip counts by zone',
    body: 'Hourly aggregation across 12 monitoring sensors in the central district.',
    meta: '14 Apr 2026 · Updated 2 min ago',
    titleStyle: { fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.4 },
    bodyStyle: { fontSize: '0.875rem', fontWeight: 400, lineHeight: 1.5 },
    metaStyle: { fontSize: '0.75rem', fontWeight: 500 },
  },
  {
    label: 'Data label',
    spec: 'text-xxs / medium uppercase + text-2xl / semi bold',
    label2: 'TRIP COUNT',
    value: '24,819',
    labelStyle: { fontSize: '0.625rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase' },
    valueStyle: { fontSize: '1.5rem', fontWeight: 600, lineHeight: 1.2 },
  },
]

function GroupLabel({ children }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest mb-4"
      style={{ color: 'var(--muted-foreground)' }}>
      {children}
    </h2>
  )
}

export default function TypographySection() {
  return (
    <div>
      <SectionHeader
        title="Typography"
        description="Inter is the single typeface across UI, marketing, and documentation. Strong performance at small sizes on dense data displays."
      />

      {/* Typeface specimen */}
      <div className="mb-12 p-8 rounded-xl" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-xl)' }}>
        <p className="text-xs mb-3" style={{ color: 'var(--muted-foreground)' }}>Inter · Variable</p>
        <p style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.1, color: 'var(--foreground)', letterSpacing: '-0.02em' }}>
          AaBbCcDd
        </p>
        <p className="mt-2 text-sm" style={{ color: 'var(--muted-foreground)', fontFamily: 'monospace' }}>
          Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, sans-serif
        </p>
      </div>

      {/* Weight scale */}
      <div className="mb-12">
        <GroupLabel>Weights</GroupLabel>
        <div className="space-y-1">
          {WEIGHTS.map(w => (
            <div key={w.weight} className="flex items-baseline justify-between py-2 border-b" style={{ borderColor: 'var(--border)' }}>
              <span style={{ fontSize: '1.125rem', fontWeight: w.weight, color: 'var(--foreground)' }}>
                The quick brown fox
              </span>
              <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>
                {w.label} · {w.weight}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Type scale */}
      <div className="mb-12">
        <GroupLabel>Type scale</GroupLabel>
        <div className="space-y-1">
          {TYPE_SCALE.map(t => (
            <div
              key={t.token}
              className="flex items-center justify-between py-3 border-b"
              style={{ borderColor: 'var(--border)' }}
            >
              <span style={{ fontSize: t.size, fontWeight: 400, color: 'var(--foreground)', lineHeight: 1.2 }}>
                Vianova
              </span>
              <div className="text-right">
                <p className="text-xs font-mono" style={{ color: 'var(--foreground)' }}>{t.token}</p>
                <p className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>
                  {t.size} · {t.rem}rem · {t.use}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pairing recipes */}
      <div>
        <GroupLabel>Pairing recipes</GroupLabel>
        <div className="space-y-4">
          {RECIPES.map(r => (
            <div
              key={r.label}
              className="p-6"
              style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}
            >
              <div className="flex items-center gap-2 mb-5">
                <span
                  className="px-2 py-0.5 text-xs font-medium rounded"
                  style={{ backgroundColor: 'var(--secondary)', color: 'var(--secondary-foreground)', borderRadius: 'var(--radius-sm)' }}
                >
                  {r.label}
                </span>
                <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>{r.spec}</span>
              </div>

              {r.value ? (
                <div>
                  <p style={{ ...r.labelStyle, color: 'var(--muted-foreground)' }}>{r.label2}</p>
                  <p style={{ ...r.valueStyle, color: 'var(--foreground)' }}>{r.value}</p>
                </div>
              ) : (
                <div>
                  <p style={{ ...r.titleStyle, color: 'var(--foreground)', marginBottom: 8 }}>{r.title}</p>
                  <p style={{ ...r.bodyStyle, color: 'var(--muted-foreground)' }}>{r.body}</p>
                  {r.meta && (
                    <p style={{ ...r.metaStyle, color: 'var(--muted-foreground)', marginTop: 8 }}>{r.meta}</p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
