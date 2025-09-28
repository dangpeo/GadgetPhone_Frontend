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
    }
  }, [active]);

  const handleDelete = async (id) => {
    if (!id) return;
    const confirmDelete = window.confirm('Bạn có chắc muốn xóa sản phẩm này?');
    if (!confirmDelete) return;
    try {
      const res = await fetch(`http://localhost:5000/api/products/${id}`, { method: 'DELETE' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Không thể xóa sản phẩm');
      setProducts(prev => prev.filter(p => (p._id || p.id) !== id));
    } catch (err) {
      alert(err.message);
    }
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
        return <div><h2>Quản lý người dùng</h2><p>Chức năng quản lý người dùng sẽ hiển thị ở đây.</p></div>;
      case 'orders':
        return <div><h2>Quản lý đơn hàng</h2><p>Chức năng quản lý đơn hàng sẽ hiển thị ở đây.</p></div>;
      case 'logout':
        window.location.reload();
        return null;
      default:
        return <div>Chào mừng bạn đến với trang quản trị GadgetPhone!</div>;
    }
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#f5f6fa' }}>
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
