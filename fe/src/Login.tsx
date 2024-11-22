import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

interface LoginProps {
  setIsRegistering: (isRegistering: boolean) => void;
}

const Login: React.FC<LoginProps> = ({ setIsRegistering }) => {
  const [email, setEmail] = useState('');
  const history = useHistory();
  const location = useLocation();
  const tableNumber = new URLSearchParams(location.search).get('tableNumber');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    if (tableNumber) {
      history.push(`/menu/${tableNumber}`);
    }
  };

  return (
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
      <button onClick={() => setIsRegistering(true)}>Register</button>
    </div>
  );
};

export default Login;