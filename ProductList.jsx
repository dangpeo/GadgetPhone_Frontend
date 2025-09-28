import React, { useEffect, useState } from 'react'

function ProductList({ search, onViewDetail }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const buildImageUrl = (raw) => {
    if (!raw) return ''
    let path = String(raw).replace(/\\/g, '/').trim()
    if (path.startsWith('http://') || path.startsWith('https://')) return path
    if (path.startsWith('uploads')) path = '/' + path
    if (path.startsWith('/uploads')) return `http://localhost:5000${path}`
    return `http://localhost:5000${path.startsWith('/') ? path : '/' + path}`
  }

  useEffect(() => {
    fetch('http://localhost:5000/api/products')
      .then(res => res.json())
      .then(data => {
        setProducts(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const filtered = search
    ? products.filter(p =>
        p.name.toLowerCase().includes(search.toLowerCase())
      )
    : products

  if (loading) return <p>Đang tải danh sách sản phẩm...</p>
  if (!filtered.length) return <p>Không có sản phẩm nào.</p>

  return (
    <div>
      <h2 style={{ 
        fontSize: '24px', 
        fontWeight: '700', 
        color: '#1976d2',
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        Danh sách sản phẩm
      </h2>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px',
        padding: '0 10px'
      }}>
        {filtered.map(p => (
          <div key={p._id} style={{ 
            background: 'white', 
            borderRadius: '12px', 
            padding: '20px', 
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
            border: '1px solid #e0e0e0'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'translateY(-4px)'
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)'
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)'
          }}
          >
            {/* Hình ảnh sản phẩm */}
            <div style={{ marginBottom: '16px', textAlign: 'center' }}>
              {p.image ? (
                <img 
                  src={buildImageUrl(p.image)} 
                  alt={p.name} 
                  style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'cover', 
                    borderRadius: '8px',
                    background: '#f5f5f5'
                  }} 
                />
              ) : (
                <div style={{
                  width: '100%',
                  height: '200px',
                  background: '#f5f5f5',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#999',
                  fontSize: '16px'
                }}>
                  Không có hình ảnh
                </div>
              )}
            </div>

            {/* Thông tin sản phẩm */}
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: '600', 
                color: '#333',
                marginBottom: '8px',
                lineHeight: '1.3',
                height: '2.6em',
                overflow: 'hidden',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical'
              }}>
                {p.name}
              </h3>
              
              <div style={{ 
                color: '#d32f2f', 
                fontWeight: '700', 
                fontSize: '20px',
                marginBottom: '8px'
              }}>
                {p.price.toLocaleString()}₫
              </div>
              
              {p.description && (
                <p style={{ 
                  color: '#666', 
                  fontSize: '14px',
                  marginBottom: '12px',
                  height: '2.8em',
                  overflow: 'hidden',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  lineHeight: '1.4'
                }}>
                  {p.description}
                </p>
              )}
              
              <div style={{ 
                color: p.quantity > 0 ? '#2e7d32' : '#d32f2f', 
                fontSize: '14px',
                fontWeight: '600',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <div style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: p.quantity > 0 ? '#4caf50' : '#f44336'
                }}></div>
                {p.quantity > 0 ? `Còn ${p.quantity} sản phẩm` : 'Hết hàng'}
              </div>

              {/* Nút xem chi tiết */}
              <button 
                onClick={() => onViewDetail && onViewDetail(p._id)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  background: '#1976d2',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  transition: 'all 0.2s ease'
                }}
                onMouseOver={(e) => {
                  e.target.style.background = '#1565c0'
                }}
                onMouseOut={(e) => {
                  e.target.style.background = '#1976d2'
                }}
              >
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24">
                  <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor"/>
                </svg>
                Xem chi tiết
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductList
