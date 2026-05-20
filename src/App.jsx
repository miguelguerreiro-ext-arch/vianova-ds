import { useState, useEffect } from 'react'
import Sidebar from './components/Sidebar'
import LogoSection from './sections/LogoSection'
import ColorSection from './sections/ColorSection'
import TypographySection from './sections/TypographySection'
import SpacingSection from './sections/SpacingSection'
import RadiusSection from './sections/RadiusSection'
import ShadowSection from './sections/ShadowSection'
import MotionSection from './sections/MotionSection'
import IconographySection from './sections/IconographySection'
import ComponentsSection from './sections/ComponentsSection'
import './index.css'

const SECTIONS = [
  { id: 'logo', label: 'Logo' },
  { id: 'color', label: 'Color' },
  { id: 'typography', label: 'Typography' },
  { id: 'spacing', label: 'Spacing' },
  { id: 'radius', label: 'Radius' },
  { id: 'shadow', label: 'Shadow' },
  { id: 'motion', label: 'Motion' },
  { id: 'iconography', label: 'Iconography' },
  { id: 'components', label: 'Components' },
]

const THEMES = ['', 'dark', 'dark-stone', 'dark-slate', 'aisin', 'here']

export default function App() {
  const [theme, setTheme] = useState('')
  const [active, setActive] = useState('color')

  useEffect(() => {
    const root = document.documentElement
    THEMES.forEach(t => { if (t) root.classList.remove(t) })
    if (theme) root.classList.add(theme)
  }, [theme])

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <Sidebar
        sections={SECTIONS}
        active={active}
        onSelect={setActive}
        theme={theme}
        onThemeChange={setTheme}
      />
      <main className="flex-1 ml-56 px-12 py-12 max-w-5xl">
        {active === 'logo'       && <LogoSection />}
        {active === 'color'      && <ColorSection />}
        {active === 'typography' && <TypographySection />}
        {active === 'spacing'    && <SpacingSection />}
        {active === 'radius'     && <RadiusSection />}
        {active === 'shadow'     && <ShadowSection />}
        {active === 'motion'     && <MotionSection />}
        {active === 'iconography'&& <IconographySection />}
        {active === 'components' && <ComponentsSection />}
      </main>
    </div>
  )
}
