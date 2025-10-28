import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';

const Cart = () => {
  const { cart, removeFromCart, getCartTotal, updateQuantity } = useCart();

  return (
    <>
      <video autoPlay muted loop id="bg-video">
        <source src="/Aug_22__1639_15s_202508221701_ah42s.mp4" type="video/mp4" />
      </video>

      <section className="overlay container py-5">
        <h2>Your Cart</h2>
        {cart.length === 0 ? (
          <div className="text-center">
            <p>Your cart is empty</p>
            <Link to="/shop" className="btn btn-primary">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <table className="table table-dark table-striped">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item, index) => (
                  <tr key={index}>
                    <td>
                      <div className="d-flex align-items-center">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '50px', height: '50px', objectFit: 'cover', marginRight: '1rem' }}
                        />
                        <div>
                          <div>{item.name}</div>
                          <small className="text-muted">Size: {item.size}</small>
                        </div>
                      </div>
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="input-group input-group-sm" style={{ width: '120px' }}>
                          <button
                            className="btn btn-outline-light"
                            onClick={() => updateQuantity(index, item.quantity - 1)}
                          >
                            -
                          </button>
                          <span className="form-control text-center bg-dark text-light">
                            {item.quantity}
                          </span>
                          <button
                            className="btn btn-outline-light"
                            onClick={() => updateQuantity(index, item.quantity + 1)}
                          >
                            +
                          </button>
                        </div>
                        <button
                          className="btn btn-outline-danger btn-sm ms-2"
                          onClick={() => removeFromCart(index)}
                        >
                          ×
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="cart-actions">
              <h4 className="mb-0">Total: ₹{getCartTotal()}</h4>
              <div>
                <Link to="/shop" className="btn btn-outline-light me-2">
                  Continue Shopping
                </Link>
                <Link to="/checkout" className="btn btn-success">
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </>
        )}
      </section>
    </>
  );
};

export default Cart;
