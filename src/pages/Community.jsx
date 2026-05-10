import React, { useState } from 'react'

const posts = [
  { id: 1, user: 'Tanishq Naik', avatar: '🧑', trip: 'Europe Backpacking', places: 'Paris, Rome, Amsterdam', days: 21, budget: 95000, likes: 142, comments: 28, tags: ['Budget Travel', 'Backpacking', 'Europe'], desc: 'An incredible 3-week journey across Europe on a shoestring budget! Stayed in hostels, cooked meals, and made lifelong friends.' },
  { id: 2, user: 'Priya Sharma', avatar: '👩', trip: 'Bali Wellness Retreat', places: 'Ubud, Seminyak, Nusa Penida', days: 10, budget: 65000, likes: 98, comments: 15, tags: ['Wellness', 'Beach', 'Asia'], desc: 'Found my zen in Bali. Yoga at sunrise, rice field walks, and the most beautiful temples you will ever see.' },
  { id: 3, user: 'Arjun Mehta', avatar: '🧔', trip: 'Japan Cherry Blossom', places: 'Tokyo, Kyoto, Osaka', days: 14, budget: 120000, likes: 234, comments: 47, tags: ['Culture', 'Photography', 'Japan'], desc: 'Witnessed the magical sakura season across Japan. Every moment was picture perfect and the food was unreal!' },
  { id: 4, user: 'Sneha Patel', avatar: '👧', trip: 'Dubai Luxury Escape', places: 'Dubai, Abu Dhabi', days: 7, budget: 85000, likes: 176, comments: 32, tags: ['Luxury', 'Desert', 'Shopping'], desc: 'Dubai exceeded every expectation. Desert safari, Burj Khalifa, and world-class dining all in one trip.' },
]

export default function Community() {
  const [search, setSearch] = useState('')
  const [filter, setFilter] = useState('All')
  const [liked, setLiked] = useState([])
  const tags = ['All', 'Budget Travel', 'Backpacking', 'Luxury', 'Beach', 'Culture', 'Adventure']

  const filtered = posts.filter(p => {
    const matchSearch = p.trip.toLowerCase().includes(search.toLowerCase()) || p.user.toLowerCase().includes(search.toLowerCase()) || p.places.toLowerCase().includes(search.toLowerCase())
    const matchFilter = filter === 'All' || p.tags.includes(filter)
    return matchSearch && matchFilter
  })

  const toggleLike = (id) => setLiked(liked.includes(id) ? liked.filter(i => i !== id) : [...liked, id])

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc', padding: '32px' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto' }}>
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#1e293b' }}>Community 👥</h1>
          <p style={{ color: '#64748b', marginTop: '4px' }}>Explore trips shared by fellow travelers</p>
        </div>

        <div style={{ background: 'white', borderRadius: '16px', padding: '20px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', marginBottom: '24px' }}>
          <input placeholder="Search trips, places, travelers..." value={search} onChange={e => setSearch(e.target.value)}
            style={{ width: '100%', padding: '13px 16px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '15px', background: '#f8fafc', marginBottom: '16px' }} />
          <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
            {tags.map(tag => (
              <button key={tag} onClick={() => setFilter(tag)} style={{ padding: '6px 14px', borderRadius: '20px', fontSize: '12px', fontWeight: '600', background: filter === tag ? '#6366f1' : '#f1f5f9', color: filter === tag ? 'white' : '#64748b', border: 'none' }}>{tag}</button>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {filtered.map(post => (
            <div key={post.id} style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: '1px solid #e2e8f0' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #ede9fe, #e0f2fe)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '22px' }}>{post.avatar}</div>
                <div>
                  <p style={{ fontWeight: '700', color: '#1e293b', fontSize: '15px' }}>{post.user}</p>
                  <p style={{ fontSize: '12px', color: '#64748b' }}>📍 {post.places}</p>
                </div>
                <button style={{ marginLeft: 'auto', padding: '8px 16px', borderRadius: '8px', background: '#ede9fe', color: '#6366f1', fontWeight: '600', fontSize: '13px' }}>Copy Trip</button>
              </div>
              <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#1e293b', marginBottom: '8px' }}>{post.trip}</h3>
              <p style={{ fontSize: '14px', color: '#374151', lineHeight: '1.6', marginBottom: '16px' }}>{post.desc}</p>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {[{ icon: '📅', label: `${post.days} days` }, { icon: '💰', label: `₹${post.budget.toLocaleString()}` }, { icon: '🗺️', label: `${post.places.split(',').length} cities` }].map(stat => (
                  <div key={stat.label} style={{ padding: '6px 14px', borderRadius: '20px', background: '#f8fafc', border: '1px solid #e2e8f0', fontSize: '13px', color: '#374151', fontWeight: '600' }}>{stat.icon} {stat.label}</div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '8px', marginBottom: '16px', flexWrap: 'wrap' }}>
                {post.tags.map(tag => <span key={tag} style={{ padding: '4px 12px', borderRadius: '20px', background: '#ede9fe', color: '#6366f1', fontSize: '12px', fontWeight: '600' }}>#{tag}</span>)}
              </div>
              <div style={{ display: 'flex', gap: '16px', paddingTop: '16px', borderTop: '1px solid #f1f5f9' }}>
                <button onClick={() => toggleLike(post.id)} style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', background: liked.includes(post.id) ? '#fce7f3' : '#f8fafc', color: liked.includes(post.id) ? '#ec4899' : '#64748b', fontWeight: '600', fontSize: '13px', border: `1px solid ${liked.includes(post.id) ? '#fbcfe8' : '#e2e8f0'}` }}>
                  {liked.includes(post.id) ? '❤️' : '🤍'} {post.likes + (liked.includes(post.id) ? 1 : 0)}
                </button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', background: '#f8fafc', color: '#64748b', fontWeight: '600', fontSize: '13px', border: '1px solid #e2e8f0' }}>💬 {post.comments}</button>
                <button style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', background: '#f8fafc', color: '#64748b', fontWeight: '600', fontSize: '13px', border: '1px solid #e2e8f0' }}>🔗 Share</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}