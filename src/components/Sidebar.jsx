const THEME_OPTIONS = [
  { value: '',           label: 'Light' },
  { value: 'dark',       label: 'Dark' },
  { value: 'dark-stone', label: 'Dark Stone' },
  { value: 'dark-slate', label: 'Dark Slate' },
  { value: 'aisin',      label: 'Aisin' },
  { value: 'here',       label: 'HERE' },
]

export default function Sidebar({ sections, active, onSelect, theme, onThemeChange }) {
  return (
    <aside
      className="fixed top-0 left-0 h-screen w-56 flex flex-col border-r"
      style={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
    >
      {/* Wordmark */}
      <div className="px-6 py-5 border-b" style={{ borderColor: 'var(--border)', display: 'flex', alignItems: 'center', gap: 10 }}>
        <img src="/logo.png" alt="Vianova DS" style={{ width: 32, height: 32, flexShrink: 0 }} />
        <div>
          <span
            className="text-sm font-semibold tracking-widest uppercase"
            style={{ color: 'var(--primary)' }}
          >
            Vianova
          </span>
          <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
            Design System
          </p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto">
        <p
          className="px-3 mb-2 text-xs font-medium uppercase tracking-widest"
          style={{ color: 'var(--muted-foreground)' }}
        >
          Foundations
        </p>
        {sections.map(s => (
          <button
            key={s.id}
            onClick={() => onSelect(s.id)}
            className="w-full text-left px-3 py-2 rounded text-sm transition-colors"
            style={{
              borderRadius: 'var(--radius-md)',
              backgroundColor: active === s.id ? 'var(--primary)' : 'transparent',
              color: active === s.id ? 'var(--primary-foreground)' : 'var(--foreground)',
              transitionDuration: 'var(--motion-fast)',
            }}
          >
            {s.label}
          </button>
        ))}
      </nav>

      {/* Theme selector */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <p className="text-xs font-medium mb-2 px-1" style={{ color: 'var(--muted-foreground)' }}>
          Theme
        </p>
        <div style={{ position: 'relative' }}>
          <select
            value={theme}
            onChange={e => onThemeChange(e.target.value)}
            style={{
              width: '100%',
              appearance: 'none',
              padding: '7px 28px 7px 10px',
              fontSize: '0.8rem',
              fontFamily: 'inherit',
              fontWeight: 500,
              backgroundColor: 'var(--secondary)',
              color: 'var(--secondary-foreground)',
              border: '1px solid var(--border)',
              borderRadius: 'var(--radius-md)',
              outline: 'none',
              cursor: 'pointer',
            }}
          >
            {THEME_OPTIONS.map(o => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
          <svg
            width="12" height="12" viewBox="0 0 12 12"
            style={{ position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: 'var(--muted-foreground)' }}
            fill="none" stroke="currentColor" strokeWidth="1.5"
          >
            <path d="M2 4l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </aside>
  )
}
