import client from '../api/client';

/**
 * Viral Campaign Service
 * Handles all API calls related to viral campaigns, submissions, draws, leaderboards, and rewards
 */
const viralService = {
    // ==================== SUBMISSIONS ====================

    /**
     * Upload a video submission for a draw
     * @param {File} videoFile - The video file to upload
     * @param {string} drawId - The ID of the draw
     * @param {string} title - Title of the video
     * @param {File} thumbnailFile - Optional thumbnail file
     * @returns {Promise} Response with submission details
     */
    uploadVideo: async (videoFile, drawId, title, thumbnailFile = null) => {
        const formData = new FormData();
        formData.append('video', videoFile);
        formData.append('drawId', drawId);
        formData.append('title', title);

        // Add thumbnail if provided
        if (thumbnailFile) {
            formData.append('thumbnail', thumbnailFile);
        }

        const response = await client.post('/viral/submissions', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    /**
     * Upload thumbnail for an existing submission
     * @param {string} submissionId - The ID of the submission
     * @param {File} thumbnailFile - The thumbnail file
     * @returns {Promise} Response with updated submission
     */
    uploadThumbnail: async (submissionId, thumbnailFile) => {
        const formData = new FormData();
        formData.append('thumbnail', thumbnailFile);

        const response = await client.post(`/viral/submissions/${submissionId}/thumbnail`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    /**
     * Get current user's submissions
     * @returns {Promise} Array of user submissions
     */
    getMySubmissions: async () => {
        const response = await client.get('/viral/submissions/me');
        return response.data;
    },

    /**
     * Submit a social media post link for a video
     * @param {Object} data - The submission data
     * @param {string} data.submissionId - The ID of the video submission
     * @param {string} data.drawId - The ID of the draw
     * @param {string} data.platform - The platform (tiktok, instagram, etc.)
     * @param {string} data.postUrl - The URL of the post
     * @param {File} data.screenshot - The screenshot file
     * @returns {Promise} Response
     */
    submitPost: async ({ submissionId, drawId, platform, postUrl, screenshot }) => {
        const formData = new FormData();
        formData.append('submissionId', submissionId);
        formData.append('drawId', drawId);
        formData.append('platform', platform);
        formData.append('postUrl', postUrl);
        if (screenshot) {
            formData.append('screenshot', screenshot);
        }

        const response = await client.post('/viral/posts', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    },

    // ==================== DRAWS ====================

    /**
     * Get list of draws
     * @param {string} status - Filter by status: 'active', 'upcoming', 'completed'
     * @returns {Promise} Array of draws
     */
    getDraws: async (status = 'active') => {
        const response = await client.get('/viral/draws', {
            params: { status },
        });
        return response.data;
    },

    /**
     * Get winners for a specific draw
     * @param {string} drawId - The ID of the draw
     * @returns {Promise} Array of winners with ranks and rewards
     */
    getDrawWinners: async (drawId) => {
        const response = await client.get(`/viral/draws/${drawId}/winners`);
        return response.data;
    },

    // ==================== LEADERBOARD ====================

    /**
     * Get global/regional/country leaderboard
     * @param {string} drawId - The ID of the draw (optional for all-time)
     * @param {string} scope - 'global', 'country', or 'city'
     * @param {number} limit - Number of results to return
     * @returns {Promise} Array of leaderboard entries
     */
    getLeaderboard: async (drawId = null, scope = 'global', limit = 50) => {
        const params = { scope, limit };
        if (drawId) {
            params.drawId = drawId;
        }

        const response = await client.get('/viral/leaderboard', { params });
        return response.data;
    },

    /**
     * Get current user's rank in a draw
     * @param {string} drawId - The ID of the draw
     * @returns {Promise} User's rank data (global, country, city)
     */
    getMyRank: async (drawId) => {
        const response = await client.get('/viral/leaderboard/me', {
            params: { drawId },
        });
        return response.data;
    },

    // ==================== POINTS ====================

    /**
     * Get current user's points and breakdown
     * @returns {Promise} Points data with platform breakdown
     */
    getMyPoints: async () => {
        const response = await client.get('/viral/points/me');
        return response.data;
    },

    // ==================== REWARDS ====================

    /**
     * Get current user's rewards/winnings
     * @returns {Promise} Array of rewards
     */
    getMyRewards: async () => {
        const response = await client.get('/viral/rewards/me');
        return response.data;
    },

    // ==================== ANNOUNCEMENTS ====================

    /**
     * Get platform announcements
     * @returns {Promise} Array of announcements
     */
    getAnnouncements: async () => {
        const response = await client.get('/viral/announcements');
        return response.data;
    },

    // ==================== HELPER METHODS ====================

    /**
     * Get active draws only
     * @returns {Promise} Array of active draws
     */
    getActiveDraws: async () => {
        return viralService.getDraws('active');
    },

    /**
     * Get upcoming draws
     * @returns {Promise} Array of upcoming draws
     */
    getUpcomingDraws: async () => {
        return viralService.getDraws('upcoming');
    },

    /**
     * Get completed draws
     * @returns {Promise} Array of completed draws
     */
    getCompletedDraws: async () => {
        return viralService.getDraws('completed');
    },

    /**
     * Get closed draws (alias for completed/closed)
     * @returns {Promise} Array of closed draws
     */
    getClosedDraws: async () => {
        return viralService.getDraws('closed');
    },

    /**
     * Get global leaderboard for a specific draw
     * @param {string} drawId - The ID of the draw
     * @param {number} limit - Number of results
     * @returns {Promise} Global leaderboard data
     */
    getGlobalLeaderboard: async (drawId, limit = 50) => {
        return viralService.getLeaderboard(drawId, 'global', limit);
    },

    /**
     * Get country leaderboard for a specific draw
     * @param {string} drawId - The ID of the draw
     * @param {number} limit - Number of results
     * @returns {Promise} Country leaderboard data
     */
    getCountryLeaderboard: async (drawId, limit = 50) => {
        return viralService.getLeaderboard(drawId, 'country', limit);
    },

    /**
     * Get city leaderboard for a specific draw
     * @param {string} drawId - The ID of the draw
     * @param {number} limit - Number of results
     * @returns {Promise} City leaderboard data
     */
    getCityLeaderboard: async (drawId, limit = 50) => {
        return viralService.getLeaderboard(drawId, 'city', limit);
    },
};

export default viralService;
