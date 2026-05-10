import React, { useState } from 'react'

const defaultItems = {
  Documents: [
    { id: 1, name: 'Passport', packed: true },
    { id: 2, name: 'Flight Tickets (printed)', packed: true },
    { id: 3, name: 'Travel Insurance', packed: false },
    { id: 4, name: 'Hotel Booking Confirmation', packed: false },
  ],
  Clothing: [
    { id: 5, name: 'Casual Shirts', packed: true },
    { id: 6, name: 'Trousers / Jeans', packed: false },
    { id: 7, name: 'Comfortable Walking Shoes', packed: false },
    { id: 8, name: 'Light Jacket / Windbreaker', packed: false },
  ],
  Electronics: [
    { id: 9, name: 'Phone Charger', packed: false },
    { id: 10, name: 'Universal Power Adapter', packed: false },
    { id: 11, name: 'Earphone / Headphones', packed: false },
  ],
}

export default function PackingChecklist() {
  const [items, setItems] = useState(defaultItems)
  const [newItem, setNewItem] = useState('')
  const [newCategory, setNewCategory] = useState('Documents')
  const [search, setSearch] = useState('')

  const allItems = Object.values(items).flat()
  const packed = allItems.filter(i => i.packed).length
  const total = allItems.length
  const progress = Math.round((packed / total) * 100)

  const togglePacked = (category, id) => {
    setItems({ ...items, [category]: items[category].map(i => i.id === id ? { ...i, packed: !i.packed } : i) })
  }

  const addItem = () => {
    if (!newItem.trim()) return
    setItems({ ...items, [newCategory]: [...(items[newCategory] || []), { id: Date.now(), name: newItem.trim(), packed: false }] })
    setNewItem('')
  }

  const removeItem = (category, id) => {
    setItems({ ...items, [category]: items[category].filter(i => i.id !== id) })
  }

  const resetAll = () => {
    const reset = {}
    Object.keys(items).forEach(cat => { reset[cat] = items[cat].map(i => ({ ...i, packed: false })) })
    setItems(reset)
  }

  const categoryIcons = { Documents: '📄', Clothing: '👕', Electronics: '📱' }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>Packing Checklist 🎒</h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Stay organized for your trip</p>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button onClick={resetAll} style={{ padding: '10px 18px', borderRadius: '8px', background: '#fef2f2', color: '#ef4444', fontWeight: '600', fontSize: '13px' }}>Reset All</button>
            <button style={{ padding: '10px 18px', borderRadius: '8px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', fontWeight: '600', fontSize: '13px' }}>Share Checklist</button>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <p style={{ fontWeight: '700', color: '#1e293b' }}>Trip: Paris & Rome Adventure</p>
            <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>{packed}/{total} items packed</p>
          </div>
          <div style={{ background: '#f1f5f9', borderRadius: '10px', height: '12px', overflow: 'hidden' }}>
            <div style={{ height: '100%', borderRadius: '10px', background: progress === 100 ? '#22c55e' : 'linear-gradient(135deg, #6366f1, #06b6d4)', width: `${progress}%`, transition: 'width 0.4s' }} />
          </div>
          <p style={{ fontSize: '13px', color: progress === 100 ? '#22c55e' : '#6366f1', fontWeight: '700', marginTop: '8px' }}>
            {progress === 100 ? '✅ All packed! Ready to go!' : `${progress}% packed`}
          </p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <p style={{ fontWeight: '700', color: '#1e293b', marginBottom: '12px' }}>Add New Item</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <input placeholder="Item name..." value={newItem} onChange={e => setNewItem(e.target.value)} onKeyDown={e => e.key === 'Enter' && addItem()}
              style={{ flex: 1, padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc' }} />
            <select value={newCategory} onChange={e => setNewCategory(e.target.value)}
              style={{ padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc' }}>
              {Object.keys(items).map(cat => <option key={cat}>{cat}</option>)}
            </select>
            <button onClick={addItem} style={{ padding: '11px 20px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', fontWeight: '700', fontSize: '14px' }}>Add</button>
          </div>
        </div>

        <input placeholder="Search items..." value={search} onChange={e => setSearch(e.target.value)}
          style={{ width: '100%', padding: '12px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: 'white', marginBottom: '16px' }} />

        {Object.entries(items).map(([category, categoryItems]) => {
          const filtered = categoryItems.filter(i => i.name.toLowerCase().includes(search.toLowerCase()))
          if (filtered.length === 0) return null
          const catPacked = filtered.filter(i => i.packed).length
          return (
            <div key={category} style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '16px', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{ fontSize: '20px' }}>{categoryIcons[category] || '📦'}</span>
                  <h3 style={{ fontWeight: '700', color: '#1e293b', fontSize: '16px' }}>{category}</h3>
                </div>
                <span style={{ padding: '4px 12px', borderRadius: '20px', background: catPacked === filtered.length ? '#d1fae5' : '#f1f5f9', color: catPacked === filtered.length ? '#065f46' : '#64748b', fontSize: '12px', fontWeight: '700' }}>{catPacked}/{filtered.length}</span>
              </div>
              {filtered.map(item => (
                <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '12px', borderRadius: '10px', marginBottom: '8px', background: item.packed ? '#f0fdf4' : '#f8fafc', border: `1px solid ${item.packed ? '#bbf7d0' : '#e2e8f0'}` }}>
                  <div onClick={() => togglePacked(category, item.id)} style={{ width: '22px', height: '22px', borderRadius: '6px', cursor: 'pointer', border: `2px solid ${item.packed ? '#22c55e' : '#cbd5e1'}`, background: item.packed ? '#22c55e' : 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    {item.packed && <span style={{ color: 'white', fontSize: '13px', fontWeight: '800' }}>✓</span>}
                  </div>
                  <p style={{ flex: 1, fontSize: '14px', fontWeight: '500', color: item.packed ? '#65a30d' : '#1e293b', textDecoration: item.packed ? 'line-through' : 'none' }}>{item.name}</p>
                  <button onClick={() => removeItem(category, item.id)} style={{ background: 'none', color: '#cbd5e1', fontSize: '16px', padding: '2px 6px', borderRadius: '4px' }}>✕</button>
                </div>
              ))}
            </div>
          )
        })}
      </div>
    </div>
  )
}