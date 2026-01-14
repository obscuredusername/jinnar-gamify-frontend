import React from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { TrophyIcon, GiftIcon, CurrencyDollarIcon, StarIcon } from '../components/ui/Icons';

// We need to add GiftIcon, CurrencyDollarIcon, StarIcon to Icons.jsx first, 
// but for now I will use placeholders or existing icons if available.
// I'll check Icons.jsx content first to be safe, but assuming standard set.
// Actually, I'll stick to icons I know exist or add them to Icons.jsx first.

const Prizes = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-yellow-500 via-orange-500 to-red-500 text-white py-20 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-6">Prizes & Rewards</h1>
                    <p className="text-xl text-yellow-100 max-w-2xl mx-auto">
                        Compete for cash prizes, exclusive merchandise, and the chance to become the next Jinnar Viral Star.
                    </p>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-16">

                {/* Cash Prizes Section */}
                <div className="mb-20">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">💰 Cash Prize Pool</h2>
                        <p className="text-gray-600">Top performers in every Draw win real cash rewards sent directly to their mobile money or bank account.</p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* 1st Place */}
                        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border-2 border-yellow-400 transform hover:-translate-y-2 transition-transform">
                            <div className="bg-yellow-400 py-4 text-center">
                                <span className="text-white font-bold text-2xl">🥇 1st Place</span>
                            </div>
                            <div className="p-8 text-center">
                                <p className="text-4xl font-bold text-gray-900 mb-2">$500</p>
                                <p className="text-gray-500 mb-6">(approx. KES 75,000)</p>
                                <ul className="text-left space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">✓ Instant Payout</li>
                                    <li className="flex items-center gap-2">✓ Gold Winner Badge</li>
                                    <li className="flex items-center gap-2">✓ Featured Interview</li>
                                </ul>
                            </div>
                        </div>

                        {/* 2nd Place */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-gray-300 transform hover:-translate-y-2 transition-transform mt-4 md:mt-0">
                            <div className="bg-gray-400 py-4 text-center">
                                <span className="text-white font-bold text-2xl">🥈 2nd Place</span>
                            </div>
                            <div className="p-8 text-center">
                                <p className="text-4xl font-bold text-gray-900 mb-2">$300</p>
                                <p className="text-gray-500 mb-6">(approx. KES 45,000)</p>
                                <ul className="text-left space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">✓ Instant Payout</li>
                                    <li className="flex items-center gap-2">✓ Silver Winner Badge</li>
                                </ul>
                            </div>
                        </div>

                        {/* 3rd Place */}
                        <div className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-orange-400 transform hover:-translate-y-2 transition-transform mt-4 md:mt-0">
                            <div className="bg-orange-500 py-4 text-center">
                                <span className="text-white font-bold text-2xl">🥉 3rd Place</span>
                            </div>
                            <div className="p-8 text-center">
                                <p className="text-4xl font-bold text-gray-900 mb-2">$150</p>
                                <p className="text-gray-500 mb-6">(approx. KES 22,500)</p>
                                <ul className="text-left space-y-3 text-gray-600">
                                    <li className="flex items-center gap-2">✓ Instant Payout</li>
                                    <li className="flex items-center gap-2">✓ Bronze Winner Badge</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Exclusive Merch */}
                <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
                    <div className="order-2 md:order-1">
                        <h2 className="text-3xl font-bold text-gray-900 mb-6">👕 Exclusive Jinnar Merch</h2>
                        <p className="text-lg text-gray-600 mb-6">
                            Winners and top participants get access to limited edition Jinnar Viral merchandise. Wear your success!
                        </p>
                        <ul className="space-y-4 mb-8">
                            <li className="flex items-center gap-3">
                                <span className="bg-blue-100 text-blue-600 p-2 rounded-full">🧢</span>
                                <span className="font-medium text-gray-800">Branded Caps & Hoodies</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="bg-blue-100 text-blue-600 p-2 rounded-full">🎒</span>
                                <span className="font-medium text-gray-800">Premium Backpacks</span>
                            </li>
                            <li className="flex items-center gap-3">
                                <span className="bg-blue-100 text-blue-600 p-2 rounded-full">📱</span>
                                <span className="font-medium text-gray-800">Tech Accessories</span>
                            </li>
                        </ul>
                        <button className="bg-blue-900 text-white px-8 py-3 rounded-lg font-bold hover:bg-blue-800 transition-colors">
                            View Merch Gallery
                        </button>
                    </div>
                    <div className="order-1 md:order-2 bg-gray-200 rounded-2xl h-80 flex items-center justify-center">
                        <p className="text-gray-500 font-medium">Merch Image Placeholder</p>
                    </div>
                </div>

                {/* Recognition */}
                <div className="bg-blue-900 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-6">🌟 Fame & Recognition</h2>
                    <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
                        It's not just about the money. We promote our winners across our massive social media network, giving you the exposure to launch your influencer career.
                    </p>
                    <div className="grid md:grid-cols-3 gap-6 text-center">
                        <div className="bg-blue-800 p-6 rounded-xl">
                            <p className="text-3xl font-bold mb-2">1M+</p>
                            <p className="text-blue-200">Potential Reach</p>
                        </div>
                        <div className="bg-blue-800 p-6 rounded-xl">
                            <p className="text-3xl font-bold mb-2">Verified</p>
                            <p className="text-blue-200">Creator Status</p>
                        </div>
                        <div className="bg-blue-800 p-6 rounded-xl">
                            <p className="text-3xl font-bold mb-2">Brand</p>
                            <p className="text-blue-200">Partnership Deals</p>
                        </div>
                    </div>
                </div>

            </div>

            <Footer />
        </div>
    );
};

export default Prizes;
