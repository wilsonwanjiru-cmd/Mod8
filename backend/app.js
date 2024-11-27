const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
require('dotenv').config();

const messageRoutes = require('./routes/message-routes');
const cvRoutes = require('./routes/cv-routes'); // Import CV routes
const HttpError = require('./models/http-error');

const app = express();

// Middleware
app.use(bodyParser.json());

// Routes
app.use('/api/messages', messageRoutes);
app.use('/api/cvs', cvRoutes); // Add CV routes

// Handle undefined routes
app.use((req, res, next) => {
  const error = new HttpError('Could not find this route.', 404);
  throw error;
});

// Error handling middleware
app.use((error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || 'An unknown error occurred!' });
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 6000, () => {
      console.log(`Server is running on port ${process.env.PORT || 6000}`);
    });
  })
  .catch((err) => {
    console.error('Database connection failed:', err);
  });
