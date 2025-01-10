const mongoose = require('mongoose');
require('dotenv').config();

// MongoDB connection URL defined inside .env file. 
const dbURL = process.env.MONGODB_URI;

mongoose.connect(dbURL)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log('MongoDB connection error:', err));

module.exports = mongoose.connection;