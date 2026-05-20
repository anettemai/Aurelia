import React from 'react';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import CollectionPage from './pages/CollectionPage';
import ProductDetail from './pages/ProductDetail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:category" element={<CollectionPage />} />
          <Route path="/:category/:collection" element={<CollectionPage />} />
          <Route path="/exclusive" element={<CollectionPage />} />
          <Route path="/product/:id" element={<ProductDetail/>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;