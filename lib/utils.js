function validateRegisterInput({ handle, email, password }) {
  const errors = {};
  const emailRE = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let isValid = true;

  if (handle.length < 2) {
    errors.handle = 'Username too short';
    isValid = false;
  }

  if (!emailRE.test(String(email).toLowerCase())) {
    errors.email = 'Invalid email';
    isValid = false;
  }

  if (password.length < 8) {
    errors.password = 'Password too short';
    isValid = false;
  }

  return { errors, isValid };
}

module.exports = { validateRegisterInput };
