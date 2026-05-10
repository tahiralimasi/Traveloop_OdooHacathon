import React, { useState } from 'react'

const defaultNotes = [
  { id: 1, title: 'Hotel Check-in Details - Rome Stop', content: 'Check in after 2pm, room 302, breakfast included (7-10am)', trip: 'Paris & Rome Adventure', stop: 'Rome', date: 'June 14 2025', pinned: true },
  { id: 2, title: 'Local Contacts - Paris', content: 'Tour guide: +33 6 12 34 56 78, Hotel concierge speaks English', trip: 'Paris & Rome Adventure', stop: 'Paris', date: 'June 10 2025', pinned: false },
  { id: 3, title: 'Must Try Food', content: 'Croissant from Boulangerie near Eiffel, Carbonara at Trattoria Roma', trip: 'Paris & Rome Adventure', stop: 'Paris', date: 'June 11 2025', pinned: false },
]

export default function TripNotes() {
  const [notes, setNotes] = useState(defaultNotes)
  const [search, setSearch] = useState('')
  const [filterBy, setFilterBy] = useState('all')
  const [showForm, setShowForm] = useState(false)
  const [editNote, setEditNote] = useState(null)
  const [form, setForm] = useState({ title: '', content: '', stop: '', trip: 'Paris & Rome Adventure' })

  const filtered = notes.filter(n => {
    const matchSearch = n.title.toLowerCase().includes(search.toLowerCase()) || n.content.toLowerCase().includes(search.toLowerCase())
    if (filterBy === 'pinned') return matchSearch && n.pinned
    return matchSearch
  })

  const saveNote = () => {
    if (!form.title || !form.content) return
    if (editNote) {
      setNotes(notes.map(n => n.id === editNote.id ? { ...n, ...form } : n))
      setEditNote(null)
    } else {
      setNotes([{ id: Date.now(), ...form, date: new Date().toLocaleDateString('en-GB', { month: 'long', day: 'numeric', year: 'numeric' }), pinned: false }, ...notes])
    }
    setForm({ title: '', content: '', stop: '', trip: 'Paris & Rome Adventure' })
    setShowForm(false)
  }

  const deleteNote = (id) => setNotes(notes.filter(n => n.id !== id))
  const togglePin = (id) => setNotes(notes.map(n => n.id === id ? { ...n, pinned: !n.pinned } : n))
  const openEdit = (note) => { setEditNote(note); setForm({ title: note.title, content: note.content, stop: note.stop, trip: note.trip }); setShowForm(true) }

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '28px' }}>
          <div>
            <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>Trip Notes 📝</h1>
            <p style={{ color: '#64748b', marginTop: '4px' }}>Jot down important details</p>
          </div>
          <button onClick={() => { setShowForm(!showForm); setEditNote(null); setForm({ title: '', content: '', stop: '', trip: 'Paris & Rome Adventure' }) }} style={{ padding: '12px 24px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>+ Add Note</button>
        </div>

        {showForm && (
          <div style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px', border: '2px solid #6366f1' }}>
            <h3 style={{ fontWeight: '700', color: '#1e293b', marginBottom: '16px' }}>{editNote ? 'Edit Note' : 'New Note'}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input placeholder="Note title..." value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                style={{ padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc' }} />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <input placeholder="Stop / City..." value={form.stop} onChange={e => setForm({ ...form, stop: e.target.value })}
                  style={{ padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc' }} />
                <input placeholder="Trip name..." value={form.trip} onChange={e => setForm({ ...form, trip: e.target.value })}
                  style={{ padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc' }} />
              </div>
              <textarea placeholder="Write your note here..." value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={4}
                style={{ padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc', resize: 'vertical' }} />
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={saveNote} style={{ flex: 1, padding: '12px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)', color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '14px' }}>Save Note</button>
                <button onClick={() => setShowForm(false)} style={{ padding: '12px 20px', background: '#f1f5f9', color: '#64748b', borderRadius: '10px', fontWeight: '600', fontSize: '14px' }}>Cancel</button>
              </div>
            </div>
          </div>
        )}

        <div style={{ display: 'flex', gap: '12px', marginBottom: '20px' }}>
          <input placeholder="Search notes..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ flex: 1, padding: '11px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: 'white' }} />
          {['all', 'pinned'].map(f => (
            <button key={f} onClick={() => setFilterBy(f)} style={{ padding: '10px 18px', borderRadius: '10px', fontWeight: '600', fontSize: '13px', background: filterBy === f ? '#6366f1' : 'white', color: filterBy === f ? 'white' : '#64748b', border: '1.5px solid', borderColor: filterBy === f ? '#6366f1' : '#e2e8f0' }}>{f === 'pinned' ? '📌 Pinned' : '📋 All'}</button>
          ))}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {filtered.length === 0
            ? <div style={{ textAlign: 'center', padding: '60px', background: 'white', borderRadius: '20px' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
                <p style={{ fontWeight: '700', color: '#1e293b' }}>No notes yet</p>
              </div>
            : filtered.map(note => (
                <div key={note.id} style={{ background: note.pinned ? '#fefeff' : 'white', borderRadius: '16px', padding: '22px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: `1px solid ${note.pinned ? '#c7d2fe' : '#e2e8f0'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        {note.pinned && <span style={{ fontSize: '14px' }}>📌</span>}
                        <h3 style={{ fontSize: '15px', fontWeight: '700', color: '#1e293b' }}>{note.title}</h3>
                      </div>
                      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '4px' }}>🗺️ {note.trip} {note.stop && `• 📍 ${note.stop}`} • 🕐 {note.date}</p>
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => togglePin(note.id)} style={{ padding: '6px 10px', borderRadius: '6px', background: note.pinned ? '#ede9fe' : '#f8fafc', color: note.pinned ? '#6366f1' : '#94a3b8', fontSize: '13px' }}>📌</button>
                      <button onClick={() => openEdit(note)} style={{ padding: '6px 10px', borderRadius: '6px', background: '#e0f2fe', color: '#0ea5e9', fontSize: '13px' }}>✏️</button>
                      <button onClick={() => deleteNote(note.id)} style={{ padding: '6px 10px', borderRadius: '6px', background: '#fef2f2', color: '#ef4444', fontSize: '13px' }}>🗑️</button>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6' }}>{note.content}</p>
                </div>
              ))
          }
        </div>
      </div>
    </div>
  )
}