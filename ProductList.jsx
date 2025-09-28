import React, { useEffect, useState } from 'react'

function ProductList({ search }) {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

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
      <h2>Danh sách sản phẩm</h2>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {filtered.map(p => (
          <li key={p._id} style={{ marginBottom: 18, background: '#f8fafc', borderRadius: 8, padding: 16, boxShadow: '0 2px 8px rgba(60,60,60,0.07)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
              {p.image && <img src={p.image} alt={p.name} style={{ width: 80, height: 80, objectFit: 'cover', borderRadius: 8, background: '#eee' }} />}
              <div>
                <b style={{ fontSize: 18 }}>{p.name}</b>
                <div style={{ color: '#1976d2', fontWeight: 600, fontSize: 16 }}>{p.price.toLocaleString()}₫</div>
                {p.description && <div style={{ color: '#555', marginTop: 4 }}>{p.description}</div>}
                <div style={{ color: '#888', fontSize: 14 }}>Số lượng còn: {p.quantity ?? 0}</div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
