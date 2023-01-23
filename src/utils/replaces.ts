const replaces = {
  space: /\s/g,
  dash: /-/g,
  lowercase: /[A-Z]/g,
  uppercase: /[a-z]/g,
  specialCharacters: /[^\w\s]/gi,
  nonAlphanumeric: /[^a-zA-Z0-9]/g,
};

export default replaces;