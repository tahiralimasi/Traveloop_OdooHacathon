import React, { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

export default function ItineraryView() {
  const location = useLocation()
  const navigate = useNavigate()
  const trip = location.state?.trip
  const [view, setView] = useState('list')

  if (!trip) {
    return (
      <div style={{ minHeight: '100vh', background: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '64px', marginBottom: '16px' }}>🗺️</div>
          <h3 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b' }}>No trip selected</h3>
          <button onClick={() => navigate('/my-trips')} style={{
            marginTop: '16px', padding: '12px 24px', background: '#6366f1',
            color: 'white', borderRadius: '10px', fontWeight: '700'
          }}>Go to My Trips</button>
        </div>
      </div>
    )
  }

  const sections = trip.sections || [
    { id: 1, title: 'Day 1 - Arrival', description: 'Check-in to hotel, evening walk', startDate: trip.startDate, budget: '3000' },
    { id: 2, title: 'Day 2 - Sightseeing', description: 'Visit main attractions, local food tour', startDate: trip.startDate, budget: '5000' },
    { id: 3, title: 'Day 3 - Adventure', description: 'Outdoor activities, shopping', startDate: trip.endDate, budget: '4000' },
  ]

  const totalBudget = sections.reduce((sum, s) => sum + (Number(s.budget) || 0), 0)

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
          borderRadius: '20px', padding: '32px', marginBottom: '28px', color: 'white'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{ opacity: 0.8, fontSize: '13px', marginBottom: '6px' }}>Trip Itinerary</p>
              <h1 style={{ fontSize: '28px', fontWeight: '800', marginBottom: '8px' }}>{trip.name}</h1>
              <p style={{ opacity: 0.85 }}>📍 {trip.place} &nbsp;•&nbsp; 📅 {trip.startDate} → {trip.endDate}</p>
              <p style={{ opacity: 0.85, marginTop: '4px' }}>💰 Total Budget: ₹{Number(trip.budget || totalBudget).toLocaleString()}</p>
            </div>
            <span style={{ fontSize: '64px', opacity: 0.4 }}>{trip.emoji || '🌍'}</span>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '24px' }}>
          {['list', 'calendar'].map(v => (
            <button key={v} onClick={() => setView(v)} style={{
              padding: '9px 20px', borderRadius: '8px', fontWeight: '600', fontSize: '13px',
              background: view === v ? '#6366f1' : 'white',
              color: view === v ? 'white' : '#64748b',
              border: '1.5px solid', borderColor: view === v ? '#6366f1' : '#e2e8f0'
            }}>{v === 'list' ? '📋 List View' : '📅 Calendar View'}</button>
          ))}
          <button onClick={() => navigate('/itinerary-builder', { state: { trip } })} style={{
            marginLeft: 'auto', padding: '9px 20px', borderRadius: '8px',
            background: '#ede9fe', color: '#6366f1', fontWeight: '600', fontSize: '13px'
          }}>✏️ Edit</button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sections.map((section, index) => (
            <div key={section.id} style={{
              background: 'white', borderRadius: '16px', padding: '24px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0',
              display: 'flex', gap: '20px'
            }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{
                  width: '40px', height: '40px', borderRadius: '12px',
                  background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontWeight: '800', fontSize: '16px', flexShrink: 0
                }}>{index + 1}</div>
                {index < sections.length - 1 && <div style={{ width: '2px', flex: 1, background: '#e2e8f0', minHeight: '20px' }} />}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <h3 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b' }}>{section.title || `Section ${index + 1}`}</h3>
                  {section.budget && (
                    <span style={{ padding: '4px 12px', borderRadius: '20px', background: '#d1fae5', color: '#065f46', fontSize: '13px', fontWeight: '700' }}>
                      ₹{Number(section.budget).toLocaleString()}
                    </span>
                  )}
                </div>
                {section.startDate && <p style={{ fontSize: '13px', color: '#64748b', marginTop: '4px' }}>📅 {section.startDate}</p>}
                {section.description && <p style={{ fontSize: '14px', color: '#374151', marginTop: '8px', lineHeight: '1.6' }}>{section.description}</p>}
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '24px', background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
          <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Budget Summary</h3>
          {sections.map(s => (
            <div key={s.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
              <span style={{ color: '#64748b', fontSize: '14px' }}>{s.title || 'Section'}</span>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>₹{Number(s.budget || 0).toLocaleString()}</span>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '12px' }}>
            <span style={{ fontWeight: '700', color: '#1e293b' }}>Total</span>
            <span style={{ fontWeight: '800', color: '#6366f1', fontSize: '18px' }}>₹{totalBudget.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}