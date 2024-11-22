import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';

interface RegisterProps {
  setIsRegistering: (isRegistering: boolean) => void;
}

const Register: React.FC<RegisterProps> = ({ setIsRegistering }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const history = useHistory();
  const location = useLocation();
  const tableNumber = new URLSearchParams(location.search).get('tableNumber');

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle registration logic here
    if (tableNumber) {
      history.push(`/menu/${tableNumber}`);
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      <form onSubmit={handleRegister}>
        <div>
          <label>First Name:</label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
            pattern="^[^\d]*$"
            title="First name should not contain numbers"
          />
        </div>
        <div>
          <label>Last Name:</label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
            pattern="^[^\d]*$"
            title="Last name should not contain numbers"
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            title="Please enter a valid email address"
          />
        </div>
        <div>
          <label>Phone:</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            pattern="^\d{10}$"
            title="Phone number should be exactly 10 digits"
          />
        </div>
        <button type="submit">Register</button>
      </form>
      <button onClick={() => setIsRegistering(false)}>Back to Login</button>
    </div>
  );
};

export default Register;