
const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

// In-memory users database with pre-configured default credentials
let users = [
  {
    id: 1,
    name: "Vartika",
    email: "vartika@example.com",
    password: "vartika123",
    phone: "9876543210"
  }
];

// In-memory property database
let propertiesList = [
  {
    id: 1,
    name: "Sunshine Luxury PG",
    type: "PG",
    gender: "Boys",
    location: "Malviya Nagar, Jaipur",
    city: "Jaipur",
    price: 8500,
    deposit: 8500,
    furnishing: "Fully Furnished",
    sharing: "Double Sharing",
    food: "3 Meals Included (North & South Indian)",
    rating: 4.8,
    reviewsCount: 34,
    verified: true,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    amenities: ["High-speed WiFi", "Air Conditioned", "RO Water", "Housekeeping", "Power Backup", "CCTV Security"],
    rules: "Curfew: 10:30 PM, No smoking inside rooms, Quiet hours after 11 PM",
    distance: "600m from MNIT & World Trade Park",
    ownerName: "Rajesh Sharma",
    phone: "+91 98765 43210"
  },
  {
    id: 2,
    name: "Grace Girls Residency & Hostel",
    type: "Hostel",
    gender: "Girls",
    location: "North Campus, Delhi",
    city: "Delhi",
    price: 9200,
    deposit: 9200,
    furnishing: "Fully Furnished",
    sharing: "Triple & Double Sharing",
    food: "Homely Veg Meals Included",
    rating: 4.9,
    reviewsCount: 52,
    verified: true,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=800&q=80",
    amenities: ["Biometric Security", "Attached Washroom", "High-speed WiFi", "AC & Geyser", "Study Desks", "Laundry"],
    rules: "Curfew: 9:30 PM, Female visitors only, Guardian verification required",
    distance: "300m from Delhi University Vishwavidyalaya Metro",
    ownerName: "Sunita Verma",
    phone: "+91 98123 45678"
  },
  {
    id: 3,
    name: "Green Valley 2BHK Shared Flat",
    type: "Flat",
    gender: "Co-ed / Any",
    location: "Sector 62, Noida",
    city: "Noida",
    price: 13500,
    deposit: 15000,
    furnishing: "Fully Furnished",
    sharing: "Single Private Room in 2BHK",
    food: "Modular Kitchen Available (Self-cook / Cook on hire)",
    rating: 4.7,
    reviewsCount: 19,
    verified: true,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80",
    amenities: ["Modular Kitchen", "Balcony", "Gated Society", "Clubhouse & Gym", "High-speed WiFi", "Lift & Parking"],
    rules: "No loud music after 11 PM, Friendly pet allowed with prior consent",
    distance: "10 mins from Sector 62 Metro & IT Parks",
    ownerName: "Anil Goel",
    phone: "+91 99887 76655"
  },
  {
    id: 4,
    name: "Zenith Student Co-living Hub",
    type: "PG",
    gender: "Boys",
    location: "Koramangala, Bengaluru",
    city: "Bengaluru",
    verified: true,
    image: "https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?auto=format&fit=crop&w=800&q=80",
    amenities: ["Co-working Space", "High-speed WiFi", "Gaming Zone", "Housekeeping", "Biometric Access"],
    rules: "No curfew, Self-check-in available, Respect community spaces",
    distance: "Walking distance to Sony World Signal & tech hubs",
    ownerName: "Karthik Nair",
    phone: "+91 97401 23456"
  },
  {
    id: 5,
    name: "Scholar's Haven Hostel",
    type: "Hostel",
    gender: "Boys",
    location: "Indra Vihar, Kota",
    city: "Kota",
    price: 7500,
    deposit: 7500,
    furnishing: "Fully Furnished",
    sharing: "Single Room for Study",
    food: "Nutritious 4-time Mess Food Included",
    rating: 4.6,
    reviewsCount: 68,
    verified: true,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80",
    amenities: ["Soundproof Study Room", "Doctor on Call", "Daily Cleaning", "AC & Air Cooler", "24/7 Library"],
    rules: "Curfew: 9:00 PM strictly, No mobile distraction zones during study hours",
    distance: "200m from Allen Samarth & Resonance",
    ownerName: "Mahesh Choudhary",
    phone: "+91 94140 11223"
  },
  {
    id: 6,
    name: "Urban Nest 1BHK / Studio Flat",
    type: "Flat",
    gender: "Co-ed / Any",
    location: "Viman Nagar, Pune",
    city: "Pune",
    price: 14000,
    deposit: 20000,
    furnishing: "Semi Furnished",
    sharing: "Entire Studio",
    food: "Equipped Kitchenette",
    rating: 4.7,
    reviewsCount: 23,
    verified: true,
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=800&q=80",
    amenities: ["Private Balcony", "Power Backup", "Covered Bike Parking", "24/7 Water", "Security Guard"],
    rules: "Ideal for college students and young professionals",
    distance: "1.2 km from Symbiosis Campus",
    ownerName: "Pooja Kulkarni",
    phone: "+91 98230 99887"
  }
];

