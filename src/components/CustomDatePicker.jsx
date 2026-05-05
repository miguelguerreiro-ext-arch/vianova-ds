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

// Valid date range
const RANGE_MIN_NUM = 20250101
const RANGE_MAX_NUM = 20261231

function aggregateBars(interval) {
  if (interval === 'day') {
    return DIST_DATA.map((v, i) => ({ value: v, startDay: i, endDay: i }))
  }
  if (interval === 'week') {
    const numWeeks = Math.ceil(730 / 7)
    return Array.from({ length: numWeeks }, (_, w) => {
      const start = w * 7, end = Math.min(start + 6, 729)
      const slice = DIST_DATA.slice(start, end + 1)
      return { value: slice.reduce((a, b) => a + b, 0) / slice.length, startDay: start, endDay: end }
    })
  }
  return MONTH_LENGTHS.map((len, m) => {
    const start = MONTH_STARTS[m], end = start + len - 1
    const slice = DIST_DATA.slice(start, end + 1)
    return { value: slice.reduce((a, b) => a + b, 0) / slice.length, startDay: start, endDay: end }
  })
}

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
  let m = month + delta, y = year
  while (m > 11) { m -= 12; y++ }
  while (m < 0)  { m += 12; y-- }
  return { year: y, month: m }
}

