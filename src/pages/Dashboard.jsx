

// import React from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useApp } from '../context/AppContext'

// const destinations = [
//   { name: 'Paris', country: 'France', emoji: '🗼', color: 'linear-gradient(135deg, #fef3c7, #fde68a)', trips: '2.4k trips', rating: 4.8 },
//   { name: 'Tokyo', country: 'Japan', emoji: '⛩️', color: 'linear-gradient(135deg, #e0f2fe, #bae6fd)', trips: '1.8k trips', rating: 4.9 },
//   { name: 'Bali', country: 'Indonesia', emoji: '🌴', color: 'linear-gradient(135deg, #d1fae5, #a7f3d0)', trips: '3.1k trips', rating: 4.7 },
//   { name: 'New York', country: 'USA', emoji: '🗽', color: 'linear-gradient(135deg, #ede9fe, #ddd6fe)', trips: '2.9k trips', rating: 4.8 },
//   { name: 'Rome', country: 'Italy', emoji: '🏛️', color: 'linear-gradient(135deg, #fce7f3, #fbcfe8)', trips: '1.5k trips', rating: 4.6 },
//   { name: 'Dubai', country: 'UAE', emoji: '🌆', color: 'linear-gradient(135deg, #fff7ed, #fed7aa)', trips: '2.2k trips', rating: 4.7 },
// ]

// const quickActions = [
//   { label: 'Build Itinerary', icon: '🗓️', path: '/itinerary-builder', color: '#ede9fe', textColor: '#6366f1' },
//   { label: 'Search Cities', icon: '🔍', path: '/city-search', color: '#e0f2fe', textColor: '#0ea5e9' },
//   { label: 'Find Activities', icon: '🎯', path: '/activity-search', color: '#d1fae5', textColor: '#22c55e' },
//   { label: 'View Budget', icon: '💰', path: '/budget', color: '#fef3c7', textColor: '#f59e0b' },
//   { label: 'Packing List', icon: '🎒', path: '/packing-checklist', color: '#fce7f3', textColor: '#ec4899' },
//   { label: 'Trip Notes', icon: '📝', path: '/trip-notes', color: '#f1f5f9', textColor: '#64748b' },
//   { label: 'Community', icon: '👥', path: '/community', color: '#ede9fe', textColor: '#6366f1' },
//   { label: 'Invoice', icon: '🧾', path: '/invoice', color: '#d1fae5', textColor: '#22c55e' },
// ]

// export default function Dashboard() {
//   const { user, trips } = useApp()
//   const navigate = useNavigate()

//   const now = new Date()
//   const upcoming = trips.filter(t => new Date(t.startDate) > now)
//   const totalBudget = trips.reduce((sum, t) => sum + (Number(t.budget) || 0), 0)

//   return (
//     <div style={{ minHeight: '100vh', background: '#f8fafc' }}>

//       <div style={{
//         background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #06b6d4 100%)',
//         padding: '48px 40px 80px',
//         position: 'relative', overflow: 'hidden'
//       }}>
//         <div style={{
//           position: 'absolute', top: '-60px', right: '-60px',
//           width: '300px', height: '300px', borderRadius: '50%',
//           background: 'rgba(255,255,255,0.06)'
//         }} />
//         <div style={{
//           position: 'absolute', bottom: '-80px', left: '30%',
//           width: '200px', height: '200px', borderRadius: '50%',
//           background: 'rgba(255,255,255,0.04)'
//         }} />

//         <div style={{ position: 'relative', maxWidth: '1100px', margin: '0 auto' }}>
//           <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//             <div>
//               <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '15px', marginBottom: '8px' }}>
//                 👋 Welcome back,
//               </p>
//               <h1 style={{ fontSize: '38px', fontWeight: '900', color: 'white', marginBottom: '12px', letterSpacing: '-0.5px' }}>
//                 {user?.name || 'Traveler'}!
//               </h1>
//               <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '24px' }}>
//                 Ready for your next adventure? Let's plan something amazing.
//               </p>
//               <div style={{ display: 'flex', gap: '12px' }}>
//                 <button onClick={() => navigate('/create-trip')} style={{
//                   padding: '13px 28px',
//                   background: 'white',
//                   color: '#6366f1', borderRadius: '12px',
//                   fontWeight: '800', fontSize: '15px',
//                   boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
//                 }}>+ Plan New Trip</button>
//                 <button onClick={() => navigate('/ai-planner')} style={{
//                   padding: '13px 28px',
//                   background: 'rgba(255,255,255,0.15)',
//                   color: 'white', borderRadius: '12px',
//                   fontWeight: '700', fontSize: '15px',
//                   border: '1px solid rgba(255,255,255,0.3)',
//                   backdropFilter: 'blur(10px)'
//                 }}>✨ AI Planner</button>
//               </div>
//             </div>
//             <div style={{ fontSize: '120px', opacity: 0.2, userSelect: 'none' }}>✈️</div>
//           </div>
//         </div>
//       </div>

