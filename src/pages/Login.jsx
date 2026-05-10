


// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useApp } from '../context/AppContext'

// export default function Login() {
//   const [form, setForm] = useState({ username: '', password: '' })
//   const [error, setError] = useState('')
//   const [showPass, setShowPass] = useState(false)
//   const { login } = useApp()
//   const navigate = useNavigate()

//   const handleLogin = () => {
//     if (!form.username || !form.password) {
//       setError('Please enter username and password.')
//       return
//     }
//     login({ name: form.username, email: form.username })
//     navigate('/dashboard')
//   }

//   return (
//     <div style={{
//       minHeight: '100vh',
//       display: 'grid',
//       gridTemplateColumns: '1fr 1fr',
//     }}>
//       <div style={{
//         background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 40%, #06b6d4 100%)',
//         display: 'flex', flexDirection: 'column',
//         alignItems: 'center', justifyContent: 'center',
//         padding: '60px', position: 'relative', overflow: 'hidden'
//       }}>
//         <div style={{
//           position: 'absolute', top: '-100px', left: '-100px',
//           width: '400px', height: '400px', borderRadius: '50%',
//           background: 'rgba(255,255,255,0.05)'
//         }} />
//         <div style={{
//           position: 'absolute', bottom: '-80px', right: '-80px',
//           width: '300px', height: '300px', borderRadius: '50%',
//           background: 'rgba(255,255,255,0.07)'
//         }} />
//         <div style={{ position: 'relative', textAlign: 'center', color: 'white' }}>
//           <div style={{ fontSize: '80px', marginBottom: '24px' }}>✈️</div>
//           <h1 style={{ fontSize: '42px', fontWeight: '900', marginBottom: '16px', letterSpacing: '-1px' }}>
//             Traveloop
//           </h1>
//           <p style={{ fontSize: '18px', opacity: 0.85, lineHeight: 1.6, maxWidth: '320px' }}>
//             Plan your perfect journey with AI-powered travel planning
//           </p>
//           <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '48px', textAlign: 'left' }}>
//             {[
//               { icon: '🗺️', text: 'Create multi-city itineraries' },
//               { icon: '💰', text: 'Smart budget tracking' },
//               { icon: '✨', text: 'AI-powered trip planning' },
//               { icon: '👥', text: 'Share with community' },
//             ].map(item => (
//               <div key={item.text} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
//                 <div style={{
//                   width: '36px', height: '36px', borderRadius: '10px',
//                   background: 'rgba(255,255,255,0.15)',
//                   display: 'flex', alignItems: 'center', justifyContent: 'center',
//                   fontSize: '18px', flexShrink: 0
//                 }}>{item.icon}</div>
//                 <span style={{ fontSize: '15px', opacity: 0.9, fontWeight: '500' }}>{item.text}</span>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       <div style={{
//         background: '#f8fafc',
//         display: 'flex', alignItems: 'center', justifyContent: 'center',
//         padding: '60px 80px'
//       }}>
//         <div style={{ width: '100%', maxWidth: '400px' }}>
//           <div style={{ marginBottom: '40px' }}>
//             <h2 style={{ fontSize: '32px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>
//               Welcome back! 👋
//             </h2>
//             <p style={{ color: '#64748b', fontSize: '16px' }}>
//               Sign in to continue your journey
//             </p>
//           </div>

//           <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
//             <div>
//               <label style={{
//                 fontSize: '13px', fontWeight: '700', color: '#374151',
//                 display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'
//               }}>Username</label>
//               <div style={{ position: 'relative' }}>
//                 <span style={{
//                   position: 'absolute', left: '14px', top: '50%',
//                   transform: 'translateY(-50%)', fontSize: '18px'
//                 }}>👤</span>
//                 <input
//                   type="text"
//                   placeholder="Enter your username"
//                   value={form.username}
//                   onChange={e => setForm({ ...form, username: e.target.value })}
//                   onKeyDown={e => e.key === 'Enter' && handleLogin()}
//                   style={{
//                     width: '100%', padding: '14px 14px 14px 44px',
//                     borderRadius: '12px', border: '2px solid #e2e8f0',
//                     fontSize: '15px', background: 'white',
//                     boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
//                   }}
//                 />
//               </div>
//             </div>

