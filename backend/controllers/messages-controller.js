const Message = require('../models/message');
const HttpError = require('../models/http-error');

// Create a new message
const createMessage = async (req, res, next) => {
  const { name, email, subject, message } = req.body;

  const newMessage = new Message({
    name,
    email,
    subject,
    message,
  });

  try {
    await newMessage.save();
    res.status(201).json({ message: "Message sent successfully!", data: newMessage });
  } catch (err) {
    const error = new HttpError('Saving message failed, please try again.', 500);
    return next(error);
  }
};

// Export the controller
module.exports = { createMessage };
