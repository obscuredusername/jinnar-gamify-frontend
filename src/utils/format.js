// Formatting utility functions

/**
 * Format number with commas (e.g., 1000 -> 1,000)
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatNumber = (num) => {
    if (num === null || num === undefined) return '0';
    return num.toLocaleString();
};

/**
 * Format number to K/M notation (e.g., 1000 -> 1K, 1000000 -> 1M)
 * @param {number} num - Number to format
 * @returns {string} Formatted number string
 */
export const formatCompactNumber = (num) => {
    if (num === null || num === undefined) return '0';

    if (num >= 1000000) {
        return (num / 1000000).toFixed(1) + 'M';
    }
    if (num >= 1000) {
        return (num / 1000).toFixed(1) + 'K';
    }
    return num.toString();
};

/**
 * Format file size (bytes to MB/KB)
 * @param {number} bytes - File size in bytes
 * @returns {string} Formatted file size
 */
export const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Format date to readable string
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export const formatDate = (date) => {
    if (!date) return '';

    const d = new Date(date);
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return d.toLocaleDateString('en-US', options);
};

/**
 * Format currency (USD)
 * @param {number} amount - Amount to format
 * @returns {string} Formatted currency string
 */
export const formatCurrency = (amount) => {
    if (amount === null || amount === undefined) return '$0';
    return '$' + amount.toLocaleString();
};

/**
 * Truncate text with ellipsis
 * @param {string} text - Text to truncate
 * @param {number} maxLength - Maximum length
 * @returns {string} Truncated text
 */
export const truncateText = (text, maxLength = 100) => {
    if (!text || text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
};

export default {
    formatNumber,
    formatCompactNumber,
    formatFileSize,
    formatDate,
    formatCurrency,
    truncateText
};
