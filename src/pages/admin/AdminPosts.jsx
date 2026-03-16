import { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import { useToast } from '../../contexts/ToastContext';
import viralService from '../../services/viralService';

const AdminPosts = () => {
    const toast = useToast();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedPost, setSelectedPost] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [formData, setFormData] = useState({
        verified: false,
        fraudFlag: false,
        likes: 0,
        views: 0,
        shares: 0,
    });

    useEffect(() => {
        loadPosts();
    }, []);

    const loadPosts = async () => {
        try {
            setLoading(true);
            // Note: We'll need to add this endpoint to get all posts
            // For now, using submissions as placeholder
            const response = await viralService.getMySubmissions();
            const data = response?.data || (Array.isArray(response) ? response : []);
            setPosts(data);
        } catch (error) {
            console.error('Failed to load posts:', error);
        } finally {
            setLoading(false);
        }
    };

    const openEditModal = (post) => {
        setSelectedPost(post);
        setFormData({
            verified: post.verified || false,
            fraudFlag: post.fraudFlag || false,
            likes: post.engagement?.likes || 0,
            views: post.engagement?.views || 0,
            shares: post.engagement?.shares || 0,
        });
        setShowModal(true);
    };

    const handleUpdate = async () => {
        if (!selectedPost) return;

        try {
            await adminService.updatePost(selectedPost._id, {
                verified: formData.verified,
                fraudFlag: formData.fraudFlag,
                engagement: {
                    likes: parseInt(formData.likes),
                    views: parseInt(formData.views),
                    shares: parseInt(formData.shares),
                },
            });

            // Reload posts
            await loadPosts();
            setShowModal(false);
            setSelectedPost(null);
        } catch (error) {
            console.error('Failed to update post:', error);
            toast.error('Failed to update post');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Post Management</h1>
                        <p className="text-gray-600">Manage social media posts and engagement metrics</p>
                    </div>
                </div>

                {/* Posts Grid */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading posts...</p>
                    </div>
                ) : posts.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <p className="text-gray-500 text-lg">No posts found</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {posts.map((post) => (
                            <div key={post._id} className="bg-white rounded-lg shadow-sm p-6">
                                <div className="mb-4">
                                    <h3 className="font-semibold text-lg text-gray-900 mb-2">
                                        {post.title || 'Untitled Post'}
                                    </h3>
                                    <div className="flex gap-2 mb-3">
                                        {post.verified && (
                                            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                                                ✓ Verified
                                            </span>
                                        )}
                                        {post.fraudFlag && (
                                            <span className="px-2 py-1 bg-red-100 text-red-800 text-xs rounded-full">
                                                ⚠ Fraud
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2 text-sm text-gray-600 mb-4">
                                    <div className="flex justify-between">
                                        <span>Likes:</span>
                                        <span className="font-medium">{post.engagement?.likes || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Views:</span>
                                        <span className="font-medium">{post.engagement?.views || 0}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Shares:</span>
                                        <span className="font-medium">{post.engagement?.shares || 0}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => openEditModal(post)}
                                    className="w-full bg-blue-800 hover:bg-blue-900 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                                >
                                    Edit Post
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* Edit Modal */}
                {showModal && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                        <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
                            <h2 className="text-xl font-bold mb-4">Edit Post</h2>

                            <div className="space-y-4 mb-6">
                                {/* Verification Toggle */}
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.verified}
                                        onChange={(e) => setFormData({ ...formData, verified: e.target.checked })}
                                        className="w-4 h-4 text-blue-600 rounded"
                                    />
                                    <span className="ml-2 text-gray-700">Verified</span>
                                </label>

                                {/* Fraud Flag Toggle */}
                                <label className="flex items-center">
                                    <input
                                        type="checkbox"
                                        checked={formData.fraudFlag}
                                        onChange={(e) => setFormData({ ...formData, fraudFlag: e.target.checked })}
                                        className="w-4 h-4 text-red-600 rounded"
                                    />
                                    <span className="ml-2 text-gray-700">Flag as Fraud</span>
                                </label>

                                {/* Engagement Metrics */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Likes</label>
                                    <input
                                        type="number"
                                        value={formData.likes}
                                        onChange={(e) => setFormData({ ...formData, likes: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Views</label>
                                    <input
                                        type="number"
                                        value={formData.views}
                                        onChange={(e) => setFormData({ ...formData, views: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-1">Shares</label>
                                    <input
                                        type="number"
                                        value={formData.shares}
                                        onChange={(e) => setFormData({ ...formData, shares: e.target.value })}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>
                            </div>

                            <div className="flex gap-3 justify-end">
                                <button
                                    onClick={() => setShowModal(false)}
                                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleUpdate}
                                    className="px-4 py-2 bg-blue-800 text-white rounded-lg hover:bg-blue-900"
                                >
                                    Update Post
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminPosts;
