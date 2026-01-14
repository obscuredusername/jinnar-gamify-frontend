import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const SubmitPostLink = () => {
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [postLink, setPostLink] = useState('');
    const [screenshotFile, setScreenshotFile] = useState(null);
    const [submissionMethod, setSubmissionMethod] = useState('link');
    const [selectedVideo, setSelectedVideo] = useState(null);

    // TODO: Replace with API call - Fetch user's approved videos from backend
    const approvedVideos = [
        {
            id: 1,
            title: "Jinnar Empowers Local Communities",
            draw: "Draw 4",
            approvedDate: "Dec 19, 2025",
            thumbnail: "/video-thumb-1.jpg",
            posted: false
        },
        {
            id: 2,
            title: "How Jinnar Changed My Business",
            draw: "Draw 4",
            approvedDate: "Dec 16, 2025",
            thumbnail: "/video-thumb-2.jpg",
            posted: true,
            platform: "TikTok",
            points: 2890
        }
    ];

    const platforms = [
        { id: 'tiktok', name: 'TikTok', icon: '🎵', color: 'from-pink-500 to-purple-600', supported: true },
        { id: 'instagram', name: 'Instagram', icon: '📷', color: 'from-purple-500 to-pink-500', supported: true },
        { id: 'facebook', name: 'Facebook', icon: '👥', color: 'from-blue-600 to-blue-700', supported: true },
        { id: 'youtube', name: 'YouTube Shorts', icon: '▶️', color: 'from-red-600 to-red-700', supported: true }
    ];

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setScreenshotFile(e.target.files[0]);
        }
    };

    const handleSubmit = () => {
        if (selectedVideo && selectedPlatform && ((submissionMethod === 'link' && postLink) || (submissionMethod === 'screenshot' && screenshotFile))) {
            // TODO: Replace with actual API call to submit post link
            alert('Post link submitted successfully! Points tracking will begin shortly.');
        }
    };

    // Set initial selected video
    React.useEffect(() => {
        const unpostedVideo = approvedVideos.find(v => !v.posted);
        if (unpostedVideo) {
            setSelectedVideo(unpostedVideo);
        }
    }, []);

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
                                    {approvedVideos.filter(v => !v.posted).length > 0 ? (
                                        approvedVideos.filter(v => !v.posted).map(video => (
                                            <div
                                                key={video.id}
                                                onClick={() => setSelectedVideo(video)}
                                                className={`flex gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedVideo?.id === video.id
                                                        ? 'border-purple-700 bg-purple-50'
                                                        : 'border-gray-200 hover:border-purple-300'
                                                    }`}
                                            >
                                                <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg w-32 h-24 flex items-center justify-center flex-shrink-0">
                                                    <p className="text-gray-400 text-xs">Thumbnail</p>
                                                </div>
                                                <div className="flex-1">
                                                    <div className="flex items-start justify-between mb-1 flex-wrap gap-2">
                                                        <h3 className="font-bold text-gray-900">{video.title}</h3>
                                                        <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full whitespace-nowrap">
                                                            ✓ Approved
                                                        </span>
                                                    </div>
                                                    <p className="text-sm text-gray-600">{video.draw}</p>
                                                    <p className="text-xs text-gray-500 mt-1">Approved: {video.approvedDate}</p>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center py-8 bg-gray-50 rounded-xl">
                                            <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                            </svg>
                                            <p className="text-gray-600 mb-2">No approved videos available to post</p>
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
                                        <div className="flex items-center gap-3 mb-2">
                                            <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                            </svg>
                                            <h3 className="font-bold text-gray-900">Post Link</h3>
                                        </div>
                                        <p className="text-sm text-gray-600">Paste your video URL for automatic tracking</p>
                                    </div>

                                    <div
                                        onClick={() => setSubmissionMethod('screenshot')}
                                        className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${submissionMethod === 'screenshot'
                                                ? 'border-purple-700 bg-purple-50'
                                                : 'border-gray-200 hover:border-purple-300'
                                            }`}
                                    >
                                        <div className="flex items-center gap-3 mb-2">
                                            <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <h3 className="font-bold text-gray-900">Screenshot</h3>
                                        </div>
                                        <p className="text-sm text-gray-600">Upload a screenshot of your posted video</p>
                                    </div>
                                </div>

                                {/* Link Input */}
                                {submissionMethod === 'link' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Paste Your Post Link
                                        </label>
                                        <div className="flex gap-2">
                                            <input
                                                type="url"
                                                value={postLink}
                                                onChange={(e) => setPostLink(e.target.value)}
                                                placeholder="https://tiktok.com/@user/video/123456..."
                                                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                                            />
                                        </div>
                                        <p className="text-xs text-gray-500 mt-2">
                                            Make sure your post is public and includes the required hashtags
                                        </p>
                                    </div>
                                )}

                                {/* Screenshot Upload */}
                                {submissionMethod === 'screenshot' && (
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Upload Screenshot
                                        </label>
                                        {!screenshotFile ? (
                                            <label className="block border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-purple-400 bg-gray-50 transition-colors">
                                                <svg className="w-12 h-12 text-gray-400 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <p className="text-gray-700 font-semibold mb-1">Click to upload screenshot</p>
                                                <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleFileChange}
                                                    className="hidden"
                                                />
                                            </label>
                                        ) : (
                                            <div className="border-2 border-green-500 bg-green-50 rounded-xl p-4 flex items-center justify-between flex-wrap gap-4">
                                                <div className="flex items-center gap-3">
                                                    <svg className="w-6 h-6 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                                                        <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                    </svg>
                                                    <div>
                                                        <p className="font-semibold text-gray-900">{screenshotFile.name}</p>
                                                        <p className="text-sm text-gray-600">
                                                            {(screenshotFile.size / (1024 * 1024)).toFixed(2)} MB
                                                        </p>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => setScreenshotFile(null)}
                                                    className="text-red-600 hover:text-red-700 font-semibold text-sm"
                                                >
                                                    Remove
                                                </button>
                                            </div>
                                        )}
                                        <p className="text-xs text-gray-500 mt-2">
                                            Screenshot should clearly show your video post with engagement metrics
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                onClick={handleSubmit}
                                disabled={!selectedVideo || !selectedPlatform || (submissionMethod === 'link' ? !postLink : !screenshotFile)}
                                className="w-full py-4 bg-purple-700 text-white rounded-xl font-bold text-lg hover:bg-purple-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                {!selectedVideo
                                    ? 'Please Select a Video'
                                    : !selectedPlatform
                                        ? 'Please Select a Platform'
                                        : submissionMethod === 'link' && !postLink
                                            ? 'Please Enter Post Link'
                                            : submissionMethod === 'screenshot' && !screenshotFile
                                                ? 'Please Upload Screenshot'
                                                : 'Submit Post & Start Tracking →'}
                            </button>
                        </div>
                    </div>

                    {/* Right Sidebar - Info & Posted Videos */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6 sticky top-24">

                            {/* What Happens Next */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-purple-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                                    </svg>
                                    What Happens Next
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                                            1
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Verification</p>
                                            <p className="text-gray-600">We verify your post exists and is public</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                                            2
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Tracking Begins</p>
                                            <p className="text-gray-600">Real-time engagement tracking starts</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 bg-purple-100 text-purple-700 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                                            3
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Points Updated</p>
                                            <p className="text-gray-600">Points appear in your dashboard</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Point Calculation */}
                            <div className="bg-gradient-to-br from-purple-700 to-pink-600 rounded-xl shadow-md p-6 text-white">
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
                                        <span>1 Save</span>
                                        <span className="font-bold">+2 pts</span>
                                    </div>
                                    <div className="flex justify-between border-t border-white/20 pt-2 mt-2">
                                        <span>1 View</span>
                                        <span className="font-bold">+0.10 pt</span>
                                    </div>
                                </div>
                            </div>

                            {/* Already Posted */}
                            {approvedVideos.filter(v => v.posted).length > 0 && (
                                <div className="bg-white rounded-xl shadow-md p-6">
                                    <h3 className="font-bold text-gray-900 mb-4">Already Posted</h3>
                                    <div className="space-y-3">
                                        {approvedVideos.filter(v => v.posted).map(video => (
                                            <div key={video.id} className="p-3 bg-gray-50 rounded-lg">
                                                <p className="font-semibold text-gray-900 text-sm mb-1">{video.title}</p>
                                                <div className="flex items-center justify-between text-xs">
                                                    <span className="text-gray-600">{video.platform}</span>
                                                    <span className="font-bold text-purple-700">{video.points.toLocaleString()} pts</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default SubmitPostLink;
