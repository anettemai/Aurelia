import { createContext, useState, useContext, useEffect } from 'react';

// Create an empty "container" that will hold and share the cart data
const CartContext = createContext();

// CartProvider is a wrapper component — it wraps the whole app
export function CartProvider({ children }) {

   // The actual cart items (array of products)
  const [cart, setCart] = useState([]);

  // How many items are in the cart (for the header icon)
  const [cartCount, setCartCount] = useState(0);

  // Function that calls the backend to get the current cart data, and updates the state
  const fetchCart = async () => {
    const res = await fetch('http://localhost:5001/api/cart', {
      credentials: 'include' 
    });
    const data = await res.json(); 
    setCart(data.cart);
    setCartCount(data.total_items); 
  };

  // When the CartProvider component is first loaded, fetch the cart data from the backend
  useEffect(() => {
      fetchCart();
    }, []);

    const addToCart = async (productId, size, quantity) => {
      
      const res = await fetch('http://localhost:5001/api/cart/add', {
      
        credentials: 'include',
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: productId,
          size: size,
          quantity: quantity
        })
      });
      const data = await res.json();

      if (res.ok) {
        fetchCart();
      }
    };

    const removeFromCart = async (productId, size) => {
      const res = await fetch('http://localhost:5001/api/cart/remove', {
        credentials: 'include',
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: productId,
          size: size
        })
      });
      const data = await res.json();

      if (res.ok) {
        fetchCart();
      }
    }

    const updateQuantity = async (productId, size, quantity) => {
      const res = await fetch('http://localhost:5001/api/cart/update', {
        credentials: 'include',
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          product_id: productId,
          size: size,
          quantity: quantity
        })
      });
      const data = await res.json();

      if (res.ok) {
        fetchCart();
      }
    };

    const clearCart = async () => {
      const res = await fetch('http://localhost:5001/api/cart/clear', {
        credentials: 'include',
        method: 'DELETE'
      });
      const data = await res.json();

      if (res.ok) {
        fetchCart();
      }
    };


  return (

    // Make cart and cartCount available to all components inside
    <CartContext.Provider value={{ cart, cartCount, addToCart, fetchCart, removeFromCart, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
    );
}


export function useCart() {
  return useContext(CartContext);
}