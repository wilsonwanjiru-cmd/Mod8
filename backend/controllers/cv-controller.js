const path = require('path');
const fs = require('fs');
const CV = require('../models/cv'); // Ensure you import the CV model

const downloadCV = async (req, res, next) => {
  const cvId = req.params.cvId; // Get the CV ID from the URL

  // Fetch the CV from the database asynchronously
  let cv;
  try {
    cv = await CV.findById(cvId);
  } catch (err) {
    const error = new HttpError('Could not retrieve CV from database.', 500);
    return next(error);
  }

  if (!cv) {
    const error = new HttpError('CV not found.', 404);
    return next(error);
  }

  // Construct the file path based on the uploaded file's location
  const cvFilePath = path.join(__dirname, '../public/uploads', cv.cvFilePath);

  // Check if the file exists
  fs.access(cvFilePath, fs.constants.F_OK, (err) => {
    if (err) {
      const error = new HttpError('CV file not found.', 404);
      return next(error);
    }

    // Set the header and trigger the file download
    res.download(cvFilePath);
  });
};

module.exports = { downloadCV };



