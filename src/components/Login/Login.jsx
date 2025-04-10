import React, { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import './Login.scss';

const Login = () => {
  const { loginHandler, loading } = useContext(AuthContext);
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await loginHandler(credentials);
    if (success) {
      navigate('/createRoom');
    }
  };

  return (
    <div className="login-page">
      {/* Main Content */}
      <div className="login-container">
        <div className="login-box">
          {/* Code Snippet */}
          <div className="code-snippet">
            <pre className="code-text">
              #include &lt;bits/stdc++.h&gt; {"\n"}
              using namespace std; {"\n\n"}
              int main() {"{"} {"\n"}
              {"    "}cout &lt;&lt; "Hello Again" &lt;&lt; endl; {"\n"}
              {"    "}cout &lt;&lt; "Welcome Back to CodeTogether!" &lt;&lt; endl; {"\n"}
              {"    "}return 0; {"\n"}
              {"}"} {"\n\n"}
              {"{Login and Continue Building 🚀}"} {"\n"}
              ----&gt;&gt;&gt;
            </pre>
          </div>

          {/* Login Form */}
          <div className="login-form">
            <h2 className="form-title">Login</h2>
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="form-group">
                <label htmlFor="username">Email</label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
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
                  autoComplete="current-password"
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
                ) : "LOGIN"}
              </button>

              {/* Register Link */}
              <p className="register-text">
                Don’t have an account? <Link to="/register" className="register-link">Register here</Link>
              </p>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="login-footer">
        <Link to="/" className="home-link">
          <i className="fas fa-home"></i> Go to Home Page
        </Link>
        <span className="footer-text">{'{Code Together}'}</span>
      </div>
    </div>
  );
};

export default Login;
