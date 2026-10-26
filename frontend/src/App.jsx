import { useState, useEffect } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import PropertyCard from "./components/PropertyCard";
import AddProperty from "./components/AddProperty";
import AuthModal from "./components/AuthModal";
import Footer from "./components/Footer";
import "./App.css";

function App() {
  // 1. State for holding the list of properties
  const [properties, setProperties] = useState([]);

  // 2. State for search keyword and category filter
  const [searchText, setSearchText] = useState("");
  const [selectedType, setSelectedType] = useState("All");

  // 3. State for loading indicator
  const [loading, setLoading] = useState(true);

  // 4. State for current logged-in user and auth modal
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const savedUser = localStorage.getItem("vartispace_user");
      return savedUser ? JSON.parse(savedUser) : null;
    } catch {
      return null;
    }
  });
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // 4. Fetch properties from Backend API when page loads
  useEffect(() => {
    fetch("http://localhost:5000/properties")
      .then((response) => response.json())
      .then((data) => {
        setProperties(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch properties:", error);
        setLoading(false);
      });
  }, []);

  // 5. Authentication Handlers
  const handleLoginSuccess = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    localStorage.removeItem("vartispace_user");
    setCurrentUser(null);
  };

  // 6. Function to add newly created property into the state
  const handlePropertyAdded = (newProperty) => {
    setProperties([newProperty, ...properties]);
  };

  // 7. Filter properties based on search input and selected type
  const filteredProperties = properties.filter((property) => {
    // Check if property matches the selected type (PG, Hostel, Flat)
    const matchesType =
      selectedType === "All" || property.type.toLowerCase() === selectedType.toLowerCase();

    // Check if property matches the city or location text search
    const matchesSearch =
      property.city.toLowerCase().includes(searchText.toLowerCase()) ||
      property.location.toLowerCase().includes(searchText.toLowerCase()) ||
      property.name.toLowerCase().includes(searchText.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div className="app">
      {/* 1. Header Navigation Bar */}
      <Navbar
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
      />

      {/* 2. Hero Section with Search Input */}
      <Hero
        searchText={searchText}
        setSearchText={setSearchText}
        selectedType={selectedType}
        setSelectedType={setSelectedType}
      />

      {/* 3. Property List Section */}
      <section id="properties" className="properties-section">
        <div className="section-title">
          <h2>Available Accommodations ({filteredProperties.length})</h2>
          <p>Browse verified PGs, hostels and flats.</p>
        </div>

        {/* Loading state */}
        {loading && <p className="loading-text">Loading properties from server...</p>}

        {/* No properties found */}
        {!loading && filteredProperties.length === 0 && (
          <p className="no-data-text">No properties found matching your search.</p>
        )}

        {/* Grid of Property Cards */}
        <div className="properties-grid">
          {filteredProperties.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      </section>

      {/* 4. Form to Add a New Property */}
      <AddProperty
        onPropertyAdded={handlePropertyAdded}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
      />

      {/* 5. Footer */}
      <Footer />

      {/* 6. Sign In / Sign Up Modal */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
      />
    </div>
  );
}

export default App;
