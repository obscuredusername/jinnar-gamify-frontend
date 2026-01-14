import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import challengeData from '../data/jinnarChallenge';
import { faqData } from '../data/FAQ';

const JinnarChallenge = () => {
    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <Header />

            {/* Main Content */}
            <div className="max-w-6xl mx-auto px-6 py-12">

                {/* Hero Section */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
                    <div>
                        <h1 className="text-4xl font-bold text-gray-900 mb-4">
                            How the Jinnar Viral Challenge Works
                        </h1>
                        <p className="text-gray-700 mb-6">
                            Create content. Get approved. Go <span className="text-blue-600 font-semibold">viral</span>. Earn points. Win <span className="text-blue-600 font-semibold">rewards</span>.
                        </p>
                        <div className="flex gap-3">
                            <Link to="/upload">
                                <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2.5 px-6 rounded-md transition-colors">
                                    Join Challenge
                                </button>
                            </Link>
                            <Link to="/upload">
                                <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2.5 px-6 rounded-md transition-colors flex items-center gap-2">
                                    Upload Video for Approval
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                            </Link>
                        </div>
                    </div>
                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl h-72 flex items-center justify-center">
                        <p className="text-gray-400 text-sm">Hero Illustration</p>
                    </div>
                </div>

                {/* It's Simple - Just 3 Steps */}
                <h2 className="text-3xl font-bold text-gray-900 mb-12">
                    It's Simple — Just 3 Steps
                </h2>

                {/* Step 1: Join an Active Draw */}
                <div className="grid md:grid-cols-2 gap-12 items-start mb-16">
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                                1
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900">Join an Active Draw</h3>
                        </div>

                        <p className="text-gray-700 mb-4">
                            Jinnar runs numbered challenge rounds called <span className="font-semibold">Draws</span> (Draw 1, Draw 2, Draw 3...). Each Draw has:
                        </p>

                        <ul className="space-y-2 mb-4 ml-4">
                            <li className="text-gray-700">• A focus topic or creative direction</li>
                            <li className="text-gray-700">• Official hashtags and caption examples</li>
                            <li className="text-gray-700">• A start and closing date</li>
                            <li className="text-gray-700">• A prize pool</li>
                        </ul>

                        <p className="text-gray-600 text-sm mb-4">
                            Participants may join any active draw. →
                        </p>

                        <Link to="/upload">
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2 px-5 rounded-md transition-colors flex items-center gap-2">
                                View Current Draws
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </Link>
                    </div>

                    <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl h-64 flex items-center justify-center">
                        <p className="text-gray-400 text-sm">Draw 3 Illustration</p>
                    </div>
                </div>

                {/* Steps 2 & 3 Side by Side */}
                <div className="grid md:grid-cols-2 gap-12 mb-16">

                    {/* Step 2: Upload Your Video for Approval */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                                2
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Upload Your Video for Approval</h3>
                        </div>

                        <p className="text-gray-700 mb-4 text-sm">
                            Before posting publicly, upload your video to Jinnar Viral for review. This ensures content quality, safety, and brand alignment.
                        </p>

                        <div className="mb-4">
                            <p className="font-semibold text-gray-900 mb-2 text-sm">Review Process:</p>
                            <ul className="space-y-1 ml-4 text-sm">
                                <li className="text-gray-700">• AI + human review</li>
                                <li className="text-gray-700">• Clear feedback if edits are needed</li>
                                <li className="text-gray-700">• Fast approval turnaround</li>
                            </ul>
                        </div>

                        <div className="flex gap-2 flex-wrap">
                            <span className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                                <span className="text-yellow-600">⚠</span> Pending Review
                            </span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                                <span className="text-green-600">✓</span> Approved
                            </span>
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-md text-xs font-medium flex items-center gap-1">
                                <span className="text-red-600">●</span> Needs Revision
                            </span>
                        </div>
                    </div>

                    {/* Step 3: Post & Earn Points */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                                3
                            </div>
                            <h3 className="text-xl font-bold text-gray-900">Post & Earn Points</h3>
                        </div>

                        <p className="text-gray-700 mb-4 text-sm">
                            Once approved, publish your video on supported platforms and share your post link or screenshot.
                        </p>

                        <div className="mb-4">
                            <p className="font-semibold text-gray-900 mb-3 text-sm">Supported Platforms:</p>
                            <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700 text-sm">TikTok | Instagram</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                    </svg>
                                    <span className="text-gray-700 text-sm">Facebook | YouTube</span>
                                </div>
                            </div>
                        </div>

                        <Link to="/submit-link">
                            <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-5 rounded-md transition-colors text-sm flex items-center gap-2">
                                Submit Post Link / Proof
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </Link>

                        <div className="mt-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl h-48 flex items-center justify-center">
                            <p className="text-gray-400 text-sm">Social Media Illustration</p>
                        </div>
                    </div>
                </div>

                {/* Step 4: Compete Within Each Draw */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <div className="w-10 h-10 bg-blue-800 text-white rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0">
                            4
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900">Compete Within Each Draw</h3>
                    </div>

                    {/* Leaderboard */}
                    <div className="max-w-md">
                        <div className="bg-gray-900 text-white rounded-xl p-5 mb-4">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="text-lg font-bold">Draw 3 - East Africa</h4>
                                <Link to="/leaderboards" className="text-xs text-blue-400 hover:text-blue-300">
                                    View Leaderboards →
                                </Link>
                            </div>

                            <div className="space-y-3">
                                <div className="grid grid-cols-4 gap-3 text-xs text-gray-400 pb-2 border-b border-gray-700">
                                    <div>Rank</div>
                                    <div>Name</div>
                                    <div>Country</div>
                                    <div className="text-right">Points</div>
                                </div>

                                <div className="grid grid-cols-4 gap-3 items-center text-sm">
                                    <div className="text-blue-400 font-bold"># 1</div>
                                    <div>Joseph M.</div>
                                    <div className="flex items-center gap-1">
                                        <span>🇰🇪</span>
                                        <span className="text-xs">Kenya</span>
                                    </div>
                                    <div className="text-right font-bold">12,900</div>
                                </div>

                                <div className="grid grid-cols-4 gap-3 items-center text-sm">
                                    <div className="text-blue-400 font-bold"># 2</div>
                                    <div>Maria N.</div>
                                    <div className="flex items-center gap-1">
                                        <span>🇹🇿</span>
                                        <span className="text-xs">Tanzania</span>
                                    </div>
                                    <div className="text-right font-bold">11,540</div>
                                </div>

                                <div className="grid grid-cols-4 gap-3 items-center text-sm">
                                    <div className="text-blue-400 font-bold"># 3</div>
                                    <div>Gift M.</div>
                                    <div className="flex items-center gap-1">
                                        <span>🇺🇬</span>
                                        <span className="text-xs">Uganda</span>
                                    </div>
                                    <div className="text-right font-bold">10,200</div>
                                </div>
                            </div>

                            <div className="mt-4 pt-3 border-t border-gray-700">
                                <p className="text-xs text-gray-400">
                                    Points ≈ <span className="font-semibold">2,000</span> likes + <span className="font-semibold">300</span> ≈ <span className="font-semibold">2,600</span> points
                                </p>
                            </div>
                        </div>

                        <p className="text-xs text-gray-600">
                            <span className="inline-block mr-1">✓</span>
                            Points are verified using platform APIs and AI validation tools.
                        </p>
                    </div>
                </div>

                {/* How Winners Are Selected */}
                <div className="mb-16">
                    <h3 className="text-2xl font-bold text-gray-900 mb-3">How Winners Are Selected</h3>

                    <p className="text-lg font-semibold text-blue-800 mb-4">Your Content, Jinnar's Promotion</p>

                    <p className="text-gray-700 mb-6 max-w-2xl">
                        By participating, you earn Jinnar permission to feature approved videos in marketing.
                    </p>

                    <ul className="space-y-2 mb-6 ml-4 max-w-xl">
                        <li className="text-gray-700">• Cash prizes</li>
                        <li className="text-gray-700">• Official Jinnar merchandise</li>
                        <li className="text-gray-700">• Public recognition</li>
                    </ul>

                    <Link to="/winners">
                        <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2.5 px-6 rounded-md transition-colors flex items-center gap-2">
                            View Prizes & Rewards
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </Link>
                </div>

                {/* Ready to Join the Next Draw */}
                <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 mb-12">
                    <div className="flex items-center gap-2 mb-3">
                        <span className="text-2xl">🎯</span>
                        <h2 className="text-2xl font-bold text-gray-900">Ready to Join the Next Draw?</h2>
                    </div>
                    <p className="text-gray-700 mb-6">Create. Share. Compete. Win.</p>
                    <div className="flex gap-3">
                        <Link to="/upload">
                            <button className="bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-semibold py-2.5 px-6 rounded-md transition-colors">
                                Join Active Draw
                            </button>
                        </Link>
                        <Link to="/upload">
                            <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2.5 px-6 rounded-md transition-colors flex items-center gap-2">
                                Upload Video Now
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </button>
                        </Link>
                    </div>
                </div>


                {/* FAQ Preview */}
                <div className="bg-blue-50 rounded-2xl p-8">
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-xl">📋</span>
                        <h3 className="text-xl font-bold text-gray-900">FAQ Preview</h3>
                    </div>
                    <p className="text-gray-700 mb-6 text-sm">Quick Questions</p>

                    <div className="space-y-3 mb-6">
                        {faqData.slice(0, 4).map((faq, index) => (
                            <div key={faq.id} className="flex items-center gap-3 text-gray-700 text-sm">
                                <span className={index % 2 === 0 ? "text-green-600" : "text-gray-400"}>
                                    {index % 2 === 0 ? "✓" : "○"}
                                </span>
                                <span>{faq.question}</span>
                                {index % 2 === 0 && <span className="text-blue-600 text-xs">✓</span>}
                            </div>
                        ))}
                    </div>

                    <Link to="/faq">
                        <button className="bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2.5 px-6 rounded-md transition-colors flex items-center gap-2 text-sm">
                            View Full FAQ
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                            </svg>
                        </button>
                    </Link>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default JinnarChallenge;
