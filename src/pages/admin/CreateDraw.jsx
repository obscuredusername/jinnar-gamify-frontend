import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import adminService from '../../services/adminService';

const CreateDraw = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            // Validate form
            if (!formData.title || !formData.theme || !formData.startDate || !formData.endDate || !formData.prizePool) {
                setError('Please fill in all required fields');
                setLoading(false);
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

            const response = await adminService.createDraw(drawData);

            if (response.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/admin/draws');
                }, 2000);
            } else {
                setError(response.message || 'Failed to create draw');
            }
        } catch (err) {
            console.error('Error creating draw:', err);
            setError(err.response?.data?.message || err.message || 'Failed to create draw');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 flex flex-col">
            <Header />

            <div className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
                {/* Page Header */}
                <div className="mb-8">
                    <button
                        onClick={() => navigate('/admin/draws')}
                        className="text-blue-800 hover:text-blue-900 font-semibold mb-4 flex items-center gap-2"
                    >
                        ← Back to Admin Panel
                    </button>
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Create New Lucky Draw</h1>
                    <p className="text-gray-600">Set up a new draw for the Jinnar Viral Challenge</p>
                </div>

                {/* Success Message */}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                        <p className="font-semibold">✓ Draw Created Successfully!</p>
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
                        </select>
                        <p className="text-xs text-gray-500 mt-1">
                            Set to "Upcoming" for future draws, "Active" for current draws
                        </p>
                    </div>

                    {/* Submit Buttons */}
                    <div className="flex gap-4 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={() => navigate('/admin/draws')}
                            className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-900 font-semibold py-3 px-6 rounded-lg transition-colors"
                            disabled={loading}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-blue-800 to-blue-900 hover:from-blue-900 hover:to-blue-800 text-white font-bold py-3 px-6 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={loading}
                        >
                            {loading ? 'Creating Draw...' : 'Create Draw'}
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default CreateDraw;
