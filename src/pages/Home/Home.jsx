import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import "./Homepage.scss";

const Home = () => {
  const navigate = useNavigate();
  const { authState, logoutHandler } = useAuth();
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const updateProgressBar = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = (scrollY / docHeight) * 100;
      setScrollProgress(scrollPercentage);
    };

    window.addEventListener("scroll", updateProgressBar);
    
    return () => window.removeEventListener("scroll", updateProgressBar);
  }, []);

  // Function to scroll to specific sections
  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleClick = () => {
    if (authState?.username) {
      navigate('/createRoom');
    } else {
      navigate('/Register');
    }
  };

  return (
    <div>
      {/* Progress Bar */}
      <div className="progress-bar" style={{ width: `${scrollProgress}%` }}></div>

      {/* Navigation */}
      <div id="page1" className="homepage">
        <nav className="nav-container">
          <div className="nav-left">
            <Link to="/" className="logo">Code Together</Link>
            <a onClick={() => scrollToSection("page1")}>Home</a>
            <a onClick={() => scrollToSection("page2")}>About</a>
            <a onClick={() => scrollToSection("page3")}>Services</a>
          </div>

          <div className="nav-right">
            {authState.username ? (
              <>
                <Link to="/CreateRoom">Create/Join Room</Link>
                <button onClick={logoutHandler} className="logout-btn">Logout</button>
              </>
            ) : (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">SignUp</Link>
              </>
            )}
          </div>
        </nav>

          {/* Main Content */}
          <div className="main-content" id="home">
            <div className="hero">
              <h1> Collaborative Coding, Seamlessly Shared </h1>
              <p>
                Unlock the power of real-time collaboration. Whether you're a
                developer, part of a team, or learning code, CodeTogether makes coding
                projects smoother and faster.
              </p>
              <br />
              <button className="btn" onClick={handleClick}>
                Start Coding Together
              </button>
            </div>
          </div>
      </div>

      {/* Other Sections */}
      <div id="page2">
        <section id="features" className="features">
        <h2>Core Features</h2>
        <div className="feature-list">
          <div className="feature">
            <i className="fa-solid fa-users"></i>
            <h3>Real-Time Collaboration</h3>
            <p>
              Collaborate on code simultaneously with your team. Live cursor
              tracking and color-coded user indicators make teamwork effortless.
            </p>
          </div>
          <div className="feature">
            <i className="fa-solid fa-laptop-code"></i>
            <h3>Multi-Language Support</h3>
            <p>
              Code in multiple languages, including JavaScript, Python, HTML, C++,
              and more. Enjoy intelligent code completion and real-time error
              detection.
            </p>
          </div>
          <div className="feature">
            <i className="fa-solid fa-folder-open"></i>
            <h3>Advanced Workspace Management</h3>
            <p>
              Effortlessly organize projects with a flexible folder structure.
              Drag-and-drop functionality and easy navigation streamline your
              workspace.
            </p>
          </div>
        </div>
      </section>
      <section id="how-it-works" className="how-it-works">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <span className="step-number">1</span>
            <h3>Create Workspace</h3>
            <p>Create a workspace and organize your project files.</p>
          </div>
          <div className="step-card">
            <span className="step-number">2</span>
            <h3>Invite Collaborators</h3>
            <p>Invite others to edit or view code in real time.</p>
          </div>
          <div className="step-card">
            <span className="step-number">3</span>
            <h3>Secure Sharing</h3>
            <p>Share your project with secure links and permission settings.</p>
          </div>
          <div className="step-card">
            <span className="step-number">4</span>
            <h3>Backup & Versioning</h3>
            <p>Download and back up work with version control and history.</p>
          </div>
        </div>
      </section>
      </div>

      <div id="page3">
        <section id="cta" className="cta">
          <div className="cta-inner">
            <h2>Ready to Code Together?</h2>
            <p>Join thousands of developers and teams revolutionizing their workflow with real-time collaborative coding.
            </p>
            <button onClick={() => window.location.href = "/Register"} className="cta-btn">         Get Started
            </button>
          </div>
        </section>

        <section id="target-audience" className="target-audience">
          <h2>Who Can Benefit?</h2>
          <div className="audience-grid">
            {[
              "Professional Developers",
              "Educational Institutions",
              "Remote Teams",
              "Coding Bootcamps",
              "Open-Source Contributors",
            ].map((audience, index) => (
              <div className="audience-card" key={index}>
                <i className="fa-solid fa-check-circle"></i>
                <p>{audience}</p>
              </div>         
            ))}
          </div>
        </section>

        <section id="testimonial" className="testimonial">
        <h2>Our users</h2>
          <div className="testimonial-card">
            <i className="fa-solid fa-quote-left quote-icon"></i>
            <blockquote> "CodeTogether has transformed our remote development process. Real-time editing and seamless collaboration are game-changers!"
            </blockquote>
            <p className="author">– Tarun, Developer</p>
          </div>
          <div className="testimonial-card">
            <i className="fa-solid fa-quote-left quote-icon"></i>
            <blockquote> "The collaborative features of CodeTogether have made it easier for our
        team to work together, no matter where we are. It's a must-have tool!"
            </blockquote>
            <p className="author">– Farhan, Developer</p>
          </div>
        </section>
        <footer className="footer">
        <p>© 2025 CodeTogether. All rights reserved.</p>
      </footer>
      </div>
    </div>
  );
};

export default Home;
