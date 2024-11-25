import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Menu from './Menu';
import Cart from './Cart';
import { CartProvider } from './CartContext';

export const baseURL='http://127.0.0.1:5000';

const App: React.FC = () => {
  const [isAuthenticated, setAuthenticatedEmail] = useState('');
  const [tableNumber, setTableNumber] = useState(0);

  return (
    <Router>
      <CartProvider>
        <Routes>
          <Route path="/login" element={<Login setAuthenticatedEmail={setAuthenticatedEmail} setTableNumber={setTableNumber} />} />
          <Route path="/register" element={<Register setAuthenticatedEmail={setAuthenticatedEmail} />} />
          <Route path="/menu" element={isAuthenticated ? <Menu /> : <Navigate to="/login" />} />
          <Route path="/cart" element={isAuthenticated ? <Cart tableNumber={tableNumber} /> : <Navigate to="/login" />} />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </CartProvider>
    </Router>
  );
};

export default App;
