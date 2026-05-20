import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(price);
};

function ProductDetail() {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [variants, setVariants] = useState([]);
  const [sizeDrawerOpen, setSizeDrawerOpen] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [failedImages, setFailedImages] = useState(new Set());

  const imageRefs = useRef([]);

  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setImages(data.images);
        setVariants(data.variants);
      });
  }, [id]);

  useEffect(() => {
    if (images.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const index = imageRefs.current.indexOf(entry.target);
            if (index !== -1) setActiveIndex(index);
          }
        });
      },
      { threshold: 0.5 }
    );

    imageRefs.current.forEach(img => {
      if (img) observer.observe(img);
    });

    return () => observer.disconnect();
  }, [images]);

  if (!product) return <div className="product-detail-loading">Loading...</div>;

  return (
    <div className="product-detail-page">
      <div className="product-detail-layout">

        {/* Left: Images */}
        <div className="product-images-left">
          <div className="images-stack">
            {images.map((img, index) => (
              <img
                key={index}
                ref={el => imageRefs.current[index] = el}
                src={img.image_url}
                alt={`${product.product_name} ${index + 1}`}
                loading="lazy"
                onError={(e) => {
                  if (e.target.src.endsWith('.jpg')) {
                    e.target.src = img.image_url.replace('.jpg', '.png');
                  } else {
                    setFailedImages(prev => new Set([...prev, index]));
                    e.target.style.display = 'none';
                  }
                }}
              />
            ))}
          </div>

          {/* Dots */}
          <div className="image-dots">
            {images.map((_, index) => {
              if (failedImages.has(index)) return null;
              return (
                <span
                  key={index}
                  className={`dot ${activeIndex === index ? 'dot-active' : ''}`}
                />
              );
            })}
          </div>
        </div>

        {/* Right: Info */}
        <div className="product-info-right">
          <p className="product-detail-category">Online Exclusive</p>
          <h1 className="product-detail-name">{product.product_name}</h1>
          <p className="product-detail-price">{formatPrice(product.price)}</p>

          <p className="product-detail-description">{product.product_description}</p>

          {product.material && (
            <p className="product-detail-material">
              <span>Material: </span>{product.material}
            </p>
          )}

          <div className="size-selector-row">
            <button className="select-size-btn" onClick={() => setSizeDrawerOpen(true)}>
              Select Size <span>∨</span>
            </button>
            <button className="size-chart-btn" onClick={() => setSizeChartOpen(true)}>
              Size Guide
            </button>
          </div>

          <button className="add-to-cart-btn">Add to Shopping Cart</button>
        </div>

      </div>

      {/* Size Drawer */}
      {sizeDrawerOpen && (
        <div className="size-drawer-overlay" onClick={() => setSizeDrawerOpen(false)}>
          <div className="size-drawer" onClick={e => e.stopPropagation()}>
            <button className="size-drawer-close" onClick={() => setSizeDrawerOpen(false)}>✕</button>
            <h3>Select size</h3>
            <ul className="size-list">
              {variants.map((v, i) => (
                <li
                  key={i}
                  className={v.stock_quantity === 0 ? 'size-out-of-stock' : 'size-available'}
                >
                  {v.size}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Size Chart Drawer */}
      {sizeChartOpen && (
        <div className="size-drawer-overlay" onClick={() => setSizeChartOpen(false)}>
          <div className="size-drawer" onClick={e => e.stopPropagation()}>
            <button className="size-drawer-close" onClick={() => setSizeChartOpen(false)}>✕</button>
            <img
              src="/Size Chart.png"
              alt="Size Chart"
              style={{ width: '100%', marginTop: '20px' }}
            />
          </div>
        </div>
      )}

    </div>
  );
}

export default ProductDetail;