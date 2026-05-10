import React, { useState } from 'react'

const defaultCategories = [
  { id: 1, label: 'Transport', icon: '✈️', color: '#e0f2fe', textColor: '#0ea5e9', amount: 12000 },
  { id: 2, label: 'Hotel/Stay', icon: '🏨', color: '#ede9fe', textColor: '#6366f1', amount: 18000 },
  { id: 3, label: 'Activities', icon: '🎯', color: '#d1fae5', textColor: '#22c55e', amount: 8000 },
  { id: 4, label: 'Meals', icon: '🍽️', color: '#fef3c7', textColor: '#f59e0b', amount: 6000 },
  { id: 5, label: 'Shopping', icon: '🛍️', color: '#fce7f3', textColor: '#ec4899', amount: 4000 },
  { id: 6, label: 'Misc', icon: '📦', color: '#f1f5f9', textColor: '#64748b', amount: 2000 },
]

export default function Budget() {
  const [categories, setCategories] = useState(defaultCategories)
  const [totalBudget, setTotalBudget] = useState(60000)

  const totalSpent = categories.reduce((sum, c) => sum + c.amount, 0)
  const remaining = totalBudget - totalSpent
  const percentage = Math.min((totalSpent / totalBudget) * 100, 100)

  const updateAmount = (id, value) => {
    setCategories(categories.map(c => c.id === id ? { ...c, amount: Number(value) } : c))
  }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>Budget Planner 💰</h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>Track and manage your travel expenses</p>
        </div>

        <div style={{ background: 'linear-gradient(135deg, #6366f1, #06b6d4)', borderRadius: '20px', padding: '32px', marginBottom: '24px', color: 'white' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px' }}>
            <div>
              <p style={{ opacity: 0.8, fontSize: '13px' }}>Total Budget</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '4px' }}>
                <span style={{ fontSize: '13px', opacity: 0.8 }}>₹</span>
                <input type="number" value={totalBudget} onChange={e => setTotalBudget(Number(e.target.value))}
                  style={{ fontSize: '32px', fontWeight: '800', background: 'transparent', border: 'none', color: 'white', width: '160px', outline: 'none' }} />
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ opacity: 0.8, fontSize: '13px' }}>Remaining</p>
              <p style={{ fontSize: '28px', fontWeight: '800', color: remaining >= 0 ? '#a7f3d0' : '#fca5a5' }}>₹{remaining.toLocaleString()}</p>
            </div>
          </div>
          <div style={{ background: 'rgba(255,255,255,0.2)', borderRadius: '10px', height: '10px', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '10px', background: remaining >= 0 ? '#a7f3d0' : '#fca5a5', width: `${percentage}%`, transition: 'width 0.3s' }} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '12px', opacity: 0.8 }}>
            <span>Spent: ₹{totalSpent.toLocaleString()}</span>
            <span>{percentage.toFixed(1)}% used</span>
          </div>
        </div>

        {remaining < 0 && (
          <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '12px', padding: '16px 20px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <span style={{ fontSize: '20px' }}>⚠️</span>
            <p style={{ color: '#dc2626', fontWeight: '600', fontSize: '14px' }}>Over budget by ₹{Math.abs(remaining).toLocaleString()}!</p>
          </div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
          {categories.map(cat => (
            <div key={cat.id} style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '14px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: cat.color, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '18px' }}>{cat.icon}</div>
                <p style={{ fontWeight: '700', color: '#1e293b', fontSize: '14px' }}>{cat.label}</p>
              </div>
              <input type="number" value={cat.amount} onChange={e => updateAmount(cat.id, e.target.value)}
                style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1.5px solid #e2e8f0', fontSize: '16px', fontWeight: '700', color: cat.textColor, background: cat.color }} />
              <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '8px' }}>{((cat.amount / totalSpent) * 100).toFixed(1)}% of total</p>
              <div style={{ marginTop: '8px', background: '#f1f5f9', borderRadius: '4px', height: '4px', overflow: 'hidden' }}>
                <div style={{ height: '100%', borderRadius: '4px', background: cat.textColor, width: `${(cat.amount / totalSpent) * 100}%` }} />
              </div>
            </div>
          ))}
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>Expense Breakdown</h3>
          {categories.map(cat => (
            <div key={cat.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: '1px solid #f1f5f9' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span>{cat.icon}</span>
                <span style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>{cat.label}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '12px', color: '#94a3b8' }}>{((cat.amount / totalSpent) * 100).toFixed(1)}%</span>
                <span style={{ fontWeight: '700', color: '#1e293b', minWidth: '80px', textAlign: 'right' }}>₹{cat.amount.toLocaleString()}</span>
              </div>
            </div>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '16px' }}>
            <span style={{ fontWeight: '800', color: '#1e293b' }}>Grand Total</span>
            <span style={{ fontWeight: '800', color: '#6366f1', fontSize: '20px' }}>₹{totalSpent.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  )
}