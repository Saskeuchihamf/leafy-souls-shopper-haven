
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { products, users } = require('./data/seedData');
const Product = require('./models/Product');
const User = require('./models/User');
const Order = require('./models/Order');
const Cart = require('./models/Cart');

// Load environment variables
dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/leafy_souls')
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Import data
const importData = async () => {
  try {
    // Clear existing data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    
    // Seed users
    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;
    
    // Add admin user reference to products
    const sampleProducts = products.map(product => {
      return { ...product, user: adminUser };
    });
    
    // Seed products
    await Product.insertMany(sampleProducts);
    
    console.log('Data imported successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Destroy data
const destroyData = async () => {
  try {
    // Clear all data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();
    
    console.log('Data destroyed successfully');
    process.exit();
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Run import or destroy based on command flag
if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
