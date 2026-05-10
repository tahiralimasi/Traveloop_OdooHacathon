// import React, { useState } from 'react'
// import { useNavigate } from 'react-router-dom'
// import { useApp } from '../context/AppContext'

// export default function Register() {
//   const [form, setForm] = useState({
//     firstName: '', lastName: '', email: '', phone: '',
//     city: '', country: '', additionalInfo: '', photo: null
//   })
//   const [preview, setPreview] = useState(null)
//   const { login } = useApp()
//   const navigate = useNavigate()

//   const handlePhoto = (e) => {
//     const file = e.target.files[0]
//     if (file) { setForm({ ...form, photo: file }); setPreview(URL.createObjectURL(file)) }
//   }

//   const handleRegister = () => {
//     if (form.firstName && form.email) {
//       login({ name: form.firstName + ' ' + form.lastName, email: form.email })
//       navigate('/dashboard')
//     }
//   }

//   return (
//     <div style={{
//       minHeight: '100vh',
//       background: 'linear-gradient(135deg, #ede9fe 0%, #e0f2fe 100%)',
//       display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '32px 16px'
//     }}>
//       <div style={{
//         background: 'white', borderRadius: '24px', padding: '48px',
//         width: '100%', maxWidth: '600px',
//         boxShadow: '0 20px 60px rgba(99,102,241,0.15)'
//       }}>
//         <div style={{ textAlign: 'center', marginBottom: '32px' }}>
//           <div style={{
//             width: '64px', height: '64px', borderRadius: '18px',
//             background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
//             display: 'flex', alignItems: 'center', justifyContent: 'center',
//             margin: '0 auto 16px', fontSize: '28px'
//           }}>✈️</div>
//           <h1 style={{ fontSize: '26px', fontWeight: '800', color: '#1e293b' }}>Create Account</h1>
//           <p style={{ color: '#64748b', marginTop: '4px' }}>Join Traveloop and start planning</p>
//         </div>

//         <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
//           <div onClick={() => document.getElementById('photoInput').click()} style={{
//             width: '100px', height: '100px', borderRadius: '50%',
//             border: '3px dashed #6366f1', display: 'flex',
//             alignItems: 'center', justifyContent: 'center',
//             cursor: 'pointer', overflow: 'hidden', background: '#f8fafc'
//           }}>
//             {preview
//               ? <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
//               : <div style={{ textAlign: 'center' }}>
//                   <div style={{ fontSize: '28px' }}>📷</div>
//                   <div style={{ fontSize: '11px', color: '#64748b', marginTop: '4px' }}>Upload Photo</div>
//                 </div>
//             }
//           </div>
//           <input id="photoInput" type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
//         </div>

//         <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
//           {[
//             { label: 'First Name', key: 'firstName', placeholder: 'John', type: 'text' },
//             { label: 'Last Name', key: 'lastName', placeholder: 'Doe', type: 'text' },
//             { label: 'Email Address', key: 'email', placeholder: 'john@email.com', type: 'email' },
//             { label: 'Phone Number', key: 'phone', placeholder: '+91 9876543210', type: 'tel' },
//             { label: 'City', key: 'city', placeholder: 'Mumbai', type: 'text' },
//             { label: 'Country', key: 'country', placeholder: 'India', type: 'text' },
//           ].map(field => (
//             <div key={field.key}>
//               <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>{field.label}</label>
//               <input
//                 type={field.type} placeholder={field.placeholder}
//                 value={form[field.key]}
//                 onChange={e => setForm({ ...form, [field.key]: e.target.value })}
//                 style={{ width: '100%', padding: '11px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc' }}
//               />
//             </div>
//           ))}
//         </div>

//         <div style={{ marginTop: '16px' }}>
//           <label style={{ fontSize: '13px', fontWeight: '600', color: '#374151', display: 'block', marginBottom: '6px' }}>Additional Information</label>
//           <textarea
//             placeholder="Tell us about yourself..."
//             value={form.additionalInfo}
//             onChange={e => setForm({ ...form, additionalInfo: e.target.value })}
//             rows={4}
//             style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #e2e8f0', fontSize: '14px', background: '#f8fafc', resize: 'vertical' }}
//           />
//         </div>

//         <button onClick={handleRegister} style={{
//           width: '100%', padding: '14px', marginTop: '24px',
//           background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
//           color: 'white', borderRadius: '10px', fontSize: '16px', fontWeight: '700',
//           boxShadow: '0 4px 15px rgba(99,102,241,0.4)'
//         }}>Create Account</button>

//         <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', marginTop: '16px' }}>
//           Already have an account?{' '}
//           <span onClick={() => navigate('/login')} style={{ color: '#6366f1', fontWeight: '600', cursor: 'pointer' }}>Login</span>
//         </p>
//       </div>
//     </div>
//   )
// }



import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useApp } from '../context/AppContext'

