import {
  MapPin, Layers, BarChart2, TrendingUp, AlertCircle, CheckCircle2,
  ChevronRight, ChevronDown, Search, Filter, Download, Upload,
  Settings, User, Bell, Eye, EyeOff, Clock, Calendar,
  ArrowUpRight, ArrowDownRight, Zap, Shield, Globe, Activity,
  Navigation, Route, Car, Bike, Bus, Footprints,
  Plus, Minus, X, Check, Info, MoreHorizontal
} from 'lucide-react'
import SectionHeader from '../components/SectionHeader'

const ICONS = [
  MapPin, Layers, BarChart2, TrendingUp, AlertCircle, CheckCircle2,
  ChevronRight, ChevronDown, Search, Filter, Download, Upload,
  Settings, User, Bell, Eye, EyeOff, Clock, Calendar,
  ArrowUpRight, ArrowDownRight, Zap, Shield, Globe, Activity,
  Navigation, Route, Car, Bike, Bus, Footprints,
  Plus, Minus, X, Check, Info, MoreHorizontal
]

const ICON_NAMES = [
  'MapPin', 'Layers', 'BarChart2', 'TrendingUp', 'AlertCircle', 'CheckCircle2',
  'ChevronRight', 'ChevronDown', 'Search', 'Filter', 'Download', 'Upload',
  'Settings', 'User', 'Bell', 'Eye', 'EyeOff', 'Clock', 'Calendar',
  'ArrowUpRight', 'ArrowDownRight', 'Zap', 'Shield', 'Globe', 'Activity',
  'Navigation', 'Route', 'Car', 'Bike', 'Bus', 'Footprints',
  'Plus', 'Minus', 'X', 'Check', 'Info', 'MoreHorizontal'
]

export default function IconographySection() {
  return (
    <div>
      <SectionHeader
        title="Iconography"
        description="Lucide icons, 1.5px stroke weight. Color always inherits currentColor — never hard-coded hex."
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
            <MapPin size={s.size} style={{ color: 'var(--foreground)' }} />
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
              <Activity size={20} style={{ color: s.color }} />
              <span className="text-xs" style={{ color: 'var(--muted-foreground)' }}>{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Icon grid */}
      <div>
        <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'var(--muted-foreground)' }}>
          Library sample
        </h2>
        <div className="grid grid-cols-6 gap-1">
          {ICONS.map((Icon, i) => (
            <div
              key={ICON_NAMES[i]}
              className="flex flex-col items-center gap-1.5 p-3 rounded cursor-default"
              style={{
                borderRadius: 'var(--radius-md)',
                transition: `background-color var(--motion-fast) var(--ease-default)`,
              }}
              onMouseEnter={e => e.currentTarget.style.backgroundColor = 'var(--accent)'}
              onMouseLeave={e => e.currentTarget.style.backgroundColor = 'transparent'}
            >
              <Icon size={16} style={{ color: 'var(--foreground)' }} />
              <span className="text-xs text-center leading-tight" style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem' }}>
                {ICON_NAMES[i]}
              </span>
            </div>
          ))}
        </div>
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
