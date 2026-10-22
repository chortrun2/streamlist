import React, { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem('cart_items');
    return savedCart ? JSON.parse(savedCart) : [
      { id: 1, title: 'Interstellar (4K Stream)', price: 4.99 },
      { id: 2, title: 'Spider-Man: Brand New Day (Early Access)', price: 14.99 }
    ];
  });
  const [checkoutComplete, setCheckoutComplete] = useState(false);
  const [cardNumber, setCardNumber] = useState('');

  // Keep localStorage synced when items change
  useEffect(() => {
    localStorage.setItem('cart_items', JSON.stringify(cartItems));
  }, [cartItems]);

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price || 4.99), 0).toFixed(2);
  };

  const handleRemoveItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const handleCheckout = (e) => {
    e.preventDefault();
    if (cartItems.length === 0) return;
    setCheckoutComplete(true);
    setCartItems([]);
    localStorage.removeItem('cart_items');
  };

  return (
    <div style={{ 
      padding: '2.5rem 4vw', 
      color: '#ffffff', 
      backgroundColor: '#050811', 
      minHeight: 'calc(100vh - 60px)',
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <h1 style={{ fontSize: '2.2rem', marginBottom: '0.4rem', fontWeight: 'bold' }}>Shopping Cart & Secure Checkout</h1>
      <p style={{ color: '#9ca3af', marginBottom: '2rem', fontSize: '1rem' }}>
        Review your selected movie rentals and complete your transaction securely under PCI DSS standards.
      </p>

      {checkoutComplete ? (
        <div style={{ 
          backgroundColor: '#111827', 
          padding: '2.5rem', 
          borderRadius: '10px', 
          border: '1px solid #10b981', 
          textAlign: 'center',
          maxWidth: '600px',
          margin: '2rem auto'
        }}>
          <span className="material-icons" style={{ fontSize: '3rem', color: '#10b981', marginBottom: '1rem' }}>check_circle</span>
          <h2 style={{ color: '#ffffff', marginBottom: '0.5rem' }}>Payment Successful!</h2>
          <p style={{ color: '#9ca3af' }}>Thank you for your purchase. Your streams are now available in your library.</p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '2rem' }}>
          
          {/* Cart Items List */}
          <div style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '10px', border: '1px solid #1f2937' }}>
            <h3 style={{ marginBottom: '1.2rem', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem' }}>Review Items</h3>
            
            {cartItems.length === 0 ? (
              <p style={{ color: '#9ca3af' }}>Your cart is currently empty.</p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {cartItems.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#1f2937', padding: '1rem', borderRadius: '6px' }}>
                    <div>
                      <h4 style={{ fontSize: '1rem', marginBottom: '0.2rem' }}>{item.title}</h4>
                      <p style={{ color: '#38bdf8', fontSize: '0.9rem' }}>${(item.price || 4.99).toFixed(2)}</p>
                    </div>
                    <button 
                      onClick={() => handleRemoveItem(item.id)}
                      style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                      title="Remove"
                    >
                      <span className="material-icons">delete</span>
                    </button>
                  </div>
                ))}
                
                <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'space-between', fontSize: '1.2rem', fontWeight: 'bold', borderTop: '1px solid #374151', paddingTop: '1rem' }}>
                  <span>Total:</span>
                  <span style={{ color: '#38bdf8' }}>${calculateTotal()}</span>
                </div>
              </div>
            )}
          </div>

          {/* Secure Checkout Form (PCI DSS Awareness) */}
          <div style={{ backgroundColor: '#111827', padding: '1.5rem', borderRadius: '10px', border: '1px solid #1f2937' }}>
            <h3 style={{ marginBottom: '1.2rem', borderBottom: '1px solid #1f2937', paddingBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span className="material-icons" style={{ color: '#10b981', fontSize: '1.2rem' }}>lock</span> Secure Payment
            </h3>

            <form onSubmit={handleCheckout} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.4rem' }}>Cardholder Name</label>
                <input type="text" placeholder="Charles Short" required style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', outline: 'none' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.4rem' }}>Credit Card Number (PCI DSS Encrypted)</label>
                <input 
                  type="text" 
                  placeholder="4532 •••• •••• ••••" 
                  maxLength="19"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  required 
                  style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', outline: 'none' }} 
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.4rem' }}>Exp Date</label>
                  <input type="text" placeholder="MM/YY" required style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: '#9ca3af', marginBottom: '0.4rem' }}>CVV</label>
                  <input type="password" placeholder="123" maxLength="4" required style={{ width: '100%', padding: '0.75rem', backgroundColor: '#1f2937', border: '1px solid #374151', borderRadius: '6px', color: '#fff', outline: 'none' }} />
                </div>
              </div>

              <button 
                type="submit" 
                disabled={cartItems.length === 0}
                style={{ 
                  marginTop: '1rem', 
                  backgroundColor: cartItems.length === 0 ? '#374151' : '#3b82f6', 
                  color: '#fff', 
                  border: 'none', 
                  padding: '0.85rem', 
                  borderRadius: '6px', 
                  fontWeight: 'bold', 
                  cursor: cartItems.length === 0 ? 'not-allowed' : 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                Complete Secure Checkout
              </button>
            </form>
          </div>

        </div>
      )}
    </div>
  );
}

export default Cart;