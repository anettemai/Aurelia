import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import CollectionPage from './pages/CollectionPage';
import ProductDetail from './pages/ProductDetail';
import { CartProvider } from './CartContext';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';

// The main App component that sets up the routing and layout of the application
function App() {
  return (
    <div className="App">
      <CartProvider>
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:category" element={<CollectionPage />} />
            <Route path="/:category/:collection" element={<CollectionPage />} />
            <Route path="/exclusive" element={<CollectionPage />} />
            <Route path="/product/:id" element={<ProductDetail/>} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-confirmation" element={<OrderConfirmation />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </CartProvider>
    </div>
  );
}

export default App;