// Function to validate input against a regular expression
const validateRegex = (regexPattern: RegExp, inputString: string) => {
  try {
    const regex = new RegExp(regexPattern);
    return regex.test(inputString);
  } catch (error) {
    console.error('Invalid regex pattern:', error);
    return false;
  }
};

export const validateEmpty = (value: string, placeholder: string) => {
  if (value?.trim() === '') {
    return placeholder + ' is required.';
  } else {
    return '';
  }
};

export const validateName = (value: string, placeholder: string) => {
  // Matches alphabetical characters, hyphens, and apostrophes
  const nameRegex = /^[A-Za-z'-]+$/;
  if (value?.trim() === '') {
    return placeholder + ' is required.';
  } else if (!validateRegex(nameRegex, value)) {
    return placeholder + ' is not valid.';
  } else {
    return '';
  }
};

export const validateEmail = (value: string) => {
  // Matches email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (value?.trim() === '') {
    return 'Email is required.';
  } else if (!validateRegex(emailRegex, value)) {
    return 'Email is not valid.';
  } else {
    return '';
  }
};

export const validateDob = (value: string | undefined) => {
  if (!!!value || value?.trim() === '') {
    return 'Date of birth is required.';
  }
  const [year, month, day] = value.split('-').map(Number);
  const dobDate = new Date(year, month - 1, day);
  const currentDate = new Date();
  if (dobDate > currentDate) {
    return 'Date of birth must be in past date.';
  } else {
    return '';
  }
};

export const validatePassword = (value: string) => {
  // Matches passwords with specific criteria
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,}$/;
  if (value?.trim() === '') {
    return 'Password is required.';
  } else if (!validateRegex(passwordRegex, value)) {
    return 'Password must contain a minimum of 8 characters, 1 uppercase, 1 lowercase, 1 numeric, and 1 special character.';
  } else {
    return '';
  }
};

export const validateConfirmPassword = (value: string, password: string) => {
  if (value?.trim() === '') {
    return 'Confirm password is required.';
  } else if (value !== password) {
    return 'Confirm password do not match.';
  } else {
    return '';
  }
};
