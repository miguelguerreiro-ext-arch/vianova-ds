import { useMemo, useState, Suspense } from 'react'
import { MapPin, Activity, Search } from 'lucide-react'
import { DynamicIcon, iconNames } from 'lucide-react/dynamic'
import SectionHeader from '../components/SectionHeader'

const PAGE_SIZE = 240

function toPascalCase(kebab) {
  return kebab.split('-').map(p => p.charAt(0).toUpperCase() + p.slice(1)).join('')
}

export default function IconographySection() {
  const [query, setQuery] = useState('')
  const [limit, setLimit] = useState(PAGE_SIZE)

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) return iconNames
    return iconNames.filter(n => n.includes(q))
  }, [query])

  const visible = filtered.slice(0, limit)

  return (
    <div>
      <SectionHeader
        title="Iconography"
        description={
          <>
            Icons from the <a href="https://lucide.dev/icons/" target="_blank" rel="noreferrer" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>Lucide</a> icon library
            {' '}(<code style={{ fontFamily: 'monospace' }}>lucide-react@1.11.0</code>),
            {' '}1.33px stroke weight. {iconNames.length} icons available — color always inherits currentColor.
          </>
        }
      />

      {/* Size demo */}
      <div className="mb-10 p-6 rounded-lg flex items-end gap-8" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
        {[
          { size: 12, label: '12px' },
          { size: 16, label: '16px · compact UI' },
          { size: 20, label: '20px · marketing' },
          { size: 24, label: '24px' },
        ].map(s => (
          <div key={s.size} className="flex flex-col items-center gap-2">
            <MapPin size={s.size} strokeWidth={1.33} style={{ color: 'var(--foreground)' }} />
            <span className="text-xs font-mono" style={{ color: 'var(--muted-foreground)' }}>{s.label}</span>
          </div>
        ))}
      </div>

      {/* Color states */}
      <div className="mb-10">
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--muted-foreground)' }}>
          Color states
        </h2>
        <div className="flex gap-6 p-5 rounded-lg" style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
          {[
            { label: 'Default', color: 'var(--foreground)' },
            { label: 'Muted', color: 'var(--muted-foreground)' },
            { label: 'Brand', color: 'var(--primary)' },
            { label: 'Destructive', color: 'var(--destructive)' },
          ].map(s => (
            <div key={s.label} className="flex flex-col items-center gap-2">
              <Activity size={20} strokeWidth={1.33} style={{ color: s.color }} />
              <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Full library */}
      <div>
        <div className="flex items-baseline justify-between mb-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--muted-foreground)' }}>
            Library · {filtered.length} {filtered.length === 1 ? 'icon' : 'icons'}
          </h2>
        </div>

        <div
          className="flex items-center gap-2 mb-4 px-3 py-2 rounded-md"
          style={{ border: '1px solid var(--border)', borderRadius: 'var(--radius-md)', backgroundColor: 'var(--background)' }}
        >
          <Search size={14} strokeWidth={1.33} style={{ color: 'var(--muted-foreground)' }} />
          <input
            type="text"
            placeholder="Search icons…"
            value={query}
            onChange={e => { setQuery(e.target.value); setLimit(PAGE_SIZE) }}
            className="flex-1 bg-transparent outline-none text-sm"
            style={{ color: 'var(--foreground)' }}
          />
          {query && (
            <button
              onClick={() => { setQuery(''); setLimit(PAGE_SIZE) }}
              className="text-xs"
              style={{ color: 'var(--muted-foreground)', background: 'none', border: 'none', cursor: 'pointer' }}
            >
              clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-6 gap-1">
          {visible.map(name => (
            <button
              key={name}
              onClick={() => navigator.clipboard.writeText(`<${toPascalCase(name)} />`)}
              title={`Copy <${toPascalCase(name)} />`}
              className="flex flex-col items-center gap-1.5 p-3 rounded"
              style={{
                borderRadius: 'var(--radius-md)',
                background: 'none', border: 'none', cursor: 'pointer',
                transition: `background-color var(--motion-fast) var(--ease-default)`,
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Suspense fallback={<div style={{ width: 16, height: 16 }} />}>
                <DynamicIcon name={name} size={16} strokeWidth={1.33} style={{ color: 'var(--foreground)' }} />
              </Suspense>
              <span className="text-center leading-tight font-mono" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem', wordBreak: 'break-all' }}>
                {name}
              </span>
            </button>
          ))}
        </div>

        {limit < filtered.length && (
          <div className="mt-6 flex justify-center">
            <button
              onClick={() => setLimit(l => l + PAGE_SIZE)}
              className="px-4 py-2 text-sm rounded-md"
              style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--secondary)',
                color: 'var(--secondary-foreground)',
                cursor: 'pointer',
              }}
            >
              Show more · {filtered.length - limit} remaining
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 p-5 rounded-lg" style={{ backgroundColor: 'var(--muted)', borderRadius: 'var(--radius-lg)' }}>
        <p className="text-sm font-medium mb-2" style={{ color: 'var(--foreground)' }}>Rules</p>
        <ul className="space-y-1.5">
          {[
            'Default size: 16px in compact UI, 20px in marketing.',
            'Color inherits currentColor — never hard-coded hex.',
            'Always align to the cap height of adjacent text.',
            'Use filled variants only for active/selected states.',
            'Never mix stroke weights or libraries on the same surface.',
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
