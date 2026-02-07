import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import viralService from '../services/viralService';

const SubmitPostLink = () => {
    const navigate = useNavigate();
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [postLink, setPostLink] = useState('');
    const [screenshotFile, setScreenshotFile] = useState(null);
    const [submissionMethod, setSubmissionMethod] = useState('link');
    const [selectedVideo, setSelectedVideo] = useState(null);

    // Data state
    const [approvedVideos, setApprovedVideos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [message, setMessage] = useState(null); // { type: 'success'|'error', text: '' }

    const platforms = [
        { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'from-pink-500 to-purple-600', supported: true },
        { id: 'instagram', name: 'Instagram', icon: '📷', color: 'from-purple-500 to-pink-500', supported: true },
        { id: 'facebook', name: 'Facebook', icon: '👥', color: 'from-blue-600 to-blue-700', supported: true },
        { id: 'youtube', name: 'YouTube Shorts', icon: '▶️', color: 'from-red-600 to-red-700', supported: true }
    ];

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await viralService.getMySubmissions();
                if (response.success) { // Assuming wrapper returns { success: true, data: [...] } or direct array based on previous files. 
                    // Let's assume response.data is the array if using the service pattern seen in UserDashboard.
                    // Wait, getMySubmissions in UserDashboard setSubmissions(submissionsRes.data). 
                    // So response is the full object.

                    const submissions = response.data || [];
                    // Filter for approved videos. 
                    // Note: API might not support 'posted' flag yet, so we show all approved.
                    // Ideally backend filters those already posted, or we check a property.
                    // For now, listing all 'approved' videos.
                    const approved = submissions.filter(v => v.status === 'approved');
                    setApprovedVideos(approved);

                    // Auto-select first unposted if available (logic might need adjustment if 'posted' field missing)
                    if (approved.length > 0) {
                        setSelectedVideo(approved[0]);
                    }
                }
            } catch (error) {
                console.error("Failed to fetch videos", error);
            } finally {
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setScreenshotFile(e.target.files[0]);
        }
    };

    const handleSubmit = async () => {
        if (!selectedVideo || !selectedPlatform) return;
        if (submissionMethod === 'link' && !postLink) return;
        if (submissionMethod === 'screenshot' && !screenshotFile) return;

        setSubmitting(true);
        setMessage(null);

        try {
            await viralService.submitPost({
                submissionId: selectedVideo._id,
                drawId: selectedVideo.drawId, // Ensure submission object has drawId
                platform: selectedPlatform,
                postUrl: postLink,
                screenshot: screenshotFile
            });

            setMessage({ type: 'success', text: 'Post submitted successfully! Tracking started.' });

            // Optional: reset form or navigate
            setTimeout(() => {
                navigate('/dashboard');
            }, 2000);

        } catch (error) {
            console.error("Submission failed", error);
            setMessage({ type: 'error', text: error.response?.data?.message || 'Failed to submit post.' });
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-900 via-pink-900 to-purple-900 text-white py-12 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Submit Your Post Link</h1>
                    <p className="text-xl text-purple-100">
                        Link your posted video to start earning points from real engagement
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">

                {message && (
                    <div className={`mb-6 p-4 rounded-lg text-center font-semibold ${message.type === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                        {message.text}
                    </div>
                )}

                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Main Submission Form */}
                    <div className="lg:col-span-2">
                        <div className="space-y-6">

                            {/* Step 1: Select Video */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Select Approved Video</h2>
                                </div>

                                <div className="space-y-3">
                                    {loading ? (
                                        <div className="text-center py-4 text-gray-500">Loading videos...</div>
                                    ) : approvedVideos.length > 0 ? (
                                        approvedVideos.map(video => (
                                            <div
                                                key={video._id}
                                                onClick={() => setSelectedVideo(video)}
                                                className={`flex gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedVideo?._id === video._id
                                                    ? 'border-purple-700 bg-purple-50'
                                                    : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg w-32 h-24 flex items-center justify-center flex-shrink-0">
                                                    <span className="text-gray-400 text-xs text-center p-1">
                                                        {video.videoUrl ? 'Video' : 'No Media'}
                                                    </span>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
                                                        <h3 className="font-bold text-gray-900 line-clamp-1">{video.title}</h3>
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full whitespace-nowrap">
                                                            ✓ Approved
                                                        </span>
                                                    </div>
                                                    <p className="text-xs text-gray-500 mt-1">ID: {video._id}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 bg-gray-50 rounded-xl">
                                            <p className="text-gray-600 mb-2">No approved videos found.</p>
                                            <Link to="/upload">
                                                <button className="px-4 py-2 bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-semibold transition-colors">
                                                    Upload New Video
                                                </button>
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Step 2: Select Platform */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Select Platform</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-3">
                                    {platforms.map(platform => (
                                        <div
                                            key={platform.id}
                                            onClick={() => setSelectedPlatform(platform.id)}
                                            className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedPlatform === platform.id
                                                ? 'border-purple-700 bg-purple-50'
                                                : 'border-gray-200 hover:border-purple-300'
                                                }`}
                                        >
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 bg-gradient-to-br ${platform.color} rounded-xl flex items-center justify-center`}>
                                                    <span className="text-2xl">{platform.icon}</span>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{platform.name}</h3>
                                                    <p className="text-xs text-gray-600">
                                                        {platform.supported ? 'Supported' : 'Coming Soon'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Step 3: Submission Method */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-purple-700 text-white rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Choose Submission Method</h2>
                                </div>

                                <div className="grid md:grid-cols-2 gap-3 mb-6">
                                    <div
                                        onClick={() => setSubmissionMethod('link')}
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${submissionMethod === 'link'
                                            ? 'border-purple-700 bg-purple-50'
                                            : 'border-gray-200 hover:border-purple-300'
                                            }`}
                                    >
                                        <h3 className="font-bold text-gray-900 mb-1">Post Link</h3>
                                        <p className="text-xs text-gray-600">Paste your video URL</p>
                                    </div>

                                    <div
                                        onClick={() => setSubmissionMethod('screenshot')}
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${submissionMethod === 'screenshot'
                                            ? 'border-purple-700 bg-purple-50'
                                            : 'border-gray-200 hover:border-purple-300'
                                            }`}
                                    >
                                        <h3 className="font-bold text-gray-900 mb-1">Screenshot</h3>
                                        <p className="text-xs text-gray-600">Upload proof image</p>
                                    </div>
                                </div>

                                {/* Link Input */}
                                {submissionMethod === 'link' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Paste Your Post Link
                                        </label>
                                        <input
                                            type="url"
                                            value={postLink}
                                            onChange={(e) => setPostLink(e.target.value)}
                                            placeholder="https://tiktok.com/@user/video/..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                                        />
                                    </div>
                                )}

                                {/* Screenshot Upload */}
                                {submissionMethod === 'screenshot' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Upload Screenshot
                                        </label>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleFileChange}
                                            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={submitting || !selectedVideo || !selectedPlatform || (submissionMethod === 'link' ? !postLink : !screenshotFile)}
                                className="w-full py-4 bg-purple-700 text-white rounded-xl font-bold text-lg hover:bg-purple-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                {submitting ? 'Submitting...' : 'Submit Post & Start Tracking →'}
                            </button>
                        </div>
                    </div>

                    {/* Right Sidebar */}
                    <div className="lg:col-span-1">
                        <div className="bg-gradient-to-br from-purple-700 to-pink-600 rounded-xl shadow-md p-6 text-white sticky top-24">
                            <h3 className="font-bold mb-3">Point Calculation</h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span>1 Like</span>
                                    <span className="font-bold">+1 pt</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>1 Comment</span>
                                    <span className="font-bold">+2 pts</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>1 Share</span>
                                    <span className="font-bold">+3 pts</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>1 View</span>
                                    <span className="font-bold">+0.10 pt</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SubmitPostLink;
