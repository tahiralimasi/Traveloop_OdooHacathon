import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const cities = [
  { name: 'Paris', country: 'France', region: 'Europe', emoji: '🗼', costIndex: 'High', popularity: 4.8, desc: 'City of Love & Lights', activities: 120 },
  { name: 'Tokyo', country: 'Japan', region: 'Asia', emoji: '⛩️', costIndex: 'High', popularity: 4.9, desc: 'Tradition meets Future', activities: 200 },
  { name: 'Bali', country: 'Indonesia', region: 'Asia', emoji: '🌴', costIndex: 'Low', popularity: 4.7, desc: 'Tropical Paradise', activities: 150 },
  { name: 'New York', country: 'USA', region: 'Americas', emoji: '🗽', costIndex: 'High', popularity: 4.8, desc: 'The City That Never Sleeps', activities: 300 },
  { name: 'Rome', country: 'Italy', region: 'Europe', emoji: '🏛️', costIndex: 'Medium', popularity: 4.6, desc: 'Eternal City', activities: 180 },
  { name: 'Dubai', country: 'UAE', region: 'Middle East', emoji: '🌆', costIndex: 'High', popularity: 4.7, desc: 'City of Gold', activities: 160 },
  { name: 'Bangkok', country: 'Thailand', region: 'Asia', emoji: '🛕', costIndex: 'Low', popularity: 4.5, desc: 'Street Food Heaven', activities: 140 },
  { name: 'Barcelona', country: 'Spain', region: 'Europe', emoji: '🎨', costIndex: 'Medium', popularity: 4.6, desc: 'Art & Architecture', activities: 130 },
  { name: 'Sydney', country: 'Australia', region: 'Oceania', emoji: '🦘', costIndex: 'High', popularity: 4.7, desc: 'Harbour City', activities: 110 },
  { name: 'Mumbai', country: 'India', region: 'Asia', emoji: '🌊', costIndex: 'Low', popularity: 4.3, desc: 'City of Dreams', activities: 90 },
  { name: 'Istanbul', country: 'Turkey', region: 'Europe', emoji: '🕌', costIndex: 'Medium', popularity: 4.5, desc: 'Where East Meets West', activities: 120 },
  { name: 'Amsterdam', country: 'Netherlands', region: 'Europe', emoji: '🚲', costIndex: 'High', popularity: 4.6, desc: 'Canal City', activities: 100 },
]

const costColors = {
  Low: { bg: '#d1fae5', text: '#065f46' },
  Medium: { bg: '#fef3c7', text: '#92400e' },
  High: { bg: '#fce7f3', text: '#9d174d' },
}

export default function CitySearch() {
  const [search, setSearch] = useState('')
  const [region, setRegion] = useState('All')
  const [cost, setCost] = useState('All')
  const navigate = useNavigate()

  const regions = ['All', 'Europe', 'Asia', 'Americas', 'Middle East', 'Oceania']
  const costs = ['All', 'Low', 'Medium', 'High']

  const filtered = cities.filter(c => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.country.toLowerCase().includes(search.toLowerCase())
    const matchRegion = region === 'All' || c.region === region
    const matchCost = cost === 'All' || c.costIndex === cost
    return matchSearch && matchRegion && matchCost
  })

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>City Search 🔍</h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>Discover amazing destinations worldwide</p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <input
            placeholder="Search cities or countries..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '15px', background: '#f8fafc', marginBottom: '16px' }}
          />
          <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap' }}>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>REGION</p>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {regions.map(r => (
                  <button key={r} onClick={() => setRegion(r)} style={{
                    padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                    background: region === r ? '#6366f1' : '#f1f5f9',
                    color: region === r ? 'white' : '#64748b', border: 'none'
                  }}>{r}</button>
                ))}
              </div>
            </div>
            <div>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#374151', marginBottom: '8px' }}>COST INDEX</p>
              <div style={{ display: 'flex', gap: '6px' }}>
                {costs.map(c => (
                  <button key={c} onClick={() => setCost(c)} style={{
                    padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600',
                    background: cost === c ? '#6366f1' : '#f1f5f9',
                    color: cost === c ? 'white' : '#64748b', border: 'none'
                  }}>{c}</button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '16px', fontWeight: '600' }}>{filtered.length} cities found</p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
          {filtered.map(city => (
            <div key={city.name} style={{
              background: 'white', borderRadius: '16px', padding: '20px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0', cursor: 'pointer'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <span style={{ fontSize: '40px' }}>{city.emoji}</span>
                <span style={{ padding: '4px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700', background: costColors[city.costIndex].bg, color: costColors[city.costIndex].text }}>{city.costIndex} Cost</span>
              </div>
              <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b' }}>{city.name}</h3>
              <p style={{ fontSize: '13px', color: '#64748b' }}>{city.country} • {city.region}</p>
              <p style={{ fontSize: '13px', color: '#374151', marginTop: '8px' }}>{city.desc}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ color: '#f59e0b', fontSize: '14px' }}>★</span>
                  <span style={{ fontSize: '13px', fontWeight: '700', color: '#1e293b' }}>{city.popularity}</span>
                  <span style={{ fontSize: '12px', color: '#94a3b8' }}>• {city.activities} activities</span>
                </div>
              </div>
              <button onClick={() => navigate('/create-trip')} style={{
                width: '100%', marginTop: '14px', padding: '10px',
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: 'white', borderRadius: '8px', fontWeight: '700', fontSize: '13px'
              }}>+ Add to Trip</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}