function startOfMonth(year, month) { return new Date(year, month, 1).getDay() }
function daysInMonth(year, month)  { return new Date(year, month + 1, 0).getDate() }
function toDateNum(d) { return d ? d.getFullYear() * 10000 + d.getMonth() * 100 + d.getDate() : null }
function sameDay(a, b) { return a && b && toDateNum(a) === toDateNum(b) }
function isBetween(d, start, end) {
  const dn = toDateNum(d), sn = toDateNum(start), en = toDateNum(end)
  return dn > sn && dn < en
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
          <div key={d} style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 500, color: 'var(--muted-foreground)', paddingBottom: 6 }}>
            {d}
          </div>
        ))}
        {cells.map((date, idx) => {
          if (!date) return <div key={`empty-${idx}`} />

          const dn       = toDateNum(date)
          const disabled = dn < RANGE_MIN_NUM || dn > RANGE_MAX_NUM
          const isStart  = sameDay(date, startDate)
          const isEnd    = sameDay(date, endDate)
          const endRef   = endDate || hoverDate
          const inRange  = !disabled && startDate && endRef && !isStart && !isEnd && isBetween(date, startDate, endRef)
          const isHover  = sameDay(date, hoverDate) && !endDate

          const circleColor = (isStart || isEnd) ? 'var(--primary)' : 'transparent'
          const textColor   = disabled
            ? 'var(--border)'
            : (isStart || isEnd) ? 'var(--primary-foreground)'
            : inRange ? 'var(--primary-foreground)'
            : 'var(--foreground)'
          const rangeBg = inRange
            ? 'color-mix(in srgb, var(--primary) 15%, transparent)'
            : 'transparent'

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

const X_TICKS = [
  { label: "Jan '25", day: 0 },
  { label: "Apr '25", day: 90 },
  { label: "Jul '25", day: 181 },
  { label: "Oct '25", day: 274 },
  { label: "Jan '26", day: 365 },
  { label: "Apr '26", day: 455 },
  { label: "Jul '26", day: 546 },
  { label: "Oct '26", day: 638 },
  { label: "Dec '26", day: 729 },
]

const Y_AXIS_W = 28

function DataDistribution({ rangeMin, rangeMax, totalDays, interval }) {
  const logical = aggregateBars(interval)
  const bars    = resampleBars(logical, MAX_DISPLAY_BARS[interval])
  const maxVal  = Math.max(...bars.map(b => b.value))
  const gap     = interval === 'month' ? 3 : interval === 'week' ? 1 : 0

  return (
    <div style={{ marginBottom: 4 }}>
      <div style={{ display: 'flex', gap: 6 }}>
        {/* Y-axis */}
        <div style={{ width: Y_AXIS_W, flexShrink: 0, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', alignItems: 'flex-end', height: 64 }}>
          {['max', '50%', '0'].map(l => (
            <span key={l} style={{ color: 'var(--muted-foreground)', fontSize: '0.6rem', lineHeight: 1 }}>{l}</span>
          ))}
        </div>

        {/* Chart */}
        <div style={{ flex: 1, position: 'relative', height: 64 }}>
          {[0, '50%', '100%'].map(top => (
            <div key={top} style={{ position: 'absolute', left: 0, right: 0, height: 1, top, backgroundColor: 'var(--border)', opacity: 0.5, pointerEvents: 'none' }} />
          ))}
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '100%', gap, position: 'relative', zIndex: 1 }}>
            {bars.map((bar, i) => {
              const active = rangeMin != null && rangeMax != null
                ? bar.endDay >= rangeMin && bar.startDay <= rangeMax
                : false
              return (
                <div key={i} style={{
                  flex: 1,
                  height: `${(bar.value / maxVal) * 100}%`,
                  backgroundColor: active ? 'var(--primary)' : 'var(--secondary)',
                  borderRadius: '2px 2px 0 0',
                  transition: 'background-color 80ms',
                }} />
              )
            })}
          </div>
        </div>
      </div>

      {/* X-axis */}
      <div style={{ paddingLeft: Y_AXIS_W + 6, position: 'relative', height: 14, marginTop: 8 }}>
        {X_TICKS.map(({ label, day }) => {
          const pct = (day / (totalDays - 1)) * 100
          return (
            <span key={label} style={{
              color: 'var(--muted-foreground)', fontSize: '0.6rem', lineHeight: 1,
              position: 'absolute',
              left: `${pct}%`,
              transform: pct === 0 ? 'none' : pct === 100 ? 'translateX(-100%)' : 'translateX(-50%)',
              whiteSpace: 'nowrap',
            }}>
              {label}
            </span>
          )
        })}
      </div>
    </div>
  )
}

/* ── Hour Select ── */
function HourSelect({ placeholder, value, onChange }) {
  const hours = Array.from({ length: 24 }, (_, i) => {
    const h = i % 12 || 12
    return `${h}:00 ${i < 12 ? 'AM' : 'PM'}`
  })
  return (
    <div style={{ position: 'relative', flex: 1 }}>
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', appearance: 'none',
          padding: '8px 28px 8px 12px', fontSize: '0.8rem',
          fontFamily: 'inherit',
          backgroundColor: 'var(--secondary)',
          color: value ? 'var(--foreground)' : 'var(--muted-foreground)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-md)', outline: 'none', cursor: 'pointer',
        }}
      >
        <option value="">{placeholder}</option>
        {hours.map(h => <option key={h} value={h}>{h}</option>)}
      </select>
      <ChevronDown size={13} style={{ position: 'absolute', right: 9, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted-foreground)', pointerEvents: 'none' }} />
    </div>
  )
}

/* ── Picker Dropdown ── */
function PickerDropdown({ onClose, children }) {
  return (
    <>
      <div
        style={{ position: 'fixed', inset: 0, zIndex: 99 }}
        onClick={e => { e.stopPropagation(); onClose() }}
      />
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'absolute', top: 'calc(100% + 6px)',
          left: '50%', transform: 'translateX(-50%)',
          zIndex: 100,
          backgroundColor: 'var(--popover)',
          border: '1px solid var(--border)',
          borderRadius: 10,
          padding: 8,
          boxShadow: '0 12px 40px rgba(0,0,0,0.25)',
        }}
      >
        {children}
      </div>
    </>
  )
}

