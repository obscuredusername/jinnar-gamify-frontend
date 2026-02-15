// Color utility functions for consistent styling across the app

/**
 * Get Tailwind color classes for announcement categories
 * @param {string} categoryColor - The category color (yellow, blue, purple, etc.)
 * @returns {object} Object with bg and text color classes
 */
export const getCategoryColors = (categoryColor) => {
    const colorMap = {
        yellow: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-500' },
        blue: { bg: 'bg-blue-100', text: 'text-blue-700', border: 'border-blue-500' },
        purple: { bg: 'bg-purple-100', text: 'text-purple-700', border: 'border-purple-500' },
        green: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-500' },
        red: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-500' },
        teal: { bg: 'bg-teal-100', text: 'text-teal-700', border: 'border-teal-500' },
        orange: { bg: 'bg-orange-100', text: 'text-orange-700', border: 'border-orange-500' },
        pink: { bg: 'bg-pink-100', text: 'text-pink-700', border: 'border-pink-500' }
    };

    return colorMap[categoryColor] || colorMap.blue;
};

/**
 * Get status badge colors
 * @param {string} status - approved, pending, rejected
 * @returns {string} Tailwind classes for the status badge
 */
export const getStatusColors = (status) => {
    const statusMap = {
        approved: 'bg-green-100 text-green-700',
        pending: 'bg-yellow-100 text-yellow-700',
        rejected: 'bg-red-100 text-red-700'
    };

    return statusMap[status] || statusMap.pending;
};

/**
 * Get rank badge colors (for leaderboards/winners)
 * @param {number} rank - 1, 2, 3, or higher
 * @returns {string} Tailwind classes for rank badge
 */
export const getRankColors = (rank) => {
    if (rank === 1) return 'bg-yellow-500 text-white'; // Gold
    if (rank === 2) return 'bg-gray-400 text-white';   // Silver
    if (rank === 3) return 'bg-orange-600 text-white'; // Bronze
    return 'bg-blue-600 text-white';                    // Default
};

/**
 * Get platform gradient colors
 * @param {string} platform - tiktok, instagram, facebook, youtube
 * @returns {string} Tailwind gradient classes
 */
export const getPlatformGradient = (platform) => {
    const gradientMap = {
        tiktok: 'from-pink-500 to-purple-600',
        instagram: 'from-purple-500 to-pink-500',
        facebook: 'from-blue-600 to-blue-700',
        youtube: 'from-red-600 to-red-700'
    };

    return gradientMap[platform.toLowerCase()] || 'from-gray-500 to-gray-600';
};

export default {
    getCategoryColors,
    getStatusColors,
    getRankColors,
    getPlatformGradient
};
