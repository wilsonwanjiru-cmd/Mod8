// Wait for the DOM to be ready
document.addEventListener('DOMContentLoaded', function () {
    const contactForm = document.getElementById('contact-form');
    const thankYouMessage = document.getElementById('thank-you');
  
    // Event listener for form submission
    contactForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const formData = new FormData(contactForm);
  
      // Send a POST request to the server
      fetch('/contact', {
        method: 'POST',
        body: formData,
      })
        .then((response) => response.text())
        .then((data) => {
          // Hide the contact form and show the "Thank You" message
          contactForm.style.display = 'none';
          thankYouMessage.style.display = 'block';
        })
        .catch((error) => {
          console.error('Error:', error);
          // Handle error if needed
        });
    });
  });
  