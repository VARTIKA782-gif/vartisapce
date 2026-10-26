// ==========================================
// Simple Navbar Component
// ==========================================

function Navbar({ currentUser, onOpenAuth, onLogout }) {
  return (
    <nav className="navbar">
      {/* Brand Logo */}
      <div className="logo">
        <a href="#" className="brand-link">
          <h2>🏠 VartiSpace</h2>
        </a>
      </div>

      {/* Navigation Links & Auth Actions */}
      <div className="nav-links">
        <a href="#properties">Find Stays</a>
        <a href="#add-property" className="nav-btn">+ Add Property</a>

        {currentUser ? (
          <div className="nav-user-profile">
            <span className="user-avatar-badge" title={currentUser.email}>
              👤 {currentUser.name}
            </span>
            <button
              onClick={onLogout}
              className="nav-logout-btn"
              title="Sign out of your account"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="nav-auth-btn"
          >
            🔑 Sign In / Sign Up
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;