//       <div style={{ maxWidth: '1100px', margin: '-40px auto 0', padding: '0 40px 40px', position: 'relative', zIndex: 10 }}>

//         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginBottom: '32px' }}>
//           {[
//             { label: 'Total Trips', value: trips.length, icon: '🗺️', color: '#ede9fe', textColor: '#6366f1', sub: 'trips created' },
//             { label: 'Upcoming', value: upcoming.length, icon: '📅', color: '#e0f2fe', textColor: '#0ea5e9', sub: 'trips ahead' },
//             { label: 'Total Budget', value: `₹${totalBudget.toLocaleString()}`, icon: '💰', color: '#d1fae5', textColor: '#22c55e', sub: 'allocated' },
//           ].map(stat => (
//             <div key={stat.label} style={{
//               background: 'white', borderRadius: '20px', padding: '24px',
//               boxShadow: '0 4px 20px rgba(0,0,0,0.07)',
//               display: 'flex', alignItems: 'center', gap: '18px',
//               border: '1px solid rgba(255,255,255,0.8)'
//             }}>
//               <div style={{
//                 width: '60px', height: '60px', borderRadius: '16px',
//                 background: stat.color,
//                 display: 'flex', alignItems: 'center', justifyContent: 'center',
//                 fontSize: '26px', flexShrink: 0
//               }}>{stat.icon}</div>
//               <div>
//                 <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600', marginBottom: '2px' }}>{stat.label}</p>
//                 <p style={{ fontSize: '26px', fontWeight: '900', color: stat.textColor, lineHeight: 1 }}>{stat.value}</p>
//                 <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{stat.sub}</p>
//               </div>
//             </div>
//           ))}
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '24px', marginBottom: '28px' }}>
//           <div style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
//             <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
//               <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a' }}>Recent Trips</h2>
//               <span onClick={() => navigate('/my-trips')} style={{
//                 fontSize: '13px', color: '#6366f1', cursor: 'pointer',
//                 fontWeight: '700', padding: '4px 12px', borderRadius: '8px',
//                 background: '#ede9fe'
//               }}>View All →</span>
//             </div>

//             {trips.length === 0
//               ? <div style={{ textAlign: 'center', padding: '40px 20px' }}>
//                   <div style={{ fontSize: '52px', marginBottom: '12px' }}>🗺️</div>
//                   <p style={{ fontWeight: '700', color: '#1e293b', fontSize: '16px' }}>No trips yet!</p>
//                   <p style={{ fontSize: '13px', color: '#94a3b8', marginTop: '4px', marginBottom: '16px' }}>
//                     Start planning your first adventure
//                   </p>
//                   <button onClick={() => navigate('/create-trip')} style={{
//                     padding: '10px 22px', background: '#6366f1',
//                     color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '14px'
//                   }}>+ Create Trip</button>
//                 </div>
//               : trips.slice(0, 4).map(trip => (
//                   <div key={trip.id} onClick={() => navigate('/itinerary-view', { state: { trip } })} style={{
//                     padding: '14px 16px', borderRadius: '14px',
//                     background: '#f8fafc', marginBottom: '10px',
//                     cursor: 'pointer', border: '1px solid #e8ecf0',
//                     display: 'flex', alignItems: 'center', gap: '14px',
//                     transition: 'all 0.2s'
//                   }}>
//                     <div style={{
//                       width: '44px', height: '44px', borderRadius: '12px',
//                       background: 'linear-gradient(135deg, #ede9fe, #e0f2fe)',
//                       display: 'flex', alignItems: 'center', justifyContent: 'center',
//                       fontSize: '20px', flexShrink: 0
//                     }}>{trip.emoji || '🌍'}</div>
//                     <div style={{ flex: 1 }}>
//                       <p style={{ fontWeight: '700', color: '#0f172a', fontSize: '14px' }}>{trip.name}</p>
//                       <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>
//                         📅 {trip.startDate} → {trip.endDate}
//                       </p>
//                     </div>
//                     <span style={{ fontSize: '16px', color: '#cbd5e1' }}>→</span>
//                   </div>
//                 ))
//             }
//           </div>

