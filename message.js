// message.js
let { emailMessage } = require('./javascript'); // Ensure emailMessage is correctly exported from javascript.js

// Export as an object
module.exports = { alertMessage: emailMessage }; // This exports the current value of emailMessage
