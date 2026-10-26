// ==========================================
// Simple Hero Section with Search & Filter
// ==========================================

function Hero({ searchText, setSearchText, selectedType, setSelectedType }) {
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Find Your Home Outside Your Home</h1>
        <p>Simple and affordable PGs, Hostels, and Flats for outstation students.</p>

        {/* Search & Filter Box */}
        <div className="search-bar">
          {/* 1. Search by City or Name */}
          <input
            type="text"
            placeholder="Search by city (e.g. Jaipur, Delhi)..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />

          {/* 2. Filter by Property Type */}
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="All">All Types</option>
            <option value="PG">PG</option>
            <option value="Hostel">Hostel</option>
            <option value="Flat">Flat</option>
          </select>
        </div>
      </div>
    </section>
  );
}

export default Hero;
