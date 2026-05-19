import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function CollectionPage() {
    const { category, collection } = useParams();
    const categoryMap = {
      women: 'Women',
      men: 'Men',
      accessories: 'Accessories'
    };

    const collectionMap = {
      fall: 3,
      spring: 1,
      summer: 2
    };

    const exclusiveMap = {
      'ethereal-summer': 2,
      'bohemic-fall': 3
    };

    const [products, setProducts] = useState([]);

    useEffect(() => {
      fetch(`http://localhost:5001/api/products?category=${categoryMap[category]}&collection=${collectionMap[collection]}`)
      .then(res => res.json())
      .then(data => setProducts(data.products));
    }, [category, collection]);

      return (
        <div>
          <h1>{categoryMap[category]} - {collection ? `${collection} Collection` : 'All Products'}</h1>
          <div className="products-grid">
            {products.map((product) => (
              <article className="product-card" key={product.product_id}>
                <div className="product-media">
                  <img src={product.product_image_url} alt={product.product_name} />
                </div>
                <p className="category">{product.category}</p>
                <h3>{product.product_name}</h3>
                <p className="price">${product.price}</p>
              </article>
            ))}
          </div>
        </div>
);
}

export default CollectionPage;