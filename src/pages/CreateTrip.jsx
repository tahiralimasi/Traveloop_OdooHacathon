import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const suggestedPlaces = [
  { name: 'Paris', country: 'France', emoji: '🗼', desc: 'City of Love & Lights' },
  { name: 'Tokyo', country: 'Japan', emoji: '⛩️', desc: 'Tradition meets Future' },
  { name: 'Bali', country: 'Indonesia', emoji: '🌴', desc: 'Tropical Paradise' },
  { name: 'New York', country: 'USA', emoji: '🗽', desc: 'The City That Never Sleeps' },
  { name: 'Rome', country: 'Italy', emoji: '🏛️', desc: 'Eternal City' },
  { name: 'Dubai', country: 'UAE', emoji: '🌆', desc: 'City of Gold' },
]

export default function CreateTrip() {
  const [form, setForm] = useState({ name: '', place: '', startDate: '', endDate: '', description: '', budget: '' })
  const [selectedPlace, setSelectedPlace] = useState(null)
  const { addTrip } = useApp()
  const navigate = useNavigate()

  const handleSave = () => {
    if (!form.name || !form.startDate || !form.endDate) return
    const trip = {
      id: Date.now(), ...form,
      place: selectedPlace?.name || form.place,
      emoji: selectedPlace?.emoji || '🌍',
      createdAt: new Date().toISOString()
    }
    addTrip(trip)
    navigate('/my-trips')
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>Plan a New Trip ✈️</h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>Fill in the details and start your adventure</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '20px' }}>Trip Details</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { label: 'Trip Name', key: 'name', placeholder: 'Europe Summer Adventure', type: 'text' },
                { label: 'Select a Place', key: 'place', placeholder: 'e.g. Paris, Tokyo...', type: 'text' },
                { label: 'Start Date', key: 'startDate', placeholder: '', type: 'date' },
                { label: 'End Date', key: 'endDate', placeholder: '', type: 'date' },
                { label: 'Total Budget (₹)', key: 'budget', placeholder: '50000', type: 'number' },
              ].map(field => (
                <div key={field.key}>
                  <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>{field.label}</label>
                  <input
                    type={field.type} placeholder={field.placeholder}
                    value={form[field.key]}
                    onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                    style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc' }}
                  />
                </div>
              ))}
              <div>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Trip Description</label>
                <textarea
                  placeholder="Describe your trip..."
                  value={form.description}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  rows={3}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc', resize: 'vertical' }}
                />
              </div>
            </div>
            <button onClick={handleSave} style={{
              width: '100%', padding: '14px', marginTop: '20px',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: 'white', borderRadius: '10px', fontSize: '15px', fontWeight: '700',
              boxShadow: '0 4px 15px rgba(99,102,241,0.4)'
            }}>Save Trip 🚀</button>
          </div>

          <div style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h2 style={{ fontSize: '16px', fontWeight: '700', color: '#1e293b', marginBottom: '6px' }}>Suggested Places</h2>
            <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '20px' }}>Click to select a destination</p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {suggestedPlaces.map(place => (
                <div key={place.name} onClick={() => { setSelectedPlace(place); setForm({ ...form, place: place.name }) }} style={{
                  padding: '16px', borderRadius: '14px', cursor: 'pointer',
                  border: `2px solid ${selectedPlace?.name === place.name ? '#6366f1' : '#e2e8f0'}`,
                  background: selectedPlace?.name === place.name ? '#ede9fe' : '#f8fafc',
                  display: 'flex', alignItems: 'center', gap: '14px'
                }}>
                  <span style={{ fontSize: '28px' }}>{place.emoji}</span>
                  <div>
                    <p style={{ fontWeight: '700', color: '#1e293b' }}>{place.name}</p>
                    <p style={{ fontSize: '12px', color: '#64748b' }}>{place.country} • {place.desc}</p>
                  </div>
                  {selectedPlace?.name === place.name && <span style={{ marginLeft: 'auto', color: '#6366f1', fontSize: '18px' }}>✓</span>}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}