import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom';
import './style/App.css';
import Login from './Login';
import Register from './Register';
import Menu from './Menu';

function App() {
  const [isRegistering, setIsRegistering] = useState(false);

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/menu/:tableNumber" component={Menu} />
          <Route path="/">
            {isRegistering ? (
              <Register setIsRegistering={setIsRegistering} />
            ) : (
              <Login setIsRegistering={setIsRegistering} />
            )}
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;