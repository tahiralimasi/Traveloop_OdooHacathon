import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function MyTrips() {
  const { trips, deleteTrip } = useApp()
  const navigate = useNavigate()
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('all')
  const now = new Date()

  const getStatus = (trip) => {
    const start = new Date(trip.startDate)
    const end = new Date(trip.endDate)
    if (now < start) return 'upcoming'
    if (now > end) return 'completed'
    return 'ongoing'
  }

  const filtered = trips.filter(trip => {
    const matchSearch = trip.name.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'all' || getStatus(trip) === filter
    return matchSearch && matchFilter
  })

  const statusColors = {
    ongoing: { bg: '#d1fae5', text: '#065f46', label: 'Ongoing' },
    upcoming: { bg: '#e0f2fe', text: '#0c4a6e', label: 'Upcoming' },
    completed: { bg: '#f1f5f9', text: '#475569', label: 'Completed' },
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>My Trips 🗺️</h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Manage all your travel plans</p>
          </div>
          <button onClick={() => navigate('/create-trip')} style={{
            padding: '12px 24px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '14px',
            boxShadow: '0 4px 15px rgba(99,102,241,0.3)'
          }}>+ Plan New Trip</button>
        </div>

        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <input
            placeholder="Search trips..."
            value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '11px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: 'white', minWidth: '200px' }}
          />
          <div style={{ display: 'flex', gap: '8px' }}>
            {['all', 'ongoing', 'upcoming', 'completed'].map(f => (
              <button key={f} onClick={() => setFilter(f)} style={{
                padding: '10px 18px', borderRadius: '10px', fontWeight: '600', fontSize: '13px', textTransform: 'capitalize',
                background: filter === f ? '#6366f1' : 'white',
                color: filter === f ? 'white' : '#64748b',
                border: '1.5px solid', borderColor: filter === f ? '#6366f1' : '#e2e8f0'
              }}>{f}</button>
            ))}
          </div>
        </div>

        {filtered.length === 0
          ? <div style={{ textAlign: 'center', padding: '80px 32px', background: 'white', borderRadius: '20px' }}>
              <div style={{ fontSize: '64px', marginBottom: '16px' }}>🗺️</div>
              <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>No trips found</h3>
              <p style={{ color: '#64748b', marginTop: '8px' }}>Start planning your next adventure!</p>
              <button onClick={() => navigate('/create-trip')} style={{ marginTop: '20px', padding: '12px 28px', background: '#6366f1', color: 'white', borderRadius: '10px', fontWeight: '700' }}>Create Trip</button>
            </div>
          : <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filtered.map(trip => {
                const status = getStatus(trip)
                const sc = statusColors[status]
                return (
                  <div key={trip.id} style={{
                    background: 'white', borderRadius: '16px', padding: '24px',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                    display: 'flex', alignItems: 'center', gap: '20px', border: '1px solid #e2e8f0'
                  }}>
                    <div style={{
                      width: '64px', height: '64px', borderRadius: '16px',
                      background: 'linear-gradient(135deg, #ede9fe, #e0f2fe)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '28px', flexShrink: 0
                    }}>{trip.emoji || '🌍'}</div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
                        <h3 style={{ fontSize: '17px', fontWeight: '700', color: '#1e293b' }}>{trip.name}</h3>
                        <span style={{ padding: '3px 10px', borderRadius: '20px', background: sc.bg, color: sc.text, fontSize: '11px', fontWeight: '700' }}>{sc.label}</span>
                      </div>
                      <p style={{ fontSize: '13px', color: '#64748b' }}>📍 {trip.place || 'No destination'} &nbsp;•&nbsp; 📅 {trip.startDate} → {trip.endDate}</p>
                      {trip.budget && <p style={{ fontSize: '13px', color: '#22c55e', marginTop: '4px', fontWeight: '600' }}>💰 Budget: ₹{Number(trip.budget).toLocaleString()}</p>}
                    </div>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button onClick={() => navigate('/itinerary-view', { state: { trip } })} style={{ padding: '9px 16px', borderRadius: '8px', background: '#ede9fe', color: '#6366f1', fontWeight: '600', fontSize: '13px' }}>View</button>
                      <button onClick={() => navigate('/itinerary-builder', { state: { trip } })} style={{ padding: '9px 16px', borderRadius: '8px', background: '#e0f2fe', color: '#0ea5e9', fontWeight: '600', fontSize: '13px' }}>Edit</button>
                      <button onClick={() => deleteTrip(trip.id)} style={{ padding: '9px 16px', borderRadius: '8px', background: '#fef2f2', color: '#ef4444', fontWeight: '600', fontSize: '13px' }}>Delete</button>
                    </div>
                  </div>
                )
              })}
            </div>
        }
      </div>
    </div>
  )
}