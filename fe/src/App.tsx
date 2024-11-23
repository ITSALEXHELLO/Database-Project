import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Menu from './Menu';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login setIsAuthenticated={setIsAuthenticated} />
        </Route>
        <Route path="/register">
          <Register setIsAuthenticated={setIsAuthenticated} />
        </Route>
        <Route path="/menu/:tableNumber">
          {isAuthenticated ? <Menu /> : <Redirect to="/login" />}
        </Route>
        <Redirect from="/" to="/login" />
      </Switch>
    </Router>
  );
};

export default App;