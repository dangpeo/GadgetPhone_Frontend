import React, { useEffect, useState } from 'react'
import AuthForm from './AuthForm'
import ProductList from './ProductList'
import BannerCarousel from './BannerCarousel'
import AdminDashboard from './AdminDashboard'

function App() {
  const [user, setUser] = useState(null)
  const [showHomepage, setShowHomepage] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [search, setSearch] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const [editData, setEditData] = useState({ username: '', address: '' })
  const [showChangePw, setShowChangePw] = useState(false)
  const [currentPw, setCurrentPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [pwMsg, setPwMsg] = useState('')
  const API_BASE = 'http://localhost:5000'

  // Lấy hồ sơ người dùng nếu đã có token (tự đăng nhập lại)
  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) return
    fetch(`${API_BASE}/api/auth/me`, { headers: { Authorization: 'Bearer ' + token } })
      .then(async res => {
        const data = await res.json()
        if (!res.ok) throw new Error(data.error || 'Không thể tải hồ sơ')
        setUser(data)
        setShowHomepage(true)
      })
      .catch(() => {
        localStorage.removeItem('token')
      })
  }, [])

  // Lọc sản phẩm theo search nếu có
  const handleSearch = (value) => {
    setSearch(value)
  }

  // Trang homepage hoặc customer đều dùng chung layout, chỉ khác nút đăng nhập/đăng ký
  const renderNavbar = (showLoginBtn = true, showProfileBtn = false) => (
    <nav style={{ width: '100%', background: 'rgba(255,255,255,0.85)', boxShadow: '0 2px 8px 0 rgba(60,60,60,0.07)', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 32px', height: 64, position: 'sticky', top: 0, zIndex: 10 }}>
      <button onClick={() => setShowHomepage(true)} style={{ fontSize: 24, fontWeight: 700, color: '#1976d2', background: 'none', border: 'none', cursor: 'pointer', letterSpacing: 1 }}>GadgetPhone</button>
      <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Tìm kiếm sản phẩm..."
          value={search}
          onChange={e => handleSearch(e.target.value)}
          style={{ width: 320, maxWidth: '60vw', padding: '8px 16px', borderRadius: 8, border: '1.5px solid #bdbdbd', fontSize: 16 }}
        />
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <button className="cart-btn" style={{ background: '#fff', border: '2px solid #1976d2', color: '#1976d2', borderRadius: 8, padding: '8px 20px', fontWeight: 600, fontSize: 16, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
          <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M7 20c.828 0 1.5-.672 1.5-1.5S7.828 17 7 17s-1.5.672-1.5 1.5S6.172 20 7 20Zm10 0c.828 0 1.5-.672 1.5-1.5S17.828 17 17 17s-1.5.672-1.5 1.5S16.172 20 17 20ZM7.2 15h9.45c.7 0 1.3-.46 1.46-1.13l1.7-7.03A1 1 0 0 0 18.85 6H6.16l-.31-1.36A1 1 0 0 0 4.88 4H2.75a.75.75 0 0 0 0 1.5h1.55l2.03 8.93c-.62.36-1.03 1.04-1.03 1.82C5.3 17.16 6.14 18 7.2 18h9.6a.75.75 0 0 0 0-1.5H7.2a.3.3 0 0 1-.3-.3c0-.17.13-.3.3-.3Zm10.24-7-1.5 6.22a.25.25 0 0 1-.24.18H7.53l-1.5-6.4h11.41Z" fill="#1976d2"/></svg>
          Giỏ hàng
        </button>
        {showProfileBtn && user && (
          <button className="nav-btn" onClick={() => setShowProfile(true)} style={{ fontSize: 16, fontWeight: 600, color: '#1976d2', background: 'none', border: '2px solid #1976d2', borderRadius: 8, padding: '8px 20px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
            <svg width="20" height="20" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="8" r="4" stroke="#1976d2" strokeWidth="2"/><path d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#1976d2" strokeWidth="2"/></svg>
            Profile
          </button>
        )}
        {showLoginBtn && (
          <button className="nav-btn" onClick={() => setShowAuth(true)} style={{ fontSize: 16, fontWeight: 600, color: '#1976d2', background: 'none', border: '2px solid #1976d2', borderRadius: 8, padding: '8px 20px', cursor: 'pointer' }}>Đăng nhập / Đăng ký</button>
        )}
      </div>
    </nav>
  )

  // Nếu user là admin, hiển thị dashboard admin
  if (user && user.role === 'admin') {
    return <AdminDashboard />;
  }
  // ...existing code...
  return (
    !user ? (
      showHomepage ? (
        <>
          <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 55%, #a1c4fd 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
            {renderNavbar(true, false)}
            <BannerCarousel />
            <div style={{ maxWidth: 700, width: '100%', margin: '40px auto 0 auto' }}>
              <ProductList search={search} />
            </div>
            {showAuth && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#fff', borderRadius: 0, boxShadow: 'none', padding: 0, width: '100vw', height: '100vh', minWidth: 0, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AuthForm onAuth={(data) => {
                      const token = localStorage.getItem('token')
                      if (!token) { setUser({ role: data.role || 'customer' }); setShowHomepage(true); setShowAuth(false); return }
                      fetch(`${API_BASE}/api/auth/me`, { headers: { Authorization: 'Bearer ' + token } })
                        .then(r => r.json())
                        .then(profile => { setUser(profile); setShowHomepage(true); setShowAuth(false) })
                        .catch(() => { setUser({ role: data.role || 'customer' }); setShowHomepage(true); setShowAuth(false) })
                    }} onShowHomepage={() => { setShowHomepage(true); setShowAuth(false); }} forceShowForm />
                  </div>
                </div>
                <button style={{ position: 'absolute', top: 24, right: 32, fontSize: 32, background: 'none', border: 'none', color: '#1976d2', cursor: 'pointer', fontWeight: 700 }} onClick={() => setShowAuth(false)}>&times;</button>
              </div>
            )}
          </div>
        </>
      ) : (
        <AuthForm onAuth={setUser} onShowHomepage={() => setShowHomepage(true)} />
      )
    ) : (
      <>
        <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #ffecd2 0%, #fcb69f 55%, #a1c4fd 100%)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start' }}>
          {renderNavbar(false, true)}
          <BannerCarousel />
          <div style={{ maxWidth: 700, width: '100%', margin: '40px auto 0 auto' }}>
            <ProductList search={search} />
          </div>
        </div>
        {showProfile && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px 0 rgba(60,60,60,0.13)', padding: 36, minWidth: 340, minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg width="60" height="60" fill="none" viewBox="0 0 24 24" style={{ marginBottom: 16 }}><circle cx="12" cy="8" r="4" stroke="#1976d2" strokeWidth="2"/><path d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#1976d2" strokeWidth="2"/></svg>
              <h2 style={{ color: '#1976d2', fontWeight: 700, fontSize: 26, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                Thông tin tài khoản
              </h2>
              {editProfile ? (
                <form style={{
                  width: 340,
                  margin: '18px auto 0 auto',
                  background: '#f8fafc',
                  borderRadius: 18,
                  boxShadow: '0 2px 16px 0 rgba(60,60,60,0.10)',
                  padding: 24,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  border: '1.5px solid #e5eaf1'
                }}
                  onSubmit={async e => {
                    e.preventDefault();
                    try {
                      const token = localStorage.getItem('token')
                      if (!token) throw new Error('Bạn chưa đăng nhập')
                      const res = await fetch(`${API_BASE}/api/auth/me`, {
                        method: 'PUT',
                        headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                        body: JSON.stringify(editData)
                      })
                      const data = await res.json()
                      if (!res.ok) throw new Error(data.error || 'Cập nhật thất bại')
                      setUser(data)
                      setEditProfile(false)
                    } catch (err) {
                      alert(err.message)
                    }
                  }}
                >
                  <div style={{ width: '100%', marginBottom: 18 }}>
                    <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 16 }}>Tên đăng nhập:</label>
                    <input type="text" value={editData.username} onChange={e => setEditData(d => ({ ...d, username: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #bdbdbd', fontSize: 16, marginTop: 6, background: '#fff', outline: 'none', boxShadow: '0 1px 4px rgba(25,118,210,0.04)' }}
                      required />
                  </div>
                  <div style={{ width: '100%', marginBottom: 18 }}>
                    <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 16 }}>Địa chỉ:</label>
                    <input type="text" value={editData.address} onChange={e => setEditData(d => ({ ...d, address: e.target.value }))}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #bdbdbd', fontSize: 16, marginTop: 6, background: '#fff', outline: 'none', boxShadow: '0 1px 4px rgba(25,118,210,0.04)' }}
                    />
                  </div>
                  <div style={{ display: 'flex', gap: 18, marginTop: 8, justifyContent: 'center', width: '100%' }}>
                    <button type="submit" title="Lưu" style={{
                      width: 44, height: 44, borderRadius: '50%', background: '#1976d2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(25,118,210,0.13)', cursor: 'pointer', transition: 'background 0.2s'
                    }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="4" y="11" width="16" height="9" rx="2" fill="#fff"/>
                        <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="#fff" strokeWidth="2"/>
                        <rect x="10" y="15" width="4" height="3" rx="1" fill="#1976d2"/>
                      </svg>
                    </button>
                    <button type="button" title="Hủy" style={{
                      width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '2px solid #1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1976d2', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s'
                    }} onClick={() => setEditProfile(false)}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="#1976d2" strokeWidth="2" fill="#fff"/>
                        <path d="M8 8l8 8M16 8l-8 8" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/>
                      </svg>
                    </button>
                  </div>
                </form>
              ) : (
                <div style={{ width: '100%' }}>
                  <div style={{ width: '100%', background: '#f8fafc', border: '1px solid #e5eaf1', borderRadius: 12, padding: 16, boxShadow: '0 2px 10px rgba(0,0,0,0.04)' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', columnGap: 14, rowGap: 10, alignItems: 'center' }}>
                      <div style={{ fontWeight: 700, color: '#64748b', textAlign: 'right' }}>Tên đăng nhập:</div>
                      <div style={{ color: '#111827', fontWeight: 600 }}>{user.username || user.name}</div>

                      <div style={{ fontWeight: 700, color: '#64748b', textAlign: 'right' }}>Email:</div>
                      <div style={{ color: '#111827' }}>{user.email || '-'}</div>

                      <div style={{ fontWeight: 700, color: '#64748b', textAlign: 'right' }}>Địa chỉ:</div>
                      <div style={{ color: '#111827' }}>{user.address || '-'}</div>

                      <div style={{ fontWeight: 700, color: '#64748b', textAlign: 'right' }}>Vai trò:</div>
                      <div style={{ color: '#1976d2', fontWeight: 800, textTransform: 'uppercase', letterSpacing: 0.5 }}>{user.role}</div>
                    </div>
                  </div>
                  <div style={{ marginTop: 14, width: '100%', textAlign: 'center' }}>
                    <button title="Chỉnh sửa"
                      style={{ width: 40, height: 40, borderRadius: 999, background: '#fff', color: '#1976d2', border: '2px solid #1976d2', fontWeight: 800, cursor: 'pointer', boxShadow: '0 2px 8px rgba(25,118,210,0.15)', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}
                      onClick={() => {
                        setEditProfile(true);
                        setEditData({
                          username: user.username || user.name || '',
                          address: user.address || ''
                        });
                      }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Z" fill="#1976d2"/>
                        <path d="M20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" fill="#1976d2"/>
                      </svg>
                    </button>
                  </div>
                </div>
              )}
              <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 28, marginTop: 18, marginBottom: 2 }}>
                {/* Nút đổi mật khẩu */}
                <button title="Đổi mật khẩu"
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: '#156690',
                    border: 'none',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 2px 8px rgba(21,102,144,0.18)',
                    cursor: 'pointer',
                  }}
                  onClick={() => setShowChangePw(true)}
                >
                  <svg width="32" height="32" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="24" r="24" fill="#156690"/>
                    <rect x="14" y="22" width="20" height="14" rx="3" fill="#fff"/>
                    <rect x="18" y="18" width="12" height="8" rx="6" fill="#fff"/>
                    <circle cx="24" cy="29" r="2.5" fill="#156690"/>
                  </svg>
                </button>
                {/* Nút đăng xuất */}
                <button title="Đăng xuất"
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: '50%',
                    background: '#fff',
                    color: '#d32f2f',
                    border: '2px solid #d32f2f',
                    fontWeight: 600,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onClick={() => { localStorage.removeItem('token'); setUser(null); setShowProfile(false); setShowHomepage(true); }}
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="11" stroke="#d32f2f" strokeWidth="2" fill="#fff"/>
                    <path d="M9 8l4 4-4 4" stroke="#d32f2f" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M3 12h10" stroke="#d32f2f" strokeWidth="2.2" strokeLinecap="round"/>
                    <path d="M14 3.5h5.5a1.5 1.5 0 0 1 1.5 1.5v14a1.5 1.5 0 0 1-1.5 1.5H14" stroke="#d32f2f" strokeWidth="2.2" strokeLinejoin="round"/>
                    <path d="M14 3.5v17" stroke="#d32f2f" strokeWidth="2.2"/>
                  </svg>
                </button>
              </div>
              <button style={{ marginTop: 18, fontSize: 16, padding: '8px 32px', borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }} onClick={() => setShowProfile(false)}>
                Đóng
              </button>
            </div>
          </div>
        )}
        {showChangePw && (
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.25)', zIndex: 2100, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 2px 16px 0 rgba(60,60,60,0.13)', padding: 28, width: 370, border: '1.5px solid #e5eaf1' }}>
              <h3 style={{ marginTop: 0, color: '#1976d2', fontWeight: 700, fontSize: 22, marginBottom: 18 }}>Đổi mật khẩu</h3>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 16 }}>Mật khẩu hiện tại</label>
                <input type="password" value={currentPw} onChange={e => setCurrentPw(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #bdbdbd', fontSize: 16, marginTop: 6, background: '#fff', outline: 'none', boxShadow: '0 1px 4px rgba(25,118,210,0.04)' }} />
              </div>
              <div style={{ marginBottom: 18 }}>
                <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 16 }}>Mật khẩu mới</label>
                <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} style={{ width: '100%', padding: '10px 14px', borderRadius: 10, border: '1.5px solid #bdbdbd', fontSize: 16, marginTop: 6, background: '#fff', outline: 'none', boxShadow: '0 1px 4px rgba(25,118,210,0.04)' }} />
              </div>
              {pwMsg && <div style={{ marginBottom: 8, color: pwMsg.includes('thành công') ? '#2e7d32' : '#d32f2f', fontWeight: 600 }}>{pwMsg}</div>}
              <div style={{ display: 'flex', gap: 18, justifyContent: 'flex-end', marginTop: 10 }}>
                <button onClick={() => setShowChangePw(false)} title="Hủy" style={{
                  width: 44, height: 44, borderRadius: '50%', background: '#fff', border: '2px solid #1976d2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#1976d2', fontWeight: 700, cursor: 'pointer', transition: 'background 0.2s'
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="#1976d2" strokeWidth="2" fill="#fff"/>
                    <path d="M8 8l8 8M16 8l-8 8" stroke="#1976d2" strokeWidth="2" strokeLinecap="round"/>
                  </svg>
                </button>
                <button onClick={async () => {
                  try {
                    setPwMsg('')
                    if (!currentPw || !newPw) { setPwMsg('Vui lòng nhập đầy đủ'); return }
                    if (newPw.length < 6) { setPwMsg('Mật khẩu mới phải ≥ 6 ký tự'); return }
                    const token = localStorage.getItem('token')
                    const res = await fetch(`${API_BASE}/api/auth/change-password`, {
                      method: 'POST',
                      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token },
                      body: JSON.stringify({ currentPassword: currentPw, newPassword: newPw })
                    })
                    const raw = await res.text();
                    let data = {};
                    try { data = raw ? JSON.parse(raw) : {}; } catch { /* non-JSON */ }
                    if (!res.ok) throw new Error(data.error || raw || 'Đổi mật khẩu thất bại')
                    setPwMsg('Đổi mật khẩu thành công')
                    setTimeout(() => { setShowChangePw(false); setCurrentPw(''); setNewPw(''); setPwMsg('') }, 800)
                  } catch (err) {
                    setPwMsg(err.message)
                  }
                }} title="Lưu" style={{
                  width: 44, height: 44, borderRadius: '50%', background: '#1976d2', border: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 8px rgba(25,118,210,0.13)', cursor: 'pointer', transition: 'background 0.2s'
                }}>
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect x="4" y="11" width="16" height="9" rx="2" fill="#fff"/>
                    <path d="M8 11V7a4 4 0 1 1 8 0v4" stroke="#fff" strokeWidth="2"/>
                    <rect x="10" y="15" width="4" height="3" rx="1" fill="#1976d2"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        )}
      </>
    )
  )
}

export default App
