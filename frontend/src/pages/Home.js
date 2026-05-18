import React from 'react';

function Home() {
  return (
    <div>
      {/* Hero Section */}
      <div className="hero-section">
        {(() => {
          const videoPath = encodeURI(process.env.PUBLIC_URL + "/Summer Collection '26.mp4");
          return (
            <video className="hero-video" autoPlay muted loop playsInline preload="metadata" poster={process.env.PUBLIC_URL + '/hero-poster.jpg'}>
              <source src={videoPath} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          );
        })()}
        
        <div className="hero-content">
          <h1>Summer Collection '26</h1>
          <p>TIMELESS ELEGANCE • NATURAL MATERIALS</p>
          <button>DISCOVER</button>
        </div>
      </div>

      <section className="products-section">
        <h2>Signature Pieces</h2>

        {(() => {
          const sample = [
            { name: 'Silk Evening Dress', category: 'WOMEN', price: '1,250', image: process.env.PUBLIC_URL + "/images/products/Blue Silk Dress.png" },
            { name: 'Tailored Wool Coat', category: 'WOMEN', price: '890', image: '/product-image.jpg' },
            { name: 'Linen Summer Dress', category: 'WOMEN', price: '620', image: '/product-image.jpg' },
            { name: 'Designer Handbag', category: 'ACCESSORIES', price: '1,480', image: '/product-image.jpg' },
            { name: 'Cashmere Sweater', category: 'WOMEN', price: '420', image: '/product-image.jpg' },
            { name: 'Leather Sandals', category: 'WOMEN', price: '320', image: '/product-image.jpg' },
            { name: 'Summer Blazer', category: 'MEN', price: '780', image: '/product-image.jpg' },
            { name: 'Silk Scarf', category: 'ACCESSORIES', price: '150', image: '/product-image.jpg' }
          ];

          return (
            <div className="products-grid">
              {sample.map((p, i) => (
                <article className="product-card" key={i}>
                  <div className="product-media">
                    <img src={p.image} alt={p.name} />
                  </div>
                  <p className="category">{p.category}</p>
                  <h3>{p.name}</h3>
                  <p className="price">${p.price}</p>
                </article>
              ))}
            </div>
          );
        })()}
      </section>
    </div>
  );
}

export default Home;