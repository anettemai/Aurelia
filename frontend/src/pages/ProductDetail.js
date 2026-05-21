import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../CartContext';

// Helper function to format price in Euros
const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(price);
};

// The ProductDetail component that displays the details of a single product
function ProductDetail() {
  const { id } = useParams();
  const { addToCart } = useCart();

  // State variables to hold product data, images, variants, and UI states
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [variants, setVariants] = useState([]);
  const [sizeDrawerOpen, setSizeDrawerOpen] = useState(false);
  const [sizeChartOpen, setSizeChartOpen] = useState(false);
  const [failedImages, setFailedImages] = useState(new Set());
  const [selectedSize, setSelectedSize] = useState(null)
  const [sizeError, setSizeError] = useState(false);
  const [quantity, setQuantity] = useState(1);

  const imageRefs = useRef([]);

  // Fetch product details from the backend when the component mounts or when the product ID changes
  useEffect(() => {
    fetch(`http://localhost:5001/api/products/${id}`)
      .then(res => res.json())
      .then(data => {
        setProduct(data.product);
        setImages(data.images);
        setVariants(data.variants);
      });
  }, [id]);

  // Set up an Intersection Observer to track which image is currently in view and update the active index for the dots
  useEffect(() => {
    if (images.length === 0) return;

    // Clean up any existing observers before creating a new one
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

    // Observe each image element
    imageRefs.current.forEach(img => {
      if (img) observer.observe(img);
    });

    // Clean up the observer when the component unmounts or when images change
    return () => observer.disconnect();
  }, [images]);

  // If the product data hasn't loaded yet, show a loading message
  if (!product) return <div className="product-detail-loading">Loading...</div>;

  // Render the product detail page with images on the left and product info on the right, along with size selection and size chart drawers
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

          {/* Size selection buttons */ }
          <div className="size-selector-row">
            <button className="select-size-btn" onClick={() => setSizeDrawerOpen(true)}>
                {selectedSize ? selectedSize : 'Select Size'}  <span>∨</span>
            </button>
            <button className="size-chart-btn" onClick={() => setSizeChartOpen(true)}>
              Size Guide
            </button>
          </div>

          {/* Show error message if user tries to add to cart without selecting a size */ }
          {sizeError && (
            <p className="size-error">Please select a size first</p>
          )}

          {/* Quantity selector */ }
          <div className="quantity-selector">
            <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
            <span>{quantity}</span>
            <button onClick={() => setQuantity(q => q + 1)}>+</button>
          </div>

          {/* Add to cart button */}
          <button
            className="add-to-cart-btn"
            onClick={ () => {
              if (!selectedSize) {
                setSizeError(true);
                setTimeout(() => setSizeError(false), 3000);
                return;
              }
              addToCart(product.product_id, selectedSize, quantity);
            }}
            >
              Add to Shopping Cart
          </button>
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
                  key={i} // React needs a unique key for each list item
                  // If stock is 0 -> grey "out of stock" style, otherwise black "available" style
                  className={v.stock_quantity === 0 ? 'size-out-of-stock' : 'size-available'}
                  onClick={() => {
                    if (v.stock_quantity > 0) { // If item is in stock
                      setSelectedSize(v.size); // Save chosen size
                      setSizeDrawerOpen(false); // Close the drawer automatically
                    }
                  }}
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