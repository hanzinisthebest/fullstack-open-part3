require('dotenv').config();
const mongoose = require('mongoose');

const connectToDatabase = () => {
  const url = process.env.MONGODB_URI;

  mongoose.set('strictQuery', false);
  mongoose.connect(url)
    .then(() => {
      console.log('Connected to MongoDB');
    })
    .catch(error => {
      console.error('Error connecting to MongoDB:', error.message);
    });
};

module.exports = connectToDatabase;
