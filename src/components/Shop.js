import React, { useState } from 'react';
import { useCart } from '../contexts/CartContext';
import './Shop.css';

const Shop = () => {
  const { addToCart } = useCart();
  const [selectedSizes, setSelectedSizes] = useState({});
  const [quantities, setQuantities] = useState({});
  const [addedToCart, setAddedToCart] = useState(null);

  const products = [
    {
      id: 1,
      name: 'Premium Cotton Black Tee',
      price: 29.99,
      image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=800&q=80',
      description: '100% Premium Cotton | Comfortable Fit',
      availableSizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 2,
      name: 'Urban Streetwear Hoodie',
      price: 59.99,
      image: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      description: 'Street Style | Fleece Interior',
      availableSizes: ['M', 'L', 'XL', 'XXL']
    },
    {
      id: 3,
      name: 'Classic Denim Jacket',
      price: 79.99,
      image: 'https://images.unsplash.com/photo-1576995853123-5a10305d93c0?auto=format&fit=crop&w=800&q=80',
      description: 'Vintage Wash | Multiple Pockets',
      availableSizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 4,
      name: 'Essential Sweatpants',
      price: 45.99,
      image: 'https://images.unsplash.com/photo-1581655353564-df123a1eb820?auto=format&fit=crop&w=800&q=80',
      description: 'Comfortable Fit | Side Pockets',
      availableSizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 5,
      name: 'Graphic Print T-Shirt',
      price: 34.99,
      image: 'https://images.unsplash.com/photo-1503342394128-c104d54dba01?auto=format&fit=crop&w=800&q=80',
      description: 'Original Design | Limited Edition',
      availableSizes: ['S', 'M', 'L', 'XL']
    },
    {
      id: 6,
      name: 'Cargo Pants',
      price: 64.99,
      image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?auto=format&fit=crop&w=800&q=80',
      description: 'Multiple Pockets | Durable Material',
      availableSizes: ['S', 'M', 'L', 'XL', 'XXL']
    }
  ];

  const handleSizeSelect = (productId, size) => {
    setSelectedSizes(prev => ({ ...prev, [productId]: size }));
    // Initialize quantity to 1 when size is selected
    if (!quantities[productId]) {
      setQuantities(prev => ({ ...prev, [productId]: 1 }));
    }
  };

  const handleQuantityChange = (productId, change) => {
    setQuantities(prev => ({
      ...prev,
      [productId]: Math.max(1, (prev[productId] || 1) + change)
    }));
  };

  const handleAddToCart = (product) => {
    const size = selectedSizes[product.id];
    const quantity = quantities[product.id] || 1;
    
    if (!size) {
      alert('Please select a size first');
      return;
    }

    addToCart(product, size, quantity);
    setAddedToCart(product.id);
    
    // Reset added to cart message after 2 seconds
    setTimeout(() => setAddedToCart(null), 2000);
  };

  return (
    <>
      <header className="bg-dark text-light text-center py-3">
        <h1>CORELINE</h1>
        <p>Where Style Meets Comfort</p>
      </header>

      <section className="shop-section">
        <div className="container">
          <h2 className="text-center mb-3">Our Collection</h2>
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card">
                <div className="card h-100">
                  <img src={product.image} className="card-img-top" alt={product.name} />
                  <div className="card-body">
                    <h5 className="card-title mb-2">{product.name}</h5>
                    <p className="card-text mb-2">{product.description}</p>
                    <p className="product-price mb-3">${product.price.toFixed(2)}</p>
                    
                    <div className="size-selector mb-3">
                      <label className="d-block mb-2">Size:</label>
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

                    <div className="quantity-selector mb-3">
                      <label className="d-block mb-2">Quantity:</label>
                      <div className="input-group">
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => handleQuantityChange(product.id, -1)}
                        >
                          -
                        </button>
                        <span className="form-control text-center">
                          {quantities[product.id] || 1}
                        </span>
                        <button
                          className="btn btn-outline-secondary"
                          type="button"
                          onClick={() => handleQuantityChange(product.id, 1)}
                        >
                          +
                        </button>
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
        </div>
      </section>
    </>
  );
};

export default Shop;
