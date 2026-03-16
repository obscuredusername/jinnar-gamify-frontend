import apiClient from '../config/apiClient';

/**
 * Admin Service
 * Handles all API calls related to admin operations for draw management
 */
const adminService = {
    // ==================== DRAW MANAGEMENT ====================

    /**
     * Create a new lucky draw
     * @param {Object} drawData - The draw data
     * @param {string} drawData.title - Draw title
     * @param {string} drawData.theme - Draw theme
     * @param {string[]} drawData.hashtags - Array of hashtags
     * @param {string} drawData.startDate - ISO date string
     * @param {string} drawData.endDate - ISO date string
     * @param {number} drawData.prizePool - Total prize pool amount
     * @param {string} drawData.status - Draw status (active, upcoming, completed)
     * @returns {Promise} Response with created draw details
     */
    createDraw: async (drawData) => {
        const response = await apiClient.post('/viral/admin/draws', drawData);
        return response.data;
    },

    /**
     * Update an existing draw
     * @param {string} drawId - The ID of the draw to update
     * @param {Object} drawData - The updated draw data
     * @returns {Promise} Response with updated draw details
     */
    updateDraw: async (drawId, drawData) => {
        const response = await apiClient.put(`/viral/admin/draws/${drawId}`, drawData);
        return response.data;
    },

    /**
     * Get all draws (admin view with all statuses)
     * @returns {Promise} Array of all draws
     */
    getAllDraws: async () => {
        const response = await apiClient.get('/viral/admin/draws');
        return response.data;
    },

    /**
     * Assign rewards to a specific draw
     * @param {string} drawId - The ID of the draw
     * @param {Array} rewards - Array of reward objects
     * @param {number} rewards[].rank - Winner rank
     * @param {string} rewards[].rewardType - Type of reward (cash, merchandise)
     * @param {number} rewards[].amount - Reward amount (0 for merchandise)
     * @returns {Promise} Response with success message
     */
    assignRewards: async (drawId, rewards) => {
        const response = await apiClient.post(`/viral/admin/draws/${drawId}/rewards`, rewards);
        return response.data;
    },

    /**
     * Delete a draw (if needed in future)
     * @param {string} drawId - The ID of the draw to delete
     * @returns {Promise} Response with success message
     */
    deleteDraw: async (drawId) => {
        const response = await apiClient.delete(`/viral/admin/draws/${drawId}`);
        return response.data;
    },

    // ==================== SUBMISSION MANAGEMENT ====================

    /**
     * Get all submissions for admin review
     * @returns {Promise} Array of all submissions with status
     */
    getAllSubmissions: async () => {
        const response = await apiClient.get('/viral/admin/submissions');
        return response.data;
    },

    /**
     * Review a submission (approve/reject)
     * @param {string} submissionId - The ID of the submission
     * @param {string} status - New status (approved/rejected)
     * @param {string} reviewNotes - Optional review notes
     * @returns {Promise} Response with updated submission
     */
    reviewSubmission: async (submissionId, status, reviewNotes = '') => {
        const response = await apiClient.put(`/viral/admin/submissions/${submissionId}`, {
            status,
            reviewNotes,
        });
        return response.data;
    },

    // ==================== POST MANAGEMENT ====================

    /**
     * Update a social media post (engagement, verification, fraud flag)
     * @param {string} postId - The ID of the post
     * @param {Object} data - Update data
     * @param {boolean} data.verified - Verification status
     * @param {boolean} data.fraudFlag - Fraud flag status
     * @param {Object} data.engagement - Engagement metrics
     * @param {number} data.engagement.likes - Number of likes
     * @param {number} data.engagement.views - Number of views
     * @param {number} data.engagement.shares - Number of shares
     * @returns {Promise} Response with updated post and points
     */
    updatePost: async (postId, data) => {
        const response = await apiClient.put(`/viral/admin/posts/${postId}`, data);
        return response.data;
    },

    // ==================== DRAW LIFECYCLE ====================

    /**
     * Close a draw (stop accepting new submissions)
     * @param {string} drawId - The ID of the draw to close
     * @returns {Promise} Response with success message
     */
    closeDraw: async (drawId) => {
        const response = await apiClient.post(`/viral/admin/draws/${drawId}/close`);
        return response.data;
    },

    // ==================== AUTH & SYSTEM ====================

    /**
     * Admin login
     * @param {string} email
     * @param {string} password
     */
    login: async (email, password) => {
        const response = await apiClient.post('/admin/login', { email, password });
        if (response.data.token) {
            localStorage.setItem('authToken', response.data.token);
        }
        return response.data;
    },

    /**
     * Get admin dashboard stats
     */
    getStats: async () => {
        const response = await apiClient.get('/admin/stats');
        return response.data;
    },

    /**
     * Verify/Approve a user
     * @param {string} userId
     * @param {string} status - approved/rejected
     */
    verifyUser: async (userId, status) => {
        const response = await apiClient.patch('/admin/verify-user', { userId, status });
        return response.data;
    },

    /**
     * Suspend/Unsuspend a user
     * @param {string} userId
     * @param {boolean} suspend
     */
    suspendUser: async (userId, suspend) => {
        const response = await apiClient.patch('/admin/suspend-user', { userId, suspend });
        return response.data;
    },

    /**
     * Get all users for administration
     */
    getUsers: async () => {
        const response = await apiClient.get('/admin/users');
        return response.data;
    },

    /**
     * Get financial logs
     */
    getFinancialLogs: async (page = 1, limit = 10) => {
        const response = await apiClient.get(`/admin/financial-logs?page=${page}&limit=${limit}`);
        return response.data;
    },
};

export default adminService;
