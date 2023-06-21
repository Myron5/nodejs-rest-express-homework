const mixRegexp = (...regexps) => {
  return "(?:" + regexps.join(")|(?:") + ")";
};

const phoneRegexOne =
  /^\+\s?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;

const phoneRegexTwo = /^(?=.*\+[0-9]{3}\s?[0-9]{2}\s?[0-9]{3}\s?[0-9]{4,5}$)/;

// Minimum 8 characters in length.          {8,}
// At least one uppercase English letter.   ?=.*?[A-Z]
// At least one lowercase English letter.   ?=.*?[a-z]
// At least one digit.                      ?=.*?[0-9]
// At least one special character.          ?=.*?[#?!@$%^&*-]

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

const emailRegex = /^\S+@\S+\.\S+$/;

module.exports = {
  mixRegexp,
  phoneRegexOne,
  phoneRegexTwo,
  passwordRegex,
  emailRegex,
};
