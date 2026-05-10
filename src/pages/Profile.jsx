import React, { useState } from 'react'
import { useApp } from '../context/AppContext'
import { useNavigate } from 'react-router-dom'

export default function Profile() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: user?.name || '', email: user?.email || '', phone: '', city: 'Mumbai', country: 'India', bio: 'Travel enthusiast exploring the world one city at a time.' })
  const [saved, setSaved] = useState(false)

  const handleSave = () => { setSaved(true); setTimeout(() => setSaved(false), 2000) }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b', marginBottom: '28px' }}>My Profile 👤</h1>
        <div style={{ background: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '28px' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '32px', color: 'white', fontWeight: '800' }}>
              {form.name?.charAt(0) || 'U'}
            </div>
            <div>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#1e293b' }}>{form.name}</h2>
              <p style={{ color: '#64748b', fontSize: '14px' }}>{form.email}</p>
              <p style={{ color: '#6366f1', fontSize: '13px', fontWeight: '600', marginTop: '4px' }}>✈️ Travel Enthusiast</p>
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { label: 'Full Name', key: 'name', type: 'text' },
              { label: 'Email', key: 'email', type: 'email' },
              { label: 'Phone', key: 'phone', type: 'tel' },
              { label: 'City', key: 'city', type: 'text' },
              { label: 'Country', key: 'country', type: 'text' },
            ].map(f => (
              <div key={f.key}>
                <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>{f.label}</label>
                <input type={f.type} value={form[f.key]} onChange={e => setForm({ ...form, [f.key]: e.target.value })}
                  style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc' }} />
              </div>
            ))}
            <div>
              <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Bio</label>
              <textarea value={form.bio} onChange={e => setForm({ ...form, bio: e.target.value })} rows={3}
                style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc', resize: 'vertical' }} />
            </div>
          </div>
          <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
            <button onClick={handleSave} style={{ flex: 1, padding: '13px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '15px' }}>
              {saved ? '✅ Saved!' : 'Save Changes'}
            </button>
            <button onClick={() => { logout(); navigate('/login') }} style={{ padding: '13px 24px', background: '#fef2f2', color: '#ef4444', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>Logout</button>
          </div>
        </div>
        <div style={{ background: '#fef2f2', borderRadius: '16px', padding: '20px', border: '1px solid #fecaca' }}>
          <h3 style={{ fontWeight: '700', color: '#dc2626', marginBottom: '8px' }}>Danger Zone</h3>
          <p style={{ fontSize: '13px', color: '#64748b', marginBottom: '12px' }}>Once you delete your account, there is no going back.</p>
          <button style={{ padding: '10px 20px', background: '#ef4444', color: 'white', borderRadius: '8px', fontWeight: '700', fontSize: '13px' }}>Delete Account</button>
        </div>
      </div>
    </div>
  )
}