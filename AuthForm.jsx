import React, { useState } from 'react'
import './authform.css'

function AuthForm({ onAuth, onShowHomepage, forceShowForm }) {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('customer')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [address, setAddress] = useState('')
  const [dob, setDob] = useState('')
  const [error, setError] = useState('')
  const [showLanding, setShowLanding] = useState(forceShowForm ? false : true)

  function validateEmail(email) {
    // Simple email regex
    return /^\S+@\S+\.\S+$/.test(email)
  }
  function validatePhone(phone) {
    // Accepts 9-11 digits, starts with 0
    return /^0\d{8,10}$/.test(phone)
  }
  function validateUsername(username) {
    return username.length >= 4
  }
  function validatePassword(password) {
    return password.length >= 6
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!username.trim() || !password.trim() || (!isLogin && (!role || !phone.trim() || !email.trim() || !address.trim() || !dob))) {
      setError('Vui lòng nhập đầy đủ thông tin!')
      return
    }
    if (!validateUsername(username)) {
      setError('Tên đăng nhập phải từ 4 ký tự trở lên!')
      return
    }
    if (!validatePassword(password)) {
      setError('Mật khẩu phải từ 6 ký tự trở lên!')
      return
    }
    if (!isLogin) {
      if (!validatePhone(phone)) {
        setError('Số điện thoại không hợp lệ!')
        return
      }
      if (!validateEmail(email)) {
        setError('Email không hợp lệ!')
        return
      }
      if (address.length < 5) {
        setError('Địa chỉ phải từ 5 ký tự trở lên!')
        return
      }
      if (!dob) {
        setError('Vui lòng chọn ngày sinh!')
        return
      }
    }
    const url = isLogin
      ? 'http://localhost:5000/api/auth/login'
      : 'http://localhost:5000/api/auth/register'
    const body = isLogin
      ? { username, password }
      : { username, password, role, phone, email, address, dob }
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Lỗi không xác định')
      if (isLogin && onAuth) onAuth(data)
      if (!isLogin) setIsLogin(true)
      if (!isLogin && data.username) {
        setUsername('')
        setPassword('')
        setPhone('')
        setEmail('')
        setAddress('')
        setDob('')
        setRole('customer')
      }
    } catch (err) {
      setError(err.message)
    }
  }

  if (showLanding) {
    return (
      <div className="landing-bg">
        <div className="landing-center" onClick={() => {
          if (typeof onShowHomepage === 'function') onShowHomepage();
          setShowLanding(false);
        }}>
          GadgetPhone
        </div>
      </div>
    )
  }

  return (
    <div className="auth-bg-split">
      <div className={isLogin ? 'auth-split-left' : 'auth-split-right'}>
        <div className="auth-container">
          <h2 className="auth-title">{isLogin ? 'Login' : 'Register'}</h2>
          <form className="auth-form" onSubmit={handleSubmit} autoComplete="off">
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              className="auth-input"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              className="auth-input"
            />
            {!isLogin && (
              <>
                <input
                  type="text"
                  placeholder="Phone Number"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  required
                  className="auth-input"
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="auth-input"
                />
                <input
                  type="text"
                  placeholder="Address"
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                  required
                  className="auth-input"
                />
                <input
                  type="date"
                  placeholder="Ngày sinh"
                  value={dob}
                  onChange={e => setDob(e.target.value)}
                  required
                  className="auth-input"
                  style={{ color: dob ? '#222' : '#888' }}
                />
                <select value={role} onChange={e => setRole(e.target.value)} className="auth-input" required>
                  <option value="customer">Customer</option>
                  <option value="admin">Admin</option>
                </select>
              </>
            )}
            <button type="submit" className="auth-btn main-btn">
              {isLogin ? 'Login' : 'Register'}
            </button>
            {isLogin && (
              <div style={{ width: '100%', textAlign: 'center', marginTop: 10 }}>
                <button type="button" className="auth-btn switch-btn" style={{ color: '#1976d2', textDecoration: 'underline', background: 'none', border: 'none', fontSize: 15 }}>
                  Quên mật khẩu?
                </button>
              </div>
            )}
          </form>
          <div style={{ width: '100%', textAlign: 'center', marginTop: 28 }}>
            <button
              type="button"
              className="google-login-btn"
              style={{
                background: '#fff',
                color: '#444',
                border: '1.5px solid #e0e0e0',
                borderRadius: 8,
                padding: '10px 0',
                width: '100%',
                fontWeight: 600,
                fontSize: 17,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 10,
                boxShadow: '0 2px 8px 0 rgba(60,60,60,0.07)',
                cursor: 'pointer',
                transition: 'background 0.18s, box-shadow 0.18s',
                margin: '0 auto',
                maxWidth: 340
              }}
              onClick={() => alert('Tính năng đăng nhập bằng Google sẽ được tích hợp!')}
            >
              <img src="https://developers.google.com/identity/images/g-logo.png" alt="Google" style={{ width: 22, height: 22, marginRight: 8, background: 'none' }} />
              Đăng nhập bằng Google
            </button>
          </div>
          <div style={{ width: '100%', textAlign: 'center', marginTop: 18 }}>
            <button type="button" className="auth-btn switch-btn" onClick={() => { setIsLogin(!isLogin); setError('') }} style={{ color: '#1976d2', textDecoration: 'underline', background: 'none', border: 'none', fontSize: 15 }}>
              {/* {isLogin ? '' : "Đã có tài khoản? Đăng nhập"} */}
              {!isLogin && "Đã có tài khoản? Đăng nhập"}
              {isLogin ? '' : ''}
              {isLogin ? '' : ''}
              {isLogin ? '' : ''}
              {isLogin ? 'Bạn chưa có tài khoản? Đăng ký' : ''}
            </button>
          </div>
        </div>
      </div>
      <div className={isLogin ? 'auth-split-right' : 'auth-split-left'} style={{display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
        <div className="auth-split-message">
          GadgetPhone
          <span className="subtitle">
            Welcome to GadgetPhone!
          </span>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