/* ── Main Component ── */
export default function CustomDatePicker({ onClose, onApply }) {
  const [leftYear, setLeftYear]   = useState(2025)
  const [leftMonth, setLeftMonth] = useState(0)
  const [openPicker, setOpenPicker] = useState(null)
  const [startDate, setStartDate] = useState(new Date(2025, 3, 1))
  const [endDate, setEndDate]     = useState(new Date(2025, 8, 30))
  const [hoverDate, setHoverDate] = useState(null)
  const [selecting, setSelecting] = useState(false)
  const [sliderMin, setSliderMin] = useState(90)
  const [sliderMax, setSliderMax] = useState(272)
  const [selectedDays, setSelectedDays] = useState(['Mo', 'Tu'])
  const [hourFrom, setHourFrom]   = useState('')
  const [hourTo, setHourTo]       = useState('')
  const [distOpen, setDistOpen]   = useState(true)
  const [dowOpen, setDowOpen]     = useState(true)
  const [hourOpen, setHourOpen]   = useState(true)
  const [interval, setInterval]   = useState('day')

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

  function selectLeftMonth(m) {
    if (leftYear === 2026 && m === 11) return
    setLeftMonth(m); setOpenPicker(null)
  }
  function selectLeftYear(y) {
    let m = leftMonth
    if (y === 2026 && m > 10) m = 10
    setLeftYear(y); setLeftMonth(m); setOpenPicker(null)
  }
  function selectRightMonth(m) {
    if (right.year === 2025 && m === 0) return
    const newLeft = addMonths(right.year, m, -1)
    setLeftYear(newLeft.year); setLeftMonth(newLeft.month); setOpenPicker(null)
  }
  function selectRightYear(y) {
    const newLeft = addMonths(y, right.month, -1)
    if (newLeft.year < 2025) { setLeftYear(2025); setLeftMonth(0) }
    else if (newLeft.year > 2026 || (newLeft.year === 2026 && newLeft.month > 10)) { setLeftYear(2026); setLeftMonth(10) }
    else { setLeftYear(newLeft.year); setLeftMonth(newLeft.month) }
    setOpenPicker(null)
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
    backgroundColor: 'var(--card)',
    borderRadius: 'var(--radius-xl)',
    padding: '20px 20px 16px',
    color: 'var(--card-foreground)',
    fontFamily: 'inherit',
    border: '1px solid var(--border)',
    boxShadow: '0 24px 64px rgba(0,0,0,0.15)',
  }

  const sectionLabelStyle = {
    fontSize: '0.78rem', fontWeight: 600, color: 'var(--muted-foreground)',
    display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 10,
  }

  const dividerStyle = {
    borderBottom: '1px solid var(--border)', margin: '14px 0',
  }

  const navBtnStyle = (enabled) => ({
    background: 'var(--secondary)', border: 'none',
    borderRadius: 'var(--radius-sm)',
    cursor: enabled ? 'pointer' : 'default',
    color: enabled ? 'var(--foreground)' : 'var(--border)',
    width: 28, height: 28,
    display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  })

  const sectionToggleBtnStyle = {
    display: 'flex', alignItems: 'center', gap: 4,
    background: 'none', border: 'none', padding: 0,
    cursor: 'pointer', color: 'var(--muted-foreground)',
    fontWeight: 600, fontSize: '0.78rem', fontFamily: 'inherit',
  }

  const MONTH_SHORT = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']
  const YEARS = [2025, 2026]

  return (
    <div style={panelStyle}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <span style={{ fontWeight: 600, fontSize: '0.95rem' }}>Custom date</span>
        <button onClick={handleClearAll} style={{ background: 'none', border: 'none', color: 'var(--muted-foreground)', cursor: 'pointer', fontSize: '0.82rem', padding: '2px 4px' }}>
          Clear all
        </button>
      </div>

      {/* Calendars */}
      <div style={{ marginBottom: 4 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
          <button onClick={prevMonth} disabled={!canGoPrev} style={navBtnStyle(canGoPrev)}>
            <ChevronLeft size={15} />
          </button>

          {[
            { side: 'left',  month: leftMonth,   year: leftYear,   onMonth: selectLeftMonth,  onYear: selectLeftYear },
            { side: 'right', month: right.month,  year: right.year, onMonth: selectRightMonth, onYear: selectRightYear },
          ].map(({ side, month, year, onMonth, onYear }) => {
            const btnStyle = {
              background: 'none', border: 'none', padding: '2px 4px',
              fontFamily: 'inherit', fontWeight: 600, fontSize: '0.88rem',
              color: 'var(--foreground)',
              cursor: 'pointer', borderRadius: 4,
              borderBottom: '1px dotted var(--border)',
              lineHeight: 1,
            }
            return (
              <div key={side} style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4 }}>
                {/* Month picker */}
                <div style={{ position: 'relative' }}>
                  <button style={btnStyle} onClick={e => { e.stopPropagation(); setOpenPicker(p => p === `${side}-month` ? null : `${side}-month`) }}>
                    {MONTHS[month]}
                  </button>
                  {openPicker === `${side}-month` && (
                    <PickerDropdown onClose={() => setOpenPicker(null)}>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 3, width: 162 }}>
                        {MONTHS.map((m, i) => {
                          const disabled = (side === 'left' && year === 2026 && i === 11) ||
                                           (side === 'right' && year === 2025 && i === 0)
                          const active = i === month
                          return (
                            <button key={m} disabled={disabled} onClick={() => onMonth(i)} style={{
                              padding: '7px 4px', fontSize: '0.75rem', borderRadius: 6,
                              border: 'none', cursor: disabled ? 'not-allowed' : 'pointer',
                              fontFamily: 'inherit', fontWeight: active ? 600 : 400,
                              backgroundColor: active ? 'var(--primary)' : 'transparent',
                              color: disabled ? 'var(--border)' : active ? 'var(--primary-foreground)' : 'var(--foreground)',
                              transition: 'background-color 100ms',
                            }}>
                              {MONTH_SHORT[i]}
                            </button>
                          )
                        })}
                      </div>
                    </PickerDropdown>
                  )}
                </div>

                {/* Year picker */}
                <div style={{ position: 'relative' }}>
                  <button style={btnStyle} onClick={e => { e.stopPropagation(); setOpenPicker(p => p === `${side}-year` ? null : `${side}-year`) }}>
                    {year}
                  </button>
                  {openPicker === `${side}-year` && (
                    <PickerDropdown onClose={() => setOpenPicker(null)}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 3, width: 80 }}>
                        {YEARS.map(y => (
                          <button key={y} onClick={() => onYear(y)} style={{
                            padding: '7px 8px', fontSize: '0.8rem', borderRadius: 6,
                            border: 'none', cursor: 'pointer', fontFamily: 'inherit',
                            fontWeight: y === year ? 600 : 400,
                            backgroundColor: y === year ? 'var(--primary)' : 'transparent',
                            color: y === year ? 'var(--primary-foreground)' : 'var(--foreground)',
                            transition: 'background-color 100ms',
                          }}>
                            {y}
                          </button>
                        ))}
                      </div>
                    </PickerDropdown>
                  )}
                </div>
              </div>
            )
          })}

          <button onClick={nextMonth} disabled={!canGoNext} style={navBtnStyle(canGoNext)}>
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
          <button onClick={() => setDistOpen(v => !v)} style={sectionToggleBtnStyle}>
            <ChevronDown size={13} style={{ color: 'var(--muted-foreground)', transition: 'transform 180ms', transform: distOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
            Data distribution
          </button>
          {distOpen && (
            <span style={{ fontSize: '0.72rem', display: 'flex', alignItems: 'center', gap: 4 }}>
              Interval by
              <span style={{ position: 'relative', display: 'inline-block' }}>
                <span style={{ color: 'var(--primary)', fontWeight: 600, borderBottom: '1px dotted var(--primary)', pointerEvents: 'none', userSelect: 'none' }}>
                  {interval}
                </span>
                <select value={interval} onChange={e => setInterval(e.target.value)}
                  style={{ position: 'absolute', inset: 0, opacity: 0, cursor: 'pointer', width: '100%', height: '100%' }}>
                  <option value="day">day</option>
                  <option value="week">week</option>
                  <option value="month">month</option>
                </select>
              </span>
              {interval === 'day' && (
                <span style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>
                  · {Math.round(SLIDER_TOTAL / MAX_DISPLAY_BARS.day)}d/bar
                </span>
              )}
              {interval === 'week' && (
                <span style={{ color: 'var(--muted-foreground)', fontWeight: 400 }}>· 7d/bar</span>
              )}
            </span>
          )}
        </div>
        {distOpen && (
          <DataDistribution rangeMin={sliderMin} rangeMax={sliderMax} totalDays={730} interval={interval} />
        )}
      </div>

      <div style={dividerStyle} />

      {/* Day of week */}
      <div>
        <div style={{ ...sectionLabelStyle, marginBottom: dowOpen ? 10 : 0 }}>
          <button onClick={() => setDowOpen(v => !v)} style={sectionToggleBtnStyle}>
            <ChevronDown size={13} style={{ color: 'var(--muted-foreground)', transition: 'transform 180ms', transform: dowOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
            Day of week
          </button>
          {!dowOpen && selectedDays.length > 0 && (
            <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 500 }}>{selectedDays.join(', ')}</span>
          )}
          {dowOpen && (
            <button onClick={() => setSelectedDays([])} style={{ background: 'none', border: 'none', color: 'var(--muted-foreground)', cursor: 'pointer', fontSize: '0.72rem', padding: 0 }}>
              Clear all
            </button>
          )}
        </div>
        {dowOpen && (
          <div style={{ display: 'flex', gap: 6 }}>
            {WEEKDAYS.map(d => {
              const active = selectedDays.includes(d)
              return (
                <button key={d} onClick={() => toggleDay(d)} style={{
                  flex: 1, padding: '7px 0', fontSize: '0.78rem', fontWeight: 500,
                  fontFamily: 'inherit', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                  border: '1px solid ' + (active ? 'transparent' : 'var(--border)'),
                  backgroundColor: active ? 'var(--primary)' : 'transparent',
                  color: active ? 'var(--primary-foreground)' : 'var(--foreground)',
                  transition: 'background-color 100ms, color 100ms',
                }}>
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
          <button onClick={() => setHourOpen(v => !v)} style={sectionToggleBtnStyle}>
            <ChevronDown size={13} style={{ color: 'var(--muted-foreground)', transition: 'transform 180ms', transform: hourOpen ? 'rotate(0deg)' : 'rotate(-90deg)' }} />
            Hour of day
          </button>
          {!hourOpen && (hourFrom || hourTo) && (
            <span style={{ fontSize: '0.72rem', color: 'var(--primary)', fontWeight: 500 }}>
              {hourFrom || '—'}{hourTo ? ` – ${hourTo}` : ''}
            </span>
          )}
          {hourOpen && (
            <button onClick={() => { setHourFrom(''); setHourTo('') }} style={{ background: 'none', border: 'none', color: 'var(--muted-foreground)', cursor: 'pointer', fontSize: '0.72rem', padding: 0 }}>
              Clear all
            </button>
          )}
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
        <button onClick={onClose} style={{
          flex: 1, padding: '10px', fontFamily: 'inherit', fontWeight: 500,
          fontSize: '0.875rem', borderRadius: 'var(--radius-md)', cursor: 'pointer',
          backgroundColor: 'var(--secondary)',
          border: '1px solid var(--border)',
          color: 'var(--foreground)',
        }}>
          Cancel
        </button>
        <button onClick={() => onApply?.({ startDate, endDate, selectedDays, hourFrom, hourTo, sliderMin, sliderMax })} style={{
          flex: 2, padding: '10px', fontFamily: 'inherit', fontWeight: 600,
          fontSize: '0.875rem', borderRadius: 'var(--radius-md)', cursor: 'pointer',
          backgroundColor: 'var(--primary)', border: 'none',
          color: 'var(--primary-foreground)',
        }}>
          Apply changes
        </button>
      </div>
    </div>
  )
}
