import styles from "../styles/register.css";
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignup = async () => {
    try {
      // Send signup request to the backend API
      const response = await axios.post('http://localhost:8080/register', {
        email,
        password,
      });

      if (response.status === 200) {
        // Reset form fields
        setEmail('');
        setPassword('');
        console.log('Signup successful');
        toast.success('Email sent successfully!');
      }
    } catch (error) {
      console.error('Error during signup:', error);
      toast.error('Error sending email. Please try again.');
    }
  };

  return (
    <div className="register-container">
      <h2>Signup</h2>
      <form>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="button" onClick={handleSignup}>
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;


