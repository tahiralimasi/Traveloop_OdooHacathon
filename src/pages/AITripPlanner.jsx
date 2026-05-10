import React, { useState } from 'react'

const GROQ_API_KEY = import.meta.env.VITE_GROQ_API_KEY

const cityEmojis = {
  default: '🌍',
  mumbai: '🌊', delhi: '🏛️', bangalore: '🌿', ahmedabad: '🏙️',
  jaipur: '🏰', goa: '🏖️', kerala: '🌴', varanasi: '🕌',
  agra: '🕌', kolkata: '🎭'
}

export default function AITripPlanner() {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    city: '', days: 1, startDate: '', budget: '', travelers: 1, preferences: []
  })
  const [loading, setLoading] = useState(false)
  const [plan, setPlan] = useState(null)
  const [error, setError] = useState('')

  const preferenceOptions = [
    { label: '🏛️ Culture', value: 'culture' },
    { label: '🍜 Food', value: 'food' },
    { label: '🏞️ Nature', value: 'nature' },
    { label: '🛍️ Shopping', value: 'shopping' },
    { label: '🎭 Entertainment', value: 'entertainment' },
    { label: '🕌 Spiritual', value: 'spiritual' },
    { label: '🏄 Adventure', value: 'adventure' },
    { label: '📸 Photography', value: 'photography' },
  ]

  const togglePreference = (val) => {
    setForm(f => ({
      ...f,
      preferences: f.preferences.includes(val)
        ? f.preferences.filter(p => p !== val)
        : [...f.preferences, val]
    }))
  }

  const buildPrompt = () => {
    return `You are an expert travel planner. Create a detailed ${form.days}-day travel itinerary for ${form.city}, India.

Details:
- City: ${form.city}
- Duration: ${form.days} day(s)
- Start Date: ${form.startDate}
- Total Budget: ₹${form.budget} for ${form.travelers} traveler(s)
- Interests: ${form.preferences.length > 0 ? form.preferences.join(', ') : 'general sightseeing'}

IMPORTANT RULES:
1. Budget per person is ₹${Math.round(form.budget / form.travelers)}
2. If the budget is too low (less than ₹500 per person per day), respond ONLY with: "BUDGET_TOO_LOW:₹[minimum amount needed]"
3. Plan must strictly stay within total budget of ₹${form.budget}
4. Include specific time slots for each activity (e.g., 8:00 AM - 10:00 AM)
5. Include entry fees, meal costs, transport costs
6. Recommend 3 hotel options near attractions with price per night
7. Include local food recommendations with approximate costs

Respond in this EXACT JSON format (no markdown, no extra text, just pure JSON):
{
  "feasible": true,
  "totalEstimatedCost": 0,
  "days": [
    {
      "day": 1,
      "date": "Day 1 - [date]",
      "activities": [
        {
          "time": "8:00 AM - 10:00 AM",
          "place": "Place Name",
          "description": "What to do here",
          "cost": 200,
          "type": "sightseeing",
          "tips": "Helpful tip"
        }
      ],
      "meals": [
        {
          "type": "Breakfast",
          "restaurant": "Restaurant Name",
          "dish": "Recommended dish",
          "cost": 150
        }
      ],
      "transport": {
        "mode": "Auto/Taxi/Metro",
        "estimatedCost": 300
      },
      "dayTotal": 1500
    }
  ],
  "hotels": [
    {
      "name": "Hotel Name",
      "type": "Budget/Mid-range/Luxury",
      "pricePerNight": 1200,
      "rating": 4.2,
      "location": "Near [landmark]",
      "amenities": ["WiFi", "AC", "Breakfast"],
      "bookingTip": "Book 2 days in advance"
    }
  ],
  "budgetSummary": {
    "accommodation": 2400,
    "food": 1500,
    "transport": 800,
    "activities": 1200,
    "total": 5900,
    "remaining": 100
  },
  "travelTips": ["Tip 1", "Tip 2", "Tip 3"]
}`
  }

  const generatePlan = async () => {
    if (!form.city || !form.startDate || !form.budget) {
      setError('Please fill all required fields.')
      return
    }
    setError('')
    setLoading(true)
    setPlan(null)

    try {
      const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${GROQ_API_KEY}`
  },
  body: JSON.stringify({
    model: 'llama-3.3-70b-versatile',
    messages: [{ role: 'user', content: buildPrompt() }],
    temperature: 0.7,
    max_tokens: 4096
  })
})
const data = await response.json()
const text = data?.choices?.[0]?.message?.content || ''

      if (text.startsWith('BUDGET_TOO_LOW:')) {
        const minBudget = text.split(':')[1]
        setError(`BUDGET_LOW:${minBudget}`)
        setLoading(false)
        return
      }

      const cleaned = text.replace(/```json|```/g, '').trim()
      const parsed = JSON.parse(cleaned)
      setPlan(parsed)
      setStep(3)
    } catch (err) {
      setError('Something went wrong. Please check your API key or try again.')
    }
    setLoading(false)
  }

  const activityTypeColors = {
    sightseeing: { bg: '#e0f2fe', text: '#0369a1', icon: '🏛️' },
    food: { bg: '#fef3c7', text: '#92400e', icon: '🍽️' },
    nature: { bg: '#d1fae5', text: '#065f46', icon: '🌿' },
    shopping: { bg: '#fce7f3', text: '#9d174d', icon: '🛍️' },
    entertainment: { bg: '#ede9fe', text: '#4c1d95', icon: '🎭' },
    spiritual: { bg: '#fff7ed', text: '#c2410c', icon: '🕌' },
    transport: { bg: '#f1f5f9', text: '#475569', icon: '🚗' },
    adventure: { bg: '#d1fae5', text: '#065f46', icon: '🏄' },
  }

  const hotelTypeColors = {
    'Budget': { bg: '#d1fae5', text: '#065f46' },
    'Mid-range': { bg: '#e0f2fe', text: '#0369a1' },
    'Luxury': { bg: '#ede9fe', text: '#4c1d95' },
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px 24px' }}>
      <div style={{ maxWidth: '860px', margin: '0 auto' }}>

        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '36px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '10px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            borderRadius: '16px', padding: '10px 24px', marginBottom: '16px'
          }}>
            <span style={{ fontSize: '24px' }}>✨</span>
            <span style={{ color: 'white', fontWeight: '800', fontSize: '16px' }}>AI-Powered Trip Planner</span>
          </div>
          <h1 style={{ fontSize: '32px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
            Plan Your Perfect Trip
          </h1>
          <p style={{ color: '#64748b', fontSize: '16px' }}>
            Tell us where you want to go and we'll create a personalized itinerary
          </p>
        </div>

        {/* Steps indicator */}
        {step < 3 && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0', marginBottom: '32px' }}>
            {['Trip Details', 'Preferences', 'Your Plan'].map((s, i) => (
              <div key={s} style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '50%',
                    background: step > i ? '#6366f1' : step === i + 1 ? '#6366f1' : '#e2e8f0',
                    color: step >= i + 1 ? 'white' : '#94a3b8',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontWeight: '800', fontSize: '14px'
                  }}>{step > i + 1 ? '✓' : i + 1}</div>
                  <span style={{ fontSize: '12px', fontWeight: '600', color: step === i + 1 ? '#6366f1' : '#94a3b8' }}>{s}</span>
                </div>
                {i < 2 && <div style={{ width: '80px', height: '2px', background: step > i + 1 ? '#6366f1' : '#e2e8f0', margin: '0 8px', marginBottom: '22px' }} />}
              </div>
            ))}
          </div>
        )}

        {/* STEP 1 */}
        {step === 1 && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', marginBottom: '24px' }}>🗺️ Trip Details</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {/* City */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  📍 Destination City *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ahmedabad, Mumbai, Jaipur..."
                  value={form.city}
                  onChange={e => setForm({ ...form, city: e.target.value })}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '12px',
                    border: '2px solid #e2e8f0', fontSize: '15px', background: '#f8fafc',
                    transition: 'border 0.2s'
                  }}
                  onFocus={e => e.target.style.borderColor = '#6366f1'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
                {/* Quick city picks */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                  {['Ahmedabad', 'Mumbai', 'Jaipur', 'Goa', 'Delhi', 'Varanasi'].map(city => (
                    <button key={city} onClick={() => setForm({ ...form, city })} style={{
                      padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                      background: form.city === city ? '#6366f1' : '#f1f5f9',
                      color: form.city === city ? 'white' : '#64748b',
                      border: form.city === city ? 'none' : '1px solid #e2e8f0'
                    }}>{city}</button>
                  ))}
                </div>
              </div>

              {/* Days and Travelers */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    📅 Number of Days *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => setForm(f => ({ ...f, days: Math.max(1, f.days - 1) }))} style={{
                      width: '40px', height: '40px', borderRadius: '10px', background: '#f1f5f9',
                      color: '#374151', fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>−</button>
                    <span style={{ fontSize: '24px', fontWeight: '800', color: '#6366f1', minWidth: '40px', textAlign: 'center' }}>{form.days}</span>
                    <button onClick={() => setForm(f => ({ ...f, days: Math.min(14, f.days + 1) }))} style={{
                      width: '40px', height: '40px', borderRadius: '10px', background: '#6366f1',
                      color: 'white', fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>+</button>
                  </div>
                  <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>Max 14 days</p>
                </div>

                <div>
                  <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                    👥 Travelers *
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <button onClick={() => setForm(f => ({ ...f, travelers: Math.max(1, f.travelers - 1) }))} style={{
                      width: '40px', height: '40px', borderRadius: '10px', background: '#f1f5f9',
                      color: '#374151', fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>−</button>
                    <span style={{ fontSize: '24px', fontWeight: '800', color: '#6366f1', minWidth: '40px', textAlign: 'center' }}>{form.travelers}</span>
                    <button onClick={() => setForm(f => ({ ...f, travelers: Math.min(20, f.travelers + 1) }))} style={{
                      width: '40px', height: '40px', borderRadius: '10px', background: '#6366f1',
                      color: 'white', fontSize: '20px', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center'
                    }}>+</button>
                  </div>
                  <p style={{ fontSize: '11px', color: '#94a3b8', marginTop: '6px' }}>Max 20 people</p>
                </div>
              </div>

              {/* Start Date */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  🗓️ Start Date *
                </label>
                <input
                  type="date"
                  value={form.startDate}
                  min={new Date().toISOString().split('T')[0]}
                  onChange={e => setForm({ ...form, startDate: e.target.value })}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '12px',
                    border: '2px solid #e2e8f0', fontSize: '15px', background: '#f8fafc'
                  }}
                  onFocus={e => e.target.style.borderColor = '#6366f1'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
              </div>

              {/* Budget */}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  💰 Total Budget (₹) *
                </label>
                <input
                  type="number"
                  placeholder="e.g. 5000"
                  value={form.budget}
                  onChange={e => setForm({ ...form, budget: e.target.value })}
                  style={{
                    width: '100%', padding: '14px 16px', borderRadius: '12px',
                    border: '2px solid #e2e8f0', fontSize: '15px', background: '#f8fafc'
                  }}
                  onFocus={e => e.target.style.borderColor = '#6366f1'}
                  onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                />
                {/* Quick budget picks */}
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '10px' }}>
                  {[2000, 5000, 10000, 20000, 50000].map(b => (
                    <button key={b} onClick={() => setForm({ ...form, budget: b })} style={{
                      padding: '5px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                      background: Number(form.budget) === b ? '#6366f1' : '#f1f5f9',
                      color: Number(form.budget) === b ? 'white' : '#64748b',
                      border: Number(form.budget) === b ? 'none' : '1px solid #e2e8f0'
                    }}>₹{b.toLocaleString()}</button>
                  ))}
                </div>
                {form.budget && form.days && form.travelers && (
                  <p style={{ fontSize: '12px', color: '#6366f1', marginTop: '8px', fontWeight: '600' }}>
                    ≈ ₹{Math.round(form.budget / form.travelers / form.days).toLocaleString()} per person per day
                  </p>
                )}
              </div>

              {error && !error.startsWith('BUDGET_LOW') && (
                <div style={{ padding: '12px 16px', background: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca' }}>
                  <p style={{ color: '#dc2626', fontSize: '13px', fontWeight: '600' }}>⚠️ {error}</p>
                </div>
              )}

              <button onClick={() => {
                if (!form.city || !form.startDate || !form.budget) { setError('Please fill all required fields.'); return }
                setError(''); setStep(2)
              }} style={{
                width: '100%', padding: '16px',
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: 'white', borderRadius: '12px', fontSize: '16px', fontWeight: '700',
                boxShadow: '0 4px 15px rgba(99,102,241,0.3)', marginTop: '8px'
              }}>
                Continue to Preferences →
              </button>
            </div>
          </div>
        )}

        {/* STEP 2 */}
        {step === 2 && (
          <div style={{ background: 'white', borderRadius: '24px', padding: '36px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>🎯 Your Preferences</h2>
            <p style={{ color: '#64748b', fontSize: '14px', marginBottom: '24px' }}>Select what you enjoy (optional)</p>

            {/* Summary card */}
            <div style={{
              background: 'linear-gradient(135deg, #ede9fe, #e0f2fe)',
              borderRadius: '16px', padding: '20px', marginBottom: '24px',
              display: 'flex', gap: '24px', flexWrap: 'wrap'
            }}>
              {[
                { icon: '📍', label: form.city },
                { icon: '📅', label: `${form.days} day${form.days > 1 ? 's' : ''}` },
                { icon: '👥', label: `${form.travelers} traveler${form.travelers > 1 ? 's' : ''}` },
                { icon: '💰', label: `₹${Number(form.budget).toLocaleString()}` },
              ].map(item => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <span>{item.icon}</span>
                  <span style={{ fontWeight: '700', color: '#1e293b', fontSize: '14px' }}>{item.label}</span>
                </div>
              ))}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '28px' }}>
              {preferenceOptions.map(pref => {
                const isSelected = form.preferences.includes(pref.value)
                return (
                  <button key={pref.value} onClick={() => togglePreference(pref.value)} style={{
                    padding: '16px 10px', borderRadius: '14px', fontSize: '13px', fontWeight: '700',
                    background: isSelected ? '#6366f1' : '#f8fafc',
                    color: isSelected ? 'white' : '#374151',
                    border: `2px solid ${isSelected ? '#6366f1' : '#e2e8f0'}`,
                    cursor: 'pointer', transition: 'all 0.2s',
                    display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px'
                  }}>
                    <span style={{ fontSize: '24px' }}>{pref.label.split(' ')[0]}</span>
                    <span>{pref.label.split(' ')[1]}</span>
                  </button>
                )
              })}
            </div>

            {error && (
              <div style={{ padding: '12px 16px', background: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca', marginBottom: '16px' }}>
                <p style={{ color: '#dc2626', fontSize: '13px', fontWeight: '600' }}>⚠️ {error}</p>
              </div>
            )}

            <div style={{ display: 'flex', gap: '12px' }}>
              <button onClick={() => setStep(1)} style={{
                flex: 1, padding: '14px', background: '#f1f5f9', color: '#374151',
                borderRadius: '12px', fontSize: '15px', fontWeight: '700'
              }}>← Back</button>
              <button onClick={generatePlan} disabled={loading} style={{
                flex: 2, padding: '14px',
                background: loading ? '#a5b4fc' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: '700',
                boxShadow: loading ? 'none' : '0 4px 15px rgba(99,102,241,0.3)'
              }}>
                {loading ? '✨ Generating Your Plan...' : '✨ Generate AI Trip Plan'}
              </button>
            </div>
          </div>
        )}

        {/* BUDGET TOO LOW error */}
        {error.startsWith('BUDGET_LOW:') && (
          <div style={{
            background: 'white', borderRadius: '24px', padding: '40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)', textAlign: 'center', marginTop: '16px'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '16px' }}>😔</div>
            <h2 style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>Budget Too Low</h2>
            <p style={{ color: '#64748b', fontSize: '15px', marginBottom: '20px', lineHeight: '1.6' }}>
              Sorry, your current budget of <strong>₹{Number(form.budget).toLocaleString()}</strong> is not enough for a {form.days}-day trip to {form.city} for {form.travelers} person(s).
            </p>
            <div style={{ background: '#fef3c7', borderRadius: '16px', padding: '20px', marginBottom: '24px' }}>
              <p style={{ color: '#92400e', fontSize: '15px', fontWeight: '700' }}>
                💡 Minimum recommended budget: <span style={{ fontSize: '20px', color: '#d97706' }}>{error.split(':')[1]}</span>
              </p>
            </div>
            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
              <button onClick={() => { setError(''); setStep(1) }} style={{
                padding: '12px 24px', background: '#6366f1', color: 'white',
                borderRadius: '10px', fontWeight: '700', fontSize: '14px'
              }}>Update Budget</button>
            </div>
          </div>
        )}

        {/* LOADING */}
        {loading && (
          <div style={{
            background: 'white', borderRadius: '24px', padding: '60px 40px',
            boxShadow: '0 4px 20px rgba(0,0,0,0.06)', textAlign: 'center', marginTop: '16px'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px', animation: 'spin 2s linear infinite' }}>✈️</div>
            <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>
              AI is planning your trip...
            </h3>
            <p style={{ color: '#64748b' }}>Finding best places, hotels & activities in {form.city}</p>
            <div style={{ display: 'flex', justifyContent: 'center', gap: '6px', marginTop: '24px' }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{
                  width: '10px', height: '10px', borderRadius: '50%', background: '#6366f1',
                  opacity: 0.4 + i * 0.3
                }} />
              ))}
            </div>
          </div>
        )}

        {/* STEP 3 — RESULTS */}
        {step === 3 && plan && (
          <div>
            {/* Trip Header */}
            <div style={{
              background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
              borderRadius: '24px', padding: '32px', marginBottom: '24px', color: 'white'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <p style={{ opacity: 0.85, fontSize: '13px', marginBottom: '6px' }}>✨ AI Generated Plan</p>
                  <h2 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>
                    {cityEmojis[form.city.toLowerCase()] || cityEmojis.default} {form.city} Trip
                  </h2>
                  <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', opacity: 0.9, fontSize: '14px' }}>
                    <span>📅 {form.days} Day{form.days > 1 ? 's' : ''}</span>
                    <span>👥 {form.travelers} Traveler{form.travelers > 1 ? 's' : ''}</span>
                    <span>💰 ₹{Number(form.budget).toLocaleString()} Budget</span>
                  </div>
                </div>
                <button onClick={() => { setPlan(null); setStep(1); setForm({ city: '', days: 1, startDate: '', budget: '', travelers: 1, preferences: [] }) }} style={{
                  padding: '10px 18px', background: 'rgba(255,255,255,0.2)',
                  color: 'white', borderRadius: '10px', fontWeight: '600', fontSize: '13px',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>🔄 Plan Again</button>
              </div>
            </div>

            {/* Budget Summary */}
            {plan.budgetSummary && (
              <div style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: '800', color: '#1e293b', marginBottom: '16px', fontSize: '17px' }}>💰 Budget Summary</h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '12px', marginBottom: '16px' }}>
                  {[
                    { label: 'Accommodation', value: plan.budgetSummary.accommodation, icon: '🏨', color: '#ede9fe', tc: '#6366f1' },
                    { label: 'Food', value: plan.budgetSummary.food, icon: '🍽️', color: '#fef3c7', tc: '#d97706' },
                    { label: 'Transport', value: plan.budgetSummary.transport, icon: '🚗', color: '#e0f2fe', tc: '#0369a1' },
                    { label: 'Activities', value: plan.budgetSummary.activities, icon: '🎯', color: '#d1fae5', tc: '#059669' },
                  ].map(item => (
                    <div key={item.label} style={{ background: item.color, borderRadius: '12px', padding: '14px', textAlign: 'center' }}>
                      <div style={{ fontSize: '20px', marginBottom: '4px' }}>{item.icon}</div>
                      <p style={{ fontSize: '11px', color: '#64748b', fontWeight: '600' }}>{item.label}</p>
                      <p style={{ fontSize: '16px', fontWeight: '800', color: item.tc }}>₹{(item.value || 0).toLocaleString()}</p>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '12px 16px', background: plan.budgetSummary.remaining >= 0 ? '#f0fdf4' : '#fef2f2', borderRadius: '10px', border: `1px solid ${plan.budgetSummary.remaining >= 0 ? '#bbf7d0' : '#fecaca'}` }}>
                  <span style={{ fontWeight: '700', color: '#1e293b' }}>Total Estimated: ₹{(plan.budgetSummary.total || 0).toLocaleString()}</span>
                  <span style={{ fontWeight: '700', color: plan.budgetSummary.remaining >= 0 ? '#059669' : '#dc2626' }}>
                    {plan.budgetSummary.remaining >= 0 ? `✅ ₹${plan.budgetSummary.remaining.toLocaleString()} saved` : `⚠️ ₹${Math.abs(plan.budgetSummary.remaining).toLocaleString()} over`}
                  </span>
                </div>
              </div>
            )}

            {/* Day-wise Itinerary */}
            {plan.days && plan.days.map((day, di) => (
              <div key={di} style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div style={{
                      width: '44px', height: '44px', borderRadius: '12px',
                      background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: 'white', fontWeight: '800', fontSize: '18px'
                    }}>{day.day}</div>
                    <div>
                      <h3 style={{ fontWeight: '800', color: '#1e293b', fontSize: '17px' }}>{day.date}</h3>
                      {day.dayTotal && <p style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600' }}>Est. ₹{day.dayTotal.toLocaleString()}</p>}
                    </div>
                  </div>
                </div>

                {/* Activities */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
                  {day.activities && day.activities.map((act, ai) => {
                    const typeStyle = activityTypeColors[act.type] || activityTypeColors.sightseeing
                    return (
                      <div key={ai} style={{
                        display: 'flex', gap: '16px', padding: '16px',
                        background: '#f8fafc', borderRadius: '14px', border: '1px solid #e2e8f0'
                      }}>
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '60px' }}>
                          <div style={{ fontSize: '22px', marginBottom: '4px' }}>{typeStyle.icon}</div>
                          <span style={{ fontSize: '10px', fontWeight: '700', textAlign: 'center', color: '#94a3b8' }}>
                            {act.time?.split(' - ')[0]}
                          </span>
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '4px' }}>
                            <h4 style={{ fontWeight: '700', color: '#1e293b', fontSize: '15px' }}>{act.place}</h4>
                            <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: '700', background: typeStyle.bg, color: typeStyle.text, whiteSpace: 'nowrap' }}>
                              {act.cost === 0 ? 'FREE' : `₹${act.cost}`}
                            </span>
                          </div>
                          <p style={{ fontSize: '12px', color: '#94a3b8', marginBottom: '6px' }}>⏰ {act.time}</p>
                          <p style={{ fontSize: '13px', color: '#374151', lineHeight: '1.5', marginBottom: '6px' }}>{act.description}</p>
                          {act.tips && (
                            <p style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600' }}>💡 {act.tips}</p>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>

                {/* Meals */}
                {day.meals && day.meals.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <h4 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '10px', fontSize: '14px' }}>🍽️ Meals</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '10px' }}>
                      {day.meals.map((meal, mi) => (
                        <div key={mi} style={{ background: '#fef3c7', borderRadius: '10px', padding: '12px' }}>
                          <p style={{ fontSize: '11px', fontWeight: '700', color: '#92400e', marginBottom: '4px' }}>{meal.type}</p>
                          <p style={{ fontSize: '13px', fontWeight: '600', color: '#1e293b' }}>{meal.restaurant}</p>
                          <p style={{ fontSize: '12px', color: '#64748b' }}>{meal.dish}</p>
                          <p style={{ fontSize: '13px', fontWeight: '700', color: '#d97706', marginTop: '4px' }}>₹{meal.cost}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Transport */}
                {day.transport && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 14px', background: '#f1f5f9', borderRadius: '10px' }}>
                    <span style={{ fontSize: '13px', color: '#374151', fontWeight: '600' }}>🚗 Transport: {day.transport.mode}</span>
                    <span style={{ fontSize: '13px', fontWeight: '700', color: '#6366f1' }}>₹{day.transport.estimatedCost}</span>
                  </div>
                )}
              </div>
            ))}

            {/* Hotels */}
            {plan.hotels && plan.hotels.length > 0 && (
              <div style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 12px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: '800', color: '#1e293b', marginBottom: '20px', fontSize: '17px' }}>🏨 Recommended Hotels</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {plan.hotels.map((hotel, hi) => {
                    const htc = hotelTypeColors[hotel.type] || hotelTypeColors['Budget']
                    return (
                      <div key={hi} style={{
                        padding: '20px', borderRadius: '16px', border: '1px solid #e2e8f0',
                        background: '#f8fafc'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                          <div>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                              <h4 style={{ fontWeight: '800', color: '#1e293b', fontSize: '16px' }}>{hotel.name}</h4>
                              <span style={{ padding: '3px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', background: htc.bg, color: htc.text }}>{hotel.type}</span>
                            </div>
                            <p style={{ fontSize: '13px', color: '#64748b' }}>📍 {hotel.location}</p>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <p style={{ fontSize: '20px', fontWeight: '800', color: '#6366f1' }}>₹{(hotel.pricePerNight || 0).toLocaleString()}</p>
                            <p style={{ fontSize: '11px', color: '#94a3b8' }}>per night</p>
                            {hotel.rating && <p style={{ fontSize: '13px', color: '#f59e0b', fontWeight: '700' }}>★ {hotel.rating}</p>}
                          </div>
                        </div>
                        {hotel.amenities && (
                          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '8px' }}>
                            {hotel.amenities.map(am => (
                              <span key={am} style={{ padding: '3px 10px', borderRadius: '20px', background: '#e0f2fe', color: '#0369a1', fontSize: '11px', fontWeight: '600' }}>{am}</span>
                            ))}
                          </div>
                        )}
                        {hotel.bookingTip && (
                          <p style={{ fontSize: '12px', color: '#6366f1', fontWeight: '600' }}>💡 {hotel.bookingTip}</p>
                        )}
                      </div>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Travel Tips */}
            {plan.travelTips && plan.travelTips.length > 0 && (
              <div style={{ background: 'linear-gradient(135deg, #ede9fe, #e0f2fe)', borderRadius: '20px', padding: '28px', marginBottom: '20px' }}>
                <h3 style={{ fontWeight: '800', color: '#1e293b', marginBottom: '16px', fontSize: '17px' }}>💡 Travel Tips</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {plan.travelTips.map((tip, ti) => (
                    <div key={ti} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '16px', flexShrink: 0 }}>✅</span>
                      <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.5' }}>{tip}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Plan Again button */}
            <button onClick={() => { setPlan(null); setStep(1); setForm({ city: '', days: 1, startDate: '', budget: '', travelers: 1, preferences: [] }) }} style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: 'white', borderRadius: '12px', fontSize: '16px', fontWeight: '700',
              boxShadow: '0 4px 15px rgba(99,102,241,0.3)'
            }}>🔄 Plan Another Trip</button>
          </div>
        )}
      </div>
    </div>
  )
}