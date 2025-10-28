import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Home = () => {
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [addedToCart, setAddedToCart] = useState(null);

  const featuredProducts = [
    {
      id: 1,
      name: 'Premium Cotton Black Tee',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      description: 'Bestseller | Premium Quality',
      availableSizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'Urban Streetwear Hoodie',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      description: 'New Arrival | Limited Edition',
      availableSizes: ['M', 'L', 'XL']
    },
    {
      id: 3,
      name: 'Classic Denim Jacket',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      description: 'Trending Now | Most Popular',
      availableSizes: ['S', 'M', 'L', 'XL']
    }
  ];

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id];
    if (!size) {
      alert('Please select a size first');
      return;
    }
    addToCart(product, size, 1);
    setAddedToCart(product.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <div className="home-page">
      {/* Background Video */}
      <video autoPlay muted loop id="bg-video">
        <source src="/Aug_22__1639_15s_202508221701_ah42s.mp4" type="video/mp4" />
      </video>

      {/* Hero Section */}
      <section className="hero overlay-dark">
        <div className="container">
          <div className="hero-content text-center">
            <h1 className="display-3 fw-bold mb-4">Welcome to Coreline</h1>
            <p className="lead mb-4">Discover our latest collection of premium streetwear</p>
            <Link to="/shop" className="btn btn-lg btn-primary">
              Shop Now
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="featured-products py-5">
        <div className="container">
          <h2 className="text-center display-4 mb-2">Featured Collection</h2>
          <p className="text-center text-muted mb-5">Trending items from our latest arrivals</p>
          
          <div className="product-grid">
            {featuredProducts.map((product) => (
              <div key={product.id} className="product-card">
                <div className="card h-100">
                  <div className="featured-badge">Featured</div>
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title mb-2">{product.name}</h5>
                    <p className="card-text text-muted mb-3">{product.description}</p>
                    <p className="product-price mb-3">${product.price.toFixed(2)}</p>
                    
                    <div className="size-selector mb-3">
                      <label className="d-block mb-2">Select Size:</label>
                      <div className="btn-group size-buttons">
                        {product.availableSizes.map(size => (
                          <button
                            key={size}
                            type="button"
                            className={`btn btn-outline-secondary ${
                              selectedSizes[product.id] === size ? 'active' : ''
                            }`}
                            onClick={() => handleSizeSelect(product.id, size)}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>

                    <button
                      className={`btn btn-add w-100 ${addedToCart === product.id ? 'added' : ''}`}
                      onClick={() => handleAddToCart(product)}
                    >
                      {addedToCart === product.id ? 'Added! ✓' : 'Add to Cart'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-5">
            <Link to="/shop" className="btn btn-lg btn-outline-dark">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
