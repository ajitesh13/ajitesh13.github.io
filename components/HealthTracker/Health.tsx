'use client'

import { useState, useEffect, useCallback } from 'react'
import { FOOD_DB } from './nutritionDB'

// ─── TYPES ────────────────────────────────────────────────────────────────
interface FoodItem {
  name: string
  qty: number
}

interface Macros {
  cal: number
  protein: number
  fat: number
  carbs: number
}

type MealName = 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'

interface MealPlan {
  Breakfast: FoodItem[]
  Lunch: FoodItem[]
  Dinner: FoodItem[]
  Snack: FoodItem[]
}

type DayStatus =
  | 'perfect'
  | 'over-all'
  | 'over-cal-fat'
  | 'over-cal-protein'
  | 'over-cal'
  | 'over-fat'
  | 'over-protein'
  | 'under-all'
  | 'under-cal'
  | 'under-protein'
  | 'ok'
  | 'empty'

interface StatusStyle {
  bg: string
  text: string
  label: string
}

interface StorageData {
  plan?: MealPlan
  calendar?: Record<string, FoodItem[]>
}

// ─── DAILY TARGETS (from InBody 27.02.2026) ────────────────────────────────
const TARGETS: Macros = { cal: 1700, protein: 150, fat: 55, carbs: 150 }

// ─── API DATA HELPERS ─────────────────────────────────────────────────────
const loadData = async (): Promise<StorageData> => {
  try {
    const res = await fetch('/api/nutrition-log')
    if (!res.ok) return {}
    const data = await res.json()
    return typeof data === 'object' && data !== null ? data : {}
  } catch {
    return {}
  }
}

