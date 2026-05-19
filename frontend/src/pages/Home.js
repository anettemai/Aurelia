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
          <h1>Ethereal Summer</h1>
          <p>TIMELESS ELEGANCE</p>
          <button>DISCOVER</button>
        </div>
      </div>

      <section className="products-section">
        <h2>Signature Pieces</h2>
      </section>
    </div>
  );
}

export default Home;