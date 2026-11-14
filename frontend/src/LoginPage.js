import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import logo from './logo.png';

const LoginPage = () => {
  const [isSignUp, setIsSignUp] = useState(true);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const toggleMode = () => {
    setIsSignUp(!isSignUp);
    setError(''); // Clear error when toggling
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const endpoint = isSignUp ? '/api/auth/signup' : '/api/auth/login';
      const payload = isSignUp
        ? { name: formData.name, email: formData.email, password: formData.password }
        : { email: formData.email, password: formData.password };

      const response = await axios.post(`http://localhost:8080${endpoint}`, payload);

      if (!isSignUp) {
        // Store JWT token in localStorage for login
        localStorage.setItem('token', response.data.token);
        navigate('/dashboard'); // Redirect to dashboard
      } else {
        // For signup, switch to login mode or show success message
        setIsSignUp(false);
        setError('Account created! Please sign in.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="login-container">
      <div className="bg-decoration-red"></div>
      <div className="bg-decoration-yellow"></div>

      <div className="main-content">
        <div className="green-section">
          <div className="decoration-circle circle-1"></div>
          <div className="decoration-circle circle-2"></div>
          <div className="decoration-circle circle-3"></div>
          <div className="decoration-circle circle-4"></div>

          <div className="logo-green">
            <div className="logo-icon-green">
              <div className="logo-square"></div>
            </div>
            <span className="logo-text-green">XXXX</span>
          </div>

          <div className="green-content">
            <h1 className="green-title">
              {isSignUp ? 'Hello, Friend!' : 'Welcome Back!'}
            </h1>
            <p className="green-subtitle">
              {isSignUp
                ? 'Enter your personal details and start journey with us'
                : 'To keep connected with us please login with your personal info'}
            </p>
            <button onClick={toggleMode} className="toggle-button">
              {isSignUp ? 'SIGN IN' : 'SIGN UP'}
            </button>
          </div>
        </div>

        <div className="white-section">
          <div className="logo-white">
            <img src={logo} alt="Mon Logo" className="custom-logo" />
          </div>

          <div className="form-container">
            <h2 className="form-title">
              {isSignUp ? 'Create Account' : 'Sign in to Diprella'}
            </h2>

            {error && <p className="error-message">{error}</p>}

            <div className="social-buttons">
              <button className="social-btn">
                <span className="social-text">f</span>
              </button>
              <button className="social-btn">
                <span className="social-text">G+</span>
              </button>
              <button className="social-btn">
                <span className="social-text">in</span>
              </button>
            </div>

            <p className="form-subtitle">
              {isSignUp ? 'or use your email for registration:' : 'or use your email account:'}
            </p>

            <form className="form-fields" onSubmit={handleSubmit}>
              {isSignUp && (
                <div className="input-group">
                  <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="form-input"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                  <div className="input-icon">
                    <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                </div>
              )}

              <div className="input-group">
                <input
                  type="email"
                  name="email"
                  placeholder="Email"
                  className="form-input"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
                <div className="input-icon">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                </div>
              </div>

              <div className="input-group">
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="form-input"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <div className="input-icon">
                  <svg className="icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    />
                  </svg>
                </div>
              </div>

              {!isSignUp && (
                <div className="forgot-password">
                  <button type="button" className="forgot-link">
                    Forgot your password?
                  </button>
                </div>
              )}

              <button type="submit" className="submit-button">
                {isSignUp ? 'SIGN UP' : 'SIGN IN'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;