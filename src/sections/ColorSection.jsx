import SectionHeader from '../components/SectionHeader'

function Swatch({ token, usage }) {
  return (
    <div style={{ borderRadius: 'var(--radius-lg)', border: '1px solid var(--border)', overflow: 'hidden' }}>
      <div style={{ height: 56, backgroundColor: `var(--${token})` }} />
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
  { token: 'primary',          usage: 'Primary actions, active nav, key CTAs' },
  { token: 'primary-foreground', usage: 'Text / icons on primary backgrounds' },
  { token: 'secondary',        usage: 'Secondary buttons, chips, tags' },
  { token: 'secondary-foreground', usage: 'Text on secondary backgrounds' },
  { token: 'muted',            usage: 'Passive backgrounds, skeleton loaders' },
  { token: 'muted-foreground', usage: 'Secondary text, captions, placeholders' },
  { token: 'accent',           usage: 'Hover backgrounds' },
  { token: 'destructive',      usage: 'Errors, delete actions' },
  { token: 'background',       usage: 'Page background' },
  { token: 'foreground',       usage: 'Body text' },
  { token: 'card',             usage: 'Card / panel surfaces' },
  { token: 'border',           usage: 'Dividers, outlines, input borders' },
]

const SYNTAX = [
  { token: 'syntax-string',   usage: 'String literals' },
  { token: 'syntax-number',   usage: 'Numeric values' },
  { token: 'syntax-property', usage: 'Property / key names' },
]

export default function ColorSection() {
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

      <div>
        <GroupLabel>Syntax highlighting</GroupLabel>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {SYNTAX.map(t => <Swatch key={t.token} {...t} />)}
        </div>
      </div>
    </div>
  )
}