//             <div>
//               <label style={{
//                 fontSize: '13px', fontWeight: '700', color: '#374151',
//                 display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px'
//               }}>Password</label>
//               <div style={{ position: 'relative' }}>
//                 <span style={{
//                   position: 'absolute', left: '14px', top: '50%',
//                   transform: 'translateY(-50%)', fontSize: '18px'
//                 }}>🔒</span>
//                 <input
//                   type={showPass ? 'text' : 'password'}
//                   placeholder="Enter your password"
//                   value={form.password}
//                   onChange={e => setForm({ ...form, password: e.target.value })}
//                   onKeyDown={e => e.key === 'Enter' && handleLogin()}
//                   style={{
//                     width: '100%', padding: '14px 44px 14px 44px',
//                     borderRadius: '12px', border: '2px solid #e2e8f0',
//                     fontSize: '15px', background: 'white',
//                     boxShadow: '0 1px 3px rgba(0,0,0,0.04)'
//                   }}
//                 />
//                 <span
//                   onClick={() => setShowPass(!showPass)}
//                   style={{
//                     position: 'absolute', right: '14px', top: '50%',
//                     transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '18px'
//                   }}>{showPass ? '🙈' : '👁️'}</span>
//               </div>
//             </div>

//             {error && (
//               <div style={{
//                 padding: '12px 16px', background: '#fef2f2',
//                 borderRadius: '10px', border: '1px solid #fecaca',
//                 display: 'flex', alignItems: 'center', gap: '8px'
//               }}>
//                 <span>⚠️</span>
//                 <p style={{ color: '#dc2626', fontSize: '13px', fontWeight: '600' }}>{error}</p>
//               </div>
//             )}

//             <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
//               <span style={{ fontSize: '13px', color: '#6366f1', cursor: 'pointer', fontWeight: '600' }}>
//                 Forgot Password?
//               </span>
//             </div>

//             <button onClick={handleLogin} style={{
//               width: '100%', padding: '16px',
//               background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
//               color: 'white', borderRadius: '12px',
//               fontSize: '16px', fontWeight: '800',
//               boxShadow: '0 8px 25px rgba(99,102,241,0.4)',
//               letterSpacing: '0.3px'
//             }}>Sign In →</button>

//             <div style={{
//               display: 'flex', alignItems: 'center', gap: '12px', margin: '4px 0'
//             }}>
//               <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
//               <span style={{ fontSize: '13px', color: '#94a3b8', fontWeight: '500' }}>or</span>
//               <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
//             </div>

//             <p style={{ textAlign: 'center', fontSize: '15px', color: '#64748b' }}>
//               Don't have an account?{' '}
//               <span onClick={() => navigate('/register')} style={{
//                 color: '#6366f1', fontWeight: '700', cursor: 'pointer'
//               }}>Create Account</span>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }


import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [showPass, setShowPass] = useState(false)
  const { login } = useApp()
  const navigate = useNavigate()

  const handleLogin = () => {
    if (!form.username || !form.password) { setError('Please enter username and password.'); return }
    login({ name: form.username, email: form.username })
    navigate('/dashboard')
  }

  const features = [
    { icon: '🗺️', title: 'Smart Itineraries', desc: 'Plan multi-city trips with ease' },
    { icon: '✨', title: 'AI Powered', desc: 'Get personalized trip suggestions' },
    { icon: '💰', title: 'Budget Tracker', desc: 'Stay within your travel budget' },
    { icon: '👥', title: 'Community', desc: 'Share trips with fellow travelers' },
  ]

  return (
    <div style={{ minHeight: '100vh', display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <div style={{
        background: 'linear-gradient(135deg, #4f46e5 0%, #6366f1 50%, #06b6d4 100%)',
        display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '60px', position: 'relative', overflow: 'hidden'
      }}>
        <div style={{ position: 'absolute', top: '-100px', left: '-100px', width: '400px', height: '400px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '-80px', width: '300px', height: '300px', borderRadius: '50%', background: 'rgba(255,255,255,0.07)' }} />
        <div style={{ position: 'absolute', top: '40%', right: '10%', width: '150px', height: '150px', borderRadius: '50%', background: 'rgba(255,255,255,0.04)' }} />

        <div style={{ position: 'relative', textAlign: 'center', color: 'white', animation: 'fadeInUp 0.6s ease' }}>
          <div style={{ fontSize: '80px', marginBottom: '20px', animation: 'float 3s ease-in-out infinite' }}>✈️</div>
          <h1 style={{ fontSize: '46px', fontWeight: '900', marginBottom: '12px', letterSpacing: '-1px' }}>Traveloop</h1>
          <p style={{ fontSize: '17px', opacity: 0.85, marginBottom: '48px', lineHeight: 1.6 }}>
            Your AI-powered travel companion
          </p>

          <img
            //src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=500&q=80"
            src="https://images.unsplash.com/photo-1506744038136-46273834b3fb?q=80&w=2070&auto=format&fit=crop"
            alt="travel"
            style={{
              width: '100%', maxWidth: '360px', borderRadius: '20px',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
              marginBottom: '36px', objectFit: 'cover', height: '200px'
            }}
          />

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', textAlign: 'left' }}>
            {features.map(f => (
              <div key={f.title} style={{
                background: 'rgba(255,255,255,0.12)',
                backdropFilter: 'blur(10px)',
                borderRadius: '14px', padding: '14px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '6px' }}>{f.icon}</div>
                <p style={{ fontWeight: '700', fontSize: '13px', marginBottom: '2px' }}>{f.title}</p>
                <p style={{ fontSize: '11px', opacity: 0.8 }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{
        background: '#f8fafc',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '60px 80px'
      }}>
        <div style={{ width: '100%', maxWidth: '400px', animation: 'fadeInUp 0.5s ease' }}>
          <div style={{ marginBottom: '36px' }}>
            <h2 style={{ fontSize: '34px', fontWeight: '900', color: '#0f172a', marginBottom: '8px' }}>Welcome back! 👋</h2>
            <p style={{ color: '#64748b', fontSize: '16px' }}>Sign in to continue your journey</p>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Username</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>👤</span>
                <input
                  type="text" placeholder="Enter your username"
                  value={form.username}
                  onChange={e => setForm({ ...form, username: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  style={{
                    width: '100%', padding: '14px 14px 14px 46px',
                    borderRadius: '12px', border: '2px solid #e2e8f0',
                    fontSize: '15px', background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                />
              </div>
            </div>

            <div>
              <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.8px' }}>Password</label>
              <div style={{ position: 'relative' }}>
                <span style={{ position: 'absolute', left: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '18px' }}>🔒</span>
                <input
                  type={showPass ? 'text' : 'password'} placeholder="Enter your password"
                  value={form.password}
                  onChange={e => setForm({ ...form, password: e.target.value })}
                  onKeyDown={e => e.key === 'Enter' && handleLogin()}
                  style={{
                    width: '100%', padding: '14px 46px 14px 46px',
                    borderRadius: '12px', border: '2px solid #e2e8f0',
                    fontSize: '15px', background: 'white',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.04)'
                  }}
                />
                <span onClick={() => setShowPass(!showPass)} style={{
                  position: 'absolute', right: '14px', top: '50%',
                  transform: 'translateY(-50%)', cursor: 'pointer', fontSize: '18px'
                }}>{showPass ? '🙈' : '👁️'}</span>
              </div>
            </div>

            {error && (
              <div style={{ padding: '12px 16px', background: '#fef2f2', borderRadius: '10px', border: '1px solid #fecaca', display: 'flex', gap: '8px', alignItems: 'center' }}>
                <span>⚠️</span>
                <p style={{ color: '#dc2626', fontSize: '13px', fontWeight: '600' }}>{error}</p>
              </div>
            )}

            <div style={{ textAlign: 'right' }}>
              <span style={{ fontSize: '13px', color: '#6366f1', cursor: 'pointer', fontWeight: '600' }}>Forgot Password?</span>
            </div>

            <button onClick={handleLogin} style={{
              width: '100%', padding: '16px',
              background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
              color: 'white', borderRadius: '12px',
              fontSize: '16px', fontWeight: '800',
              boxShadow: '0 8px 25px rgba(99,102,241,0.45)',
              letterSpacing: '0.3px'
            }}>Sign In →</button>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
              <span style={{ fontSize: '13px', color: '#94a3b8' }}>or</span>
              <div style={{ flex: 1, height: '1px', background: '#e2e8f0' }} />
            </div>

            <p style={{ textAlign: 'center', fontSize: '15px', color: '#64748b' }}>
              Don't have an account?{' '}
              <span onClick={() => navigate('/register')} style={{ color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}>Create Account</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}