const saveData = async (data: StorageData): Promise<void> => {
  try {
    await fetch('/api/nutrition-log', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  } catch {
    // Silently fail; caller can handle if needed
  }
}

// ─── DATE HELPERS ─────────────────────────────────────────────────────────
const toDateKey = (d: Date): string => d.toISOString().slice(0, 10)
const today = (): Date => new Date()
const MONTHS = [
  'Jan',
  'Feb',
  'Mar',
  'Apr',
  'May',
  'Jun',
  'Jul',
  'Aug',
  'Sep',
  'Oct',
  'Nov',
  'Dec'
]
const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

// ─── NUTRITION CALC ───────────────────────────────────────────────────────
function calcNutrition(itemName: string, qty: number): Macros | null {
  const food = FOOD_DB[itemName]
  if (!food) return null
  let factor: number
  if (food.unit === 'g' || food.unit === 'ml') {
    factor = qty / 100
  } else {
    factor = (qty * (food.grams ?? 100)) / 100
  }
  return {
    cal: +(food.cal * factor).toFixed(1),
    protein: +(food.protein * factor).toFixed(1),
    fat: +(food.fat * factor).toFixed(1),
    carbs: +(food.carbs * factor).toFixed(1)
  }
}

function sumNutrition(items: FoodItem[] | undefined | null): Macros {
  return (items ?? []).reduce<Macros>(
    (acc, item) => {
      const n = calcNutrition(item.name, item.qty)
      if (!n) return acc
      return {
        cal: acc.cal + n.cal,
        protein: acc.protein + n.protein,
        fat: acc.fat + n.fat,
        carbs: acc.carbs + n.carbs
      }
    },
    { cal: 0, protein: 0, fat: 0, carbs: 0 }
  )
}

// ─── COLOR CODING ─────────────────────────────────────────────────────────
function getDayStatus(totals: Macros): DayStatus {
  if (!totals || totals.cal === 0) return 'empty'
  const overCal = totals.cal > TARGETS.cal * 1.05
  const overProtein = totals.protein > TARGETS.protein * 1.1
  const overFat = totals.fat > TARGETS.fat * 1.1
  const underCal = totals.cal < TARGETS.cal * 0.85
  const underProtein = totals.protein < TARGETS.protein * 0.85

  if (
    !overCal &&
    !overFat &&
    !underCal &&
    totals.protein >= TARGETS.protein * 0.85
  )
    return 'perfect'
  if (overCal && overFat && overProtein) return 'over-all'
  if (overCal && overFat) return 'over-cal-fat'
  if (overCal && overProtein) return 'over-cal-protein'
  if (overCal) return 'over-cal'
  if (overFat) return 'over-fat'
  if (overProtein) return 'over-protein'
  if (underCal && underProtein) return 'under-all'
  if (underCal) return 'under-cal'
  if (underProtein) return 'under-protein'
  return 'ok'
}

const STATUS_STYLES: Record<DayStatus, StatusStyle> = {
  perfect: { bg: '#0f4c2a', text: '#4ade80', label: 'All Perfect ✓' },
  'over-all': { bg: '#4c0f0f', text: '#f87171', label: 'Over All' },
  'over-cal-fat': { bg: '#4c2a0f', text: '#fb923c', label: 'Over Cal+Fat' },
  'over-cal-protein': {
    bg: '#2a1f4c',
    text: '#a78bfa',
    label: 'Over Cal+Protein'
  },
  'over-cal': { bg: '#3a1f0f', text: '#fbbf24', label: 'Over Calories' },
  'over-fat': { bg: '#3a2a0f', text: '#f59e0b', label: 'Over Fat' },
  'over-protein': { bg: '#1a1a4c', text: '#818cf8', label: 'Over Protein' },
  'under-all': { bg: '#1a1a2a', text: '#94a3b8', label: 'Under Eating' },
  'under-cal': { bg: '#1a2a1a', text: '#6ee7b7', label: 'Under Calories' },
  'under-protein': { bg: '#1a1a3a', text: '#7dd3fc', label: 'Low Protein' },
  ok: { bg: '#1a2a20', text: '#86efac', label: 'On Track' },
  empty: { bg: '#111', text: '#333', label: '' }
}

// ─── MACRO BAR ────────────────────────────────────────────────────────────
interface MacroBarProps {
  label: string
  value: number
  target: number
  color: string
}

function MacroBar({ label, value, target, color }: MacroBarProps) {
  const pct = Math.min((value / target) * 100, 110)
  const over = value > target * 1.05
  return (
    <div style={{ marginBottom: 8 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontSize: 11,
          color: '#94a3b8',
          marginBottom: 3
        }}
      >
        <span>{label}</span>
        <span style={{ color: over ? '#f87171' : '#e2e8f0' }}>
          {Math.round(value)} / {target}
        </span>
      </div>
      <div
        style={{
          height: 6,
          background: '#1e293b',
          borderRadius: 3,
          overflow: 'hidden'
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: over ? '#f87171' : color,
            borderRadius: 3,
            transition: 'width 0.4s ease'
          }}
        />
      </div>
    </div>
  )
}

// ─── FOOD ITEM ROW ────────────────────────────────────────────────────────
interface FoodItemRowProps {
  item: FoodItem
  onRemove?: () => void
}

function FoodItemRow({ item, onRemove }: FoodItemRowProps) {
  const n = calcNutrition(item.name, item.qty)
  const food = FOOD_DB[item.name]
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 10px',
        background: '#0f172a',
        borderRadius: 8,
        marginBottom: 4
      }}
    >
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: '#e2e8f0' }}>{item.name}</div>
        <div style={{ fontSize: 11, color: '#64748b' }}>
          {item.qty} {food?.unit}
        </div>
      </div>
      {n && (
        <div style={{ display: 'flex', gap: 8, fontSize: 11 }}>
          <span style={{ color: '#fbbf24' }}>{Math.round(n.cal)} kcal</span>
          <span style={{ color: '#34d399' }}>{n.protein}g P</span>
          <span style={{ color: '#f87171' }}>{n.fat}g F</span>
        </div>
      )}
      {onRemove && (
        <button
          onClick={onRemove}
          style={{
            background: 'none',
            border: 'none',
            color: '#ef4444',
            cursor: 'pointer',
            fontSize: 16,
            lineHeight: 1,
            padding: '0 4px'
          }}
        >
          ×
        </button>
      )}
    </div>
  )
}

// ─── ADD FOOD FORM ────────────────────────────────────────────────────────
interface AddFoodFormProps {
  onAdd: (item: FoodItem) => void
}

