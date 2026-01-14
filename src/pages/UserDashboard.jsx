import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../store/slices/userSlice';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const UserDashboard = () => {
    const [activeTab, setActiveTab] = useState('overview');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logout());
        navigate('/home');
    };

    // TODO: Replace all data with API calls - Everything comes from backend
    const userData = {
        name: "Sarah Mwangi",
        username: "@sarahmwangi",
        email: "sarah.mwangi@email.com",
        country: "Kenya",
        city: "Nairobi",
        flag: "🇰🇪",
        joinDate: "Nov 15, 2025",
        avatar: "/avatar-sarah.jpg",
        verified: true
    };

    const stats = {
        totalPoints: 8450,
        globalRank: 128,
        countryRank: 14,
        videosSubmitted: 5,
        videosApproved: 4,
        videosRejected: 1,
        activeDraws: 1
    };

    const submissions = [
        {
            id: 1,
            title: "Jinnar Empowers Local Communities",
            draw: "Draw 4",
            status: "approved",
            submittedDate: "Dec 18, 2025",
            approvedDate: "Dec 19, 2025",
            points: 3240,
            thumbnail: "/video-thumb-1.jpg",
            views: "12.3K",
            likes: "2.1K",
            posted: true
        },
        {
            id: 2,
            title: "How Jinnar Changed My Business",
            draw: "Draw 4",
            status: "approved",
            submittedDate: "Dec 15, 2025",
            approvedDate: "Dec 16, 2025",
            points: 2890,
            thumbnail: "/video-thumb-2.jpg",
            views: "9.8K",
            likes: "1.7K",
            posted: true
        },
        {
            id: 3,
            title: "Jinnar Workers Success Story",
            draw: "Draw 4",
            status: "pending",
            submittedDate: "Dec 20, 2025",
            approvedDate: null,
            points: 0,
            thumbnail: "/video-thumb-3.jpg",
            views: "-",
            likes: "-",
            posted: false
        },
        {
            id: 4,
            title: "Community Impact Video",
            draw: "Draw 3",
            status: "approved",
            submittedDate: "Dec 5, 2025",
            approvedDate: "Dec 6, 2025",
            points: 2320,
            thumbnail: "/video-thumb-4.jpg",
            views: "8.2K",
            likes: "1.5K",
            posted: true
        },
        {
            id: 5,
            title: "Digital Excellence Story",
            draw: "Draw 3",
            status: "rejected",
            submittedDate: "Dec 3, 2025",
            approvedDate: null,
            points: 0,
            thumbnail: "/video-thumb-5.jpg",
            views: "-",
            likes: "-",
            posted: false,
            feedback: "Video does not align with Draw 3 theme. Please review theme guidelines and resubmit."
        }
    ];

    const rewards = [
        {
            draw: "Draw 3",
            rank: 24,
            reward: "Recognition Certificate",
            status: "Received",
            date: "Dec 18, 2025"
        }
    ];

    const recentActivity = [
        {
            type: "approved",
            title: "Video Approved",
            description: '"Jinnar Empowers Local Communities" - Dec 19, 2025',
            icon: "check"
        },
        {
            type: "pending",
            title: "Video Under Review",
            description: '"Jinnar Workers Success Story" - Dec 20, 2025',
            icon: "clock"
        },
        {
            type: "rank",
            title: "Rank Updated",
            description: "Moved to #128 in Draw 4 - Dec 19, 2025",
            icon: "trending"
        }
    ];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid lg:grid-cols-12 gap-6">

                    {/* Left Sidebar - Profile Card */}
                    <div className="lg:col-span-3">
                        <div className="bg-white rounded-xl shadow-md p-6 sticky top-24">
                            <div className="text-center mb-6">
                                <div className="relative inline-block mb-4">
                                    <div className="w-24 h-24 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center border-4 border-blue-100">
                                        <span className="text-4xl">{userData.flag}</span>
                                    </div>
                                    {userData.verified && (
                                        <div className="absolute bottom-0 right-0 w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center border-2 border-white">
                                            <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">{userData.name}</h2>
                                <p className="text-gray-600 text-sm">{userData.username}</p>
                                <p className="text-gray-500 text-sm flex items-center justify-center gap-1 mt-1">
                                    <span className="text-lg">{userData.flag}</span>
                                    {userData.city}, {userData.country}
                                </p>
                            </div>

                            <div className="space-y-3 mb-6">
                                <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-lg p-3">
                                    <p className="text-xs text-gray-600 mb-1">Total Points</p>
                                    <p className="text-2xl font-bold text-blue-700">{stats.totalPoints.toLocaleString()}</p>
                                </div>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="bg-yellow-50 rounded-lg p-3">
                                        <p className="text-xs text-gray-600 mb-1">Global Rank</p>
                                        <p className="text-lg font-bold text-yellow-700">#{stats.globalRank}</p>
                                    </div>
                                    <div className="bg-green-50 rounded-lg p-3">
                                        <p className="text-xs text-gray-600 mb-1">Country Rank</p>
                                        <p className="text-lg font-bold text-green-700">#{stats.countryRank}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Link to="/settings">
                                    <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 flex items-center justify-center gap-2">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        Settings
                                    </button>
                                </Link>
                                <button
                                    onClick={handleLogout}
                                    className="w-full px-4 py-2 bg-red-50 text-red-600 rounded-lg font-medium hover:bg-red-100 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                                    </svg>
                                    Log Out
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Area */}
                    <div className="lg:col-span-9">

                        {/* Stats Overview Cards */}
                        <div className="grid md:grid-cols-4 gap-4 mb-6">
                            <div className="bg-white rounded-xl shadow-md p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                    </svg>
                                    <span className="text-2xl font-bold text-gray-900">{stats.videosSubmitted}</span>
                                </div>
                                <p className="text-sm text-gray-600">Videos Submitted</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <svg className="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                    </svg>
                                    <span className="text-2xl font-bold text-gray-900">{stats.videosApproved}</span>
                                </div>
                                <p className="text-sm text-gray-600">Approved</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    <span className="text-2xl font-bold text-gray-900">{stats.activeDraws}</span>
                                </div>
                                <p className="text-sm text-gray-600">Active Draws</p>
                            </div>

                            <div className="bg-white rounded-xl shadow-md p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <svg className="w-8 h-8 text-yellow-600" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                    </svg>
                                    <span className="text-2xl font-bold text-gray-900">{rewards.length}</span>
                                </div>
                                <p className="text-sm text-gray-600">Rewards Earned</p>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white rounded-xl shadow-md mb-6">
                            <div className="border-b">
                                <div className="flex gap-1 p-2 flex-wrap">
                                    {['overview', 'submissions', 'rewards'].map(tab => (
                                        <button
                                            key={tab}
                                            onClick={() => setActiveTab(tab)}
                                            className={`px-6 py-3 rounded-lg font-semibold transition-colors ${activeTab === tab
                                                    ? 'bg-blue-800 text-white'
                                                    : 'text-gray-600 hover:bg-gray-100'
                                                }`}
                                        >
                                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="p-6">

                                {/* Overview Tab */}
                                {activeTab === 'overview' && (
                                    <div className="space-y-6">
                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">Quick Actions</h3>
                                            <div className="grid md:grid-cols-2 gap-4">
                                                <Link to="/upload">
                                                    <button className="w-full p-4 bg-gradient-to-r from-blue-800 to-teal-600 text-white rounded-xl hover:shadow-lg transition-shadow flex items-center gap-3">
                                                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                                                        </svg>
                                                        <div className="text-left">
                                                            <p className="font-bold">Upload New Video</p>
                                                            <p className="text-sm text-blue-100">Submit for approval</p>
                                                        </div>
                                                    </button>
                                                </Link>
                                                <button className="w-full p-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:shadow-lg transition-shadow flex items-center gap-3">
                                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                                    </svg>
                                                    <div className="text-left">
                                                        <p className="font-bold">Submit Post Link</p>
                                                        <p className="text-sm text-purple-100">Track your engagement</p>
                                                    </div>
                                                </button>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">Current Draw Status</h3>
                                            <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-xl p-6 border-2 border-blue-200">
                                                <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
                                                    <div>
                                                        <h4 className="text-lg font-bold text-gray-900">Draw 4 - Pan-African Spotlight</h4>
                                                        <p className="text-sm text-gray-600">Closes: Dec 30, 2025</p>
                                                    </div>
                                                    <span className="px-3 py-1 bg-green-500 text-white rounded-full text-sm font-bold">Active</span>
                                                </div>
                                                <div className="grid md:grid-cols-3 gap-4 mb-4">
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Your Rank</p>
                                                        <p className="text-2xl font-bold text-blue-700">#128</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Points Earned</p>
                                                        <p className="text-2xl font-bold text-blue-700">6,130</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-sm text-gray-600 mb-1">Videos Posted</p>
                                                        <p className="text-2xl font-bold text-blue-700">2</p>
                                                    </div>
                                                </div>
                                                <Link to="/leaderboards">
                                                    <button className="w-full py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-semibold transition-colors">
                                                        View Full Leaderboard
                                                    </button>
                                                </Link>
                                            </div>
                                        </div>

                                        <div>
                                            <h3 className="text-xl font-bold text-gray-900 mb-4">Recent Activity</h3>
                                            <div className="space-y-3">
                                                {recentActivity.map((activity, idx) => (
                                                    <div key={idx} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                                        {activity.icon === 'check' && (
                                                            <svg className="w-5 h-5 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                                <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                            </svg>
                                                        )}
                                                        {activity.icon === 'clock' && (
                                                            <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                            </svg>
                                                        )}
                                                        {activity.icon === 'trending' && (
                                                            <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                                            </svg>
                                                        )}
                                                        <div className="flex-1">
                                                            <p className="font-semibold text-gray-900">{activity.title}</p>
                                                            <p className="text-sm text-gray-600">{activity.description}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Submissions Tab */}
                                {activeTab === 'submissions' && (
                                    <div>
                                        <div className="flex items-center justify-between mb-6 flex-wrap gap-3">
                                            <h3 className="text-xl font-bold text-gray-900">My Video Submissions</h3>
                                            <Link to="/upload">
                                                <button className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-semibold transition-colors">
                                                    Upload New Video
                                                </button>
                                            </Link>
                                        </div>

                                        <div className="space-y-4">
                                            {submissions.map(video => (
                                                <div key={video.id} className="bg-gray-50 rounded-xl p-4 border-l-4 border-blue-500">
                                                    <div className="flex gap-4 flex-wrap">
                                                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg w-32 h-24 flex items-center justify-center flex-shrink-0">
                                                            <p className="text-gray-400 text-xs">Thumbnail</p>
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                                                                <div>
                                                                    <h4 className="font-bold text-gray-900 text-lg">{video.title}</h4>
                                                                    <p className="text-sm text-gray-600">{video.draw}</p>
                                                                </div>
                                                                <span className={`px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap ${video.status === 'approved' ? 'bg-green-100 text-green-700' :
                                                                        video.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                                            'bg-red-100 text-red-700'
                                                                    }`}>
                                                                    {video.status === 'approved' ? '✓ Approved' :
                                                                        video.status === 'pending' ? '⏳ Pending' :
                                                                            '✗ Rejected'}
                                                                </span>
                                                            </div>

                                                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-3">
                                                                <div>
                                                                    <p className="text-xs text-gray-600">Submitted</p>
                                                                    <p className="text-sm font-semibold text-gray-900">{video.submittedDate}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-600">Points</p>
                                                                    <p className="text-sm font-semibold text-blue-700">{video.points.toLocaleString()}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-600">Views</p>
                                                                    <p className="text-sm font-semibold text-gray-900">{video.views}</p>
                                                                </div>
                                                                <div>
                                                                    <p className="text-xs text-gray-600">Likes</p>
                                                                    <p className="text-sm font-semibold text-gray-900">{video.likes}</p>
                                                                </div>
                                                            </div>

                                                            {video.feedback && (
                                                                <div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-3">
                                                                    <p className="text-sm text-red-800"><strong>Feedback:</strong> {video.feedback}</p>
                                                                </div>
                                                            )}

                                                            <div className="flex gap-2 flex-wrap">
                                                                {video.status === 'approved' && !video.posted && (
                                                                    <button className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-sm font-semibold transition-colors">
                                                                        Submit Post Link
                                                                    </button>
                                                                )}
                                                                {video.status === 'approved' && video.posted && (
                                                                    <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-semibold hover:bg-gray-300">
                                                                        View Performance
                                                                    </button>
                                                                )}
                                                                {video.status === 'rejected' && (
                                                                    <button className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg text-sm font-semibold transition-colors">
                                                                        Resubmit Video
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Rewards Tab */}
                                {activeTab === 'rewards' && (
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-6">My Rewards & Achievements</h3>

                                        {rewards.length > 0 ? (
                                            <div className="space-y-4">
                                                {rewards.map((reward, idx) => (
                                                    <div key={idx} className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-xl p-6 border-2 border-yellow-200">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0">
                                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                                                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                                </svg>
                                                            </div>
                                                            <div className="flex-1">
                                                                <h4 className="text-lg font-bold text-gray-900">{reward.draw} Winner</h4>
                                                                <p className="text-gray-700">Rank: #{reward.rank} • {reward.reward}</p>
                                                                <p className="text-sm text-gray-600">Status: {reward.status} - {reward.date}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        ) : (
                                            <div className="text-center py-12">
                                                <svg className="w-16 h-16 text-gray-300 mx-auto mb-4" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                                </svg>
                                                <p className="text-gray-600">No rewards yet. Keep creating great content!</p>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UserDashboard;
