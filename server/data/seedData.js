
const products = [
  {
    name: "EcoTrek Hiking Boot",
    description: "Sustainable hiking boots made from recycled materials. Durable, waterproof, and designed for all-day comfort on challenging trails.",
    price: 149.99,
    images: [
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
      "https://images.unsplash.com/photo-1549298916-b41d501d3772",
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77"
    ],
    category: "hiking",
    size: ["7", "8", "9", "10", "11", "12"],
    color: "Brown",
    isFeatured: true,
    isNew: false,
    isEco: true,
    features: [
      "Made from recycled plastic bottles",
      "Natural rubber soles",
      "Water-resistant coating",
      "Breathable membrane",
      "Shock-absorbing insoles"
    ],
    stock: 45
  },
  {
    name: "UrbanLeaf Slip-On",
    description: "Casual slip-on shoes crafted from plant-based materials. Perfect for everyday wear with a minimal environmental footprint.",
    price: 89.99,
    images: [
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77",
      "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
      "https://images.unsplash.com/photo-1491553895911-0055eca6402d"
    ],
    category: "casual",
    size: ["6", "7", "8", "9", "10", "11", "12"],
    color: "Navy",
    isFeatured: true,
    isNew: true,
    isEco: true,
    features: [
      "Corn-based foam cushioning",
      "Organic cotton lining",
      "Hemp canvas upper",
      "Carbon-neutral manufacturing",
      "Biodegradable materials"
    ],
    stock: 78
  },
  // Add more products to seed the database
];

const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: "123456",
    isAdmin: true
  },
  {
    name: "John Doe",
    email: "john@example.com",
    password: "123456",
    isAdmin: false
  },
  {
    name: "Jane Smith",
    email: "jane@example.com",
    password: "123456",
    isAdmin: false
  }
];

module.exports = { products, users };
