const Validator = require('validator');
const validText = require('./validText');

module.exports = function validateTweetInput(data) {
  let errors = {};

  data.text = validText(data.text) ? data.text : '';

  if (!Validator.isLength(data.text)) {
    errors.text = 'Tweet must be between 5 and 140 characters';
  }

  if (Validator.isEmpty(data.text)) {
    errors.text === 'Text field is required';
  }

  return {
    errors,
    isValid: Object.keys(errors).length === 0,
  };
};
