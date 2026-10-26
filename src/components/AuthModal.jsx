import { useState } from "react";

function AuthModal({ isOpen, onClose, onLoginSuccess }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ text: "", type: "" });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Quick fill with requested credentials (pass: vartika123)
  const handleFillDemo = () => {
    setIsSignUp(false);
    setFormData({
      name: "Vartika",
      email: "vartika@example.com",
      password: "vartika123",
      phone: "9876543210"
    });
    setMessage({
      text: "Demo credentials filled! Click 'Sign In' to proceed.",
      type: "info"
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ text: "", type: "" });

    const endpoint = isSignUp ? "/signup" : "/login";

    try {
      const response = await fetch(`http://localhost:5000${endpoint}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Authentication failed");
      }

      setMessage({ text: data.message, type: "success" });

      if (data.user) {
        // Save user to localStorage
        localStorage.setItem("vartispace_user", JSON.stringify(data.user));
        
        setTimeout(() => {
          onLoginSuccess(data.user);
          onClose();
        }, 600);
      }
    } catch (err) {
      setMessage({ text: err.message || "Failed to connect to backend", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        {/* Modal Header */}
        <div className="modal-header">
          <div className="auth-icon-badge">🏠</div>
          <h2>{isSignUp ? "Create Your Account" : "Welcome Back"}</h2>
          <p>
            {isSignUp
              ? "Join VartiSpace to find and list student stays easily"
              : "Sign in to manage your bookings and property listings"}
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button
            type="button"
            className={`auth-tab ${!isSignUp ? "active" : ""}`}
            onClick={() => {
              setIsSignUp(false);
              setMessage({ text: "", type: "" });
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`auth-tab ${isSignUp ? "active" : ""}`}
            onClick={() => {
              setIsSignUp(true);
              setMessage({ text: "", type: "" });
            }}
          >
            Sign Up
          </button>
        </div>

        {/* One-click Demo Helper */}
        <div className="demo-credentials-banner">
          <div className="demo-info-text">
            <span>💡 <strong>Demo Account:</strong> vartika@example.com / <code>vartika123</code></span>
          </div>
          <button
            type="button"
            className="demo-fill-btn"
            onClick={handleFillDemo}
          >
            Auto-fill
          </button>
        </div>

        {/* Alert feedback */}
        {message.text && (
          <div className={`auth-alert ${message.type}`}>
            {message.text}
          </div>
        )}

        {/* Auth Form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="form-group">
              <label>Full Name</label>
              <input
                type="text"
                name="name"
                placeholder="e.g. Vartika Sharma"
                value={formData.name}
                onChange={handleChange}
                required={isSignUp}
              />
            </div>
          )}

          <div className="form-group">
            <label>{isSignUp ? "Email Address" : "Email or Username"}</label>
            <input
              type="text"
              name="email"
              placeholder={isSignUp ? "e.g. vartika@example.com" : "vartika@example.com or Vartika"}
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password (e.g. vartika123)"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          {isSignUp && (
            <div className="form-group">
              <label>Phone / WhatsApp Number (Optional)</label>
              <input
                type="tel"
                name="phone"
                placeholder="e.g. 9876543210"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
          )}

          <button
            type="submit"
            className="auth-submit-btn"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Create Free Account" : "Sign In to VartiSpace"}
          </button>
        </form>

        {/* Switch prompt */}
        <div className="auth-footer-text">
          {isSignUp ? (
            <p>
              Already have an account?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setIsSignUp(false);
                  setMessage({ text: "", type: "" });
                }}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account yet?{" "}
              <button
                type="button"
                className="link-btn"
                onClick={() => {
                  setIsSignUp(true);
                  setMessage({ text: "", type: "" });
                }}
              >
                Create Account
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default AuthModal;
