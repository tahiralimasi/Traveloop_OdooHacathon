import React from 'react'

const stats = [
  { label: 'Total Users', value: '1,284', icon: '👥', color: '#ede9fe', textColor: '#6366f1' },
  { label: 'Total Trips', value: '4,721', icon: '🗺️', color: '#e0f2fe', textColor: '#0ea5e9' },
  { label: 'Active Today', value: '342', icon: '🟢', color: '#d1fae5', textColor: '#22c55e' },
  { label: 'Revenue', value: '₹2.4L', icon: '💰', color: '#fef3c7', textColor: '#f59e0b' },
]
const topCities = [
  { name: 'Paris', trips: 842, emoji: '🗼' },
  { name: 'Tokyo', trips: 731, emoji: '⛩️' },
  { name: 'Bali', trips: 698, emoji: '🌴' },
  { name: 'Dubai', trips: 612, emoji: '🌆' },
  { name: 'New York', trips: 589, emoji: '🗽' },
]
const topActivities = [
  { name: 'Desert Safari', count: 412, emoji: '🐪' },
  { name: 'Eiffel Tower Visit', count: 389, emoji: '🗼' },
  { name: 'Sushi Making Class', count: 334, emoji: '🍣' },
  { name: 'Temple Hopping', count: 298, emoji: '🛕' },
]
const recentUsers = [
  { name: 'Tanishq Naik', email: 'tanishq@email.com', trips: 3, joined: 'May 2025' },
  { name: 'Priya Sharma', email: 'priya@email.com', trips: 5, joined: 'Apr 2025' },
  { name: 'Arjun Mehta', email: 'arjun@email.com', trips: 2, joined: 'May 2025' },
  { name: 'Sneha Patel', email: 'sneha@email.com', trips: 7, joined: 'Mar 2025' },
]

export default function AdminDashboard() {
  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>Admin Dashboard 📊</h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>Platform overview and analytics</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: '16px', marginBottom: '28px' }}>
          {stats.map(s => (
            <div key={s.label} style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{s.icon}</div>
              <div>
                <p style={{ fontSize: '12px', color: '#64748b', fontWeight: '600' }}>{s.label}</p>
                <p style={{ fontSize: '22px', fontWeight: '800', color: s.textColor }}>{s.value}</p>
              </div>
            </div>
          ))}
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>🏙️ Popular Cities</h3>
            {topCities.map((city, i) => (
              <div key={city.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: '800', color: '#94a3b8', fontSize: '13px', width: '20px' }}>#{i + 1}</span>
                <span style={{ fontSize: '20px' }}>{city.emoji}</span>
                <span style={{ flex: 1, fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>{city.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '80px', height: '6px', borderRadius: '3px', background: '#f1f5f9', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: '3px', background: '#6366f1', width: `${(city.trips / 842) * 100}%` }} />
                  </div>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>{city.trips}</span>
                </div>
              </div>
            ))}
          </div>
          <div style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
            <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>🎯 Popular Activities</h3>
            {topActivities.map((act, i) => (
              <div key={act.name} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid #f1f5f9' }}>
                <span style={{ fontWeight: '800', color: '#94a3b8', fontSize: '13px', width: '20px' }}>#{i + 1}</span>
                <span style={{ fontSize: '20px' }}>{act.emoji}</span>
                <span style={{ flex: 1, fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>{act.name}</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ width: '80px', height: '6px', borderRadius: '3px', background: '#f1f5f9', overflow: 'hidden' }}>
                    <div style={{ height: '100%', borderRadius: '3px', background: '#06b6d4', width: `${(act.count / 412) * 100}%` }} />
                  </div>
                  <span style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>{act.count}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>👥 Manage Users</h3>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['User', 'Email', 'Trips', 'Joined', 'Action'].map(h => (
                  <th key={h} style={{ padding: '12px 16px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recentUsers.map(u => (
                <tr key={u.name} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px 16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ width: '34px', height: '34px', borderRadius: '50%', background: 'linear-gradient(135deg, #ede9fe, #e0f2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '700', color: '#6366f1', fontSize: '14px' }}>{u.name.charAt(0)}</div>
                      <span style={{ fontWeight: '600', color: '#1e293b', fontSize: '14px' }}>{u.name}</span>
                    </div>
                  </td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{u.email}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', fontWeight: '700', color: '#6366f1' }}>{u.trips}</td>
                  <td style={{ padding: '14px 16px', fontSize: '13px', color: '#64748b' }}>{u.joined}</td>
                  <td style={{ padding: '14px 16px' }}>
                    <button style={{ padding: '6px 14px', borderRadius: '6px', background: '#fef2f2', color: '#ef4444', fontWeight: '600', fontSize: '12px' }}>Remove</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}