function AddFoodForm({ onAdd }: AddFoodFormProps) {
  const [name, setName] = useState<string>('')
  const [qty, setQty] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])

  const handleNameChange = (v: string): void => {
    setName(v)
    if (v.length > 1) {
      setSuggestions(
        Object.keys(FOOD_DB)
          .filter(k => k.toLowerCase().includes(v.toLowerCase()))
          .slice(0, 6)
      )
    } else {
      setSuggestions([])
    }
  }

  const selectSuggestion = (s: string): void => {
    setName(s)
    setSuggestions([])
  }

  const submit = (): void => {
    if (!FOOD_DB[name] || !qty || isNaN(Number(qty)) || +qty <= 0) return
    onAdd({ name, qty: +qty })
    setName('')
    setQty('')
    setSuggestions([])
  }

  const food = FOOD_DB[name]
  const preview =
    food && qty && !isNaN(Number(qty)) && +qty > 0
      ? calcNutrition(name, +qty)
      : null

  return (
    <div style={{ position: 'relative' }}>
      <div style={{ display: 'flex', gap: 8 }}>
        <div style={{ flex: 2, position: 'relative' }}>
          <input
            value={name}
            onChange={e => handleNameChange(e.target.value)}
            placeholder="Food item..."
            style={{
              width: '100%',
              padding: '8px 12px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 8,
              color: '#e2e8f0',
              fontSize: 13,
              boxSizing: 'border-box',
              outline: 'none'
            }}
          />
          {suggestions.length > 0 && (
            <div
              style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                right: 0,
                background: '#1e293b',
                border: '1px solid #334155',
                borderRadius: 8,
                zIndex: 100,
                overflow: 'hidden'
              }}
            >
              {suggestions.map(s => (
                <div
                  key={s}
                  onClick={() => selectSuggestion(s)}
                  style={{
                    padding: '7px 12px',
                    cursor: 'pointer',
                    fontSize: 12,
                    color: '#cbd5e1',
                    borderBottom: '1px solid #0f172a'
                  }}
                  onMouseEnter={e =>
                    (e.currentTarget.style.background = '#334155')
                  }
                  onMouseLeave={e =>
                    (e.currentTarget.style.background = 'transparent')
                  }
                >
                  {s}
                </div>
              ))}
            </div>
          )}
        </div>
        <div style={{ flex: 1, display: 'flex', gap: 6 }}>
          <input
            value={qty}
            onChange={e => setQty(e.target.value)}
            placeholder={
              food
                ? food.unit === 'g'
                  ? 'grams'
                  : food.unit === 'ml'
                    ? 'ml'
                    : food.unit
                : 'qty'
            }
            type="number"
            min="0"
            style={{
              flex: 1,
              padding: '8px 10px',
              background: '#1e293b',
              border: '1px solid #334155',
              borderRadius: 8,
              color: '#e2e8f0',
              fontSize: 13,
              outline: 'none',
              width: '100%'
            }}
          />
          <button
            onClick={submit}
            style={{
              padding: '8px 14px',
              background: '#22c55e',
              border: 'none',
              borderRadius: 8,
              color: '#000',
              fontWeight: 700,
              cursor: 'pointer',
              fontSize: 14
            }}
          >
            +
          </button>
        </div>
      </div>
      {preview && (
        <div
          style={{
            marginTop: 6,
            fontSize: 11,
            color: '#64748b',
            paddingLeft: 4
          }}
        >
          Preview:{' '}
          <span style={{ color: '#fbbf24' }}>
            {Math.round(preview.cal)} kcal
          </span>{' '}
          · <span style={{ color: '#34d399' }}>{preview.protein}g protein</span>{' '}
          · <span style={{ color: '#f87171' }}>{preview.fat}g fat</span> ·{' '}
          <span style={{ color: '#60a5fa' }}>{preview.carbs}g carbs</span>
        </div>
      )}
    </div>
  )
}

// ─── TOTALS CARD ──────────────────────────────────────────────────────────
interface TotalsCardProps {
  totals: Macros
  title?: string
}

