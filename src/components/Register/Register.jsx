import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Register.scss';

const Register = () => {
  const { registerHandler, loading } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (credentials.password !== credentials.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const success = await registerHandler(credentials);
    if (success) {
      navigate('/createRoom');
    }
  };

  return (
    <div className="register-page">
      {/* Main Content */}
      <div className="register-container">
        <div className="register-box">
          {/* Code Snippet */}
          <div className="code-snippet">
            <pre className="code-text">
              #include &lt;bits/stdc++.h&gt; {"\n"}
              using namespace std; {"\n\n"}
              int main() {"{"} {"\n"}
              {"    "}cout &lt;&lt; "Welcome to CodeTogether" &lt;&lt; endl; {"\n"}
              {"    "}cout &lt;&lt; "Let's Build Something Amazing!" &lt;&lt; endl; {"\n"}
              {"    "}return 0; {"\n"}
              {"}"} {"\n\n"}
              {"{Your Coding Journey Starts Here 🚀}"} {"\n"}
              ----&gt;&gt;&gt;
            </pre>
          </div>

          {/* Register Form */}
          <div className="register-form">
            <h2 className="form-title">Create an Account</h2>
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  value={credentials.email}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </div>

              {/* Username */}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  name="username"
                  id="username"
                  placeholder="Username"
                  value={credentials.username}
                  onChange={handleChange}
                  required
                  autoComplete="username"
                />
              </div>

              {/* Password Input */}
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  value={credentials.password}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>

              {/* Confirm Password Input */}
              <div className="form-group">
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  id="confirmPassword"
                  placeholder="Confirm Password"
                  value={credentials.confirmPassword}
                  onChange={handleChange}
                  required
                  autoComplete="new-password"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="submit-btn"
                style={{ opacity: loading ? 0.5 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
              >
                {loading ? (
                  <div className="loaderwrap">
                    <div className="loader"></div>
                  </div>
                ) : "REGISTER"}
              </button>

              {/* Login Link */}
              <p className="login-text">
                Already have an account? <Link to="/login" className="login-link">Login here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="register-footer">
        <Link to="/" className="home-link">
          <i className="fas fa-home"></i> Go to Home Page
        </Link>
        <span className="footer-text">{'{Code Together}'}</span>
      </div>
    </div>
  );
};

export default Register;
