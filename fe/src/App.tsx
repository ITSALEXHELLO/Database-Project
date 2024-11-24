import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Menu from './Menu';
import Cart from './Cart';
import { CartProvider } from './CartContext';

const App: React.FC = () => {
  const [isAuthenticated, setAuthenticatedEmail] = useState('');
  const [tableNumber, setTableNumber] = useState(0);

  return (
    <Router>
      <CartProvider>
        <Switch>
          <Route path="/login">
            <Login setAuthenticatedEmail={setAuthenticatedEmail} setTableNumber={setTableNumber} />
          </Route>
          <Route path="/register">
            <Register setAuthenticatedEmail={setAuthenticatedEmail} />
          </Route>
          <Route path="/menu">
            {isAuthenticated ? <Menu/> : <Redirect to="/login" />}
          </Route>
          <Route path="/cart">
            {isAuthenticated ? <Cart /> : <Redirect to="/login" />}
          </Route>
          <Redirect from="/" to="/login" />
        </Switch>
      </CartProvider>
    </Router>
  );
};

export default App;