import React, { useState, useEffect } from 'react';

const menuItems = [
  { key: 'products', label: 'Quản lý sản phẩm' },
  { key: 'users', label: 'Quản lý người dùng' },
  { key: 'orders', label: 'Quản lý đơn hàng' },
  { key: 'revenue', label: 'Thống kê doanh thu' },
  { key: 'logout', label: 'Đăng xuất' }
];
import RevenueBarChart from './RevenueBarChart';
  // Dữ liệu mẫu doanh thu từng tháng
  const revenueLabels = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
  const revenueData = [12000000, 15000000, 9000000, 18000000, 21000000, 17000000];

function AdminDashboard() {
  const [active, setActive] = useState('products');
  const [products, setProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null);
  const [editProduct, setEditProduct] = useState({ name: '', price: '', description: '', quantity: '', image: '' });
  const [editError, setEditError] = useState('');
<<<<<<< HEAD
  // State cho user
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(false);
  const [userError, setUserError] = useState('');
  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const [newUser, setNewUser] = useState({ username: '', password: '', email: '', address: '', role: 'customer' });
  const [userSearchId, setUserSearchId] = useState('');
  const [userSearchAddress, setUserSearchAddress] = useState('');
  const [addUserError, setAddUserError] = useState('');
  const [addLoading, setAddLoading] = useState(false);
  const [toastMsg, setToastMsg] = useState('');
  const [toastType, setToastType] = useState('success'); // success | error
  const [editUserId, setEditUserId] = useState(null);
  const [editUser, setEditUser] = useState({ username: '', email: '', address: '', role: 'customer' });
  const [editUserError, setEditUserError] = useState('');
  const [editSuccess, setEditSuccess] = useState('');
  const [editLoading, setEditLoading] = useState(false);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);
  const [confirmDeleteName, setConfirmDeleteName] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  // Thêm user
  const handleAddUser = async (e) => {
    e.preventDefault();
    setAddUserError('');
    setAddLoading(true);
    if (!newUser.username || !newUser.password) {
      setAddUserError('Username và mật khẩu là bắt buộc!');
      setAddLoading(false);
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const res = await fetch('http://localhost:5000/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': 'Bearer ' + token } : {})
        },
        body: JSON.stringify(newUser),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi không xác định');
      setUsers(prev => [...prev, data]);
      setShowAddUserForm(false);
      setNewUser({ username: '', password: '', email: '', address: '', role: 'customer' });
      setToastType('success');
      setToastMsg('Đã thêm người dùng thành công!');
      setTimeout(() => setToastMsg(''), 1500);
    } catch (err) {
      setAddUserError(err.message);
      setToastType('error');
      setToastMsg(err.message || 'Thêm người dùng thất bại');
      setTimeout(() => setToastMsg(''), 1800);
    }
    setAddLoading(false);
  };

  // Sửa user
  const handleEditUserClick = (user) => {
    setEditUserId(user._id);
    setEditUser({ username: user.username, email: user.email, address: user.address || '', role: user.role });
    setEditUserError('');
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    setEditUserError('');
    if (!editUser.username) {
      setEditUserError('Username là bắt buộc!');
      return;
    }
    try {
      setEditLoading(true);
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/users/${editUserId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': 'Bearer ' + token } : {})
        },
        body: JSON.stringify(editUser),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi không xác định');
      setUsers(prev => prev.map(u => (u._id === data._id ? data : u)));
      setEditSuccess('Cập nhật người dùng thành công!');
      setToastType('success');
      setToastMsg('Đã lưu thay đổi người dùng.');
      setTimeout(() => setToastMsg(''), 1500);
      setTimeout(() => {
        setEditSuccess('');
        setEditUserId(null);
      }, 1200);
    } catch (err) {
      setEditUserError(err.message);
      setToastType('error');
      setToastMsg(err.message || 'Cập nhật thất bại');
      setTimeout(() => setToastMsg(''), 1800);
    }
    setEditLoading(false);
  };

  // Xóa user
  const handleDeleteUser = async (id) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: 'DELETE',
        headers: token ? { 'Authorization': 'Bearer ' + token } : {},
      });
      if (!res.ok) throw new Error('Lỗi khi xóa người dùng');
      setUsers(prev => prev.filter(u => u._id !== id));
      setToastType('success');
      setToastMsg('Đã xóa người dùng.');
      setTimeout(() => setToastMsg(''), 1500);
    } catch (err) {
      alert(err.message);
      setToastType('error');
      setToastMsg(err.message || 'Xóa thất bại');
      setTimeout(() => setToastMsg(''), 1800);
    }
  };
