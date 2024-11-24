import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import './style/Register.css';

interface RegisterProps {
  setAuthenticatedEmail: (authenticatedEmail: string) => void;
}

const Register: React.FC<RegisterProps> = ({ setAuthenticatedEmail}) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const history = useHistory();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('/createCustomer', {
        first_name: firstName,
        last_name: lastName,
        phone_number: phone,
        email,
      });
      if (response.status === 201) {
          setAuthenticatedEmail(email);
          history.push('/menu');
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Registration error:', error);
      alert('Registration failed. Please try again.');
    }
  };

  return (
    <div className="register-wrapper">
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
        <button onClick={() => history.push('/login')}>Back to Login</button>
      </div>
    </div>
  );
};

export default Register;