/**
 * Form Validation Utilities
 * Comprehensive validation functions for contact form
 */

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

/**
 * Validate email address
 */
export const validateEmail = (email: string): ValidationResult => {
  const trimmedEmail = email.trim();
  
  if (!trimmedEmail) {
    return { isValid: false, message: 'Email is required' };
  }

  // RFC 5322 simplified email regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
  if (!emailRegex.test(trimmedEmail)) {
    return { isValid: false, message: 'Please enter a valid email address' };
  }

  // Check for common typos in domain
  const commonTypos = ['gmial.com', 'gmai.com', 'yahooo.com', 'hotmial.com'];
  const domain = trimmedEmail.split('@')[1].toLowerCase();
  
  if (commonTypos.includes(domain)) {
    return { isValid: false, message: `Did you mean ${domain.replace(/o+/, 'o')}?` };
  }

  return { isValid: true };
};

/**
 * Validate phone number
 */
export const validatePhone = (phone: string): ValidationResult => {
  const trimmedPhone = phone.trim();
  
  if (!trimmedPhone) {
    return { isValid: false, message: 'Phone number is required' };
  }

  // Remove common separators for length check
  const digitsOnly = trimmedPhone.replace(/[\s\-\+\(\)]/g, '');
  
  if (digitsOnly.length < 10) {
    return { isValid: false, message: 'Phone number must be at least 10 digits' };
  }

  if (digitsOnly.length > 15) {
    return { isValid: false, message: 'Phone number is too long' };
  }

  // Check if contains only valid characters
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  
  if (!phoneRegex.test(trimmedPhone)) {
    return { isValid: false, message: 'Phone number contains invalid characters' };
  }

  return { isValid: true };
};

/**
 * Validate name
 */
export const validateName = (name: string): ValidationResult => {
  const trimmedName = name.trim();
  
  if (!trimmedName) {
    return { isValid: false, message: 'Name is required' };
  }

  if (trimmedName.length < 2) {
    return { isValid: false, message: 'Name must be at least 2 characters' };
  }

  if (trimmedName.length > 100) {
    return { isValid: false, message: 'Name is too long' };
  }

  // Check for valid characters (letters, spaces, hyphens, apostrophes)
  const nameRegex = /^[a-zA-Z\s\-']+$/;
  
  if (!nameRegex.test(trimmedName)) {
    return { isValid: false, message: 'Name contains invalid characters' };
  }

  return { isValid: true };
};

/**
 * Validate company name
 */
export const validateCompany = (company: string): ValidationResult => {
  const trimmedCompany = company.trim();
  
  if (!trimmedCompany) {
    return { isValid: false, message: 'Company name is required' };
  }

  if (trimmedCompany.length < 2) {
    return { isValid: false, message: 'Company name must be at least 2 characters' };
  }

  if (trimmedCompany.length > 100) {
    return { isValid: false, message: 'Company name is too long' };
  }

  return { isValid: true };
};

/**
 * Validate message
 */
export const validateMessage = (message: string): ValidationResult => {
  const trimmedMessage = message.trim();
  
  if (!trimmedMessage) {
    return { isValid: false, message: 'Message is required' };
  }

  if (trimmedMessage.length < 10) {
    return { isValid: false, message: 'Message must be at least 10 characters' };
  }

  if (trimmedMessage.length > 5000) {
    return { isValid: false, message: 'Message is too long (maximum 5000 characters)' };
  }

  return { isValid: true };
};

/**
 * Check for spam patterns
 */
export const checkSpamPatterns = (text: string): ValidationResult => {
  // Check for excessive URLs
  const urlCount = (text.match(/https?:\/\/|www\./gi) || []).length;
  if (urlCount > 3) {
    return { isValid: false, message: 'Message contains too many links' };
  }

  // Check for excessive capitalization
  const upperCaseRatio = (text.match(/[A-Z]/g) || []).length / text.length;
  if (upperCaseRatio > 0.5) {
    return { isValid: false, message: 'Message contains too much capitalization' };
  }

  // Check for repeated characters
  if (/(.)\1{4,}/.test(text)) {
    return { isValid: false, message: 'Message contains excessive repeated characters' };
  }

  return { isValid: true };
};

/**
 * Sanitize form input
 */
export const sanitizeInput = (input: string): string => {
  return input
    .trim()
    .replace(/[<>]/g, '') // Remove angle brackets
    .substring(0, 5000); // Limit length
};

/**
 * Validate entire form
 */
export interface FormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  message: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  company?: string;
  message?: string;
}

export const validateForm = (formData: FormData): FormErrors => {
  const errors: FormErrors = {};

  // Validate name
  const nameValidation = validateName(formData.name);
  if (!nameValidation.isValid) {
    errors.name = nameValidation.message;
  }

  // Validate email
  const emailValidation = validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.message;
  }

  // Validate phone
  const phoneValidation = validatePhone(formData.phone);
  if (!phoneValidation.isValid) {
    errors.phone = phoneValidation.message;
  }

  // Validate company
  const companyValidation = validateCompany(formData.company);
  if (!companyValidation.isValid) {
    errors.company = companyValidation.message;
  }

  // Validate message
  const messageValidation = validateMessage(formData.message);
  if (!messageValidation.isValid) {
    errors.message = messageValidation.message;
  }

  // Check for spam patterns in message
  const spamCheck = checkSpamPatterns(formData.message);
  if (!spamCheck.isValid) {
    errors.message = spamCheck.message;
  }

  return errors;
};
