import React, { useState, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import axios from 'axios';
import './style/Login.css';

interface LoginProps {
  setAuthenticatedEmail: (authenticatedEmail: string) => void;
  setTableNumber: (tableNumber: number) => void;
}

const Login: React.FC<LoginProps> = ({ setAuthenticatedEmail, setTableNumber }) => {
  const [email, setEmail] = useState('');
  const history = useHistory();
  const location = useLocation();

  useEffect(() => {
    const tableNumber = new URLSearchParams(location.search).get('tableNumber');
    if (tableNumber) {
      setTableNumber(Number(tableNumber));
      history.replace('/login');
    }
    else{
      setTableNumber(0)
    }
  }, [location.search, setTableNumber, history]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // const response = await axios.get('/login', {
      //   params: { email },
      // });
      // if (response.status === 201) {
          setAuthenticatedEmail(email);
          history.push('/menu');
      // } else {
      //   alert(response.data.message);
      // }
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