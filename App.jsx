import React, { useState } from 'react'
import AuthForm from './AuthForm'
import ProductList from './ProductList'
<<<<<<< HEAD
import ProductDetail from './ProductDetail'
=======
>>>>>>> c700724f696f319f260b85802a2bd0f7d0f2f022
import BannerCarousel from './BannerCarousel'
import AdminDashboard from './AdminDashboard'

function App() {
  const [user, setUser] = useState(null)
  const [showHomepage, setShowHomepage] = useState(false)
  const [showAuth, setShowAuth] = useState(false)
  const [search, setSearch] = useState('')
  const [showProfile, setShowProfile] = useState(false)
  const [editProfile, setEditProfile] = useState(false)
  const [editData, setEditData] = useState({ username: '', phone: '', address: '' })
<<<<<<< HEAD
  const [showProductDetail, setShowProductDetail] = useState(false)
  const [selectedProductId, setSelectedProductId] = useState(null)
=======
>>>>>>> c700724f696f319f260b85802a2bd0f7d0f2f022

  // Lọc sản phẩm theo search nếu có
  const handleSearch = (value) => {
    setSearch(value)
  }

<<<<<<< HEAD
  // Xử lý xem chi tiết sản phẩm
  const handleViewProductDetail = (productId) => {
    setSelectedProductId(productId)
    setShowProductDetail(true)
  }

  // Xử lý quay lại danh sách sản phẩm
  const handleBackToList = () => {
    setShowProductDetail(false)
    setSelectedProductId(null)
  }

=======
>>>>>>> c700724f696f319f260b85802a2bd0f7d0f2f022
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
<<<<<<< HEAD
            <div style={{ maxWidth: 1200, width: '100%', margin: '40px auto 0 auto', padding: '0 20px' }}>
              {showProductDetail ? (
                <ProductDetail 
                  productId={selectedProductId} 
                  onBack={handleBackToList} 
                />
              ) : (
                <ProductList 
                  search={search} 
                  onViewDetail={handleViewProductDetail} 
                />
              )}
=======
            <div style={{ maxWidth: 700, width: '100%', margin: '40px auto 0 auto' }}>
              <ProductList search={search} />
>>>>>>> c700724f696f319f260b85802a2bd0f7d0f2f022
            </div>
            {showAuth && (
              <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ background: '#fff', borderRadius: 0, boxShadow: 'none', padding: 0, width: '100vw', height: '100vh', minWidth: 0, minHeight: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <AuthForm onAuth={setUser} onShowHomepage={() => { setShowHomepage(true); setShowAuth(false); }} forceShowForm />
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
<<<<<<< HEAD
          <div style={{ maxWidth: 1200, width: '100%', margin: '40px auto 0 auto', padding: '0 20px' }}>
            {showProductDetail ? (
              <ProductDetail 
                productId={selectedProductId} 
                onBack={handleBackToList} 
              />
            ) : (
              <ProductList 
                search={search} 
                onViewDetail={handleViewProductDetail} 
              />
            )}
=======
          <div style={{ maxWidth: 700, width: '100%', margin: '40px auto 0 auto' }}>
            <ProductList search={search} />
>>>>>>> c700724f696f319f260b85802a2bd0f7d0f2f022
          </div>
        </div>
        {showProfile && (
          <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.25)', zIndex: 2000, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 16px 0 rgba(60,60,60,0.13)', padding: 36, minWidth: 340, minHeight: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
              <svg width="60" height="60" fill="none" viewBox="0 0 24 24" style={{ marginBottom: 16 }}><circle cx="12" cy="8" r="4" stroke="#1976d2" strokeWidth="2"/><path d="M4 20c0-3.314 3.134-6 7-6s7 2.686 7 6" stroke="#1976d2" strokeWidth="2"/></svg>
              <h2 style={{ color: '#1976d2', fontWeight: 700, fontSize: 26, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
                Thông tin tài khoản
                <button onClick={() => {
                  setEditProfile(true);
                  setEditData({
                    username: user.username || user.name || '',
                    phone: user.phone || '',
                    address: user.address || ''
                  });
                }} style={{ background: 'none', border: 'none', cursor: 'pointer', marginLeft: 8 }} title="Chỉnh sửa">
                  <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path d="M15.232 5.232a3 3 0 0 1 4.243 4.243l-9.193 9.193a2 2 0 0 1-.878.513l-3.387.847a.5.5 0 0 1-.606-.606l.847-3.387a2 2 0 0 1 .513-.878l9.193-9.193Zm3.182-1.06a5 5 0 0 0-7.07 0l-9.193 9.192A4 4 0 0 0 1.343 17.657l.847 3.387a2.5 2.5 0 0 0 3.03 3.03l3.387-.847a4 4 0 0 0 2.293-1.06l9.193-9.193a5 5 0 0 0 0-7.07Z" stroke="#1976d2" strokeWidth="2"/></svg>
                </button>
              </h2>
              {editProfile ? (
                <form style={{ width: '100%', marginTop: 10 }} onSubmit={e => {
                  e.preventDefault();
                  setUser(u => ({ ...u, ...editData }));
                  setEditProfile(false);
                }}>
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ fontWeight: 600 }}>Tên đăng nhập:</label>
                    <input type="text" value={editData.username} onChange={e => setEditData(d => ({ ...d, username: e.target.value }))} style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', fontSize: 15, marginTop: 4 }} required />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ fontWeight: 600 }}>Số điện thoại:</label>
                    <input type="text" value={editData.phone} onChange={e => setEditData(d => ({ ...d, phone: e.target.value }))} style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', fontSize: 15, marginTop: 4 }} />
                  </div>
                  <div style={{ marginBottom: 10 }}>
                    <label style={{ fontWeight: 600 }}>Địa chỉ:</label>
                    <input type="text" value={editData.address} onChange={e => setEditData(d => ({ ...d, address: e.target.value }))} style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', fontSize: 15, marginTop: 4 }} />
                  </div>
                  <div style={{ display: 'flex', gap: 10, marginTop: 12 }}>
                    <button type="submit" style={{ fontSize: 15, padding: '7px 20px', borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }}>Lưu</button>
                    <button type="button" style={{ fontSize: 15, padding: '7px 20px', borderRadius: 8, background: '#fff', color: '#1976d2', border: '2px solid #1976d2', fontWeight: 600, cursor: 'pointer' }} onClick={() => setEditProfile(false)}>Hủy</button>
                  </div>
                </form>
              ) : (
                <div style={{ fontSize: 17, margin: '10px 0', color: '#333', textAlign: 'left', width: '100%' }}>
                  <div><b>Tên đăng nhập:</b> {user.username || user.name}</div>
                  {user.email && <div><b>Email:</b> {user.email}</div>}
                  {user.phone && <div><b>Số điện thoại:</b> {user.phone}</div>}
                  {user.address && <div><b>Địa chỉ:</b> {user.address}</div>}
                  {user.dob && <div><b>Ngày sinh:</b> {user.dob}</div>}
                  <div><b>Vai trò:</b> {user.role}</div>
                </div>
              )}
              <div style={{ display: 'flex', gap: 12, marginTop: 10 }}>
                <button style={{ fontSize: 15, padding: '7px 20px', borderRadius: 8, background: '#fff', color: '#1976d2', border: '2px solid #1976d2', fontWeight: 600, cursor: 'pointer' }} onClick={() => alert('Tính năng đổi mật khẩu sẽ được tích hợp!')}>
                  Đổi mật khẩu
                </button>
<<<<<<< HEAD
                <button style={{ fontSize: 15, padding: '7px 20px', borderRadius: 8, background: '#fff', color: '#d32f2f', border: '2px solid #d32f2f', fontWeight: 600, cursor: 'pointer' }} onClick={() => { try { localStorage.removeItem('token'); } catch {}; setUser(null); setShowProfile(false); setShowHomepage(true); }}>
=======
                <button style={{ fontSize: 15, padding: '7px 20px', borderRadius: 8, background: '#fff', color: '#d32f2f', border: '2px solid #d32f2f', fontWeight: 600, cursor: 'pointer' }} onClick={() => { setUser(null); setShowProfile(false); setShowHomepage(true); }}>
>>>>>>> c700724f696f319f260b85802a2bd0f7d0f2f022
                  Đăng xuất
                </button>
              </div>
              <button style={{ marginTop: 18, fontSize: 16, padding: '8px 32px', borderRadius: 8, background: '#1976d2', color: '#fff', border: 'none', fontWeight: 600, cursor: 'pointer' }} onClick={() => setShowProfile(false)}>
                Đóng
              </button>
            </div>
          </div>
        )}
      </>
    )
  )
}

export default App
