import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(price);
};

const featuredIds = [5, 8, 11, 12, 17, 21, 24, 27, 14, 33, 48, 45];

function Home() {
  const navigate = useNavigate();
  const [featured, setFeatured] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/featured?ids=${featuredIds.join(',')}`)
      .then(res => res.json())
      .then(data => {
  if (data.products) setFeatured(data.products);
});
  }, []);

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
          <h1>Ethereal Summer</h1>
          <p>TIMELESS ELEGANCE</p>
          <button onClick={() => navigate('/exclusive/ethereal-summer')}>DISCOVER</button>
        </div>
      </div>

      {/* Signature Pieces Section */}
      <section className="products-section">
        <h2>Signature Pieces</h2>
        <div className="collection-intro">
          <p className="collection-description">
            A curated selection of the pieces that define Aurelia. Timeless designs crafted for those who appreciate the art of dressing well.
          </p>
        </div>
        

        <div className="products-grid">
          {featured.map(product => (
            <Link to={`/product/${product.product_id}`} key={product.product_id}>
              <article className="product-card">
                <div className="product-media">
                  <img
                    className="img-primary"
                    src={product.product_image_url}
                    alt={product.product_name}
                    onError={(e) => {
                      if (e.target.src.endsWith('.jpg')) {
                        e.target.src = product.product_image_url.replace('.jpg', '.png');
                      }
                    }}
                  />
                  <img
                    className="img-secondary"
                    src={`/images/products/${product.product_id}/2.jpg`}
                    alt={product.product_name}
                      onError={(e) => {
                        if (e.target.src.endsWith('.jpg')) {
                          e.target.src = `/images/products/${product.product_id}/2.png`;
                        } else {
                          e.target.closest('article').classList.add('no-hover-image');
                        }
                      }}
                    />
                </div>
                <p className="category">{product.category}</p>
                <h3>{product.product_name}</h3>
                <p className="price">{formatPrice(product.price)}</p>
              </article>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;