// HOME ROUTE
app.get("/", (req, res) => {
  res.send("VartiSpace Backend is Running!");
});

// GET: Display all properties
app.get("/properties", (req, res) => {
  const { city, type, gender, maxPrice, search } = req.query;
  let filtered = [...propertiesList];

  if (city && city !== "All") {
    filtered = filtered.filter(p => p.city.toLowerCase() === city.toLowerCase());
  }
  if (type && type !== "All") {
    filtered = filtered.filter(p => p.type.toLowerCase() === type.toLowerCase());
  }
  if (gender && gender !== "All") {
    filtered = filtered.filter(p => p.gender.toLowerCase() === gender.toLowerCase() || p.gender === "Co-ed / Any");
  }
  if (maxPrice) {
    filtered = filtered.filter(p => p.price <= Number(maxPrice));
  }
  if (search) {
    const s = search.toLowerCase();
    filtered = filtered.filter(p => 
      p.name.toLowerCase().includes(s) || 
      p.location.toLowerCase().includes(s) || 
      p.city.toLowerCase().includes(s)
    );
  }

  res.json(filtered);
});

// POST: Receive a new property
app.post("/properties", (req, res) => {
  const property = {
    id: Date.now(),
    rating: 5.0,
    reviewsCount: 1,
    verified: false,
    gender: req.body.gender || "Boys",
    sharing: req.body.sharing || "Double Sharing",
    image: req.body.image || "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=800&q=80",
    amenities: req.body.amenities || ["WiFi", "Water Purifier"],
    ...req.body
  };

  propertiesList.unshift(property);
  console.log("Property listed successfully:", property.name);

  res.status(201).json({
    message: "Property listed successfully on VartiSpace!",
    property: property
  });
});

// AUTH: Sign Up route
app.post("/signup", (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required." });
  }

  const normalizedEmail = email.trim().toLowerCase();
  const existingUser = users.find((u) => u.email.toLowerCase() === normalizedEmail);

  if (existingUser) {
    return res.status(400).json({ message: "An account with this email already exists." });
  }

  const newUser = {
    id: Date.now(),
    name: name ? name.trim() : "Student",
    email: normalizedEmail,
    password: password,
    phone: phone ? phone.trim() : ""
  };

  users.push(newUser);
  console.log("New user registered:", newUser.email);

  res.status(201).json({
    message: "Account created successfully! Welcome to VartiSpace.",
    user: {
      id: newUser.id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone
    }
  });
});

// AUTH: Login route (Supports login via email or username, default pass: vartika123)
app.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Please enter your email and password." });
  }

  const query = email.trim().toLowerCase();
  const user = users.find(
    (u) =>
      (u.email.toLowerCase() === query || u.name.toLowerCase() === query) &&
      u.password === password
  );

  if (!user) {
    return res.status(401).json({
      message: "Invalid credentials. Try email 'vartika@example.com' with password 'vartika123'."
    });
  }

  console.log("User logged in successfully:", user.name);
  res.json({
    message: "Logged in successfully!",
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone
    }
  });
});

// PUT: Receive a property update request
app.put("/properties/:name", (req, res) => {
  const propertyName = req.params.name;
  const updatedPrice = req.body.price;

  res.json({
    message: "Property update request received",
    name: propertyName,
    newPrice: updatedPrice
  });
});

// DELETE: Receive a property delete request
console.log("DELETE route is being registered");

app.delete("/properties/:name", (req, res) => {
  const propertyName = req.params.name;

  console.log("DELETE route reached:", propertyName);

  res.json({
    message: "Property delete request received",
    name: propertyName
  });
});
app.use((req, res) => {
  console.log("Unmatched request:", req.method, req.url);
  res.status(404).send("Route not found");
});
// START SERVER
app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
