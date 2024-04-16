// Function to validate input against a regular expression
const validateRegex = (regexPattern: RegExp, inputString: string): boolean => {
  try {
    const regex = new RegExp(regexPattern);
    return regex.test(inputString);
  } catch (error) {
    console.error('Invalid regex pattern:', error);
    return false;
  }
};

// Function to validate if a value is empty
export const validateEmpty = (value: string, placeholder: string): string => {
  if (value?.trim() === '') {
    return `${placeholder} is required.`;
  } else {
    return '';
  }
};

// Function to validate a name input
export const validateName = (value: string, placeholder: string): string => {
  // Matches alphabetical characters, hyphens, and apostrophes
  const nameRegex: RegExp = /^[A-Za-z'-]+$/;
  if (value?.trim() === '') {
    return `${placeholder} is required.`;
  } else if (!validateRegex(nameRegex, value)) {
    return `${placeholder} is not valid.`;
  } else {
    return '';
  }
};

// Function to validate an email input
export const validateEmail = (value: string): string => {
  // Matches email addresses
  const emailRegex: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value?.trim() === '') {
    return 'Email is required.';
  } else if (!validateRegex(emailRegex, value)) {
    return 'Email is not valid.';
  } else {
    return '';
  }
};

// Function to validate a date of birth input
export const validateDob = (value: string | undefined): string => {
  if (!!!value || value?.trim() === '') {
    return 'Date of birth is required.';
  }
  const [year, month, day] = value.split('-').map(Number);
  const dobDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  if (dobDate > currentDate) {
    return 'Date of birth must be in the past date.';
  } else {
    return '';
  }
};

// Function to validate a password input
export const validatePassword = (value: string): string => {
  // Matches passwords with specific criteria
  const passwordRegex: RegExp =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  if (value?.trim() === '') {
    return 'Password is required.';
  } else if (!validateRegex(passwordRegex, value)) {
    return 'Password must contain a minimum of 8 characters, 1 uppercase, 1 lowercase, 1 numeric, and 1 special character.';
  } else {
    return '';
  }
};

// Function to validate if a value matches the password
export const validateConfirmPassword = (value: string, password: string): string => {
  if (value?.trim() === '') {
    return 'Confirm password is required.';
  } else if (value !== password) {
    return 'Confirm password does not match.';
  } else {
    return '';
  }
};
