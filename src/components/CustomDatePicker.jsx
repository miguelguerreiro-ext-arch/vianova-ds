import { useState, useRef, useCallback, useEffect } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown } from 'lucide-react'

const DAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December']
const WEEKDAYS = ['Mo','Tu','We','Th','Fr','Sa','Su']

// Deterministic fake distribution data (Jan 1 2025 → Dec 31 2026 = 730 days)
const DIST_DATA = Array.from({ length: 730 }, (_, i) => {
  const seed = Math.sin(i * 2.4 + 1) * 0.5 + Math.sin(i * 0.3) * 0.3 + Math.sin(i * 7.1) * 0.2
  return Math.max(0.05, (seed + 1) / 2)
})

// 24 months: Jan 2025 – Dec 2026 (neither year is a leap year)
const MONTH_LENGTHS = [31,28,31,30,31,30,31,31,30,31,30,31, 31,28,31,30,31,30,31,31,30,31,30,31]
const MONTH_STARTS  = MONTH_LENGTHS.reduce((acc, _, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + MONTH_LENGTHS[i - 1]); return acc
}, [])
const MONTH_LABELS  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec',
                       'Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']

// Valid date range
const RANGE_MIN_NUM = 20250101  // Jan 1 2025
const RANGE_MAX_NUM = 20261231  // Dec 31 2026

function aggregateBars(interval) {
  if (interval === 'day') {
    return DIST_DATA.map((v, i) => ({ value: v, startDay: i, endDay: i }))
  }
  if (interval === 'week') {
    const numWeeks = Math.ceil(730 / 7) // 105 (last bar = 2 days)
    return Array.from({ length: numWeeks }, (_, w) => {
      const start = w * 7, end = Math.min(start + 6, 729)
      const slice = DIST_DATA.slice(start, end + 1)
      return { value: slice.reduce((a, b) => a + b, 0) / slice.length, startDay: start, endDay: end }
    })
  }
  // month — 24 bars
  return MONTH_LENGTHS.map((len, m) => {
    const start = MONTH_STARTS[m], end = start + len - 1
    const slice = DIST_DATA.slice(start, end + 1)
    return { value: slice.reduce((a, b) => a + b, 0) / slice.length, startDay: start, endDay: end }
  })
}

// Slider ↔ date conversions (Jan 1 2025 → Dec 31 2026 = 730 days)
const SLIDER_ORIGIN = new Date(2025, 0, 1)
const SLIDER_TOTAL  = 730

function dateToIndex(date) {
  const diff = Math.round((date - SLIDER_ORIGIN) / 86400000)
  return Math.max(0, Math.min(SLIDER_TOTAL - 1, diff))
}

function indexToDate(idx) {
  const d = new Date(SLIDER_ORIGIN)
  d.setDate(d.getDate() + idx)
  return d
}

function addMonths(year, month, delta) {
  let m = month + delta
  let y = year
  while (m > 11) { m -= 12; y++ }
  while (m < 0)  { m += 12; y-- }
  return { year: y, month: m }
}

function startOfMonth(year, month) {
  return new Date(year, month, 1).getDay()
}

function daysInMonth(year, month) {
  return new Date(year, month + 1, 0).getDate()
}

function toDateNum(d) {
  return d ? d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate() : null
}

function sameDay(a, b) {
  return a && b && toDateNum(a) === toDateNum(b)
}

function isBetween(d, start, end) {
  const dn = toDateNum(d), sn = toDateNum(start), en = toDateNum(end)
  return dn > sn && dn < en
}

