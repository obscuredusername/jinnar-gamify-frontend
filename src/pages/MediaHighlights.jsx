import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import mediaData from '../data/media';
import {
    PlayIcon,
    FilterIcon,
    TrophyIcon,
    TrendingUpIcon,
    VideoIcon,
    HeartIcon,
    MessageCircleIcon,
    ShareIcon
} from '../components/ui/Icons';
import { formatCompactNumber, formatNumber } from '../utils/format';

const MediaHighlights = () => {
    const [selectedFilter, setSelectedFilter] = useState('all');
    const [selectedDraw, setSelectedDraw] = useState('current');

    // Filter videos based on selected filter
    const filteredVideos = mediaData.featuredVideos.filter(video => {
        if (selectedFilter === 'all') return true;
        if (selectedFilter === 'featured') return video.featured;
        if (selectedFilter === 'trending') return video.trending;
        if (selectedFilter === 'top-rated') return video.points >= 10000;
        return true;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-purple-900 via-blue-800 to-teal-700 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <div className="flex items-center gap-3 mb-4">
                                <span className="text-4xl">🎬</span>
                                <h1 className="text-4xl font-bold">Media & Highlights</h1>
                            </div>
                            <p className="text-xl text-blue-100 mb-6">
                                Get inspired by the best-performing Jinnar content and official highlight reels.
                            </p>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                                    <p className="text-blue-200 text-sm">Featured Videos</p>
                                    <p className="text-2xl font-bold">{formatCompactNumber(mediaData.stats.featuredVideos)}+</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                                    <p className="text-blue-200 text-sm">Total Views</p>
                                    <p className="text-2xl font-bold">{mediaData.stats.totalViews}</p>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm px-4 py-3 rounded-lg">
                                    <p className="text-blue-200 text-sm">Highlight Reels</p>
                                    <p className="text-2xl font-bold">{mediaData.stats.highlightReels}</p>
                                </div>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl h-64 flex items-center justify-center">
                            <p className="text-gray-400 text-sm">Video Content Illustration</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Official Highlight Reels */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-12">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Official Highlight Reels</h2>
                    <p className="text-gray-600 mb-8">Monthly compilations and Draw-specific highlights</p>

                    <div className="grid md:grid-cols-3 gap-6">
                        {mediaData.highlightReels.map((reel) => (
                            <div key={reel.id} className="group cursor-pointer">
                                <div className="relative rounded-xl overflow-hidden shadow-lg mb-3 bg-gradient-to-br from-purple-100 to-blue-100 h-56 flex items-center justify-center">
                                    {/* Video Thumbnail Placeholder */}
                                    <p className="text-gray-400 text-sm">Video Thumbnail</p>

                                    {/* Play Button Overlay */}
                                    <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                        <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <PlayIcon className="w-8 h-8 text-blue-700 ml-1" />
                                        </div>
                                    </div>

                                    {/* Duration Badge */}
                                    <div className="absolute bottom-3 right-3 bg-black/75 px-2 py-1 rounded text-white text-sm font-semibold">
                                        {reel.duration}
                                    </div>

                                    {/* Official Badge */}
                                    <div className="absolute top-3 left-3 bg-red-600 px-3 py-1 rounded-full text-white text-xs font-bold">
                                        OFFICIAL
                                    </div>
                                </div>

                                <h3 className="font-bold text-lg text-gray-900 mb-1">{reel.title}</h3>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                        <VideoIcon className="w-4 h-4" />
                                        {reel.views} views
                                    </span>
                                    <span>•</span>
                                    <span>{reel.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Filter Bar */}
            <div className="bg-white border-y sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-2">
                            <FilterIcon className="w-5 h-5 text-gray-600" />
                            <span className="font-semibold text-gray-700">Filter Videos:</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                            <button
                                onClick={() => setSelectedFilter('all')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedFilter === 'all'
                                    ? 'bg-blue-800 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                All Videos
                            </button>
                            <button
                                onClick={() => setSelectedFilter('featured')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedFilter === 'featured'
                                    ? 'bg-blue-800 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                ⭐ Featured
                            </button>
                            <button
                                onClick={() => setSelectedFilter('trending')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedFilter === 'trending'
                                    ? 'bg-blue-800 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                🔥 Trending
                            </button>
                            <button
                                onClick={() => setSelectedFilter('top-rated')}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${selectedFilter === 'top-rated'
                                    ? 'bg-blue-800 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                🏆 Top Rated
                            </button>
                        </div>
                        <select
                            value={selectedDraw}
                            onChange={(e) => setSelectedDraw(e.target.value)}
                            className="ml-auto px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-700 font-medium"
                        >
                            {mediaData.availableDraws.map((draw) => (
                                <option key={draw.id} value={draw.value}>{draw.name}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Top Featured Videos */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Top Featured Videos - Draw 4</h2>
                    <p className="text-gray-600">Best-performing approved videos from the current Draw</p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredVideos.map((video) => (
                        <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow group cursor-pointer">
                            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 h-56 flex items-center justify-center">
                                {/* Video Thumbnail Placeholder */}
                                <p className="text-gray-400 text-sm">Video Thumbnail</p>

                                {/* Play Button Overlay */}
                                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <PlayIcon className="w-6 h-6 text-blue-700 ml-0.5" />
                                    </div>
                                </div>

                                {/* Badges */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    {video.featured && (
                                        <span className="bg-yellow-500 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                            ⭐ FEATURED
                                        </span>
                                    )}
                                    {video.trending && (
                                        <span className="bg-red-600 text-white px-2 py-1 rounded text-xs font-bold flex items-center gap-1">
                                            🔥 TRENDING
                                        </span>
                                    )}
                                </div>

                                {/* Points Badge */}
                                <div className="absolute bottom-3 right-3 bg-blue-800 text-white px-3 py-1 rounded-full text-sm font-bold">
                                    {formatNumber(video.points)} pts
                                </div>
                            </div>

                            <div className="p-5">
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                                        {video.creator[0]}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-gray-900">{video.creator}</h3>
                                        <p className="text-sm text-gray-600">{video.flag} {video.country}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-2 text-center text-sm">
                                    <div>
                                        <div className="flex items-center justify-center gap-1 text-gray-600 mb-1">
                                            <VideoIcon className="w-4 h-4" />
                                        </div>
                                        <p className="font-semibold text-gray-900 text-xs">{formatCompactNumber(video.views)}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center gap-1 text-red-500 mb-1">
                                            <HeartIcon className="w-4 h-4" filled={true} />
                                        </div>
                                        <p className="font-semibold text-gray-900 text-xs">{formatCompactNumber(video.likes)}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center gap-1 text-blue-500 mb-1">
                                            <MessageCircleIcon className="w-4 h-4" />
                                        </div>
                                        <p className="font-semibold text-gray-900 text-xs">{formatCompactNumber(video.comments)}</p>
                                    </div>
                                    <div>
                                        <div className="flex items-center justify-center gap-1 text-green-500 mb-1">
                                            <ShareIcon className="w-4 h-4" />
                                        </div>
                                        <p className="font-semibold text-gray-900 text-xs">{formatCompactNumber(video.shares)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="text-center mt-8">
                    <button className="px-8 py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-bold transition-colors">
                        Load More Videos
                    </button>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-gradient-to-r from-blue-800 to-teal-600 py-16 px-6">
                <div className="max-w-4xl mx-auto text-center text-white">
                    <h2 className="text-3xl font-bold mb-4">Want Your Video Featured Here?</h2>
                    <p className="text-xl mb-8 text-blue-100">
                        Create amazing content, earn points, and get featured on our highlight reels and promotional materials.
                    </p>
                    <div className="flex gap-4 justify-center flex-wrap">
                        <Link to="/upload">
                            <button className="px-8 py-3 bg-yellow-400 hover:bg-yellow-500 text-gray-900 rounded-lg font-bold text-lg transition-colors">
                                Upload Your Video
                            </button>
                        </Link>
                        <Link to="/rules">
                            <button className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-800 rounded-lg font-bold text-lg transition-colors">
                                View Rules & Guidelines
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default MediaHighlights;
