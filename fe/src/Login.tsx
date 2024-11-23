import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import './style/Login.css'; // Ensure you have the correct path to your CSS file

interface LoginProps {
  setIsAuthenticated: (isAuthenticated: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsAuthenticated }) => {
  const [email, setEmail] = useState('');
  const history = useHistory();
  const location = useLocation();
  const tableNumber = new URLSearchParams(location.search).get('tableNumber');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.get('/login', {
        params: { email },
      });
      if (response.status === 201) {
        setIsAuthenticated(true);
        if (tableNumber) {
          history.push(`/menu/${tableNumber}`);
        }
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please try again.');
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Login</button>
        </form>
        <button onClick={() => history.push('/register')}>Register</button>
      </div>
    </div>
  );
};

export default Login;