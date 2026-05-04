import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import ColorSection from './sections/ColorSection'
import TypographySection from './sections/TypographySection'
import SpacingSection from './sections/SpacingSection'
import RadiusSection from './sections/RadiusSection'
import MotionSection from './sections/MotionSection'
import IconographySection from './sections/IconographySection'
import ComponentsSection from './sections/ComponentsSection'
import './index.css'

const SECTIONS = [
  { id: 'color', label: 'Color' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Radius' },
  { id: 'motion', label: 'Motion' },
  { id: 'iconography', label: 'Iconography' },
  { id: 'components', label: 'Components' },
]

export default function App() {
  const [dark, setDark] = useState(false)
  const [active, setActive] = useState('color')

  useEffect(() => {
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <Sidebar
        sections={SECTIONS}
        active={active}
        onSelect={setActive}
        dark={dark}
        onToggleDark={() => setDark(d => !d)}
      />
      <main className="flex-1 ml-56 px-12 py-12 max-w-5xl">
        {active === 'color' && <ColorSection />}
        {active === 'typography' && <TypographySection />}
        {active === 'spacing' && <SpacingSection />}
        {active === 'radius' && <RadiusSection />}
        {active === 'motion' && <MotionSection />}
        {active === 'iconography' && <IconographySection />}
        {active === 'components' && <ComponentsSection />}
      </main>
    </div>
  )
}