//           <div style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
//             <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>Top Destinations</h2>
//             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
//               {destinations.map(dest => (
//                 <div key={dest.name} onClick={() => navigate('/city-search')} style={{
//                   padding: '14px', borderRadius: '14px',
//                   background: dest.color, cursor: 'pointer',
//                   transition: 'transform 0.2s, box-shadow 0.2s',
//                   border: '1px solid rgba(255,255,255,0.5)'
//                 }}>
//                   <div style={{ fontSize: '26px', marginBottom: '6px' }}>{dest.emoji}</div>
//                   <p style={{ fontWeight: '800', fontSize: '14px', color: '#0f172a' }}>{dest.name}</p>
//                   <p style={{ fontSize: '11px', color: '#475569' }}>{dest.country}</p>
//                   <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px' }}>
//                     <p style={{ fontSize: '11px', color: '#94a3b8' }}>{dest.trips}</p>
//                     <p style={{ fontSize: '11px', color: '#f59e0b', fontWeight: '700' }}>★ {dest.rating}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         <div style={{ background: 'white', borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
//           <h2 style={{ fontSize: '18px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>Quick Actions</h2>
//           <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8, 1fr)', gap: '12px' }}>
//             {quickActions.map(action => (
//               <button key={action.path} onClick={() => navigate(action.path)} style={{
//                 padding: '16px 8px', borderRadius: '16px',
//                 background: action.color,
//                 display: 'flex', flexDirection: 'column',
//                 alignItems: 'center', gap: '8px',
//                 border: 'none', transition: 'all 0.2s'
//               }}>
//                 <span style={{ fontSize: '24px' }}>{action.icon}</span>
//                 <span style={{ fontSize: '11px', fontWeight: '700', color: action.textColor, textAlign: 'center', lineHeight: 1.3 }}>
//                   {action.label}
//                 </span>
//               </button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

const destinations = [
  { name: 'Paris', country: 'France', emoji: '🗼', img: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=400&q=80', trips: '2.4k', rating: 4.8 },
  { name: 'Tokyo', country: 'Japan', emoji: '⛩️', img: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80', trips: '1.8k', rating: 4.9 },
  { name: 'Bali', country: 'Indonesia', emoji: '🌴', img: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=400&q=80', trips: '3.1k', rating: 4.7 },
  { name: 'New York', country: 'USA', emoji: '🗽', img: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80', trips: '2.9k', rating: 4.8 },
  { name: 'Rome', country: 'Italy', emoji: '🏛️', img: 'https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&q=80', trips: '1.5k', rating: 4.6 },
  { name: 'Dubai', country: 'UAE', emoji: '🌆', img: 'https://images.unsplash.com/photo-1518684079-3c830dcef090?w=400&q=80', trips: '2.2k', rating: 4.7 },
]

const quickActions = [
  { label: 'Build Itinerary', icon: '🗓️', path: '/itinerary-builder', color: '#ede9fe', textColor: '#6366f1' },
  { label: 'Search Cities', icon: '🔍', path: '/city-search', color: '#e0f2fe', textColor: '#0ea5e9' },
  { label: 'Find Activities', icon: '🎯', path: '/activity-search', color: '#d1fae5', textColor: '#22c55e' },
  { label: 'View Budget', icon: '💰', path: '/budget', color: '#fef3c7', textColor: '#f59e0b' },
  { label: 'Packing List', icon: '🎒', path: '/packing-checklist', color: '#fce7f3', textColor: '#ec4899' },
  { label: 'Trip Notes', icon: '📝', path: '/trip-notes', color: '#f1f5f9', textColor: '#64748b' },
  { label: 'Community', icon: '👥', path: '/community', color: '#ede9fe', textColor: '#6366f1' },
  { label: 'Invoice', icon: '🧾', path: '/invoice', color: '#d1fae5', textColor: '#22c55e' },
]

export default function Dashboard() {
  const { user, trips } = useApp()
  const navigate = useNavigate()
  const now = new Date()
  const upcoming = trips.filter(t => new Date(t.startDate) > now)
  const totalBudget = trips.reduce((sum, t) => sum + (Number(t.budget) || 0), 0)

  return (
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>

      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #06b6d4 100%)',
        padding: '0 0 60px', position: 'relative', overflow: 'hidden'
      }}>
        <img
          src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=1400&q=80"
          alt="travel banner"
          style={{
            position: 'absolute', top: 0, left: 0, width: '100%', height: '100%',
            objectFit: 'cover', opacity: 0.15
          }}
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(135deg, rgba(79,70,229,0.95), rgba(6,182,212,0.85))' }} />

        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', padding: '60px 40px 40px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ animation: 'fadeInUp 0.5s ease' }}>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '16px', marginBottom: '8px' }}>👋 Welcome back,</p>
              <h1 style={{ fontSize: '42px', fontWeight: '900', color: 'white', marginBottom: '12px', letterSpacing: '-1px' }}>
                {user?.name || 'Traveler'}!
              </h1>
              <p style={{ color: 'rgba(255,255,255,0.8)', fontSize: '17px', marginBottom: '28px' }}>
                Ready for your next adventure?
              </p>
              <div style={{ display: 'flex', gap: '14px' }}>
                <button onClick={() => navigate('/create-trip')} style={{
                  padding: '14px 30px', background: 'white', color: '#6366f1',
                  borderRadius: '14px', fontWeight: '800', fontSize: '15px',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
                }}>+ Plan New Trip</button>
                <button onClick={() => navigate('/ai-planner')} style={{
                  padding: '14px 30px',
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(10px)',
                  color: 'white', borderRadius: '14px',
                  fontWeight: '700', fontSize: '15px',
                  border: '1px solid rgba(255,255,255,0.3)'
                }}>✨ AI Planner</button>
              </div>
            </div>
            <div style={{ opacity: 0.2, fontSize: '150px', userSelect: 'none', animation: 'float 4s ease-in-out infinite' }}>🌍</div>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '-40px auto 0', padding: '0 40px 60px', position: 'relative', zIndex: 10 }}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '20px', marginBottom: '36px' }}>
          {[
            { label: 'Total Trips', value: trips.length, icon: '🗺️', color: '#ede9fe', textColor: '#6366f1', sub: 'trips planned' },
            { label: 'Upcoming', value: upcoming.length, icon: '📅', color: '#e0f2fe', textColor: '#0ea5e9', sub: 'trips ahead' },
            { label: 'Total Budget', value: `₹${totalBudget.toLocaleString()}`, icon: '💰', color: '#d1fae5', textColor: '#22c55e', sub: 'allocated' },
          ].map((stat, i) => (
            <div key={stat.label} style={{
              background: 'white', borderRadius: '20px', padding: '24px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
              display: 'flex', alignItems: 'center', gap: '18px',
              animation: `fadeInUp ${0.3 + i * 0.1}s ease`,
              border: '1px solid rgba(226,232,240,0.6)'
            }}>
              <div style={{
                width: '64px', height: '64px', borderRadius: '18px',
                background: stat.color, display: 'flex',
                alignItems: 'center', justifyContent: 'center',
                fontSize: '28px', flexShrink: 0
              }}>{stat.icon}</div>
              <div>
                <p style={{ fontSize: '13px', color: '#64748b', fontWeight: '600' }}>{stat.label}</p>
                <p style={{ fontSize: '28px', fontWeight: '900', color: stat.textColor, lineHeight: 1.1 }}>{stat.value}</p>
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>{stat.sub}</p>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1.3fr 1fr', gap: '24px', marginBottom: '28px' }}>
          <div style={{ background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a' }}>Recent Trips</h2>
              <button onClick={() => navigate('/my-trips')} style={{
                padding: '6px 16px', borderRadius: '20px',
                background: '#ede9fe', color: '#6366f1',
                fontWeight: '700', fontSize: '13px'
              }}>View All →</button>
            </div>
            {trips.length === 0
              ? <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                  <img src="https://images.unsplash.com/photo-1501854140801-50d01698950b?w=300&q=80" alt="no trips" style={{ width: '100%', maxWidth: '240px', borderRadius: '16px', marginBottom: '16px', objectFit: 'cover', height: '140px' }} />
                  <p style={{ fontWeight: '800', color: '#1e293b', fontSize: '16px' }}>No trips yet!</p>
                  <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '16px' }}>Start planning your first adventure</p>
                  <button onClick={() => navigate('/create-trip')} style={{
                    padding: '11px 24px', background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                    color: 'white', borderRadius: '10px', fontWeight: '700', fontSize: '14px',
                    boxShadow: '0 4px 15px rgba(99,102,241,0.3)'
                  }}>+ Create Trip</button>
                </div>
              : trips.slice(0, 4).map(trip => (
                  <div key={trip.id} onClick={() => navigate('/itinerary-view', { state: { trip } })} style={{
                    padding: '14px 16px', borderRadius: '14px', background: '#f8fafc',
                    marginBottom: '10px', cursor: 'pointer',
                    border: '1px solid #e8ecf0',
                    display: 'flex', alignItems: 'center', gap: '14px',
                    transition: 'all 0.2s'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#ede9fe'; e.currentTarget.style.borderColor = '#c7d2fe' }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#f8fafc'; e.currentTarget.style.borderColor = '#e8ecf0' }}>
                    <div style={{
                      width: '48px', height: '48px', borderRadius: '14px',
                      background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px', flexShrink: 0
                    }}>{trip.emoji || '🌍'}</div>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontWeight: '700', color: '#0f172a', fontSize: '15px' }}>{trip.name}</p>
                      <p style={{ fontSize: '12px', color: '#64748b', marginTop: '2px' }}>📅 {trip.startDate} → {trip.endDate}</p>
                    </div>
                    <span style={{ color: '#6366f1', fontSize: '18px' }}>→</span>
                  </div>
                ))
            }
          </div>

          <div style={{ background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>Top Destinations</h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {destinations.slice(0, 4).map(dest => (
                <div key={dest.name} onClick={() => navigate('/city-search')} style={{
                  borderRadius: '16px', cursor: 'pointer',
                  overflow: 'hidden', position: 'relative',
                  height: '110px', transition: 'transform 0.2s, box-shadow 0.2s'
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = 'scale(1.04)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)' }}
                onMouseLeave={e => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = 'none' }}>
                  <img src={dest.img} alt={dest.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute', inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)',
                    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end'
                  }}>
                    <p style={{ fontWeight: '800', fontSize: '13px', color: 'white' }}>{dest.emoji} {dest.name}</p>
                    <p style={{ fontSize: '11px', color: 'rgba(255,255,255,0.8)' }}>★ {dest.rating} • {dest.trips} trips</p>
                  </div>
                </div>
              ))}
            </div>
            <button onClick={() => navigate('/city-search')} style={{
              width: '100%', marginTop: '14px', padding: '11px',
              background: '#f8fafc', color: '#6366f1', borderRadius: '12px',
              fontWeight: '700', fontSize: '14px', border: '1px solid #e2e8f0'
            }}>Explore All Cities →</button>
          </div>
        </div>

        <div style={{ background: 'white', borderRadius: '24px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
          <h2 style={{ fontSize: '20px', fontWeight: '800', color: '#0f172a', marginBottom: '20px' }}>Quick Actions</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(8,1fr)', gap: '14px' }}>
            {quickActions.map(action => (
              <button key={action.path} onClick={() => navigate(action.path)} style={{
                padding: '18px 8px', borderRadius: '18px',
                background: action.color,
                display: 'flex', flexDirection: 'column',
                alignItems: 'center', gap: '8px',
                border: 'none', transition: 'all 0.25s'
              }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 8px 20px rgba(0,0,0,0.12)' }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none' }}>
                <span style={{ fontSize: '26px' }}>{action.icon}</span>
                <span style={{ fontSize: '11px', fontWeight: '700', color: action.textColor, textAlign: 'center', lineHeight: 1.3 }}>{action.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '28px', borderRadius: '24px', overflow: 'hidden', position: 'relative', height: '200px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}>
          <img src="https://imags.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1200&q=80" alt="explore" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{
            position: 'absolute', inset: 0,
            background: 'linear-gradient(135deg, rgba(79,70,229,0.85), rgba(6,182,212,0.75))',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '40px 48px'
          }}>
            <div>
              <h3 style={{ fontSize: '26px', fontWeight: '900', color: 'white', marginBottom: '8px' }}>
                ✨ Try AI Trip Planner
              </h3>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '15px' }}>
                Get a personalized itinerary in seconds!
              </p>
            </div>
            <button onClick={() => navigate('/ai-planner')} style={{
              padding: '14px 32px', background: 'white', color: '#6366f1',
              borderRadius: '14px', fontWeight: '800', fontSize: '16px',
              boxShadow: '0 8px 25px rgba(0,0,0,0.2)'
            }}>Try Now →</button>
          </div>
        </div>
      </div>
    </div>
  )
}