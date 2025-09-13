import React, { useState, useEffect } from 'react'

const bannerItems = [
  {
    title: 'iPhone 15 Pro Max',
    desc: 'Siêu phẩm mới nhất, camera đỉnh cao, hiệu năng vượt trội!',
    color: '#e3f0ff',
    img: 'https://msmobile.vn/upload_images/images/2023/09/13/iPhone-15-Pro-Max-1.jpg',
  },
  {
    title: 'Samsung Galaxy S24 Ultra',
    desc: 'Màn hình lớn, pin trâu, chụp đêm cực chất!',
    color: '#fff8f8',
    img: 'https://samcenter.vn/images/thumbs/0012150_samsung-galaxy-s24-ultra-512gb-sao-chep.jpeg',
  },
  {
    title: 'Xiaomi 14 Pro',
    desc: 'Giá tốt, cấu hình mạnh, thiết kế sang trọng!',
    color: '#fcb69f',
    img: 'https://bizweb.dktcdn.net/thumb/1024x1024/100/257/835/products/3-6.png?v=1735288850030',
  },
]

function BannerCarousel() {
  const [index, setIndex] = useState(0)
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex(i => (i + 1) % bannerItems.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])
  const item = bannerItems[index]
  return (
    <div style={{
      width: '100%',
      maxWidth: 900,
      margin: '32px auto 0 auto',
      borderRadius: 18,
      background: item.color,
      boxShadow: '0 2px 16px 0 rgba(60,60,60,0.07)',
      padding: '24px 32px',
      minHeight: 140,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      transition: 'background 0.5s',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: 'inherit',
      gap: 32
    }}>
      <img src={item.img} alt={item.title} style={{ width: 100, height: 100, objectFit: 'cover', borderRadius: 12, boxShadow: '0 2px 8px 0 rgba(60,60,60,0.09)' }} />
      <div style={{ textAlign: 'left', flex: 1 }}>
        <div style={{ fontSize: 30, fontWeight: 800, color: '#1976d2', marginBottom: 8, letterSpacing: 1 }}>{item.title}</div>
        <div style={{ fontSize: 18, color: '#333', fontWeight: 500 }}>{item.desc}</div>
      </div>
      <div style={{ position: 'absolute', right: 18, top: 18, fontSize: 16, color: '#1976d2', opacity: 0.5 }}>{index + 1}/{bannerItems.length}</div>
    </div>
  )
}

export default BannerCarousel
