import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import homeData from '../data/home';

const Home = () => {
    const [countdown, setCountdown] = useState(homeData.nextMegaDraw.countdown);
    const [activeTab, setActiveTab] = useState('weekly');
    const [uploadFile, setUploadFile] = useState(null);

    // Countdown timer
    useEffect(() => {
        const timer = setInterval(() => {
            setCountdown(prev => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                } else if (prev.days > 0) {
                    return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                }
                return prev;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const handleFileUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setUploadFile(file);
            console.log('File selected:', file.name);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-8 px-6 relative overflow-hidden">
                {/* Decorative elements */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-5 left-10 text-5xl">🎬</div>
                    <div className="absolute top-10 right-20 text-4xl">⭐</div>
                    <div className="absolute bottom-5 left-1/4 text-4xl">🎯</div>
                    <div className="absolute bottom-10 right-10 text-5xl">🏆</div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="grid md:grid-cols-2 gap-8 items-center">
                        <div>
                            <h1 className="text-3xl md:text-4xl font-bold mb-3">
                                Make Jinnar Go Viral — Create. Share. Win.
                            </h1>
                            <p className="text-sm mb-6 opacity-90">
                                Join the Pan-African challenge that rewards creativity, community, and digital excellence.
                                Submit great content, earn points, climb the leaderboard, and win big prizes!
                            </p>

                            <div className="flex gap-3 mb-6">
                                <Link to="/challenge">
                                    <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-2 px-6 rounded-lg transition-colors shadow-lg">
                                        Join Challenge
                                    </button>
                                </Link>
                                <Link to="/challenge">
                                    <button className="bg-white/10 hover:bg-white/20 text-white font-semibold py-2 px-6 rounded-lg transition-colors border border-white/30 backdrop-blur-sm">
                                        How to Participate
                                    </button>
                                </Link>
                            </div>

                            {/* Stats Box */}
                            <div className="bg-blue-900/50 backdrop-blur-sm rounded-lg p-4 grid grid-cols-3 gap-4 text-center">
                                <div>
                                    <div className="text-2xl font-bold">{homeData.stats.videosSubmitted.toLocaleString()}</div>
                                    <div className="text-xs opacity-80">Videos Submitted</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{homeData.stats.countriesParticipating}</div>
                                    <div className="text-xs opacity-80">Countries Participating</div>
                                </div>
                                <div>
                                    <div className="text-2xl font-bold">{homeData.stats.totalVideosEarned.toLocaleString()}</div>
                                    <div className="text-xs opacity-80">Total Videos Earned</div>
                                </div>
                            </div>
                        </div>

                        {/* Countdown Box */}
                        <div className="bg-yellow-400 text-gray-900 rounded-xl p-5">
                            <div className="text-xs font-semibold mb-3">Next Mega Draw: {homeData.nextMegaDraw.date}</div>
                            <div className="grid grid-cols-4 gap-3 text-center mb-3">
                                <div>
                                    <div className="text-3xl font-bold">{countdown.days}</div>
                                    <div className="text-xs">Days</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">{countdown.hours}</div>
                                    <div className="text-xs">Hours</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">{countdown.minutes}</div>
                                    <div className="text-xs">Minutes</div>
                                </div>
                                <div>
                                    <div className="text-3xl font-bold">{countdown.seconds}</div>
                                    <div className="text-xs">Seconds</div>
                                </div>
                            </div>
                            <div className="text-xs text-center font-medium">Countdown Clock (Live)</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-8">
                <div className="grid md:grid-cols-3 gap-6">

                    {/* Left Column - Main Content */}
                    <div className="md:col-span-2 space-y-6">

                        {/* Announcements & Draw Results */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Announcements & Draw Results</h2>

                            <div className="bg-white rounded-lg shadow-sm p-5 space-y-4">
                                <h3 className="font-semibold text-gray-900 text-sm">Upcoming Draws:</h3>

                                {homeData.announcements.map((announcement) => (
                                    <div key={announcement.id} className="flex items-start gap-3 pb-4 border-b border-gray-100 last:border-0">
                                        <div className="text-2xl flex-shrink-0">{announcement.icon}</div>
                                        <div className="flex-1">
                                            <h4 className="font-semibold text-gray-900 text-sm mb-1">{announcement.title}</h4>
                                            <p className="text-xs text-gray-600 mb-2">{announcement.description}</p>
                                            <Link to="/announcements">
                                                <button className="bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold py-1.5 px-4 rounded transition-colors">
                                                    Learn More
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Latest Draw Winners */}
                        <div>
                            <h2 className="text-xl font-bold text-gray-900 mb-4">Latest Draw Winners:</h2>

                            <div className="bg-white rounded-lg shadow-sm p-5">
                                <div className="bg-blue-900 text-white rounded-md px-4 py-2 mb-4 flex justify-between items-center">
                                    <span className="font-semibold text-sm">{homeData.latestWinners.drawName}</span>
                                    <Link to="/past-winners">
                                        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 text-xs font-semibold py-1 px-3 rounded transition-colors">
                                            See All Past Winners
                                        </button>
                                    </Link>
                                </div>

                                <div className="space-y-2">
                                    {homeData.latestWinners.winners.map((winner) => (
                                        <div key={winner.rank} className="flex items-center justify-between py-2">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 bg-blue-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                                                    #{winner.rank}
                                                </div>
                                                <div>
                                                    <div className="font-semibold text-sm text-gray-900 flex items-center gap-1">
                                                        {winner.name} <span className="text-xs">{winner.flag}</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <div className="font-bold text-sm text-gray-900">{winner.points.toLocaleString()} points</div>
                                                <div className="text-xs text-gray-500">≈ {winner.totalPoints.toLocaleString()} points</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 pt-3 border-t border-gray-100">
                                    <Link to="/announcements" className="text-xs text-blue-600 hover:text-blue-700">
                                        See All Announcements →
                                    </Link>
                                    <span className="mx-2 text-gray-300">|</span>
                                    <Link to="/winners" className="text-xs text-blue-600 hover:text-blue-700">
                                        Prize & Rewards Page →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Leaderboard Table */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900">Leaderboard</h2>
                                <div className="flex gap-2 text-xs">
                                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Global Leaderboard</button>
                                    <button
                                        onClick={() => setActiveTab('weekly')}
                                        className={`px-3 py-1 rounded ${activeTab === 'weekly' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        Weekly
                                    </button>
                                    <button
                                        onClick={() => setActiveTab('monthly')}
                                        className={`px-3 py-1 rounded ${activeTab === 'monthly' ? 'bg-blue-800 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                                    >
                                        Monthly
                                    </button>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <div className="bg-blue-900 text-white px-4 py-2">
                                    <span className="font-semibold text-sm">{activeTab === 'weekly' ? 'Weekly' : 'Monthly'} — East Africa</span>
                                    <span className="text-xs ml-4">See Results · Months · Weeks · Monthly →</span>
                                    <span className="float-right text-xs">64%</span>
                                </div>

                                <table className="w-full text-sm">
                                    <thead className="bg-gray-50 border-b border-gray-200">
                                        <tr>
                                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Rank</th>
                                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Name</th>
                                            <th className="px-4 py-2 text-left text-xs font-semibold text-gray-600">Country</th>
                                            <th className="px-4 py-2 text-right text-xs font-semibold text-gray-600">Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {homeData.globalLeaderboard[activeTab].map((entry) => (
                                            <tr key={entry.rank} className="border-b border-gray-100">
                                                <td className="px-4 py-3">
                                                    <span className="text-blue-600 font-bold">#{entry.rank}</span>
                                                </td>
                                                <td className="px-4 py-3">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                                                        <span className="font-medium">{entry.name}</span>
                                                        <span className="text-xs">{entry.flag}</span>
                                                    </div>
                                                </td>
                                                <td className="px-4 py-3 text-gray-600">{entry.country}</td>
                                                <td className="px-4 py-3 text-right font-bold">{entry.points.toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>

                                <div className="px-4 py-3 bg-gray-50 text-center">
                                    <Link to="/leaderboards" className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                                        View Full Leaderboards →
                                    </Link>
                                </div>
                            </div>
                        </div>

                        {/* Regional Leaderboard */}
                        <div>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-xl font-bold text-gray-900">🏆 Leaderboard</h2>
                                <div className="flex gap-2 text-xs">
                                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">By Country</button>
                                    <button className="px-3 py-1 bg-gray-100 text-gray-700 rounded hover:bg-gray-200">Weekly / Monthly</button>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow-sm p-5">
                                <div className="flex justify-between items-center mb-4">
                                    <span className="font-semibold text-sm">Weekly — <span className="text-blue-800">East</span> Africa</span>
                                    <Link to="/leaderboards" className="text-xs text-blue-600 hover:text-blue-700">
                                        View Full Leaderboards →
                                    </Link>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    {homeData.regionalLeaderboard.topCreators.map((creator) => (
                                        <div key={creator.rank} className="text-center">
                                            <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-40 flex items-center justify-center mb-2">
                                                <div className="absolute top-2 left-2 bg-blue-900 text-white rounded-full w-7 h-7 flex items-center justify-center font-bold text-xs">
                                                    #{creator.rank}
                                                </div>
                                                <p className="text-gray-400 text-xs">Creator Photo</p>
                                            </div>
                                            <div className="flex items-center justify-center gap-1 mb-1">
                                                <div className="w-5 h-5 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                    #{creator.rank}
                                                </div>
                                                <span className="font-semibold text-xs">{creator.name}</span>
                                                <span className="text-xs">{creator.flag}</span>
                                            </div>
                                            <div className="text-xs font-bold text-gray-900">{creator.points.toLocaleString()} points</div>
                                        </div>
                                    ))}
                                </div>

                                <div className="mt-4 text-center">
                                    <Link to="/rules">
                                        <button className="text-xs text-blue-600 hover:text-blue-700 font-medium">
                                            View Full Rules & Forms →
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Sidebar */}
                    <div className="space-y-6">

                        {/* Upload Video */}
                        <div className="bg-white rounded-lg shadow-sm p-5">
                            <h3 className="font-bold text-gray-900 mb-4">Upload Your Video for Approval</h3>

                            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center mb-4 hover:border-blue-500 transition-colors cursor-pointer bg-blue-50">
                                <input
                                    type="file"
                                    accept="video/*"
                                    onChange={handleFileUpload}
                                    className="hidden"
                                    id="video-upload"
                                />
                                <label htmlFor="video-upload" className="cursor-pointer">
                                    <div className="text-3xl mb-2">📤</div>
                                    <p className="text-gray-600 text-xs">Drag your file here</p>
                                </label>
                            </div>

                            <div className="mb-3">
                                <label className="block text-xs font-medium text-gray-700 mb-1">Video File:</label>
                                <input
                                    type="text"
                                    placeholder="mp4"
                                    className="w-full px-3 py-2 border border-gray-300 rounded text-xs"
                                    readOnly
                                    value={uploadFile ? uploadFile.name : ''}
                                />
                            </div>

                            <Link to="/upload">
                                <button className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2 rounded transition-colors text-sm">
                                    Upload Video Now
                                </button>
                            </Link>

                            <p className="text-xs text-gray-500 mt-2">
                                Note: All videos must be approved before posting publicly.
                            </p>
                        </div>

                        {/* Status Indicators */}
                        <div className="bg-white rounded-lg shadow-sm p-5">
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="font-bold text-gray-900">Status Indicators</h3>
                                <span className="text-xs text-gray-500">Status →</span>
                            </div>

                            <div className="space-y-3">
                                {homeData.statusIndicators.map((indicator, index) => (
                                    <div key={index} className="flex items-start gap-2">
                                        <span className={`text-sm ${indicator.color === 'yellow' ? 'text-yellow-600' :
                                            indicator.color === 'green' ? 'text-green-600' :
                                                'text-red-600'
                                            }`}>
                                            {indicator.icon}
                                        </span>
                                        <div>
                                            <div className="font-medium text-xs text-gray-900">{indicator.status}</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <p className="text-xs text-gray-500 mt-3">
                                Note: All videos must be approved before posting publicly (takes three).
                            </p>
                        </div>

                        {/* Featured Videos */}
                        <div className="bg-white rounded-lg shadow-sm p-5">
                            <h3 className="font-bold text-gray-900 mb-2">Featured Videos</h3>
                            <p className="text-xs text-gray-600 mb-4">
                                Tom: Approved Videos — See the Best
                            </p>

                            <div className="space-y-3">
                                {homeData.featuredVideos.map((video) => (
                                    <div key={video.id}>
                                        <div className="bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg h-28 flex items-center justify-center mb-2">
                                            <p className="text-gray-400 text-xs">Video Thumbnail</p>
                                        </div>
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-6 h-6 bg-blue-900 text-white rounded-full flex items-center justify-center text-xs font-bold">
                                                    #{video.rank}
                                                </div>
                                                <div>
                                                    <div className="text-xs font-semibold text-gray-900">{video.creator}</div>
                                                    <div className="text-xs text-gray-600">{video.location}</div>
                                                </div>
                                            </div>
                                            <div className="text-xs font-bold text-gray-900">{video.points.toLocaleString()} points</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <Link to="/media">
                                <button className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 rounded transition-colors text-xs">
                                    View Highlight Reels & Media →
                                </button>
                            </Link>
                        </div>

                        {/* Rules & Brand Standards */}
                        <div className="bg-white rounded-lg shadow-sm p-5">
                            <h3 className="font-bold text-gray-900 mb-2 flex items-center gap-1">
                                <span>📋</span> {homeData.rulesAndStandards.title}
                            </h3>
                            <p className="text-xs font-semibold text-blue-800 mb-3">
                                {homeData.rulesAndStandards.subtitle}
                            </p>

                            <div className="mb-3">
                                <p className="text-xs font-semibold text-gray-900 mb-1">Content Usage Permission:</p>
                                <p className="text-xs text-gray-600">{homeData.rulesAndStandards.contentUsagePermission}</p>
                            </div>

                            <div className="mb-4">
                                <p className="text-xs font-semibold text-gray-900 mb-2">What you must do:</p>
                                <ul className="space-y-1">
                                    {homeData.rulesAndStandards.guidelines.map((guideline, index) => (
                                        <li key={index} className="text-xs text-gray-700 flex items-start gap-1">
                                            <span>•</span>
                                            <span>{guideline}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div className="space-y-2">
                                {homeData.rulesAndStandards.links.map((link, index) => (
                                    <Link key={index} to="/rules">
                                        <button className="w-full bg-blue-800 hover:bg-blue-900 text-white text-xs font-semibold py-2 rounded transition-colors flex items-center justify-between px-3">
                                            {link.text}
                                            <span>→</span>
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

export default Home;
