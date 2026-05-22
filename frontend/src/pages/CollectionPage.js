import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

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

const videoMap = {
  'women-fall': "Golf Fall.mp4",
  'men-fall': "Men Fall.mp4",
  'women-spring': "Women Spring.mp4",
  'men-spring': "Men Spring.mp4",
  'women-summer': "Women Summer.mp4",
  'men-summer': "Men Summer.mp4",
  'women-spring-suits': "Suits.mp4",
  'ethereal-summer': "Ethereal Summer.mp4",
  'bohemic-fall': "Bohemic Fall.mp4"
};

const heroTextMap = {
  'women-fall': "Designed to move with the season",
  'men-fall': "Tailored for the colder days ahead",
  'women-spring': "The season of becoming",
  'men-spring': "Minimalism that catches the eye",
  'women-summer': "Drifting through endless coastlines",
  'men-summer': "For days spent under sail",
  'women-spring-suits': "Confidence looks better in color",
  'bohemic-fall': "Inspired by wandering souls",
  'ethereal-summer': "For hearts that bloom in summer"
};

const heroDescriptionMap = {
  'ethereal-summer': "An ode to softness and light. The Ethereal Summer collection drifts between romance and ease. Flowing silhouettes, delicate textures, and natural fabrics move effortlessly with the body, capturing the warmth of sunlit afternoons and the quiet beauty of fleeting summer moments. Inspired by blooming gardens, faded memories, and the serenity of slow living, each piece embodies a refined femininity shaped by nature and timeless craftsmanship.",
  'bohemic-fall': "Rooted in freedom and refined through craftsmanship. The Bohemic Fall collection explores the harmony between movement and texture. Earth-toned palettes, soft layering, and natural materials evoke the atmosphere of open fields and changing seasons. Relaxed yet elevated, the collection embraces a quiet sensuality — where effortless silhouettes and artisanal detail create a modern expression of bohemian luxury.",
  'men-fall': "A study in understated sophistication. The Men's Fall Collection balances structure with ease. Tailored silhouettes, rich textures, and natural materials come together in pieces designed for movement, comfort, and longevity. Inspired by the calm elegance of autumn landscapes, the collection reflects a modern approach to luxury — refined, timeless, and consciously crafted.",
  'women-fall': "The Women's Fall Collection explores softness through structure, combining fluid forms with refined tailoring. Earth-inspired tones, layered textures, and sustainable fabrics create a wardrobe shaped by quiet elegance and everyday ease. Designed to transition effortlessly through the season, each piece reflects a timeless femininity grounded in craftsmanship and natural beauty.",
  'women-spring': "The Women's Spring Collection draws inspiration from the energy of the city as it awakens into a new season. Structured contrasts, softened palettes, and contemporary proportions create a wardrobe that feels confident yet effortless. Balancing modern femininity with architectural simplicity, the collection captures the atmosphere of spring through refined details, quiet confidence, and a sense of forward movement.",
  'women-spring-suits': "The Spring Special Edition reimagines suiting with fluidity, precision, and ease. Lightweight natural fabrics and clean silhouettes create a balance between strength and femininity, while subtle detailing introduces a sense of quiet sophistication. Designed for movement within the rhythm of the city, the collection embodies contemporary elegance with timeless intent bringing a pop of color to the everyday life.",
  'women-summer': "Inspired by the serenity of coastal summers. The Women's Summer Collection captures the effortless beauty of sun, sea, and movement. Flowing silhouettes, airy natural fabrics, and delicate textures evoke the feeling of warm sand, ocean breeze, and golden light against the skin. Designed for slow afternoons by the water and timeless summer escapes. The collection embodies relaxed femininity through refined craftsmanship and understated luxury.",
  'men-summer': "Rooted in the spirit of coastal travel and open-water freedom. The Men's Summer Collection blends relaxed tailoring with lightweight natural materials designed for warmer days. Inspired by sailing culture, sun-faded textures, and the quiet elegance of life by the sea. The collection balances sophistication with ease through crafted for movement, comfort, and enduring style.",
  'men-spring': "The Men's Spring Collection reinterprets classic menswear through a contemporary lens, where precision tailoring meets relaxed functionality. Inspired by movement, architecture, and understated modernism, the collection focuses on balance — sharp yet effortless, structured yet adaptable. Each piece is designed to transition seamlessly through the pace and clarity of a new season."
};

const formatPrice = (price) => {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency',
    currency: 'EUR',
    minimumFractionDigits: 2
  }).format(price);
};

