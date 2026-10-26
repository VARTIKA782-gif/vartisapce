import { useState } from "react";

// Form Component to add a new property to the backend
function AddProperty({ onPropertyAdded, currentUser, onOpenAuth }) {
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    type: "PG",
    gender: "Boys",
    city: "Jaipur",
    location: "",
    price: "",
    sharing: "Double Sharing",
    food: "Food Included",
    phone: currentUser?.phone || ""
  });

  const [message, setMessage] = useState("");

  // Handle Input Changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Submit Form to Backend (POST API)
  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      ...formData,
      ownerName: currentUser?.name || "Verified Host",
      ownerEmail: currentUser?.email || ""
    };

    // Call Backend API
    fetch("http://localhost:5000/properties", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(payload)
    })
      .then((response) => response.json())
      .then((data) => {
        // Show success message
        setMessage("Property added successfully!");

        // Update list in parent App.jsx
        if (data.property) {
          onPropertyAdded(data.property);
        }

        // Reset form inputs
        setFormData({
          name: "",
          type: "PG",
          gender: "Boys",
          city: "Jaipur",
          location: "",
          price: "",
          sharing: "Double Sharing",
          food: "Food Included",
          phone: currentUser?.phone || ""
        });

        // Hide message after 3 seconds
        setTimeout(() => setMessage(""), 3000);
      })
      .catch((error) => {
        console.error("Error adding property:", error);
        setMessage("Error connecting to backend server.");
      });
  };

  return (
    <section id="add-property" className="add-property-section">
      <div className="form-container">
        <h2>List Your Property</h2>
        <p>Are you a PG owner or warden? Add your stay for free.</p>

        {currentUser ? (
          <div className="form-user-status">
            ✅ Listing as <strong>{currentUser.name}</strong> ({currentUser.email})
          </div>
        ) : (
          <div className="form-guest-hint">
            💡 <span>Have an account?</span>
            <button type="button" onClick={onOpenAuth} className="inline-link-btn">
              Sign In with vartika123
            </button>
            <span>to manage your properties!</span>
          </div>
        )}

        {message && <div className="alert-message">{message}</div>}

        <form onSubmit={handleSubmit} className="simple-form">
          <div className="form-group">
            <label>Property Name:</label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Royal PG for Students"
              value={formData.name}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Property Type:</label>
              <select name="type" value={formData.type} onChange={handleChange}>
                <option value="PG">PG</option>
                <option value="Hostel">Hostel</option>
                <option value="Flat">Flat</option>
              </select>
            </div>

            <div className="form-group">
              <label>City:</label>
              <select name="city" value={formData.city} onChange={handleChange}>
                <option value="Jaipur">Jaipur</option>
                <option value="Delhi">Delhi</option>
                <option value="Kota">Kota</option>
                <option value="Noida">Noida</option>
                <option value="Pune">Pune</option>
                <option value="Bengaluru">Bengaluru</option>
              </select>
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Allowed For (Gender):</label>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="Boys">Boys Only</option>
                <option value="Girls">Girls Only</option>
                <option value="Co-ed / Any">Co-ed / Any</option>
              </select>
            </div>

            <div className="form-group">
              <label>Room Sharing:</label>
              <select name="sharing" value={formData.sharing} onChange={handleChange}>
                <option value="Single Room">Single Room</option>
                <option value="Double Sharing">Double Sharing</option>
                <option value="Triple Sharing">Triple Sharing</option>
                <option value="4+ Sharing">4+ Sharing</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Full Address / Location:</label>
            <input
              type="text"
              name="location"
              required
              placeholder="e.g. Near MNIT, Malviya Nagar"
              value={formData.location}
              onChange={handleChange}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Monthly Rent (₹):</label>
              <input
                type="number"
                name="price"
                required
                placeholder="e.g. 7500"
                value={formData.price}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>Food Facility:</label>
              <select name="food" value={formData.food} onChange={handleChange}>
                <option value="Food Included">Food Included</option>
                <option value="Self Cooking">Self Cooking</option>
                <option value="No Food">No Food</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label>Contact Phone (WhatsApp):</label>
            <input
              type="tel"
              name="phone"
              required
              placeholder="e.g. 9876543210"
              value={formData.phone}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="submit-btn">
            + Add Property
          </button>
        </form>
      </div>
    </section>
  );
}

export default AddProperty;
