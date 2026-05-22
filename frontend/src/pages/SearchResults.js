import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(price);
};

  useEffect(() => {
    if (!query) return;
    setLoading(true);
    fetch(`http://localhost:5001/api/products/search?q=${encodeURIComponent(query)}`)
      .then(res => res.json())
      .then(data => {
        setProducts(Array.isArray(data) ? data : data.rows || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [query]);

  return (
    <div className="search-results-page">
      <div className="search-results-header">
        <h2>Search Results</h2>
        <p className="search-query-label">
          {loading
            ? `Searching for "${query}"...`
            : `${products.length} result${products.length !== 1 ? 's' : ''} for "${query}"`}
        </p>
      </div>

      {loading ? (
        <div className="search-loading">Loading...</div>
      ) : products.length === 0 ? (
        <div className="search-empty">
          <p>No products found for <strong>"{query}"</strong>.</p>
          <p>Try a different search term.</p>
        </div>
      ) : (
        <div className="search-product-grid">
          {products.map(product => (
            <div
              key={product.product_id}
              onClick={() => navigate(`/product/${product.product_id}`)}
              style={{ cursor: 'pointer' }}
            >
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
                <h3>{product.product_name}</h3>
                <p className="price">{formatPrice(product.price)}</p>
              </article>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchResults;