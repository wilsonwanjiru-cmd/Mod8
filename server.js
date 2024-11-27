const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config(); // Load environment variables from .env file

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS for frontend-backend communication

// MongoDB connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://Wilson:OgKidvE6fCcjclL7@cluster0.ylywf.mongodb.net/portfolio?retryWrites=true&w=majority'; // Add your MongoDB URI to a .env file
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB successfully'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

// Message schema and model
const messageSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  subject: { type: String, required: true },
  message: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Message = mongoose.model('Message', messageSchema);

// Serve static files (HTML, CSS, client.js)
app.use(express.static(__dirname + '/public'));

// Endpoint to handle the contact form submission
app.post('/contact', async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    // Save the message to the database
    const newMessage = new Message({ name, email, subject, message });
    await newMessage.save();

    res.status(200).json({ message: 'Form submission received successfully!' });
  } catch (error) {
    console.error('Error saving message:', error);
    res.status(500).json({ error: 'An error occurred while submitting the form.' });
  }
});

// Additional API endpoint: http://localhost:6000/api/messages
app.get('/api/messages', async (req, res) => {
  try {
    const messages = await Message.find();
    res.status(200).json(messages);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'An error occurred while fetching messages.' });
  }
});

// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

  