/* ── Range Slider ── */
function RangeSlider({ min, max, valueMin, valueMax, onChange }) {
  const trackRef = useRef(null)
  const dragging = useRef(null)

  const pct = v => ((v - min) / (max - min)) * 100

  const getVal = useCallback((clientX) => {
    const rect = trackRef.current.getBoundingClientRect()
    const ratio = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
    return Math.round(min + ratio * (max - min))
  }, [min, max])

  useEffect(() => {
    const onMove = e => {
      if (!dragging.current) return
      const v = getVal(e.clientX)
      if (dragging.current === 'min') onChange(Math.min(v, valueMax - 1), valueMax)
      else onChange(valueMin, Math.max(v, valueMin + 1))
    }
    const onUp = () => { dragging.current = null }
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseup', onUp)
    return () => { window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
  }, [getVal, onChange, valueMin, valueMax])

  const minPct = pct(valueMin)
  const maxPct = pct(valueMax)

  return (
    <div ref={trackRef} style={{ position: 'relative', height: 4, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.12)', cursor: 'pointer', userSelect: 'none' }}>
      {/* active track */}
      <div style={{
        position: 'absolute', top: 0, height: '100%',
        left: `${minPct}%`, width: `${maxPct - minPct}%`,
        backgroundColor: 'var(--primary)', borderRadius: 2,
      }} />
      {/* min thumb */}
      <div
        onMouseDown={() => { dragging.current = 'min' }}
        style={{
          position: 'absolute', top: '50%', left: `${minPct}%`,
          transform: 'translate(-50%, -50%)',
          width: 16, height: 16, borderRadius: '50%',
          backgroundColor: '#fff', cursor: 'grab', boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
          zIndex: 2,
        }}
      />
      {/* max thumb */}
      <div
        onMouseDown={() => { dragging.current = 'max' }}
        style={{
          position: 'absolute', top: '50%', left: `${maxPct}%`,
          transform: 'translate(-50%, -50%)',
          width: 16, height: 16, borderRadius: '50%',
          backgroundColor: '#fff', cursor: 'grab', boxShadow: '0 1px 4px rgba(0,0,0,0.4)',
          zIndex: 2,
        }}
      />
    </div>
  )
}

/* ── Single Month Calendar ── */
function MonthCalendar({ year, month, startDate, endDate, hoverDate, onDayClick, onDayHover }) {
  const firstDay = startOfMonth(year, month)
  const total = daysInMonth(year, month)
  const cells = []

  for (let i = 0; i < firstDay; i++) cells.push(null)
  for (let d = 1; d <= total; d++) cells.push(new Date(year, month, d))

  return (
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px 0' }}>
        {DAYS.map(d => (
          <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 500, color: 'rgba(255,255,255,0.4)', paddingBottom: 6 }}>
            {d}
          </div>
        ))}
        {cells.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} />

          const dn       = toDateNum(date)
          const disabled = dn < RANGE_MIN_NUM || dn > RANGE_MAX_NUM

          const isStart = sameDay(date, startDate)
          const isEnd   = sameDay(date, endDate)
          const endRef  = endDate || hoverDate
          const inRange = !disabled && startDate && endRef && !isStart && !isEnd && isBetween(date, startDate, endRef)
          const isHover = sameDay(date, hoverDate) && !endDate

          const circleColor = (isStart || isEnd) ? 'var(--primary)' : 'transparent'
          const textColor   = disabled
            ? 'rgba(255,255,255,0.18)'
            : (isStart || isEnd) ? '#fff'
            : inRange ? '#fff'
            : 'rgba(255,255,255,0.75)'
          const rangeBg = inRange ? 'rgba(20,183,165,0.18)' : 'transparent'

          return (
            <div
              key={date.getDate()}
              onClick={() => !disabled && onDayClick(date)}
              onMouseEnter={() => !disabled && onDayHover(date)}
              style={{
                textAlign: 'center', fontSize: '0.78rem',
                cursor: disabled ? 'default' : 'pointer',
                padding: '2px 0', backgroundColor: rangeBg,
                borderRadius: (isStart && endRef && !sameDay(date, endRef)) ? '50% 0 0 50%'
                  : (isEnd && startDate && !sameDay(date, startDate)) ? '0 50% 50% 0'
                  : '0',
              }}
            >
              <span style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 28, height: 28, borderRadius: '50%',
                backgroundColor: disabled ? 'transparent' : circleColor,
                color: textColor,
                outline: !disabled && isHover ? '1px solid var(--primary)' : 'none',
                transition: 'background-color 100ms',
              }}>
                {date.getDate()}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Resample logical bars into at most maxBars display bars
function resampleBars(bars, maxBars) {
  if (bars.length <= maxBars) return bars
  const step = bars.length / maxBars
  return Array.from({ length: maxBars }, (_, i) => {
    const from = Math.floor(i * step)
    const to   = Math.min(Math.floor((i + 1) * step), bars.length) - 1
    const chunk = bars.slice(from, to + 1)
    return {
      value:    chunk.reduce((a, b) => a + b.value, 0) / chunk.length,
      startDay: chunk[0].startDay,
      endDay:   chunk[chunk.length - 1].endDay,
    }
  })
}

const MAX_DISPLAY_BARS = { day: 146, week: 105, month: 24 }

/* ── Distribution Histogram ── */
function DataDistribution({ sliderMin, sliderMax, totalDays, onSliderChange, interval }) {
  const logical = aggregateBars(interval)
  const bars    = resampleBars(logical, MAX_DISPLAY_BARS[interval])
  const maxVal  = Math.max(...bars.map(b => b.value))
  const gap     = interval === 'month' ? 3 : interval === 'week' ? 1 : 0

  return (
    <div style={{ marginBottom: 4 }}>
      {/* bars */}
      <div style={{ display: 'flex', alignItems: 'flex-end', height: 64, gap, marginBottom: 8 }}>
        {bars.map((bar, i) => {
          const active = bar.endDay >= sliderMin && bar.startDay <= sliderMax
          return (
            <div
              key={i}
              style={{
                flex: 1,
                height: `${(bar.value / maxVal) * 100}%`,
                backgroundColor: active ? 'var(--primary)' : 'rgba(255,255,255,0.12)',
                borderRadius: '2px 2px 0 0',
                transition: 'background-color 80ms',
              }}
            />
          )
        })}
      </div>
      {/* slider */}
      <RangeSlider
        min={0} max={totalDays - 1}
        valueMin={sliderMin} valueMax={sliderMax}
        onChange={onSliderChange}
      />
      {/* labels */}
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 6, fontSize: '0.68rem', color: 'rgba(255,255,255,0.4)' }}>
        <span>Jan 1 '25</span>
        <span style={{ color: 'rgba(255,255,255,0.65)' }}>
          {indexToLabel(sliderMin)} – {indexToLabel(sliderMax)}
        </span>
        <span>Dec 31 '26</span>
      </div>
    </div>
  )
}