function TotalsCard({ totals, title }: TotalsCardProps) {
  const status = getDayStatus(totals)
  const style = STATUS_STYLES[status]

  const summaryItems: [string, number, string, string][] = [
    ['Calories', Math.round(totals.cal), 'kcal', '#fbbf24'],
    ['Protein', Math.round(totals.protein), 'g', '#34d399'],
    ['Fat', Math.round(totals.fat), 'g', '#f87171'],
    ['Carbs', Math.round(totals.carbs), 'g', '#60a5fa']
  ]

  return (
    <div
      style={{
        background: '#0f172a',
        border: `1px solid ${style.bg === '#111' ? '#1e293b' : style.text}22`,
        borderRadius: 12,
        padding: '14px 16px',
        marginTop: 12
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 12
        }}
      >
        <span
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: 1
          }}
        >
          {title ?? 'Daily Totals'}
        </span>
        {status !== 'empty' && (
          <span
            style={{
              fontSize: 11,
              padding: '2px 8px',
              borderRadius: 20,
              background: style.bg,
              color: style.text,
              fontWeight: 600
            }}
          >
            {style.label}
          </span>
        )}
      </div>
      <MacroBar
        label="Calories"
        value={totals.cal}
        target={TARGETS.cal}
        color="#fbbf24"
      />
      <MacroBar
        label="Protein (g)"
        value={totals.protein}
        target={TARGETS.protein}
        color="#34d399"
      />
      <MacroBar
        label="Fat (g)"
        value={totals.fat}
        target={TARGETS.fat}
        color="#f87171"
      />
      <MacroBar
        label="Carbs (g)"
        value={totals.carbs}
        target={TARGETS.carbs}
        color="#60a5fa"
      />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 8,
          marginTop: 12
        }}
      >
        {summaryItems.map(([label, value, , color]) => (
          <div
            key={label}
            style={{
              textAlign: 'center',
              background: '#1e293b',
              borderRadius: 8,
              padding: '8px 4px'
            }}
          >
            <div style={{ fontSize: 16, fontWeight: 700, color }}>{value}</div>
            <div style={{ fontSize: 10, color: '#64748b' }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── PLAN MODE ─────────────────────────────────────────────────────────────
const MEALS: MealName[] = ['Breakfast', 'Lunch', 'Dinner', 'Snack']

const DEFAULT_PLAN: MealPlan = {
  Breakfast: [],
  Lunch: [],
  Dinner: [],
  Snack: []
}

function PlanMode() {
  const [plan, setPlan] = useState<MealPlan>(DEFAULT_PLAN)
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    loadData()
      .then(data => {
        if (!cancelled) {
          setPlan(data.plan ?? DEFAULT_PLAN)
        }
      })
      .catch(() => {
        if (!cancelled) setLoadError('Failed to load data')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!isLoading) {
      loadData()
        .then(data => saveData({ ...data, plan }))
        .catch(() => {})
    }
  }, [plan, isLoading])

  const addItem = (meal: MealName, item: FoodItem): void =>
    setPlan(p => ({ ...p, [meal]: [...p[meal], item] }))

  const removeItem = (meal: MealName, idx: number): void =>
    setPlan(p => ({ ...p, [meal]: p[meal].filter((_, i) => i !== idx) }))

  const clearMeal = (meal: MealName): void =>
    setPlan(p => ({ ...p, [meal]: [] }))

  const allItems = Object.values(plan).flat()
  const totals = sumNutrition(allItems)

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
          color: '#64748b',
          fontSize: 14
        }}
      >
        Loading…
      </div>
    )
  }

  return (
    <div>
      {loadError && (
        <div
          style={{
            background: '#7f1d1d',
            color: '#fca5a5',
            padding: '8px 12px',
            borderRadius: 8,
            marginBottom: 12,
            fontSize: 12
          }}
        >
          {loadError}
        </div>
      )}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {MEALS.map(meal => {
          const mealTotals = sumNutrition(plan[meal])
          return (
            <div
              key={meal}
              style={{
                background: '#0f172a',
                borderRadius: 12,
                padding: 14,
                border: '1px solid #1e293b'
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: 10
                }}
              >
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: '#94a3b8',
                    textTransform: 'uppercase',
                    letterSpacing: 1
                  }}
                >
                  {meal}
                </span>
                {(plan[meal] ?? []).length > 0 && (
                  <button
                    onClick={() => clearMeal(meal)}
                    style={{
                      fontSize: 10,
                      color: '#ef4444',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    Clear
                  </button>
                )}
              </div>
              {(plan[meal] ?? []).length === 0 ? (
                <div
                  style={{
                    fontSize: 11,
                    color: '#334155',
                    fontStyle: 'italic',
                    marginBottom: 10
                  }}
                >
                  Empty – meal skipped
                </div>
              ) : (
                <div style={{ marginBottom: 8 }}>
                  {(plan[meal] ?? []).map((item, i) => (
                    <FoodItemRow
                      key={i}
                      item={item}
                      onRemove={() => removeItem(meal, i)}
                    />
                  ))}
                  <div
                    style={{
                      fontSize: 11,
                      color: '#64748b',
                      marginTop: 4,
                      paddingLeft: 4
                    }}
                  >
                    Subtotal:{' '}
                    <span style={{ color: '#fbbf24' }}>
                      {Math.round(mealTotals.cal)} kcal
                    </span>{' '}
                    ·{' '}
                    <span style={{ color: '#34d399' }}>
                      {mealTotals.protein}g P
                    </span>{' '}
                    ·{' '}
                    <span style={{ color: '#f87171' }}>
                      {mealTotals.fat}g F
                    </span>
                  </div>
                </div>
              )}
              <AddFoodForm onAdd={item => addItem(meal, item)} />
            </div>
          )
        })}
      </div>
      <TotalsCard totals={totals} title="Planned Day Totals" />
    </div>
  )
}

