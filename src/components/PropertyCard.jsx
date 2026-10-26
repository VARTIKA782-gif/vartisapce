// Single Property Card Component
function PropertyCard({ property }) {
  // Prepares a WhatsApp link so the student can directly message the owner
  const whatsappUrl = `https://wa.me/91${property.phone}?text=Hello! I saw your property "${property.name}" on VartiSpace. Is it available?`;

  return (
    <div className="property-card">
      {/* Property Photo */}
      <div className="card-image-box">
        <img src={property.image} alt={property.name} />
        <span className="type-badge">{property.type}</span>
        {property.gender && (
          <span className={`gender-badge ${property.gender.toLowerCase().replace(/[^a-z]/g, "")}`}>
            {property.gender === "Boys" ? "👤 Boys" : property.gender === "Girls" ? "👩 Girls" : "👥 Co-ed"}
          </span>
        )}
      </div>

      {/* Property Details */}
      <div className="card-body">
        <h3>{property.name}</h3>
        <p className="card-location">📍 {property.location}</p>
        {property.sharing && (
          <p className="card-sharing">🛏️ {property.sharing}</p>
        )}
        <p className="card-food">🍽️ {property.food}</p>

        <div className="card-footer">
          <div className="price-tag">
            <strong>₹{property.price.toLocaleString("en-IN")}</strong>
            <span> / month</span>
          </div>

          {/* Contact Owner Link */}
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noreferrer"
            className="contact-btn"
          >
            Contact Owner
          </a>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
