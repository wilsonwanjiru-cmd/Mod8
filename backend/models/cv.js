const mongoose = require('mongoose');

const cvSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Name of the user
  description: { type: String }, // Optional description or bio
  cvFilePath: { type: String, required: true }, // File path of the CV
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('CV', cvSchema);
