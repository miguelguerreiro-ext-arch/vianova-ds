import { Moon, Sun } from 'lucide-react'

export default function Sidebar({ sections, active, onSelect, dark, onToggleDark }) {
  return (
    <aside
      className="fixed top-0 left-0 h-screen w-56 flex flex-col border-r"
      style={{
        backgroundColor: 'var(--background)',
        borderColor: 'var(--border)',
      }}
    >
      {/* Wordmark */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'var(--border)' }}>
        <span
          className="text-sm font-semibold tracking-widest uppercase"
          style={{ color: 'var(--vn-brand)' }}
        >
          Vianova
        </span>
        <p className="text-xs mt-0.5" style={{ color: 'var(--muted-foreground)' }}>
          Design System
        </p>
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

      {/* Dark mode toggle */}
      <div className="px-4 py-4 border-t" style={{ borderColor: 'var(--border)' }}>
        <button
          onClick={onToggleDark}
          className="flex items-center gap-2 w-full px-3 py-2 text-sm rounded transition-colors"
          style={{
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--secondary)',
            color: 'var(--secondary-foreground)',
            transitionDuration: 'var(--motion-fast)',
          }}
        >
          {dark ? <Sun size={14} /> : <Moon size={14} />}
          {dark ? 'Light mode' : 'Dark mode'}
        </button>
      </div>
    </aside>
  )
}
