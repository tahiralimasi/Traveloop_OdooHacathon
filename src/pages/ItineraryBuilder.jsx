import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function ItineraryBuilder() {
  const location = useLocation()
  const trip = location.state?.trip
  const navigate = useNavigate()

  const [sections, setSections] = useState(trip?.sections || [
    { id: 1, title: '', description: '', startDate: '', endDate: '', budget: '' }
  ])

  const addSection = () => {
    setSections([...sections, { id: Date.now(), title: '', description: '', startDate: '', endDate: '', budget: '' }])
  }

  const updateSection = (id, key, value) => {
    setSections(sections.map(s => s.id === id ? { ...s, [key]: value } : s))
  }

  const removeSection = (id) => {
    if (sections.length === 1) return
    setSections(sections.filter(s => s.id !== id))
  }

  const handleSave = () => {
    alert('Itinerary saved successfully!')
    navigate('/my-trips')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>Build Itinerary 🗓️</h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>{trip ? `Planning: ${trip.name}` : 'Add stops and activities'}</p>
          </div>
          <button onClick={handleSave} style={{
            padding: '12px 24px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
            color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '14px',
            boxShadow: '0 4px 15px rgba(99,102,241,0.3)'
          }}>Save Itinerary</button>
        </div>

        {trip && (
          <div style={{
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            borderRadius: '16px', padding: '20px 24px', marginBottom: '24px', color: 'white'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <span style={{ fontSize: '32px' }}>{trip.emoji || '🌍'}</span>
              <div>
                <h3 style={{ fontWeight: '700', fontSize: '18px' }}>{trip.name}</h3>
                <p style={{ opacity: 0.85, fontSize: '13px' }}>📅 {trip.startDate} → {trip.endDate}</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {sections.map((section, index) => (
            <div key={section.id} style={{
              background: 'white', borderRadius: '20px', padding: '28px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '36px', height: '36px', borderRadius: '10px',
                    background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: '800', fontSize: '15px'
                  }}>{index + 1}</div>
                  <h3 style={{ fontWeight: '700', color: '#1e293b', fontSize: '16px' }}>Section {index + 1}</h3>
                </div>
                {sections.length > 1 && (
                  <button onClick={() => removeSection(section.id)} style={{
                    padding: '6px 12px', borderRadius: '8px',
                    background: '#fef2f2', color: '#ef4444', fontWeight: '600', fontSize: '13px'
                  }}>Remove</button>
                )}
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Section Title</label>
                  <input
                    placeholder="e.g. Paris - Day 1, Hotel Check-in..."
                    value={section.title}
                    onChange={e => updateSection(section.id, 'title', e.target.value)}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc' }}
                  />
                </div>
                <div>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Description</label>
                  <textarea
                    placeholder="Describe activities, stay, transport..."
                    value={section.description}
                    onChange={e => updateSection(section.id, 'description', e.target.value)}
                    rows={3}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc', resize: 'vertical' }}
                  />
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Start Date</label>
                    <input type="date" value={section.startDate} onChange={e => updateSection(section.id, 'startDate', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '13px', background: '#f8fafc' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>End Date</label>
                    <input type="date" value={section.endDate} onChange={e => updateSection(section.id, 'endDate', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '13px', background: '#f8fafc' }} />
                  </div>
                  <div>
                    <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Budget (₹)</label>
                    <input type="number" placeholder="5000" value={section.budget} onChange={e => updateSection(section.id, 'budget', e.target.value)}
                      style={{ width: '100%', padding: '10px 12px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '13px', background: '#f8fafc' }} />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button onClick={addSection} style={{
          width: '100%', padding: '16px', marginTop: '16px',
          background: 'white', color: '#6366f1', borderRadius: '14px',
          fontWeight: '700', fontSize: '15px', border: '2px dashed #6366f1'
        }}>+ Add Another Section</button>
      </div>
    </div>
  )
}