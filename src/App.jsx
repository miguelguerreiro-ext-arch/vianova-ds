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
import ChangelogSection from './sections/ChangelogSection'
import './index.css'

const SECTION_GROUPS = [
  {
    label: 'Foundations',
    items: [
      { id: 'logo', label: 'Logo' },
      { id: 'color', label: 'Color' },
      { id: 'typography', label: 'Typography' },
      { id: 'spacing', label: 'Spacing' },
      { id: 'radius', label: 'Radius' },
      { id: 'shadow', label: 'Shadow' },
      { id: 'motion', label: 'Motion' },
      { id: 'iconography', label: 'Iconography' },
    ],
  },
  {
    label: 'Components',
    items: [
      { id: 'components:buttons',     label: 'Buttons' },
      { id: 'components:badges',      label: 'Badges' },
      { id: 'components:inputs',      label: 'Form inputs' },
      { id: 'components:alerts',      label: 'Alerts' },
      { id: 'components:cards',       label: 'Data cards' },
      { id: 'components:datepicker',  label: 'Date picker' },
      { id: 'components:topbar',      label: 'Topbar' },
      { id: 'components:toolbuttons', label: 'Tool buttons' },
      { id: 'components:menutools',   label: 'Menu tools' },
      { id: 'components:menuitem',    label: 'Menu item' },
      { id: 'components:datapanel',   label: 'Data panel' },
      { id: 'components:datalayer',   label: 'Data layer' },
      { id: 'components:tabviz',      label: 'Tab visualization' },
    ],
  },
  {
    label: 'Change Log',
    items: [
      { id: 'changelog', label: 'History' },
    ],
  },
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

  // scroll to top on view change for "every component is its own page" feel
  const handleSelect = (id) => {
    setActive(id)
    window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' })
  }

  const componentView = active.startsWith('components:') ? active.split(':')[1] : null

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: 'var(--background)', color: 'var(--foreground)' }}>
      <Sidebar
        groups={SECTION_GROUPS}
        active={active}
        onSelect={handleSelect}
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
        {componentView           && <ComponentsSection view={componentView} />}
        {active === 'changelog'  && <ChangelogSection />}
      </main>
    </div>
  )
}