=======
>>>>>>> c700724f696f319f260b85802a2bd0f7d0f2f022
  // Mở form sửa sản phẩm
  const handleEditClick = (product) => {
    setEditProductId(product._id || product.id);
    setEditProduct({
      name: product.name || '',
      price: product.price || '',
      description: product.description || '',
      quantity: product.quantity || '',
      image: product.image || ''
    });
    setEditError('');
  };

  // Gửi cập nhật sản phẩm
  const handleEditProduct = async (e) => {
    e.preventDefault();
    setEditError('');
    if (!editProduct.name || !editProduct.price) {
      setEditError('Tên và giá sản phẩm là bắt buộc!');
      return;
    }
    try {
      const res = await fetch(`http://localhost:5000/api/products/${editProductId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editProduct.name,
          price: Number(editProduct.price),
          description: editProduct.description,
          quantity: Number(editProduct.quantity) || 0,
          image: editProduct.image
        })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi không xác định');
      setProducts(prev => prev.map(p => (p._id === data._id ? data : p)));
      setEditProductId(null);
    } catch (err) {
      setEditError(err.message);
    }
  };
  const [showAddForm, setShowAddForm] = useState(false);
  const [newProduct, setNewProduct] = useState({ name: '', price: '', description: '', quantity: '', image: '' });
  const [imageFile, setImageFile] = useState(null);
  const [addError, setAddError] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (active === 'products') {
      setLoading(true);
      fetch('http://localhost:5000/api/products')
        .then(res => res.json())
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(() => {
          setError('Không thể tải sản phẩm');
          setLoading(false);
        });
<<<<<<< HEAD
    } else if (active === 'users') {
      setUserLoading(true);
      const token = localStorage.getItem('token');
      fetch('http://localhost:5000/api/users', {
        headers: token ? { 'Authorization': 'Bearer ' + token } : {},
      })
        .then(async res => {
          const data = await res.json();
          if (!res.ok) {
            setUserError((data && data.error) ? `Không thể tải người dùng: ${data.error}` : 'Không thể tải người dùng');
            setUserLoading(false);
            return;
          }
          setUsers(data);
          setUserLoading(false);
        })
        .catch((err) => {
          setUserError('Không thể tải người dùng: ' + err.message);
          setUserLoading(false);
        });
=======
>>>>>>> c700724f696f319f260b85802a2bd0f7d0f2f022
    }
  }, [active]);

  const handleDelete = (id) => {
    setProducts(products.filter(p => p.id !== id));
    // TODO: Gọi API xóa sản phẩm ở backend nếu có
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();
    setAddError('');
    if (!newProduct.name || !newProduct.price) {
      setAddError('Tên và giá sản phẩm là bắt buộc!');
      return;
    }
    try {
      const formData = new FormData();
      formData.append('name', newProduct.name);
      formData.append('price', Number(newProduct.price));
      formData.append('description', newProduct.description);
      formData.append('quantity', Number(newProduct.quantity) || 0);
      if (imageFile) formData.append('image', imageFile);

      const res = await fetch('http://localhost:5000/api/products', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Lỗi không xác định');
      setProducts(prev => [...prev, data]);
      setShowAddForm(false);
      setNewProduct({ name: '', price: '', description: '', quantity: '', image: '' });
      setImageFile(null);
    } catch (err) {
      setAddError(err.message);
    }
  };

  const renderContent = () => {
    switch (active) {
      case 'revenue':
        // Dữ liệu mẫu số lượng sản phẩm bán được từng tháng
        // Thêm các tháng không bán được (doanh thu = 0)
        const fullRevenueLabels = [
          'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
          'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
        ];
        const fullRevenueData = [12000000, 15000000, 9000000, 18000000, 21000000, 17000000, 0, 0, 0, 0, 0, 0];
        const soldData = [120, 150, 90, 180, 210, 170, 0, 0, 0, 0, 0, 0];
        const totalRevenue = fullRevenueData.reduce((sum, v) => sum + v, 0);
        return (
          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start' }}>
            <div style={{ flex: 1 }}>
              <h2>Thống kê doanh thu</h2>
              <div style={{ maxWidth: 700, background: '#fff', padding: 24, borderRadius: 12, boxShadow: '0 2px 8px rgba(60,60,60,0.07)' }}>
                <RevenueBarChart data={fullRevenueData} labels={fullRevenueLabels} />
                <h3 style={{ marginTop: 36, marginBottom: 16 }}>Số lượng sản phẩm bán được từng tháng</h3>
                <table style={{ width: '100%', borderCollapse: 'collapse', background: '#f8fafc' }}>
                  <thead>
                    <tr style={{ background: '#e3eafc' }}>
                      <th style={{ padding: 10, border: '1px solid #bdbdbd' }}>Tháng</th>
                      <th style={{ padding: 10, border: '1px solid #bdbdbd' }}>Số lượng sản phẩm bán</th>
                      <th style={{ padding: 10, border: '1px solid #bdbdbd' }}>Doanh thu tháng</th>
                    </tr>
                  </thead>
                  <tbody>
                    {fullRevenueLabels.map((label, idx) => (
                      <tr key={label}>
                        <td style={{ padding: 10, border: '1px solid #bdbdbd' }}>{label}</td>
                        <td style={{ padding: 10, border: '1px solid #bdbdbd' }}>{soldData[idx]}</td>
                        <td style={{ padding: 10, border: '1px solid #bdbdbd' }}>{fullRevenueData[idx].toLocaleString()}₫</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
            <div style={{ minWidth: 260, background: '#fff', padding: '32px 24px', borderRadius: 12, boxShadow: '0 2px 8px rgba(60,60,60,0.07)', textAlign: 'center' }}>
              <h3 style={{ color: '#1976d2', fontWeight: 700, marginBottom: 18 }}>Tổng doanh thu năm</h3>
              <div style={{ fontSize: 32, fontWeight: 700, color: '#1976d2', marginBottom: 8 }}>
                {totalRevenue.toLocaleString()}₫
              </div>
              <div style={{ color: '#555', fontSize: 16 }}>Tính cả các tháng không bán được</div>
            </div>
          </div>
        );
      case 'products':
        return (
          <div>
            <h2>Quản lý sản phẩm</h2>
            <button onClick={() => setShowAddForm(f => !f)} style={{ margin: '18px 0', padding: '8px 18px', background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>
              {showAddForm ? 'Đóng' : 'Thêm sản phẩm mới'}
            </button>
            {showAddForm && (
              <form onSubmit={handleAddProduct} style={{ background: '#f8fafc', padding: 18, borderRadius: 10, marginBottom: 18, maxWidth: 420 }} encType="multipart/form-data">
                <div style={{ marginBottom: 10 }}>
                  <label>Tên sản phẩm:</label>
                  <input type="text" value={newProduct.name} onChange={e => setNewProduct(p => ({ ...p, name: e.target.value }))} required style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', marginTop: 4 }} />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label>Giá:</label>
                  <input type="number" value={newProduct.price} onChange={e => setNewProduct(p => ({ ...p, price: e.target.value }))} required style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', marginTop: 4 }} />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label>Mô tả:</label>
                  <input type="text" value={newProduct.description} onChange={e => setNewProduct(p => ({ ...p, description: e.target.value }))} style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', marginTop: 4 }} />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label>Số lượng:</label>
                  <input type="number" value={newProduct.quantity} onChange={e => setNewProduct(p => ({ ...p, quantity: e.target.value }))} style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', marginTop: 4 }} />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label>Ảnh sản phẩm:</label>
                  <input type="file" accept="image/*" onChange={e => setImageFile(e.target.files[0])} style={{ width: '100%', marginTop: 4 }} />
                </div>
                {addError && <div style={{ color: 'red', marginBottom: 8 }}>{addError}</div>}
                <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Thêm sản phẩm</button>
              </form>
            )}
            {loading ? <p>Đang tải...</p> : error ? <p style={{color:'red'}}>{error}</p> : (
              <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 24 }}>
                <thead>
                  <tr style={{ background: '#e3eafc' }}>
                    <th style={{ padding: 10, border: '1px solid #bdbdbd' }}>ID</th>
                    <th style={{ padding: 10, border: '1px solid #bdbdbd' }}>Tên sản phẩm</th>
                    <th style={{ padding: 10, border: '1px solid #bdbdbd' }}>Giá</th>
                    <th style={{ padding: 10, border: '1px solid #bdbdbd' }}>Số lượng kho</th>
                    <th style={{ padding: 10, border: '1px solid #bdbdbd' }}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map(p => (
                    <tr key={p._id || p.id}>
                      <td style={{ padding: 10, border: '1px solid #bdbdbd' }}>{p._id || p.id}</td>
                      <td style={{ padding: 10, border: '1px solid #bdbdbd' }}>{p.name}</td>
                      <td style={{ padding: 10, border: '1px solid #bdbdbd' }}>{p.price.toLocaleString()}₫</td>
                      <td style={{ padding: 10, border: '1px solid #bdbdbd' }}>{p.quantity ?? 0}</td>
                      <td style={{ padding: 10, border: '1px solid #bdbdbd', display: 'flex', gap: 8 }}>
                        <button style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }} onClick={() => handleEditClick(p)}>Sửa</button>
                        <button style={{ background: '#d32f2f', color: '#fff', border: 'none', borderRadius: 6, padding: '6px 14px', cursor: 'pointer' }} onClick={() => handleDelete(p._id || p.id)}>Xóa</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
            {/* Form sửa sản phẩm */}
            {editProductId && (
              <form onSubmit={handleEditProduct} style={{ background: '#f8fafc', padding: 18, borderRadius: 10, marginTop: 24, maxWidth: 420 }}>
                <h3>Sửa thông tin sản phẩm</h3>
                <div style={{ marginBottom: 10 }}>
                  <label>Tên sản phẩm:</label>
                  <input type="text" value={editProduct.name} onChange={e => setEditProduct(p => ({ ...p, name: e.target.value }))} required style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', marginTop: 4 }} />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label>Giá:</label>
                  <input type="number" value={editProduct.price} onChange={e => setEditProduct(p => ({ ...p, price: e.target.value }))} required style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', marginTop: 4 }} />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label>Mô tả:</label>
                  <input type="text" value={editProduct.description} onChange={e => setEditProduct(p => ({ ...p, description: e.target.value }))} style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', marginTop: 4 }} />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label>Số lượng:</label>
                  <input type="number" value={editProduct.quantity} onChange={e => setEditProduct(p => ({ ...p, quantity: e.target.value }))} style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', marginTop: 4 }} />
                </div>
                <div style={{ marginBottom: 10 }}>
                  <label>Ảnh (URL):</label>
                  <input type="text" value={editProduct.image} onChange={e => setEditProduct(p => ({ ...p, image: e.target.value }))} style={{ width: '100%', padding: 7, borderRadius: 6, border: '1.5px solid #bdbdbd', marginTop: 4 }} />
                </div>
                {editError && <div style={{ color: 'red', marginBottom: 8 }}>{editError}</div>}
                <button type="submit" style={{ background: '#1976d2', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }}>Lưu thay đổi</button>
                <button type="button" style={{ marginLeft: 12, background: '#888', color: '#fff', border: 'none', borderRadius: 8, padding: '8px 18px', fontWeight: 600, fontSize: 16, cursor: 'pointer' }} onClick={() => setEditProductId(null)}>Hủy</button>
              </form>
            )}
          </div>
        );
      case 'users':
<<<<<<< HEAD
        // Style constants
        const inputStyle = { padding: '10px 16px', borderRadius: 12, border: '1.5px solid #b6c6e6', outline: 'none', fontSize: 15, background: '#fafdff', boxShadow: '0 1px 4px #e3eafc' };
        const tableThStyle = { background: '#e3eafc', padding: 16, borderBottom: '2.5px solid #b6c6e6', textAlign: 'left', fontWeight: 800, fontSize: 16, color: '#1976d2', letterSpacing: 0.3 };
        const tableTdStyle = { padding: 14, borderBottom: '1.5px solid #e3eafc' };
        const buttonAddStyle = { background: 'linear-gradient(90deg,#1976d2 60%,#42a5f5 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 22px', fontWeight: 800, fontSize: 16, cursor: 'pointer', letterSpacing: 0.3, boxShadow: '0 2px 8px #e3eafc', transition: 'background 0.18s' };
        // Filter logic
        const filteredUsers = users.filter((u, index) => {
          const idMatch = !userSearchId || String(index + 1) === String(userSearchId).trim();
          const addr = (u.address || '').toLowerCase();
          const addressMatch = !userSearchAddress || addr.includes(userSearchAddress.toLowerCase());
          return idMatch && addressMatch;
        });
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
            <h2 style={{ marginBottom: 24, fontWeight: 800, fontSize: 32, color: '#1976d2', letterSpacing: 0.5, textShadow: '0 2px 8px #e3eafc' }}>Quản lý người dùng</h2>
            <div style={{
              background: '#fff',
              borderRadius: 18,
              boxShadow: '0 8px 32px rgba(25, 118, 210, 0.10)',
              overflow: 'hidden',
              border: '1.5px solid #e3eafc',
              width: '100%',
              maxWidth: 1100,
              margin: '0 auto',
              padding: 0
            }}>
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 16,
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '20px 28px 16px 28px',
                background: 'linear-gradient(90deg,#f5faff 0%, #e3eafc 100%)',
                borderBottom: '1.5px solid #e3eafc'
              }}>
                <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                  <input type="number" placeholder="Tìm theo ID"
                    value={userSearchId}
                    onChange={e => setUserSearchId(e.target.value)}
                    style={{ ...inputStyle, width: 170 }} />
                  <input type="text" placeholder="Tìm theo địa chỉ"
                    value={userSearchAddress}
                    onChange={e => setUserSearchAddress(e.target.value)}
                    style={{ ...inputStyle, minWidth: 260 }} />
                </div>
                <button onClick={() => setShowAddUserForm(true)} style={buttonAddStyle}>
                  + Thêm người dùng
                </button>
              </div>
            {showAddUserForm && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(25,118,210,0.13)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                <div style={{ background: '#fff', borderRadius: 22, boxShadow: '0 16px 48px rgba(25,118,210,0.18)', width: '96%', maxWidth: 540, padding: 0, position: 'relative', overflow: 'hidden', border: '2px solid #e3eafc', animation: 'fadeIn .18s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 32px 16px 32px', background: 'linear-gradient(90deg,#f5faff 0%, #e3eafc 100%)', borderBottom: '2px solid #e3eafc' }}>
                    <h3 style={{ margin: 0, color: '#1976d2', fontWeight: 900, fontSize: 24, letterSpacing: 0.3 }}>Thêm người dùng mới</h3>
                    <button onClick={() => setShowAddUserForm(false)} title="Đóng" style={{ background: 'none', border: '2px solid #b6c6e6', borderRadius: 12, width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1976d2', fontSize: 28, fontWeight: 700, transition: 'background 0.18s' }}>
                      &times;
                    </button>
                  </div>
                  <form onSubmit={handleAddUser} style={{ padding: '28px 32px 18px 32px', transition: 'transform 0.18s ease' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                      <div>
                        <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 15 }}>Username</label>
                        <input type="text" value={newUser.username} onChange={e => setNewUser(p => ({ ...p, username: e.target.value }))} required placeholder="Nhập username"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #b6c6e6', marginTop: 7, outline: 'none', fontSize: 15, background: '#fafdff', boxShadow: '0 1px 4px #e3eafc' }} />
                      </div>
                      <div>
                        <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 15 }}>Password</label>
                        <input type="password" value={newUser.password} onChange={e => setNewUser(p => ({ ...p, password: e.target.value }))} required placeholder="Nhập mật khẩu"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #b6c6e6', marginTop: 7, outline: 'none', fontSize: 15, background: '#fafdff', boxShadow: '0 1px 4px #e3eafc' }} />
                      </div>
                      <div>
                        <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 15 }}>Email</label>
                        <input type="email" value={newUser.email} onChange={e => setNewUser(p => ({ ...p, email: e.target.value }))} placeholder="name@example.com"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #b6c6e6', marginTop: 7, outline: 'none', fontSize: 15, background: '#fafdff', boxShadow: '0 1px 4px #e3eafc' }} />
                      </div>
                      <div>
                        <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 15 }}>Địa chỉ</label>
                        <input type="text" value={newUser.address} onChange={e => setNewUser(p => ({ ...p, address: e.target.value }))} placeholder="Địa chỉ người dùng"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #b6c6e6', marginTop: 7, outline: 'none', fontSize: 15, background: '#fafdff', boxShadow: '0 1px 4px #e3eafc' }} />
                      </div>
                      <div>
                        <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 15 }}>Role</label>
                        <select value={newUser.role} onChange={e => setNewUser(p => ({ ...p, role: e.target.value }))}
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #b6c6e6', marginTop: 7, outline: 'none', background: '#fafdff', fontSize: 15, boxShadow: '0 1px 4px #e3eafc' }}>
                          <option value="customer">customer</option>
                          <option value="admin">admin</option>
                        </select>
                      </div>
                    </div>
                    {addUserError && <div style={{ color: '#d32f2f', marginTop: 14, fontWeight: 700 }}>{addUserError}</div>}
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', marginTop: 28 }}>
                      <button type="button" onClick={() => setShowAddUserForm(false)}
                        style={{ background: '#fff', color: '#1976d2', border: '2px solid #1976d2', borderRadius: 12, padding: '12px 24px', fontWeight: 800, fontSize: 16, cursor: 'pointer', transition: 'transform 0.12s' }}
                        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        Hủy
                      </button>
                      <button type="submit"
                        disabled={addLoading}
                        style={{ background: addLoading ? '#90caf9' : 'linear-gradient(90deg,#1976d2 60%,#42a5f5 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontWeight: 800, fontSize: 16, cursor: addLoading ? 'not-allowed' : 'pointer', transition: 'transform 0.12s', boxShadow: '0 2px 8px #e3eafc' }}
                        onMouseDown={e => !addLoading && (e.currentTarget.style.transform = 'scale(0.98)')}
                        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        {addLoading ? 'Đang thêm...' : 'Thêm người dùng'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {userLoading && <p style={{ textAlign: 'center', color: '#1976d2', fontWeight: 700, fontSize: 18, margin: '32px 0' }}>Đang tải...</p>}
            {userError && !userError.includes('Failed to fetch') && (
              <p style={{ color: '#d32f2f', fontWeight: 700, textAlign: 'center', margin: '18px 0', fontSize: 17 }}>{userError}</p>
            )}
            <div style={{ width: '100%', overflowX: 'auto', padding: '0 0 18px 0' }}>
              <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, minWidth: 900, margin: '0 auto', background: '#fafdff', borderRadius: 14, boxShadow: '0 2px 8px #e3eafc' }}>
                <thead>
                  <tr>
                    <th style={tableThStyle}>ID</th>
                    <th style={tableThStyle}>Username</th>
                    <th style={tableThStyle}>Email</th>
                    <th style={tableThStyle}>Địa chỉ</th>
                    <th style={tableThStyle}>Role</th>
                    <th style={tableThStyle}>Thao tác</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.length === 0 ? (
                    <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888', fontWeight: 600, fontSize: 16, padding: 32 }}>Không có người dùng nào</td></tr>
                  ) : filteredUsers.map((u, i) => (
                    <tr key={u._id} style={{ background: i % 2 ? '#f5faff' : '#fff', transition: 'background 0.18s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#e3eafc'}
                      onMouseLeave={e => e.currentTarget.style.background = i % 2 ? '#f5faff' : '#fff'}>
                      <td style={{ ...tableTdStyle, fontWeight: 700, color: '#1976d2' }}>{users.findIndex(x => x._id === u._id) + 1}</td>
                      <td style={{ ...tableTdStyle, fontWeight: 600 }}>{u.username}</td>
                      <td style={tableTdStyle}>{u.email}</td>
                      <td style={tableTdStyle}>{u.address || ''}</td>
                      <td style={tableTdStyle}>
                        <span style={{
                          background: u.role === 'admin' ? '#e8f1ff' : '#f1f8e9',
                          color: u.role === 'admin' ? '#1565c0' : '#2e7d32',
                          padding: '6px 16px',
                          borderRadius: 999,
                          fontWeight: 800,
                          fontSize: 13,
                          textTransform: 'uppercase',
                          letterSpacing: 0.5,
                          boxShadow: '0 1px 4px #e3eafc'
                        }}>{u.role}</span>
                      </td>
                      <td style={{ padding: 10, borderBottom: '1.5px solid #e3eafc', display: 'flex', gap: 10 }}>
                        <button aria-label="Sửa" title="Sửa" onClick={() => handleEditUserClick(u)}
                          style={{ background: '#fff', color: '#1976d2', border: '2px solid #1976d2', borderRadius: 999, padding: 8, cursor: 'pointer', width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px #e3eafc', transition: 'transform 0.12s, background 0.18s' }}
                          onMouseEnter={e => e.currentTarget.style.background = '#e3eafc'}
                          onMouseLeave={e => e.currentTarget.style.background = '#fff'}
                          onMouseDown={e => e.currentTarget.style.transform = 'scale(0.96)'}
                          onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25Z" fill="#1976d2"/>
                            <path d="M20.71 7.04a1 1 0 0 0 0-1.41L18.37 3.29a1 1 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83Z" fill="#1976d2"/>
                          </svg>
                        </button>
                        <button aria-label="Xóa" title="Xóa" onClick={() => { setConfirmDeleteId(u._id); setConfirmDeleteName(u.username); }}
                          style={{ background: 'linear-gradient(90deg,#d32f2f 60%,#ff5252 100%)', color: '#fff', border: 'none', borderRadius: 10, padding: 8, cursor: 'pointer', width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 1px 4px #ffd6d6', fontWeight: 700, fontSize: 15, transition: 'background 0.18s' }}>
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6 7h12M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2m-9 0v12a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V7H6Z" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            </div>
            {/* Popup sửa user */}
            {editUserId && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(25,118,210,0.13)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                <div style={{ background: '#fff', borderRadius: 22, boxShadow: '0 16px 48px rgba(25,118,210,0.18)', width: '96%', maxWidth: 540, padding: 0, position: 'relative', overflow: 'hidden', border: '2px solid #e3eafc', animation: 'fadeIn .18s' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '22px 32px 16px 32px', background: 'linear-gradient(90deg,#f5faff 0%, #e3eafc 100%)', borderBottom: '2px solid #e3eafc' }}>
                    <h3 style={{ margin: 0, color: '#1976d2', fontWeight: 900, fontSize: 24, letterSpacing: 0.3 }}>Sửa thông tin người dùng</h3>
                    <button onClick={() => setEditUserId(null)} title="Đóng" style={{ background: 'none', border: '2px solid #b6c6e6', borderRadius: 12, width: 38, height: 38, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#1976d2', fontSize: 28, fontWeight: 700, transition: 'background 0.18s' }}>
                      &times;
                    </button>
                  </div>
                  <form onSubmit={handleEditUser} style={{ padding: '28px 32px 18px 32px', transition: 'transform 0.18s ease' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}>
                      <div>
                        <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 15 }}>Username</label>
                        <input type="text" value={editUser.username} onChange={e => setEditUser(p => ({ ...p, username: e.target.value }))} required placeholder="Tên đăng nhập"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #b6c6e6', marginTop: 7, outline: 'none', fontSize: 15, background: '#fafdff', boxShadow: '0 1px 4px #e3eafc' }} />
                      </div>
                      <div>
                        <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 15 }}>Email</label>
                        <input type="email" value={editUser.email} onChange={e => setEditUser(p => ({ ...p, email: e.target.value }))} placeholder="name@example.com"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #b6c6e6', marginTop: 7, outline: 'none', fontSize: 15, background: '#fafdff', boxShadow: '0 1px 4px #e3eafc' }} />
                      </div>
                      <div>
                        <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 15 }}>Địa chỉ</label>
                        <input type="text" value={editUser.address} onChange={e => setEditUser(p => ({ ...p, address: e.target.value }))} placeholder="Địa chỉ người dùng"
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #b6c6e6', marginTop: 7, outline: 'none', fontSize: 15, background: '#fafdff', boxShadow: '0 1px 4px #e3eafc' }} />
                      </div>
                      <div>
                        <label style={{ fontWeight: 700, color: '#1976d2', fontSize: 15 }}>Role</label>
                        <select value={editUser.role} onChange={e => setEditUser(p => ({ ...p, role: e.target.value }))}
                          style={{ width: '100%', padding: '12px 14px', borderRadius: 12, border: '1.5px solid #b6c6e6', marginTop: 7, outline: 'none', background: '#fafdff', fontSize: 15, boxShadow: '0 1px 4px #e3eafc' }}>
                          <option value="customer">customer</option>
                          <option value="admin">admin</option>
                        </select>
                      </div>
                    </div>
                    {editUserError && <div style={{ color: '#d32f2f', marginTop: 14, fontWeight: 700 }}>{editUserError}</div>}
                    {editSuccess && <div style={{ color: '#2e7d32', marginTop: 14, fontWeight: 700 }}>{editSuccess}</div>}
                    <div style={{ display: 'flex', gap: 14, justifyContent: 'flex-end', marginTop: 28 }}>
                      <button type="button" onClick={() => setEditUserId(null)}
                        style={{ background: '#fff', color: '#1976d2', border: '2px solid #1976d2', borderRadius: 12, padding: '12px 24px', fontWeight: 800, fontSize: 16, cursor: 'pointer', transition: 'transform 0.12s' }}
                        onMouseDown={e => e.currentTarget.style.transform = 'scale(0.98)'}
                        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        Hủy
                      </button>
                      <button type="submit"
                        disabled={editLoading}
                        style={{ background: editLoading ? '#90caf9' : 'linear-gradient(90deg,#1976d2 60%,#42a5f5 100%)', color: '#fff', border: 'none', borderRadius: 12, padding: '12px 24px', fontWeight: 800, fontSize: 16, cursor: editLoading ? 'not-allowed' : 'pointer', transition: 'transform 0.12s', boxShadow: '0 2px 8px #e3eafc' }}
                        onMouseDown={e => !editLoading && (e.currentTarget.style.transform = 'scale(0.98)')}
                        onMouseUp={e => e.currentTarget.style.transform = 'scale(1)'}
                        onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}>
                        {editLoading ? 'Đang lưu...' : 'Lưu thay đổi'}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            {/* Popup xác nhận xóa */}
            {confirmDeleteId && (
              <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
                <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 16px 40px rgba(0,0,0,0.18)', width: '94%', maxWidth: 520, padding: 0, position: 'relative', overflow: 'hidden', border: '1px solid #edf1f7' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 18px', background: 'linear-gradient(180deg,#fff5f5 0%, #ffecec 100%)', borderBottom: '1px solid #ffd6d6' }}>
                    <h3 style={{ margin: 0, color: '#c62828' }}>Xác nhận xóa</h3>
                    <button onClick={() => setConfirmDeleteId(null)} title="Đóng" style={{ background: 'none', border: '1px solid #ef9a9a', borderRadius: 10, width: 36, height: 36, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#c62828' }}>
                      &times;
                    </button>
                  </div>
                  <div style={{ padding: 18 }}>
                    <p>Bạn có chắc muốn xóa người dùng <b>{confirmDeleteName}</b>?</p>
                    <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end', marginTop: 12 }}>
                      <button type="button" onClick={() => setConfirmDeleteId(null)} style={{ background: '#fff', color: '#1976d2', border: '2px solid #1976d2', borderRadius: 10, padding: '10px 18px', fontWeight: 700, cursor: 'pointer' }}>Hủy</button>
                      <button type="button" disabled={deleteLoading} onClick={async () => {
                        if (!confirmDeleteId) return;
                        setDeleteLoading(true);
                        await handleDeleteUser(confirmDeleteId);
                        setDeleteLoading(false);
                        setConfirmDeleteId(null);
                      }} style={{ background: deleteLoading ? '#ef9a9a' : '#d32f2f', color: '#fff', border: 'none', borderRadius: 10, padding: '10px 18px', fontWeight: 700, cursor: deleteLoading ? 'not-allowed' : 'pointer' }}>
                        {deleteLoading ? 'Đang xóa...' : 'Xóa' }
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      case 'orders':
        return <div><h2>Quản lý đơn hàng</h2><p>Chức năng quản lý đơn hàng sẽ hiển thị ở đây.</p></div>;
      case 'logout':
        try { localStorage.removeItem('token'); } catch {}
        window.location.href = '/';
=======
        return <div><h2>Quản lý người dùng</h2><p>Chức năng quản lý người dùng sẽ hiển thị ở đây.</p></div>;
      case 'orders':
        return <div><h2>Quản lý đơn hàng</h2><p>Chức năng quản lý đơn hàng sẽ hiển thị ở đây.</p></div>;
      case 'logout':
        window.location.reload();
>>>>>>> c700724f696f319f260b85802a2bd0f7d0f2f022
        return null;
      default:
        return <div>Chào mừng bạn đến với trang quản trị GadgetPhone!</div>;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa' }}>
<<<<<<< HEAD
      {toastMsg && (
        <div style={{ position: 'fixed', top: 16, right: 16, zIndex: 1100 }}>
          <div style={{
            background: toastType === 'success' ? '#e8f5e9' : '#ffebee',
            color: toastType === 'success' ? '#2e7d32' : '#c62828',
            border: `1px solid ${toastType === 'success' ? '#c8e6c9' : '#ffcdd2'}`,
            padding: '10px 14px',
            borderRadius: 10,
            boxShadow: '0 6px 18px rgba(0,0,0,0.08)',
            fontWeight: 600
          }}>
            {toastMsg}
          </div>
        </div>
      )}
=======
>>>>>>> c700724f696f319f260b85802a2bd0f7d0f2f022
      <aside style={{ width: 240, background: '#1976d2', color: '#fff', padding: '32px 0', boxShadow: '2px 0 8px rgba(60,60,60,0.07)' }}>
        <div style={{ fontWeight: 700, fontSize: 24, textAlign: 'center', marginBottom: 32 }}>Admin Dashboard</div>
        <nav>
          {menuItems.map(item => (
            <div
              key={item.key}
              onClick={() => setActive(item.key)}
              style={{
                padding: '16px 32px',
                cursor: 'pointer',
                background: active === item.key ? '#1565c0' : 'none',
                fontWeight: active === item.key ? 700 : 500,
                fontSize: 18,
                borderLeft: active === item.key ? '4px solid #fff' : '4px solid transparent',
                transition: 'background 0.18s'
              }}
            >
              {item.label}
            </div>
          ))}
        </nav>
      </aside>
      <main style={{ flex: 1, padding: '48px 40px' }}>
        {renderContent()}
      </main>
    </div>
  );
}

export default AdminDashboard;