function indexToLabel(idx) {
  const d = indexToDate(idx)
  return `${MONTHS[d.getMonth()].slice(0, 3)} ${d.getDate()} '${String(d.getFullYear()).slice(2)}`
}

/* ── Hour Select ── */
function HourSelect({ placeholder, value, onChange }) {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const h = i % 12 || 12
    const ampm = i < 12 ? 'AM' : 'PM'
    return `${h}:00 ${ampm}`
  })
  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', appearance: 'none',
          padding: '8px 28px 8px 12px', fontSize: '0.8rem',
          fontFamily: 'inherit', backgroundColor: 'rgba(255,255,255,0.06)',
          color: value ? '#fff' : 'rgba(255,255,255,0.35)',
          border: '1px solid rgba(255,255,255,0.12)',
          borderRadius: 'var(--radius-md)', outline: 'none', cursor: 'pointer',
        }}
      >
        <option value="">{placeholder}</option>
        {hours.map(h => <option key={h} value={h}>{h}</option>)}
      </select>
      <ChevronDown size={13} style={{ position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)', pointerEvents: 'none' }} />
    </div>
  )
}

/* ── Main Component ── */
export default function CustomDatePicker({ onClose, onApply }) {
  // Calendar state — left shows Jan 2025, right shows Feb 2025
  const [leftYear, setLeftYear] = useState(2025)
  const [leftMonth, setLeftMonth] = useState(0) // Jan

  const [startDate, setStartDate] = useState(new Date(2025, 3, 1))   // Apr 1 2025
  const [endDate, setEndDate] = useState(new Date(2025, 8, 30))      // Sep 30 2025
  const [hoverDate, setHoverDate] = useState(null)
  const [selecting, setSelecting] = useState(false)

  // Slider: index 0–729 (Jan 1 2025 → Dec 31 2026)
  const [sliderMin, setSliderMin] = useState(90)   // Apr 1 2025
  const [sliderMax, setSliderMax] = useState(272)  // Sep 30 2025

  // Day of week
  const [selectedDays, setSelectedDays] = useState(['Mo', 'Tu'])

  // Hour
  const [hourFrom, setHourFrom] = useState('')
  const [hourTo, setHourTo] = useState('')

  // Collapsed sections
  const [distOpen, setDistOpen] = useState(true)
  const [dowOpen, setDowOpen] = useState(true)
  const [hourOpen, setHourOpen] = useState(true)

  // Interval
  const [interval, setInterval] = useState('day')

  const right = addMonths(leftYear, leftMonth, 1)

  const canGoPrev = !(leftYear === 2025 && leftMonth === 0)
  const canGoNext = !(right.year === 2026 && right.month === 11)

  function prevMonth() {
    if (!canGoPrev) return
    const p = addMonths(leftYear, leftMonth, -1)
    setLeftYear(p.year); setLeftMonth(p.month)
  }
  function nextMonth() {
    if (!canGoNext) return
    const n = addMonths(leftYear, leftMonth, 1)
    setLeftYear(n.year); setLeftMonth(n.month)
  }

  function handleDayClick(date) {
    if (!selecting || !startDate) {
      setStartDate(date); setEndDate(null); setSelecting(true)
      setSliderMin(dateToIndex(date))
    } else {
      if (toDateNum(date) < toDateNum(startDate)) {
        setStartDate(date); setEndDate(null)
        setSliderMin(dateToIndex(date))
      } else {
        setEndDate(date); setSelecting(false)
        setSliderMin(dateToIndex(startDate))
        setSliderMax(dateToIndex(date))
      }
    }
  }

  function toggleDay(d) {
    setSelectedDays(prev => prev.includes(d) ? prev.filter(x => x !== d) : [...prev, d])
  }

  function handleClearAll() {
    setStartDate(null); setEndDate(null)
    setSelectedDays([])
    setHourFrom(''); setHourTo('')
    setSliderMin(0); setSliderMax(729)
  }

  const panelStyle = {
    width: 480,
    backgroundColor: '#1c1c20',
    borderRadius: 'var(--radius-xl)',
    padding: '20px 20px 16px',
    color: '#fff',
    fontFamily: 'inherit',
    boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
  }

  const sectionLabelStyle = {
    fontSize: '0.78rem', fontWeight: 600, color: 'rgba(255,255,255,0.55)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10,
  }

  const dividerStyle = {
    borderBottom: '1px solid rgba(255,255,255,0.08)', margin: '14px 0',
  }

  return (
    <div style={panelStyle}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Custom date</span>
        <button onClick={handleClearAll} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.5)', cursor: 'pointer', fontSize: '0.82rem', padding: '2px 4px' }}>
          Clear all
        </button>
      </div>

      {/* Calendars */}
      <div style={{ marginBottom: 4 }}>
        {/* Shared header row: arrow · left month · right month · arrow */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <button onClick={prevMonth} disabled={!canGoPrev} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: canGoPrev ? 'pointer' : 'default', color: canGoPrev ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ChevronLeft size={15} />
          </button>
          <div style={{ flex: 1, display: 'flex' }}>
            <div style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>
              {MONTHS[leftMonth]} {leftYear}
            </div>
            <div style={{ flex: 1, textAlign: 'center', fontWeight: 600, fontSize: '0.88rem', color: '#fff' }}>
              {MONTHS[right.month]} {right.year}
            </div>
          </div>
          <button onClick={nextMonth} disabled={!canGoNext} style={{ background: 'rgba(255,255,255,0.06)', border: 'none', borderRadius: 'var(--radius-sm)', cursor: canGoNext ? 'pointer' : 'default', color: canGoNext ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.2)', width: 28, height: 28, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <ChevronRight size={15} />
          </button>
        </div>

        {/* Calendar grids */}
        <div style={{ display: 'flex', gap: 12 }}>
          <MonthCalendar
            year={leftYear} month={leftMonth}
            startDate={startDate} endDate={endDate} hoverDate={hoverDate}
            onDayClick={handleDayClick}
            onDayHover={d => selecting && setHoverDate(d)}
          />
          <MonthCalendar
            year={right.year} month={right.month}
            startDate={startDate} endDate={endDate} hoverDate={hoverDate}
            onDayClick={handleDayClick}
            onDayHover={d => selecting && setHoverDate(d)}
          />
        </div>
      </div>

      <div style={dividerStyle} />

      {/* Data distribution */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ ...sectionLabelStyle, marginBottom: distOpen ? 6 : 0 }}>
          <button
            onClick={() => setDistOpen(v => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: '0.78rem', fontFamily: 'inherit' }}
          >
            <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.4)', transition: 'transform 180ms', transform: distOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
            Data distribution
          </button>
          {distOpen && (
            <span style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              Interval by
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{
                  color: 'var(--primary)', fontWeight: 600,
                  borderBottom: '1px dotted var(--primary)',
                  pointerEvents: 'none', userSelect: 'none',
                }}>
                  {interval}
                </span>
                <select
                  value={interval}
                  onChange={e => setInterval(e.target.value)}
                  style={{
                    position: 'absolute', inset: 0,
                    opacity: 0, cursor: 'pointer',
                    width: '100%', height: '100%',
                  }}
                >
                  <option value="day">day</option>
                  <option value="week">week</option>
                  <option value="month">month</option>
                </select>
              </span>
              {interval === 'day' && (
                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>
                  · {Math.round(SLIDER_TOTAL / MAX_DISPLAY_BARS.day)}d/bar
                </span>
              )}
              {interval === 'week' && (
                <span style={{ color: 'rgba(255,255,255,0.3)', fontWeight: 400 }}>· 7d/bar</span>
              )}
            </span>
          )}
        </div>
        {distOpen && (
          <DataDistribution
            sliderMin={sliderMin}
            sliderMax={sliderMax}
            totalDays={730}
            interval={interval}
          onSliderChange={(mn, mx) => {
            setSliderMin(mn); setSliderMax(mx)
            setStartDate(indexToDate(mn)); setEndDate(indexToDate(mx))
            setSelecting(false)
          }}
          />
        )}
      </div>

      <div style={dividerStyle} />

      {/* Day of week */}
      <div>
        <div style={{ ...sectionLabelStyle, marginBottom: dowOpen ? 10 : 0 }}>
          <button
            onClick={() => setDowOpen(v => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: '0.78rem', fontFamily: 'inherit' }}
          >
            <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.4)', transition: 'transform 180ms', transform: dowOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
            Day of week
          </button>
          {!dowOpen && selectedDays.length > 0 && (
            <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 500 }}>
              {selectedDays.join(', ')}
            </span>
          )}
          {dowOpen && <button onClick={() => setSelectedDays([])} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.72rem', padding: 0 }}>
            Clear all
          </button>}
        </div>
        {dowOpen && (
          <div style={{ display: 'flex', gap: 6 }}>
            {WEEKDAYS.map(d => {
              const active = selectedDays.includes(d)
              return (
                <button
                  key={d}
                  onClick={() => toggleDay(d)}
                  style={{
                    flex: 1, padding: '7px 0', fontSize: '0.78rem', fontWeight: 500,
                    fontFamily: 'inherit', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    border: '1px solid ' + (active ? 'transparent' : 'rgba(255,255,255,0.12)'),
                    backgroundColor: active ? 'var(--primary)' : 'rgba(255,255,255,0.04)',
                    color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                    transition: 'background-color 100ms, color 100ms',
                  }}
                >
                  {d}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div style={dividerStyle} />

      {/* Hour of day */}
      <div>
        <div style={{ ...sectionLabelStyle, marginBottom: hourOpen ? 8 : 0 }}>
          <button
            onClick={() => setHourOpen(v => !v)}
            style={{ display: 'flex', alignItems: 'center', gap: 4, background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: 'rgba(255,255,255,0.55)', fontWeight: 600, fontSize: '0.78rem', fontFamily: 'inherit' }}
          >
            <ChevronDown size={13} style={{ color: 'rgba(255,255,255,0.4)', transition: 'transform 180ms', transform: hourOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
            Hour of day
          </button>
          {!hourOpen && (hourFrom || hourTo) && (
            <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 500 }}>
              {hourFrom || '—'}{hourTo ? ` – ${hourTo}` : ''}
            </span>
          )}
          {hourOpen && <button onClick={() => { setHourFrom(''); setHourTo('') }} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.4)', cursor: 'pointer', fontSize: '0.72rem', padding: 0 }}>
            Clear all
          </button>}
        </div>
        {hourOpen && (
          <div style={{ display: 'flex', gap: 10 }}>
            <HourSelect placeholder="From" value={hourFrom} onChange={setHourFrom} />
            <HourSelect placeholder="To" value={hourTo} onChange={setHourTo} />
          </div>
        )}
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', gap: 10, marginTop: 18 }}>
        <button
          onClick={onClose}
          style={{
            flex: 1, padding: '10px', fontFamily: 'inherit', fontWeight: 500,
            fontSize: '0.875rem', borderRadius: 'var(--radius-md)', cursor: 'pointer',
            backgroundColor: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.12)',
            color: 'rgba(255,255,255,0.75)',
          }}
        >
          Cancel
        </button>
        <button
          onClick={() => onApply?.({ startDate, endDate, selectedDays, hourFrom, hourTo, sliderMin, sliderMax })}
          style={{
            flex: 2, padding: '10px', fontFamily: 'inherit', fontWeight: 600,
            fontSize: '0.875rem', borderRadius: 'var(--radius-md)', cursor: 'pointer',
            backgroundColor: 'var(--primary)', border: 'none', color: '#fff',
          }}
        >
          Apply changes
        </button>
      </div>
    </div>
  )
}
