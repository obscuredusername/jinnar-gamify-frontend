import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Footer from '../../components/ui/Footer';
import adminService from '../../services/adminService';
import viralService from '../../services/viralService';

const ManageRewards = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [drawInfo, setDrawInfo] = useState(null);

    const [rewards, setRewards] = useState([
        { rank: 1, rewardType: 'cash', amount: '' },
    ]);

    useEffect(() => {
        fetchDrawInfo();
    }, [id]);

    const fetchDrawInfo = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await viralService.getSingleDraw(id);

            if (response.success && response.data) {
                setDrawInfo(response.data);
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

    const addReward = () => {
        const nextRank = rewards.length + 1;
        setRewards([...rewards, { rank: nextRank, rewardType: 'cash', amount: '' }]);
    };

    const removeReward = (index) => {
        if (rewards.length > 1) {
            setRewards(rewards.filter((_, i) => i !== index));
        }
    };

    const updateReward = (index, field, value) => {
        const updated = [...rewards];
        updated[index][field] = value;
        setRewards(updated);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        setError(null);
        setSuccess(false);

        try {
            // Validate rewards
            const validRewards = rewards.filter(r => r.rank && r.rewardType);

            if (validRewards.length === 0) {
                setError('Please add at least one reward');
                setSubmitting(false);
                return;
            }

            // Prepare rewards data
            const rewardsData = validRewards.map(r => ({
                rank: parseInt(r.rank),
                rewardType: r.rewardType,
                amount: r.rewardType === 'cash' ? parseFloat(r.amount) || 0 : 0
            }));

            const response = await adminService.assignRewards(id, rewardsData);

            if (response.success) {
                setSuccess(true);
                setTimeout(() => {
                    navigate('/admin/draws');
                }, 2000);
            } else {
                setError(response.message || 'Failed to assign rewards');
            }
        } catch (err) {
            console.error('Error assigning rewards:', err);
            setError(err.response?.data?.message || err.message || 'Failed to assign rewards');
        } finally {
            setSubmitting(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex flex-col">
                <Header />
                <div className="flex-1 max-w-4xl mx-auto px-6 py-8 w-full">
                    <div className="text-center py-12">
                        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800"></div>
                        <p className="mt-4 text-gray-600">Loading draw details...</p>
                    </div>
                </div>
                <Footer />
            </div>
        );
    }

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
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Manage Rewards</h1>
                    <p className="text-gray-600">Assign prizes and rewards to draw winners</p>
                </div>

                {/* Draw Info Card */}
                {drawInfo && (
                    <div className="bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-lg p-6 mb-6">
                        <h2 className="text-2xl font-bold mb-2">{drawInfo.title}</h2>
                        <div className="grid md:grid-cols-2 gap-4 text-sm">
                            <div>
                                <span className="text-blue-200">Prize Pool:</span>
                                <span className="ml-2 font-semibold">${drawInfo.prizePool?.toLocaleString()}</span>
                            </div>
                            <div>
                                <span className="text-blue-200">Status:</span>
                                <span className="ml-2 font-semibold capitalize">{drawInfo.status}</span>
                            </div>
                        </div>
                    </div>
                )}

                {/* Success Message */}
                {success && (
                    <div className="bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg mb-6">
                        <p className="font-semibold">✓ Rewards Assigned Successfully!</p>
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

                {/* Rewards Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
                    <div className="mb-6">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-bold text-gray-900">Reward Assignments</h3>
                            <button
                                type="button"
                                onClick={addReward}
                                className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-4 rounded-lg transition-colors text-sm flex items-center gap-2"
                            >
                                <span className="text-lg">+</span>
                                Add Reward
                            </button>
                        </div>

                        <div className="space-y-4">
                            {rewards.map((reward, index) => (
                                <div key={index} className="border border-gray-200 rounded-lg p-4">
                                    <div className="flex items-start gap-4">
                                        <div className="flex-1 grid md:grid-cols-3 gap-4">
                                            {/* Rank */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Rank
                                                </label>
                                                <input
                                                    type="number"
                                                    value={reward.rank}
                                                    onChange={(e) => updateReward(index, 'rank', e.target.value)}
                                                    min="1"
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                                                    required
                                                />
                                            </div>

                                            {/* Reward Type */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Reward Type
                                                </label>
                                                <select
                                                    value={reward.rewardType}
                                                    onChange={(e) => updateReward(index, 'rewardType', e.target.value)}
                                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent"
                                                    required
                                                >
                                                    <option value="cash">Cash</option>
                                                    <option value="merchandise">Merchandise</option>
                                                </select>
                                            </div>

                                            {/* Amount */}
                                            <div>
                                                <label className="block text-sm font-semibold text-gray-900 mb-2">
                                                    Amount {reward.rewardType === 'cash' && '(USD)'}
                                                </label>
                                                <div className="relative">
                                                    {reward.rewardType === 'cash' && (
                                                        <span className="absolute left-4 top-2 text-gray-500">$</span>
                                                    )}
                                                    <input
                                                        type="number"
                                                        value={reward.amount}
                                                        onChange={(e) => updateReward(index, 'amount', e.target.value)}
                                                        min="0"
                                                        step={reward.rewardType === 'cash' ? '100' : '1'}
                                                        className={`w-full ${reward.rewardType === 'cash' ? 'pl-8' : 'pl-4'} pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-800 focus:border-transparent`}
                                                        disabled={reward.rewardType === 'merchandise'}
                                                        placeholder={reward.rewardType === 'merchandise' ? 'N/A' : '0'}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Remove Button */}
                                        {rewards.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeReward(index)}
                                                className="mt-8 text-red-600 hover:text-red-700 font-semibold"
                                            >
                                                ✕
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Info Box */}
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-sm text-blue-900">
                            <strong>💡 Tip:</strong> For merchandise rewards, set the amount to 0. The reward type will indicate it's a physical prize.
                        </p>
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
                            className="flex-1 bg-gradient-to-r from-yellow-400 to-yellow-500 hover:from-yellow-500 hover:to-yellow-400 text-gray-900 font-bold py-3 px-6 rounded-lg transition-all shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            disabled={submitting}
                        >
                            {submitting ? 'Assigning Rewards...' : 'Assign Rewards'}
                        </button>
                    </div>
                </form>
            </div>

            <Footer />
        </div>
    );
};

export default ManageRewards;
