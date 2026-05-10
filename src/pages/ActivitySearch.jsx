import React, { useState } from 'react'

const activities = [
  { id: 1, name: 'Eiffel Tower Visit', city: 'Paris', category: 'Sightseeing', cost: 1200, duration: '3 hrs', rating: 4.9, emoji: '🗼' },
  { id: 2, name: 'Seine River Cruise', city: 'Paris', category: 'Adventure', cost: 800, duration: '2 hrs', rating: 4.7, emoji: '🚢' },
  { id: 3, name: 'Sushi Making Class', city: 'Tokyo', category: 'Food', cost: 2500, duration: '4 hrs', rating: 4.8, emoji: '🍣' },
  { id: 4, name: 'Mount Fuji Hike', city: 'Tokyo', category: 'Adventure', cost: 3000, duration: '8 hrs', rating: 4.9, emoji: '🗻' },
  { id: 5, name: 'Bali Cooking Class', city: 'Bali', category: 'Food', cost: 1500, duration: '3 hrs', rating: 4.8, emoji: '🍛' },
  { id: 6, name: 'Temple Hopping Tour', city: 'Bali', category: 'Sightseeing', cost: 900, duration: '5 hrs', rating: 4.6, emoji: '🛕' },
  { id: 7, name: 'Times Square Walk', city: 'New York', category: 'Sightseeing', cost: 0, duration: '2 hrs', rating: 4.5, emoji: '🗽' },
  { id: 8, name: 'Broadway Show', city: 'New York', category: 'Entertainment', cost: 8000, duration: '3 hrs', rating: 4.9, emoji: '🎭' },
  { id: 9, name: 'Colosseum Tour', city: 'Rome', category: 'Sightseeing', cost: 1800, duration: '4 hrs', rating: 4.8, emoji: '🏛️' },
  { id: 10, name: 'Desert Safari', city: 'Dubai', category: 'Adventure', cost: 5000, duration: '6 hrs', rating: 4.7, emoji: '🐪' },
  { id: 11, name: 'Street Food Tour', city: 'Bangkok', category: 'Food', cost: 600, duration: '3 hrs', rating: 4.8, emoji: '🍜' },
  { id: 12, name: 'Paragliding', city: 'Bali', category: 'Adventure', cost: 4000, duration: '2 hrs', rating: 4.9, emoji: '🪂' },
]

const categoryColors = {
  Sightseeing: { bg: '#e0f2fe', text: '#0c4a6e' },
  Adventure: { bg: '#d1fae5', text: '#065f46' },
  Food: { bg: '#fef3c7', text: '#92400e' },
  Entertainment: { bg: '#ede9fe', text: '#4c1d95' },
}

export default function ActivitySearch() {
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All')
  const [maxCost, setMaxCost] = useState(10000)
  const [added, setAdded] = useState([])

  const categories = ['All', 'Sightseeing', 'Adventure', 'Food', 'Entertainment']

  const filtered = activities.filter(a => {
    const matchSearch = a.name.toLowerCase().includes(search.toLowerCase()) || a.city.toLowerCase().includes(search.toLowerCase())
    const matchCat = category === 'All' || a.category === category
    const matchCost = a.cost <= maxCost
    return matchSearch && matchCat && matchCost
  })

  const toggleAdd = (id) => {
    setAdded(added.includes(id) ? added.filter(i => i !== id) : [...added, id])
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>Activity Search 🎯</h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Find amazing things to do on your trip</p>
          </div>
          {added.length > 0 && (
            <div style={{ padding: '10px 20px', background: '#d1fae5', borderRadius: '10px', color: '#065f46', fontWeight: '700', fontSize: '14px' }}>
              ✓ {added.length} activities added
            </div>
          )}
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <input
            placeholder="Search activities or cities..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '15px', background: '#f8fafc', marginBottom: '16px' }}
          />
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-end' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>CATEGORY</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {categories.map(c => (
                  <button key={c} onClick={() => setCategory(c)} style={{
                    padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                    background: category === c ? '#6366f1' : '#f1f5f9',
                    color: category === c ? 'white' : '#64748b', border: 'none'
                  }}>{c}</button>
                ))}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: '200px' }}>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>MAX COST: ₹{maxCost.toLocaleString()}</p>
              <input type="range" min="0" max="10000" step="500" value={maxCost}
                onChange={e => setMaxCost(Number(e.target.value))}
                style={{ width: '100%', accentColor: '#6366f1' }} />
            </div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {filtered.map(activity => {
            const cc = categoryColors[activity.category]
            const isAdded = added.includes(activity.id)
            return (
              <div key={activity.id} style={{
                background: 'white', borderRadius: '16px', padding: '20px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: `2px solid ${isAdded ? '#6366f1' : '#e2e8f0'}`
              }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                  <span style={{ fontSize: '36px' }}>{activity.emoji}</span>
                  <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', background: cc.bg, color: cc.text }}>{activity.category}</span>
                </div>
                <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>{activity.name}</h3>
                <p style={{ fontSize: '12px', color: '#64748b' }}>📍 {activity.city}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px', fontSize: '13px' }}>
                  <span style={{ color: '#22c55e', fontWeight: '700' }}>{activity.cost === 0 ? 'FREE' : `₹${activity.cost.toLocaleString()}`}</span>
                  <span style={{ color: '#64748b' }}>⏱ {activity.duration}</span>
                  <span style={{ color: '#f59e0b' }}>★ {activity.rating}</span>
                </div>
                <button onClick={() => toggleAdd(activity.id)} style={{
                  width: '100%', marginTop: '14px', padding: '10px',
                  background: isAdded ? '#d1fae5' : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  color: isAdded ? '#065f46' : 'white',
                  borderRadius: '8px', fontWeight: '700', fontSize: '13px',
                  border: isAdded ? '2px solid #22c55e' : 'none'
                }}>{isAdded ? '✓ Added' : '+ Add Activity'}</button>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}