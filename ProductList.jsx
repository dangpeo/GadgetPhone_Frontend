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
      <ul>
        {filtered.map(p => (
          <li key={p.id}>
            <b>{p.name}</b> - {p.price.toLocaleString()}₫
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ProductList
