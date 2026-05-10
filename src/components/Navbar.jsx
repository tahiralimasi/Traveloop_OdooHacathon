


// import React from 'react'
// import { useNavigate, useLocation } from 'react-router-dom'
// import { useApp } from '../context/AppContext'

// export default function Navbar() {
//   const { user, logout } = useApp()
//   const navigate = useNavigate()
//   const location = useLocation()

//   const hideOn = ['/login', '/register']
//   if (hideOn.includes(location.pathname)) return null

//   const handleLogout = () => {
//     logout()
//     navigate('/login')
//   }

//   const navLinks = [
//     { label: '🏠 Home', path: '/dashboard' },
//     { label: '🗺️ My Trips', path: '/my-trips' },
//     { label: '✨ AI Planner', path: '/ai-planner' },
//     { label: '👥 Community', path: '/community' },
//     { label: '👤 Profile', path: '/profile' },
//   ]

//   return (
//     <nav style={{
//       background: 'rgba(255,255,255,0.92)',
//       backdropFilter: 'blur(12px)',
//       borderBottom: '1px solid #e8ecf0',
//       padding: '0 40px',
//       height: '68px',
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'space-between',
//       position: 'sticky',
//       top: 0,
//       zIndex: 1000,
//       boxShadow: '0 1px 20px rgba(0,0,0,0.06)'
//     }}>
//       <div onClick={() => navigate('/dashboard')} style={{
//         display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer'
//       }}>
//         <div style={{
//           width: '40px', height: '40px', borderRadius: '12px',
//           background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
//           display: 'flex', alignItems: 'center', justifyContent: 'center',
//           fontSize: '20px', boxShadow: '0 4px 12px rgba(99,102,241,0.3)'
//         }}>✈️</div>
//         <span style={{
//           fontWeight: '800', fontSize: '22px',
//           background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
//           WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
//         }}>Traveloop</span>
//       </div>

//       <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
//         {navLinks.map(item => {
//           const isActive = location.pathname === item.path
//           return (
//             <button key={item.path} onClick={() => navigate(item.path)} style={{
//               padding: '8px 16px', borderRadius: '10px',
//               background: isActive ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
//               color: isActive ? 'white' : '#475569',
//               fontWeight: isActive ? '700' : '500',
//               fontSize: '14px',
//               boxShadow: isActive ? '0 4px 12px rgba(99,102,241,0.3)' : 'none'
//             }}>{item.label}</button>
//           )
//         })}

//         <div style={{
//           width: '1px', height: '24px', background: '#e2e8f0', margin: '0 8px'
//         }} />

//         <div style={{
//           display: 'flex', alignItems: 'center', gap: '10px',
//           padding: '6px 14px', borderRadius: '12px',
//           background: '#f8fafc', border: '1px solid #e2e8f0'
//         }}>
//           <div style={{
//             width: '30px', height: '30px', borderRadius: '50%',
//             background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             color: 'white', fontWeight: '800', fontSize: '13px'
//           }}>{user?.name?.charAt(0) || 'U'}</div>
//           <span style={{ fontSize: '13px', fontWeight: '600', color: '#374151' }}>
//             {user?.name?.split(' ')[0] || 'User'}
//           </span>
//         </div>

//         <button onClick={handleLogout} style={{
//           padding: '8px 16px', borderRadius: '10px',
//           background: '#fef2f2', color: '#ef4444',
//           fontWeight: '600', fontSize: '13px',
//           border: '1px solid #fecaca'
//         }}>Logout</button>
//       </div>
//     </nav>
//   )
// }



import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Navbar() {
  const { user, logout } = useApp()
  const navigate = useNavigate()
  const location = useLocation()

  const hideOn = ['/login', '/register']
  if (hideOn.includes(location.pathname)) return null

  const navLinks = [
    { label: 'Home', icon: '🏠', path: '/dashboard' },
    { label: 'My Trips', icon: '🗺️', path: '/my-trips' },
    { label: 'AI Planner', icon: '✨', path: '/ai-planner' },
    { label: 'Community', icon: '👥', path: '/community' },
    { label: 'Profile', icon: '👤', path: '/profile' },
  ]

  return (
    <nav style={{
      background: 'rgba(255,255,255,0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(226,232,240,0.8)',
      padding: '0 48px',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      boxShadow: '0 2px 20px rgba(0,0,0,0.06)'
    }}>
      <div onClick={() => navigate('/dashboard')} style={{
        display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer'
      }}>
        <div style={{
          width: '42px', height: '42px', borderRadius: '14px',
          background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: '20px', boxShadow: '0 4px 15px rgba(99,102,241,0.4)',
          animation: 'float 3s ease-in-out infinite'
        }}>✈️</div>
        <span style={{
          fontWeight: '900', fontSize: '24px',
          background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
          WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'
        }}>Traveloop</span>
      </div>

      <div style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
        {navLinks.map(item => {
          const isActive = location.pathname === item.path
          return (
            <button key={item.path} onClick={() => navigate(item.path)} style={{
              padding: '9px 18px', borderRadius: '12px',
              background: isActive ? 'linear-gradient(135deg, #6366f1, #4f46e5)' : 'transparent',
              color: isActive ? 'white' : '#64748b',
              fontWeight: isActive ? '700' : '500',
              fontSize: '14px',
              boxShadow: isActive ? '0 4px 15px rgba(99,102,241,0.35)' : 'none',
              display: 'flex', alignItems: 'center', gap: '6px'
            }}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
            </button>
          )
        })}
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '8px 16px', borderRadius: '50px',
          background: 'linear-gradient(135deg, #ede9fe, #e0f2fe)',
          border: '1px solid #e2e8f0', cursor: 'pointer'
        }} onClick={() => navigate('/profile')}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '50%',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: 'white', fontWeight: '800', fontSize: '14px'
          }}>{user?.name?.charAt(0) || 'U'}</div>
          <span style={{ fontSize: '14px', fontWeight: '700', color: '#374151' }}>
            {user?.name?.split(' ')[0] || 'User'}
          </span>
        </div>
        <button onClick={() => { logout(); navigate('/login') }} style={{
          padding: '9px 18px', borderRadius: '12px',
          background: '#fef2f2', color: '#ef4444',
          fontWeight: '700', fontSize: '14px',
          border: '1px solid #fecaca'
        }}>Logout</button>
      </div>
    </nav>
  )
}