export default function Register() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    city: '', country: '', additionalInfo: '', photo: null
  })
  const [preview, setPreview] = useState(null)
  const [step, setStep] = useState(1)
  const { login } = useApp()
  const navigate = useNavigate()

  const handlePhoto = (e) => {
    const file = e.target.files[0]
    if (file) {
      setForm({ ...form, photo: file })
      setPreview(URL.createObjectURL(file))
    }
  }

  const handleRegister = () => {
    if (form.firstName && form.email) {
      login({ name: form.firstName + ' ' + form.lastName, email: form.email })
      navigate('/dashboard')
    }
  }

  return (
    <div style={{
      minHeight: '100vh', background: '#f8fafc',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '40px 20px'
    }}>
      <div style={{ width: '100%', maxWidth: '560px' }}>
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{
            width: '64px', height: '64px', borderRadius: '18px',
            background: 'linear-gradient(135deg, #6366f1, #06b6d4)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            margin: '0 auto 16px', fontSize: '28px',
            boxShadow: '0 8px 25px rgba(99,102,241,0.3)'
          }}>✈️</div>
          <h1 style={{ fontSize: '30px', fontWeight: '900', color: '#0f172a', marginBottom: '6px' }}>
            Join Traveloop
          </h1>
          <p style={{ color: '#64748b', fontSize: '15px' }}>Create your account and start exploring</p>
        </div>

        <div style={{ display: 'flex', gap: '8px', marginBottom: '28px' }}>
          {[1, 2].map(s => (
            <div key={s} style={{ flex: 1, height: '4px', borderRadius: '4px', background: step >= s ? '#6366f1' : '#e2e8f0', transition: 'background 0.3s' }} />
          ))}
        </div>

        <div style={{
          background: 'white', borderRadius: '24px', padding: '36px',
          boxShadow: '0 8px 30px rgba(0,0,0,0.08)'
        }}>
          {step === 1 && (
            <div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '28px' }}>
                <div
                  onClick={() => document.getElementById('photoInput').click()}
                  style={{
                    width: '100px', height: '100px', borderRadius: '50%',
                    border: '3px dashed #6366f1', cursor: 'pointer',
                    overflow: 'hidden', background: '#f8fafc',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    boxShadow: '0 4px 15px rgba(99,102,241,0.15)'
                  }}>
                  {preview
                    ? <img src={preview} alt="preview" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    : <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: '28px' }}>📷</div>
                        <div style={{ fontSize: '10px', color: '#64748b', marginTop: '4px', fontWeight: '600' }}>Upload</div>
                      </div>
                  }
                </div>
                <input id="photoInput" type="file" accept="image/*" onChange={handlePhoto} style={{ display: 'none' }} />
                <p style={{ fontSize: '12px', color: '#94a3b8', marginTop: '10px' }}>Click to upload profile photo</p>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: 'First Name', key: 'firstName', placeholder: 'John', emoji: '👤' },
                  { label: 'Last Name', key: 'lastName', placeholder: 'Doe', emoji: '👤' },
                  { label: 'Email Address', key: 'email', placeholder: 'john@email.com', emoji: '📧' },
                  { label: 'Phone Number', key: 'phone', placeholder: '+91 9876543210', emoji: '📱' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {field.label}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>{field.emoji}</span>
                      <input
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        style={{
                          width: '100%', padding: '11px 11px 11px 38px',
                          borderRadius: '10px', border: '2px solid #e2e8f0',
                          fontSize: '14px', background: '#f8fafc'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <button onClick={() => setStep(2)} style={{
                width: '100%', padding: '14px', marginTop: '24px',
                background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: '800',
                boxShadow: '0 6px 20px rgba(99,102,241,0.35)'
              }}>Continue →</button>
            </div>
          )}

          {step === 2 && (
            <div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                {[
                  { label: 'City', key: 'city', placeholder: 'Mumbai', emoji: '🏙️' },
                  { label: 'Country', key: 'country', placeholder: 'India', emoji: '🌍' },
                ].map(field => (
                  <div key={field.key}>
                    <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {field.label}
                    </label>
                    <div style={{ position: 'relative' }}>
                      <span style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', fontSize: '16px' }}>{field.emoji}</span>
                      <input
                        placeholder={field.placeholder}
                        value={form[field.key]}
                        onChange={e => setForm({ ...form, [field.key]: e.target.value })}
                        style={{
                          width: '100%', padding: '11px 11px 11px 38px',
                          borderRadius: '10px', border: '2px solid #e2e8f0',
                          fontSize: '14px', background: '#f8fafc'
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ marginTop: '16px' }}>
                <label style={{ fontSize: '12px', fontWeight: '700', color: '#374151', display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                  About You
                </label>
                <textarea
                  placeholder="Tell us about your travel style and preferences..."
                  value={form.additionalInfo}
                  onChange={e => setForm({ ...form, additionalInfo: e.target.value })}
                  rows={4}
                  style={{
                    width: '100%', padding: '12px 14px', borderRadius: '10px',
                    border: '2px solid #e2e8f0', fontSize: '14px',
                    background: '#f8fafc', resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '24px' }}>
                <button onClick={() => setStep(1)} style={{
                  flex: 1, padding: '14px', background: '#f1f5f9',
                  color: '#374151', borderRadius: '12px', fontSize: '15px', fontWeight: '700'
                }}>← Back</button>
                <button onClick={handleRegister} style={{
                  flex: 2, padding: '14px',
                  background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                  color: 'white', borderRadius: '12px', fontSize: '15px', fontWeight: '800',
                  boxShadow: '0 6px 20px rgba(99,102,241,0.35)'
                }}>Create Account 🚀</button>
              </div>
            </div>
          )}
        </div>

        <p style={{ textAlign: 'center', fontSize: '14px', color: '#64748b', marginTop: '20px' }}>
          Already have an account?{' '}
          <span onClick={() => navigate('/login')} style={{ color: '#6366f1', fontWeight: '700', cursor: 'pointer' }}>
            Sign In
          </span>
        </p>
      </div>
    </div>
  )
}