function CollectionPage() {
  const { category: rawCategory, collection } = useParams();
  const category = rawCategory || 'exclusive';

  const videoKey = category === 'exclusive' ? collection : `${category}-${collection}`;
  const currentVideo = videoMap[videoKey];
  const heroText = heroTextMap[videoKey];
  const heroDescription = heroDescriptionMap[videoKey];

  const [products, setProducts] = useState([]);

  useEffect(() => {
    let url;

    if (category === 'exclusive') {
      const collectionId = exclusiveMap[collection];
      url = `http://localhost:5001/api/products?keyword=special${collectionId ? `&collection=${collectionId}` : ''}`;
    } else {
      const collectionId = collectionMap[collection];
      url = `http://localhost:5001/api/products?category=${categoryMap[category]}&keyword=general${collectionId ? `&collection=${collectionId}` : ''}`;
    }

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data.products));
  }, [category, collection]);

  const suitsIds = [35, 36];
  const beforeSuits = products.filter(p => !suitsIds.includes(p.product_id));
  const suits = products.filter(p => suitsIds.includes(p.product_id));
  const isWomenSpring = category === 'women' && collection === 'spring';

  const ProductMedia = ({ product }) => (
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
  );

  return (
    <div>

      {/* Hero video + text for all collections except women's spring */}
      {!isWomenSpring && (
        <>
          {currentVideo && (
            <div className={`collection-hero ${category === 'women' && collection === 'summer' ? 'women-summer-hero' : ''}`}>
              <video className="hero-video" key={currentVideo} autoPlay muted loop playsInline>
                <source src={encodeURI(process.env.PUBLIC_URL + `/${currentVideo}`)} type="video/mp4" />
              </video>
            </div>
          )}
          {(heroText || heroDescription) && (
            <div className="collection-intro">
              {heroText && <h2 className="collection-tagline">{heroText}</h2>}
              {heroDescription && <p className="collection-description">{heroDescription}</p>}
            </div>
          )}
        </>
      )}

      <section className="products-section">
        {isWomenSpring ? (
          <>
            {/* General spring text at top — add video to videoMap['women-spring'] when ready */}
            {videoMap['women-spring'] && (
              <div className="collection-hero women-spring-hero">
                <video className="hero-video" autoPlay muted loop playsInline>
                  <source src={encodeURI(process.env.PUBLIC_URL + `/${videoMap['women-spring']}`)} type="video/mp4" />
                </video>
              </div>
            )}
            <div className="collection-intro">
              <h2 className="collection-tagline">{heroTextMap['women-spring']}</h2>
              <p className="collection-description">{heroDescriptionMap['women-spring']}</p>
            </div>

            {/* General spring products */}
            <div className="products-grid">
              {beforeSuits.map((product) => (
                <Link key={product.product_id} to={`/product/${product.product_id}`}>
                  <article className="product-card">
                    <ProductMedia product={product} />
                    <p className="category">{product.category}</p>
                    <h3>{product.product_name}</h3>
                    <p className="price">{formatPrice(product.price)}</p>
                  </article>
                </Link>
              ))}
            </div>

            {/* Suits video + text */}
            <video className="mid-video" autoPlay muted loop playsInline>
              <source src={encodeURI(process.env.PUBLIC_URL + `/Suits.mp4`)} type="video/mp4" />
            </video>
            <div className="collection-intro">
              <h2 className="collection-tagline">{heroTextMap['women-spring-suits']}</h2>
              <p className="collection-description">{heroDescriptionMap['women-spring-suits']}</p>
            </div>

            {/* Suits products */}
            <div className="products-grid">
              {suits.map((product) => (
                <Link key={product.product_id} to={`/product/${product.product_id}`}>
                  <article className="product-card">
                    <ProductMedia product={product} />
                    <p className="category">{product.category}</p>
                    <h3>{product.product_name}</h3>
                    <p className="price">{formatPrice(product.price)}</p>
                  </article>
                </Link>
              ))}
            </div>
          </>
        ) : (
          <div className="products-grid">
            {products.map((product) => (
              <Link key={product.product_id} to={`/product/${product.product_id}`}>
                <article className="product-card">
                  <ProductMedia product={product} />
                  <p className="category">{product.category}</p>
                  <h3>{product.product_name}</h3>
                  <p className="price">{formatPrice(product.price)}</p>
                </article>
              </Link>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default CollectionPage;