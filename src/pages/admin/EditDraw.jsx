import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import adminService from '../../services/adminService';
import viralService from '../../services/viralService';

const EditDraw = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        title: '',
        theme: '',
        hashtags: '',
        startDate: '',
        endDate: '',
        prizePool: '',
        status: 'upcoming'
    });

    useEffect(() => {
        fetchDrawDetails();
    }, [id]);

    const fetchDrawDetails = async () => {
        try {
            setLoading(true);
            setError(null);

            // Fetch draw details
            const response = await viralService.getSingleDraw(id);

            if (response.success && response.data) {
                const draw = response.data;

                // Format dates for datetime-local input
                const formatDateForInput = (dateString) => {
                    const date = new Date(dateString);
                    return date.toISOString().slice(0, 16);
                };

                setFormData({
                    title: draw.title || '',
                    theme: draw.theme || '',
                    hashtags: draw.hashtags ? draw.hashtags.join(', ') : '',
                    startDate: draw.startDate ? formatDateForInput(draw.startDate) : '',
                    endDate: draw.endDate ? formatDateForInput(draw.endDate) : '',
                    prizePool: draw.prizePool || '',
                    status: draw.status || 'upcoming'
                });
            } else {
                setError('Failed to load draw details');
            }
        } catch (err) {
            console.error('Error fetching draw:', err);
            setError(err.message || 'Failed to load draw');
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            // Validate form
            if (!formData.title || !formData.theme || !formData.startDate || !formData.endDate || !formData.prizePool) {
                setError('Please fill in all required fields');
                setSubmitting(false);
                return;
            }

            // Prepare data
            const drawData = {
                title: formData.title,
                theme: formData.theme,
                hashtags: formData.hashtags.split(',').map(tag => tag.trim()).filter(tag => tag),
                startDate: new Date(formData.startDate).toISOString(),
                endDate: new Date(formData.endDate).toISOString(),
                prizePool: parseFloat(formData.prizePool),
                status: formData.status
            };

            const response = await adminService.updateDraw(id, drawData);

            if (response.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/admin/draws');
                }, 2000);
            } else {
                setError(response.message || 'Failed to update draw');
            }
        } catch (err) {
            console.error('Error updating draw:', err);
            setError(err.response?.data?.message || err.message || 'Failed to update draw');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <div className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
                        <p className="mt-4 text-gray-600">Loading draw details...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">

            <div className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
                {/* Page Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/admin/draws')}
                        className="text-blue-800 hover:text-blue-900 font-semibold mb-4 flex items-center gap-2"
                    >
                        ← Back to Admin Panel
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Edit Draw</h1>
                    <p className="text-gray-600">Update draw details and settings</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                        <p className="font-semibold">✓ Draw Updated Successfully!</p>
                        <p className="text-sm">Redirecting to admin panel...</p>
                    </div>
                )}

                {/* Error Message */}
                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg mb-6">
                        <p className="font-semibold">Error</p>
                        <p className="text-sm">{error}</p>
                    </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6 space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Draw Title <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="e.g., Weekend Flash Draw"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Theme */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Theme <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="theme"
                            value={formData.theme}
                            onChange={handleChange}
                            placeholder="e.g., Weekend Promo"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                            required
                        />
                    </div>

                    {/* Hashtags */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Hashtags
                        </label>
                        <input
                            type="text"
                            name="hashtags"
                            value={formData.hashtags}
                            onChange={handleChange}
                            placeholder="weekend, flash, bonus (comma-separated)"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                        />
                        <p className="text-xs text-gray-500 mt-1">Enter hashtags separated by commas</p>
                    </div>

                    {/* Date Range */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                Start Date & Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                name="startDate"
                                value={formData.startDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                                required
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-900 mb-2">
                                End Date & Time <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="datetime-local"
                                name="endDate"
                                value={formData.endDate}
                                onChange={handleChange}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Prize Pool */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Prize Pool (USD) <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <span className="absolute left-4 top-2 text-gray-500">$</span>
                            <input
                                type="number"
                                name="prizePool"
                                value={formData.prizePool}
                                onChange={handleChange}
                                placeholder="10000"
                                min="0"
                                step="100"
                                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                                required
                            />
                        </div>
                    </div>

                    {/* Status */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">
                            Status <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="status"
                            value={formData.status}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                            required
                        >
                            <option value="upcoming">Upcoming</option>
                            <option value="active">Active</option>
                            <option value="completed">Completed</option>
                            <option value="closed">Closed</option>
                        </select>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/draws')}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                            disabled={submitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={submitting}
                        >
                            {submitting ? 'Updating Draw...' : 'Update Draw'}
                        </button>
                    </div>
                </form>
            </div>

        </div>
    );
};

export default EditDraw;