// ─── ACTUAL MODE ───────────────────────────────────────────────────────────
function ActualMode() {
  const [items, setItems] = useState<FoodItem[]>([])
  const addItem = (item: FoodItem): void => setItems(prev => [...prev, item])
  const removeItem = (idx: number): void =>
    setItems(prev => prev.filter((_, i) => i !== idx))
  const totals = sumNutrition(items)

  return (
    <div>
      <div
        style={{
          background: '#0f172a',
          borderRadius: 12,
          padding: 16,
          border: '1px solid #1e293b',
          marginBottom: 12
        }}
      >
        <div
          style={{
            fontSize: 12,
            fontWeight: 600,
            color: '#64748b',
            textTransform: 'uppercase',
            letterSpacing: 1,
            marginBottom: 12
          }}
        >
          Quick Nutrition Lookup
        </div>
        <AddFoodForm onAdd={addItem} />
        {items.length > 0 && (
          <div style={{ marginTop: 12 }}>
            {items.map((item, i) => (
              <FoodItemRow key={i} item={item} onRemove={() => removeItem(i)} />
            ))}
          </div>
        )}
      </div>
      {items.length > 0 && (
        <TotalsCard totals={totals} title="Session Totals" />
      )}
    </div>
  )
}

// ─── CALENDAR MODE ─────────────────────────────────────────────────────────
function CalendarMode() {
  const [allData, setAllData] = useState<StorageData>({})
  const [isLoading, setIsLoading] = useState(true)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [viewDate, setViewDate] = useState<Date>(() => new Date(2026, 2, 1))
  const [selectedDay, setSelectedDay] = useState<string | null>(null)
  const [editItems, setEditItems] = useState<FoodItem[]>([])

  useEffect(() => {
    let cancelled = false
    loadData()
      .then(data => {
        if (!cancelled) setAllData(data)
      })
      .catch(() => {
        if (!cancelled) setLoadError('Failed to load data')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const calData: Record<string, FoodItem[]> = allData.calendar ?? {}

  const updateCalData = useCallback(
    (dateKey: string, items: FoodItem[]): void => {
      setAllData(prev => {
        const updated: StorageData = {
          ...prev,
          calendar: { ...(prev.calendar ?? {}), [dateKey]: items }
        }
        saveData(updated).catch(() => {})
        return updated
      })
    },
    []
  )

  const year = viewDate.getFullYear()
  const month = viewDate.getMonth()
  const firstDay = new Date(year, month, 1).getDay()
  const daysInMonth = new Date(year, month + 1, 0).getDate()

  const isInRange = (d: number): boolean => {
    const dt = new Date(year, month, d)
    return dt >= new Date(2026, 2, 1) && dt <= new Date(2026, 11, 31)
  }

  const openDay = (d: number): void => {
    if (!isInRange(d)) return
    const dateKey = toDateKey(new Date(year, month, d))
    setSelectedDay(dateKey)
    setEditItems([...(calData[dateKey] ?? [])])
  }

  const saveDay = (): void => {
    if (!selectedDay) return
    updateCalData(selectedDay, editItems)
    setSelectedDay(null)
  }

  const prevMonth = (): void =>
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() - 1, 1))
  const nextMonth = (): void =>
    setViewDate(d => new Date(d.getFullYear(), d.getMonth() + 1, 1))

  const canGoBack = viewDate > new Date(2026, 2, 1)
  const canGoNext = viewDate < new Date(2026, 11, 1)

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 48,
          color: '#64748b',
          fontSize: 14
        }}
      >
        Loading…
      </div>
    )
  }

  return (
    <div>
      {loadError && (
        <div
          style={{
            background: '#7f1d1d',
            color: '#fca5a5',
            padding: '8px 12px',
            borderRadius: 8,
            marginBottom: 12,
            fontSize: 12
          }}
        >
          {loadError}
        </div>
      )}
      {/* Month Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 16
        }}
      >
        <button
          onClick={prevMonth}
          disabled={!canGoBack}
          style={{
            background: canGoBack ? '#1e293b' : 'transparent',
            border: 'none',
            color: canGoBack ? '#94a3b8' : '#1e293b',
            cursor: canGoBack ? 'pointer' : 'default',
            borderRadius: 8,
            padding: '6px 12px',
            fontSize: 18
          }}
        >
          ‹
        </button>
        <span style={{ fontSize: 16, fontWeight: 700, color: '#e2e8f0' }}>
          {MONTHS[month]} {year}
        </span>
        <button
          onClick={nextMonth}
          disabled={!canGoNext}
          style={{
            background: canGoNext ? '#1e293b' : 'transparent',
            border: 'none',
            color: canGoNext ? '#94a3b8' : '#1e293b',
            cursor: canGoNext ? 'pointer' : 'default',
            borderRadius: 8,
            padding: '6px 12px',
            fontSize: 18
          }}
        >
          ›
        </button>
      </div>

      {/* Day Labels */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 3,
          marginBottom: 3
        }}
      >
        {DAYS.map(d => (
          <div
            key={d}
            style={{
              textAlign: 'center',
              fontSize: 10,
              color: '#475569',
              fontWeight: 600,
              padding: '4px 0'
            }}
          >
            {d}
          </div>
        ))}
      </div>

      {/* Calendar Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(7, 1fr)',
          gap: 3
        }}
      >
        {Array.from({ length: firstDay }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}
        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(d => {
          const dateKey = toDateKey(new Date(year, month, d))
          const dayItems: FoodItem[] = calData[dateKey] ?? []
          const totals = sumNutrition(dayItems)
          const status = dayItems.length > 0 ? getDayStatus(totals) : 'empty'
          const s = STATUS_STYLES[status]
          const inRange = isInRange(d)
          const isToday = toDateKey(today()) === dateKey
          return (
            <div
              key={d}
              onClick={() => openDay(d)}
              style={{
                background: inRange ? s.bg : '#0a0a0a',
                border: isToday
                  ? '1px solid #22c55e'
                  : `1px solid ${inRange && status !== 'empty' ? s.text + '33' : '#1a1a1a'}`,
                borderRadius: 8,
                padding: '6px 4px',
                minHeight: 52,
                cursor: inRange ? 'pointer' : 'default',
                transition: 'transform 0.1s',
                opacity: inRange ? 1 : 0.3
              }}
              onMouseEnter={e => {
                if (inRange) e.currentTarget.style.transform = 'scale(1.04)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <div
                style={{
                  fontSize: 11,
                  fontWeight: isToday ? 700 : 500,
                  color: isToday ? '#22c55e' : '#64748b',
                  textAlign: 'center'
                }}
              >
                {d}
              </div>
              {dayItems.length > 0 && (
                <>
                  <div
                    style={{
                      fontSize: 9,
                      color: s.text,
                      textAlign: 'center',
                      fontWeight: 600,
                      marginTop: 2
                    }}
                  >
                    {Math.round(totals.cal)}
                  </div>
                  <div
                    style={{
                      fontSize: 8,
                      color: s.text + 'aa',
                      textAlign: 'center'
                    }}
                  >
                    kcal
                  </div>
                </>
              )}
              {inRange && dayItems.length === 0 && (
                <div
                  style={{
                    fontSize: 8,
                    color: '#1e293b',
                    textAlign: 'center',
                    marginTop: 8
                  }}
                >
                  +
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Legend */}
      <div style={{ marginTop: 14, display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {(Object.entries(STATUS_STYLES) as [DayStatus, StatusStyle][])
          .filter(([k]) => k !== 'empty')
          .map(([k, v]) => (
            <div
              key={k}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 4,
                fontSize: 9
              }}
            >
              <div
                style={{
                  width: 8,
                  height: 8,
                  borderRadius: 2,
                  background: v.bg,
                  border: `1px solid ${v.text}55`
                }}
              />
              <span style={{ color: '#475569' }}>{v.label}</span>
            </div>
          ))}
      </div>

      {/* Day Editor Modal */}
      {selectedDay && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: '#000000bb',
            zIndex: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20
          }}
        >
          <div
            style={{
              background: '#0d1117',
              border: '1px solid #1e293b',
              borderRadius: 16,
              padding: 20,
              width: '100%',
              maxWidth: 500,
              maxHeight: '80vh',
              overflowY: 'auto'
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 14
              }}
            >
              <span style={{ fontSize: 15, fontWeight: 700, color: '#e2e8f0' }}>
                {new Date(selectedDay + 'T00:00:00').toLocaleDateString(
                  'en-IN',
                  { weekday: 'long', day: 'numeric', month: 'long' }
                )}
              </span>
              <button
                onClick={() => setSelectedDay(null)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#64748b',
                  cursor: 'pointer',
                  fontSize: 20
                }}
              >
                ×
              </button>
            </div>
            <AddFoodForm
              onAdd={item => setEditItems(prev => [...prev, item])}
            />
            <div style={{ marginTop: 12 }}>
              {editItems.map((item, i) => (
                <FoodItemRow
                  key={i}
                  item={item}
                  onRemove={() =>
                    setEditItems(prev => prev.filter((_, j) => j !== i))
                  }
                />
              ))}
            </div>
            {editItems.length > 0 && (
              <TotalsCard totals={sumNutrition(editItems)} title="Day Totals" />
            )}
            <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
              <button
                onClick={saveDay}
                style={{
                  flex: 1,
                  padding: '10px 0',
                  background: '#22c55e',
                  border: 'none',
                  borderRadius: 10,
                  color: '#000',
                  fontWeight: 700,
                  cursor: 'pointer',
                  fontSize: 14
                }}
              >
                Save Day
              </button>
              <button
                onClick={() => {
                  updateCalData(selectedDay, [])
                  setEditItems([])
                }}
                style={{
                  padding: '10px 14px',
                  background: '#1e293b',
                  border: 'none',
                  borderRadius: 10,
                  color: '#ef4444',
                  cursor: 'pointer',
                  fontSize: 13
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────
type TabId = 'plan' | 'actual' | 'calendar'

interface Tab {
  id: TabId
  label: string
  icon: string
}

export function HealthTracker() {
  const [mode, setMode] = useState<TabId>('plan')

  const tabs: Tab[] = [
    { id: 'plan', label: 'Plan', icon: '📋' },
    { id: 'actual', label: 'Actual', icon: '⚡' },
    { id: 'calendar', label: 'Calendar', icon: '📅' }
  ]

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', system-ui, sans-serif",
        background: '#0d1117',
        minHeight: '100vh',
        color: '#e2e8f0',
        padding: '0 0 40px 0'
      }}
    >
      {/* Header */}
      <div
        style={{
          background: '#0d1117',
          borderBottom: '1px solid #1e293b',
          padding: '16px 20px',
          position: 'sticky',
          top: 0,
          zIndex: 50
        }}
      >
        <div
          style={{
            maxWidth: 720,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}
        >
          <div>
            <div
              style={{
                fontSize: 18,
                fontWeight: 800,
                color: '#e2e8f0',
                letterSpacing: '-0.5px'
              }}
            >
              Nutrition Tracker
            </div>
            <div style={{ fontSize: 11, color: '#475569', marginTop: 1 }}>
              Targets: {TARGETS.cal} kcal · {TARGETS.protein}g protein ·{' '}
              {TARGETS.fat}g fat
            </div>
          </div>
          <div style={{ fontSize: 11, color: '#334155', textAlign: 'right' }}>
            <div>BMR 1,576 kcal</div>
            <div>BF 25.2% → 15–18%</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: 720, margin: '0 auto', padding: '16px 20px' }}>
        {/* Tabs */}
        <div
          style={{
            display: 'flex',
            gap: 4,
            background: '#0f172a',
            borderRadius: 12,
            padding: 4,
            marginBottom: 20
          }}
        >
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setMode(tab.id)}
              style={{
                flex: 1,
                padding: '9px 0',
                border: 'none',
                borderRadius: 9,
                background: mode === tab.id ? '#1e293b' : 'transparent',
                color: mode === tab.id ? '#e2e8f0' : '#475569',
                fontWeight: mode === tab.id ? 700 : 500,
                cursor: 'pointer',
                fontSize: 13,
                transition: 'all 0.2s',
                boxShadow: mode === tab.id ? '0 1px 3px #00000066' : 'none'
              }}
            >
              {tab.icon} {tab.label}
            </button>
          ))}
        </div>

        {mode === 'plan' && <PlanMode />}
        {mode === 'actual' && <ActualMode />}
        {mode === 'calendar' && <CalendarMode />}
      </div>
    </div>
  )
}
