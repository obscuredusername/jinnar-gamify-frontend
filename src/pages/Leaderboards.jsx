import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import leaderboardsData from '../data/leaderboards';

const Leaderboards = () => {
    const [selectedDraw, setSelectedDraw] = useState(leaderboardsData.activeDraw.number);
    const [viewType, setViewType] = useState('current'); // current, all-time
    const [filterType, setFilterType] = useState('global'); // global, country, city
    const [searchUsername, setSearchUsername] = useState('');

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-12 px-6 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-10 right-20 text-6xl">🏆</div>
                    <div className="absolute top-20 left-10 text-5xl">👑</div>
                    <div className="absolute bottom-10 right-1/4 text-4xl">⭐</div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-4xl font-bold mb-4">Jinnar Viral Leaderboard</h1>
                            <p className="text-lg mb-6 opacity-90">
                                See who's leading each Draw — globally, by country, and by city.
                            </p>
                            <div className="flex gap-3">
                                <Link to="/challenge">
                                    <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2.5 px-6 rounded-md transition-colors">
                                        Draw {leaderboardsData.activeDraw.number} — Active
                                    </button>
                                </Link>
                                <Link to="/upload">
                                    <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2.5 px-6 rounded-md transition-colors flex items-center gap-2">
                                        Upload Video for Approval
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                        </svg>
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl h-64 flex items-center justify-center">
                            <p className="text-gray-400 text-sm">Leaderboard Illustration</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">

                {/* Filters Bar */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex gap-3 items-center flex-wrap">
                        {/* Draw Selector */}
                        <div className="flex items-center gap-2">
                            <span className="text-red-500 text-xl">🔥</span>
                            <select
                                value={selectedDraw}
                                onChange={(e) => setSelectedDraw(Number(e.target.value))}
                                className="border border-gray-300 rounded-md px-3 py-2 text-sm font-medium"
                            >
                                {leaderboardsData.availableDraws.map((draw) => (
                                    <option key={draw.id} value={draw.id}>
                                        {draw.name} ({draw.status})
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Filter Buttons */}
                        <button
                            onClick={() => setFilterType('global')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterType === 'global' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Global
                        </button>
                        <button
                            onClick={() => setFilterType('country')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterType === 'country' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Country
                        </button>
                        <button
                            onClick={() => setFilterType('city')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${filterType === 'city' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            City
                        </button>

                        {/* View Type */}
                        <button
                            onClick={() => setViewType('current')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewType === 'current' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Current Draw
                        </button>
                        <button
                            onClick={() => setViewType('all-time')}
                            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${viewType === 'all-time' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            All-Time
                        </button>
                    </div>

                    {/* Search */}
                    <div className="relative">
                        <input
                            type="text"
                            placeholder="Search by username"
                            value={searchUsername}
                            onChange={(e) => setSearchUsername(e.target.value)}
                            className="border border-gray-300 rounded-md pl-3 pr-10 py-2 text-sm w-64"
                        />
                        <button className="absolute right-2 top-1/2 -translate-y-1/2">
                            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="grid md:grid-cols-3 gap-6">

                    {/* Left Column - Leaderboard Table */}
                    <div className="md:col-span-2">

                        {/* Top 3 Creators */}
                        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                                    <span>🏆</span> Top 3 Creators
                                </h2>
                                <div className="flex gap-2">
                                    <span className="text-sm text-gray-600">current Draw</span>
                                    <span className="text-sm text-gray-600">All-Time</span>
                                    <button className="text-sm text-blue-600 hover:text-blue-700">Search by username</button>
                                </div>
                            </div>

                            {/* Leaderboard Table */}
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Rank</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Creator</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">Country</th>
                                            <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600">City</th>
                                            <th className="px-4 py-3 text-right text-xs font-semibold text-gray-600">Points</th>
                                            <th className="px-4 py-3 text-center text-xs font-semibold text-gray-600">Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {leaderboardsData.topCreators.map((creator) => (
                                            <tr key={creator.rank} className="border-b border-gray-100 hover:bg-gray-50">
                                                <td className="px-4 py-3">
                                                    <span className="text-blue-600 font-bold">#{creator.rank}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                                                            <span className="text-xs">{creator.flag}</span>
                                                        </div>
                                                        <span className="font-medium text-gray-900">{creator.creator}</span>
                                                        <span className="text-sm">{creator.flag}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-1">
                                                        <span className="text-sm">{creator.flag}</span>
                                                        <span className="text-gray-700 text-sm">{creator.country}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-700 text-sm">{creator.city}</td>
                                                <td className="px-4 py-3 text-right font-bold text-gray-900">{creator.points.toLocaleString()}</td>
                                                <td className="px-4 py-3 text-center">
                                                    <span className="bg-green-100 text-green-700 px-2 py-1 rounded text-xs font-medium">
                                                        {creator.status}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {/* Pagination */}
                            <div className="flex justify-center items-center gap-2 mt-6">
                                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">‹</button>
                                <button className="px-3 py-1 text-sm bg-blue-800 text-white rounded">1</button>
                                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">2</button>
                                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">3</button>
                                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">3</button>
                                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">4</button>
                                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">5</button>
                                <button className="px-3 py-1 text-sm text-gray-600 hover:bg-gray-100 rounded">Next ›</button>
                            </div>
                        </div>

                        {/* Top Videos This Draw */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Top Videos This Draw</h2>

                            <div className="grid grid-cols-2 gap-4">
                                {leaderboardsData.topVideos.map((video) => (
                                    <div key={video.id} className="relative">
                                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-48 flex items-center justify-center mb-3">
                                            <p className="text-gray-400 text-xs">Video Thumbnail</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <div className="font-semibold text-gray-900 flex items-center gap-1">
                                                    {video.creator} <span className="text-sm">{video.flag}</span>
                                                </div>
                                                <div className="text-xs text-gray-600">{video.location}</div>
                                            </div>
                                            <div className="text-sm font-bold text-gray-900">{video.points.toLocaleString()} pts</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link to="/media">
                                <button className="w-full mt-6 bg-blue-800 hover:bg-blue-900 text-white font-semibold py-3 rounded-md transition-colors flex items-center justify-center gap-2">
                                    View All Highlight Videos
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">

                        {/* Your Position */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 mb-4">Your Position</h3>

                            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-4 mb-4">
                                <div className="text-sm text-gray-600 mb-1">{leaderboardsData.userPosition.draw}</div>
                                <div className="flex items-center gap-3 mb-3">
                                    <div className="text-4xl">🏆</div>
                                    <div className="text-4xl font-bold text-gray-900">#{leaderboardsData.userPosition.rank}</div>
                                </div>
                                <div className="space-y-1 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Rank:</span>
                                        <span className="font-semibold">#{leaderboardsData.userPosition.rank}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Points:</span>
                                        <span className="font-semibold">{leaderboardsData.userPosition.points.toLocaleString()}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-600">Country Rank:</span>
                                        <span className="font-semibold">#{leaderboardsData.userPosition.countryRank}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mb-4">
                                <h4 className="text-sm font-semibold text-gray-900 mb-2">Leaderboard by Draw</h4>
                                <div className="space-y-2">
                                    {leaderboardsData.availableDraws.map((draw) => (
                                        <button
                                            key={draw.id}
                                            onClick={() => setSelectedDraw(draw.id)}
                                            className={`w-full text-left px-3 py-2 rounded text-sm transition-colors ${selectedDraw === draw.id
                                                ? 'bg-blue-800 text-white font-semibold'
                                                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                                                }`}
                                        >
                                            {draw.name} ({draw.status})
                                            {selectedDraw === draw.id && <span className="float-right">›</span>}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="border-t border-gray-200 pt-4">
                                <div className="flex items-center gap-2 mb-2">
                                    <span className="text-lg">👑</span>
                                    <span className="font-semibold text-sm">{leaderboardsData.userPosition.username}</span>
                                    <span className="text-sm">{leaderboardsData.userPosition.flag}</span>
                                </div>
                            </div>
                        </div>

                        {/* How Rankings Stay Fair */}
                        <div className="bg-blue-50 rounded-lg shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 mb-4">{leaderboardsData.fairRankings.title}</h3>

                            <div className="space-y-3 mb-4">
                                {leaderboardsData.fairRankings.methods.map((method, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <span className={`text-${method.color}-600 font-bold`}>{method.icon}</span>
                                        <span className="text-sm text-gray-700">{method.text}</span>
                                    </div>
                                ))}
                            </div>

                            <Link to="/rules">
                                <button className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1">
                                    {leaderboardsData.fairRankings.policyLink.text}
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </Link>
                        </div>

                        {/* Think You Can Rank Higher */}
                        <div className="bg-white rounded-lg shadow-sm p-6">
                            <h3 className="font-bold text-gray-900 mb-2">{leaderboardsData.callToAction.title}</h3>
                            <p className="text-sm text-gray-600 mb-4">{leaderboardsData.callToAction.description}</p>

                            <div className="space-y-2">
                                {leaderboardsData.callToAction.buttons.map((button, index) => (
                                    <Link key={index} to={button.text === 'Upload New Video' ? '/upload' : '/challenge'}>
                                        <button
                                            className={`w-full font-semibold py-2.5 rounded-md transition-colors ${button.color === 'yellow'
                                                ? 'bg-yellow-400 hover:bg-yellow-500 text-gray-900'
                                                : 'bg-blue-800 hover:bg-blue-900 text-white'
                                                }`}
                                        >
                                            {button.text}
                                            {button.color === 'blue' && (
                                                <span className="ml-2">›</span>
                                            )}
                                        </button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Leaderboards;
