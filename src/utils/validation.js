// Validation utility functions

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid
 */
export const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

/**
 * Validate URL format
 * @param {string} url - URL to validate
 * @returns {boolean} True if valid
 */
export const isValidUrl = (url) => {
    try {
        new URL(url);
        return true;
    } catch {
        return false;
    }
};

/**
 * Validate video file
 * @param {File} file - File to validate
 * @returns {object} { valid: boolean, error: string }
 */
export const validateVideoFile = (file) => {
    const maxSize = 500 * 1024 * 1024; // 500MB
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime'];

    if (!file) {
        return { valid: false, error: 'No file selected' };
    }

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'Invalid file type. Only MP4, MOV, and AVI are allowed.' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File size exceeds 500MB limit.' };
    }

    return { valid: true, error: null };
};

/**
 * Validate image file
 * @param {File} file - File to validate
 * @returns {object} { valid: boolean, error: string }
 */
export const validateImageFile = (file) => {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

    if (!file) {
        return { valid: false, error: 'No file selected' };
    }

    if (!allowedTypes.includes(file.type)) {
        return { valid: false, error: 'Invalid file type. Only JPG, PNG, and WebP are allowed.' };
    }

    if (file.size > maxSize) {
        return { valid: false, error: 'File size exceeds 10MB limit.' };
    }

    return { valid: true, error: null };
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {object} { valid: boolean, error: string, strength: string }
 */
export const validatePassword = (password) => {
    if (!password || password.length < 8) {
        return { valid: false, error: 'Password must be at least 8 characters', strength: 'weak' };
    }

    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    const strengthScore = [hasUpperCase, hasLowerCase, hasNumber, hasSpecialChar].filter(Boolean).length;

    let strength = 'weak';
    if (strengthScore >= 4) strength = 'strong';
    else if (strengthScore >= 3) strength = 'medium';

    if (strengthScore < 3) {
        return {
            valid: false,
            error: 'Password must contain uppercase, lowercase, number, and special character',
            strength
        };
    }

    return { valid: true, error: null, strength };
};

/**
 * Validate phone number (basic)
 * @param {string} phone - Phone number to validate
 * @returns {boolean} True if valid
 */
export const isValidPhone = (phone) => {
    const phoneRegex = /^[\d\s\-\+\(\)]{10,}$/;
    return phoneRegex.test(phone);
};

export default {
    isValidEmail,
    isValidUrl,
    validateVideoFile,
    validateImageFile,
    validatePassword,
    isValidPhone
};
