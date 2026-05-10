import { useState } from 'react'

export default function Invoice() {
  const [items] = useState([
    { id: 1, category: 'Hotel', desc: 'Hotel Booking Paris', qty: '3 nights', unitCost: 3000, amount: 9000 },
    { id: 2, category: 'Travel', desc: 'Flight Bookings (DEL → PAR)', qty: '1', unitCost: 12000, amount: 12000 },
  ])

  const subtotal = items.reduce((s, i) => s + i.amount, 0)
  const tax = Math.round(subtotal * 0.05)
  const discount = 50
  const grandTotal = subtotal + tax - discount

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>Expense Invoice 🧾</h1>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button style={{ padding: '10px 20px', borderRadius: '8px', background: '#ede9fe', color: '#6366f1', fontWeight: '700', fontSize: '13px' }}>Download Invoice</button>
            <button style={{ padding: '10px 20px', borderRadius: '8px', background: '#e0f2fe', color: '#0ea5e9', fontWeight: '700', fontSize: '13px' }}>Export as PDF</button>
            <button style={{ padding: '10px 20px', borderRadius: '8px', background: '#d1fae5', color: '#065f46', fontWeight: '700', fontSize: '13px' }}>Mark as Paid</button>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '20px', padding: '36px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '32px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'linear-gradient(135deg, #6366f1, #06b6d4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: '800' }}>T</div>
                <span style={{ fontSize: '22px', fontWeight: '800', color: '#1e293b' }}>Traveloop</span>
              </div>
              <h2 style={{ fontSize: '20px', fontWeight: '700', color: '#1e293b', marginBottom: '4px' }}>Trip to Europe Adventure</h2>
              <p style={{ fontSize: '13px', color: '#64748b' }}>May 20 – Jun 09, 2025 • 4 cities</p>
            </div>
            <div style={{ textAlign: 'right' }}>
              <p style={{ fontSize: '13px', color: '#64748b' }}>Invoice ID</p>
              <p style={{ fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>INV-xye-30290</p>
              <p style={{ fontSize: '13px', color: '#64748b' }}>Generated</p>
              <p style={{ fontWeight: '700', color: '#1e293b', marginBottom: '8px' }}>May 21, 2025</p>
              <span style={{ padding: '6px 14px', borderRadius: '20px', background: '#fef3c7', color: '#92400e', fontSize: '12px', fontWeight: '700' }}>Payment Pending</span>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Traveler Details</p>
              {['James', 'Arjun', 'Jerry', 'Cristina'].map(name => (
                <p key={name} style={{ fontSize: '14px', color: '#374151', fontWeight: '500' }}>{name}</p>
              ))}
            </div>
            <div style={{ background: 'linear-gradient(135deg, #ede9fe, #e0f2fe)', borderRadius: '12px', padding: '16px' }}>
              <p style={{ fontSize: '12px', fontWeight: '700', color: '#64748b', marginBottom: '8px', textTransform: 'uppercase' }}>Budget Insights</p>
              <p style={{ fontSize: '13px', color: '#374151' }}>Total Budget: <strong>₹20,000</strong></p>
              <p style={{ fontSize: '13px', color: '#374151' }}>Total Spent: <strong>₹{grandTotal.toLocaleString()}</strong></p>
              <p style={{ fontSize: '13px', color: grandTotal <= 20000 ? '#22c55e' : '#ef4444', fontWeight: '700' }}>
                {grandTotal <= 20000 ? `Remaining: ₹${(20000 - grandTotal).toLocaleString()}` : `Over by: ₹${(grandTotal - 20000).toLocaleString()}`}
              </p>
              <button style={{ marginTop: '10px', padding: '7px 14px', background: '#6366f1', color: 'white', borderRadius: '6px', fontWeight: '600', fontSize: '12px' }}>View Full Budget</button>
            </div>
          </div>

          <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px' }}>
            <thead>
              <tr style={{ background: '#f8fafc' }}>
                {['#', 'Category', 'Description', 'Qty/Details', 'Unit Cost', 'Amount'].map(h => (
                  <th key={h} style={{ padding: '12px 14px', textAlign: 'left', fontSize: '12px', fontWeight: '700', color: '#64748b', textTransform: 'uppercase', borderBottom: '2px solid #e2e8f0' }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, i) => (
                <tr key={item.id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '14px', fontSize: '14px', color: '#94a3b8' }}>{i + 1}</td>
                  <td style={{ padding: '14px', fontSize: '14px', color: '#374151', fontWeight: '600' }}>{item.category}</td>
                  <td style={{ padding: '14px', fontSize: '14px', color: '#374151' }}>{item.desc}</td>
                  <td style={{ padding: '14px', fontSize: '14px', color: '#374151' }}>{item.qty}</td>
                  <td style={{ padding: '14px', fontSize: '14px', color: '#374151' }}>₹{item.unitCost.toLocaleString()}</td>
                  <td style={{ padding: '14px', fontSize: '14px', fontWeight: '700', color: '#1e293b' }}>₹{item.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <div style={{ minWidth: '260px' }}>
              {[
                { label: 'Subtotal', value: `₹${subtotal.toLocaleString()}` },
                { label: 'Tax (5%)', value: `₹${tax.toLocaleString()}` },
                { label: 'Discount', value: `-₹${discount}` },
              ].map(row => (
                <div key={row.label} style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 0', borderBottom: '1px solid #f1f5f9' }}>
                  <span style={{ fontSize: '14px', color: '#64748b' }}>{row.label}</span>
                  <span style={{ fontSize: '14px', fontWeight: '600', color: '#374151' }}>{row.value}</span>
                </div>
              ))}
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 0', marginTop: '4px' }}>
                <span style={{ fontSize: '16px', fontWeight: '800', color: '#1e293b' }}>Grand Total</span>
                <span style={{ fontSize: '20px', fontWeight: '800', color: '#6366f1' }}>₹{grandTotal.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}