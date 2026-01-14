import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import pastWinnersData from '../data/pastWinners';
import { TrophyIcon, CalendarIcon, FilterIcon, PlayIcon, ChevronRightIcon } from '../components/ui/Icons';
import { formatNumber } from '../utils/format';

const PastWinners = () => {
    const [selectedDraw, setSelectedDraw] = useState('all');
    const [selectedCountry, setSelectedCountry] = useState('all');

    // Flatten winners for easier filtering
    const allWinners = [
        ...pastWinnersData.draw3.winners.map(w => ({ ...w, draw: 'Draw 3', date: pastWinnersData.draw3.date })),
        ...pastWinnersData.draw2.winners.map(w => ({ ...w, draw: 'Draw 2', date: pastWinnersData.draw2.date })),
        ...pastWinnersData.draw1.winners.map(w => ({ ...w, draw: 'Draw 1', date: pastWinnersData.draw1.date })),
    ];

    const filteredWinners = allWinners.filter(winner => {
        if (selectedDraw !== 'all' && winner.draw !== selectedDraw) return false;
        if (selectedCountry !== 'all' && winner.country !== selectedCountry) return false;
        return true;
    });

    const countries = ['all', ...new Set(allWinners.map(w => w.country))];
    const draws = ['all', 'Draw 3', 'Draw 2', 'Draw 1'];

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero / Top Section - Jinnar Viral Theme */}
            <div className="bg-white border-b border-gray-200 pt-12 pb-16 px-6 relative overflow-hidden">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex flex-col md:flex-row justify-between items-start mb-8 gap-6">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    J
                                </div>
                                <span className="text-2xl font-bold text-blue-900">Jinnar Viral</span>
                            </div>
                            <h1 className="text-4xl font-bold text-blue-900 mb-2">Past Winners Archive</h1>
                            <p className="text-gray-500 text-lg max-w-2xl">
                                Explore the history of Jinnar champions. See who took home the prizes in previous draws.
                            </p>
                        </div>

                    </div>
                </div>

                {/* Decorative Illustration (Right Side) */}
                <div className="absolute top-10 right-0 opacity-10 md:opacity-100 pointer-events-none hidden lg:block">
                    <div className="w-64 h-64 bg-blue-100 rounded-full flex items-center justify-center text-blue-300 text-6xl">
                        🏆
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Filters & Actions */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2 text-gray-600 font-semibold">
                            <FilterIcon className="w-5 h-5" />
                            Filters:
                        </div>

                        <select
                            value={selectedDraw}
                            onChange={(e) => setSelectedDraw(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {draws.map(draw => (
                                <option key={draw} value={draw}>{draw === 'all' ? 'All Draws' : draw}</option>
                            ))}
                        </select>

                        <select
                            value={selectedCountry}
                            onChange={(e) => setSelectedCountry(e.target.value)}
                            className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            {countries.map(country => (
                                <option key={country} value={country}>{country === 'all' ? 'All Countries' : country}</option>
                            ))}
                        </select>
                    </div>

                    <Link to="/leaderboards" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
                        View Leaderboard
                        <ChevronRightIcon className="w-4 h-4" />
                    </Link>
                </div>

                {/* Winners Grid */}
                {filteredWinners.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {filteredWinners.map((winner, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                                <div className={`h-48 ${winner.thumbnail} relative flex items-center justify-center bg-gray-200`}>
                                    <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        {winner.draw}
                                    </div>
                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                        <PlayIcon className="w-8 h-8 text-blue-600 ml-1" />
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg mb-1">{winner.name}</h3>
                                            <p className="text-gray-500 text-sm flex items-center gap-1">
                                                {winner.flag} {winner.country}
                                            </p>
                                        </div>
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${winner.rank === 1 ? 'bg-yellow-500' : winner.rank === 2 ? 'bg-gray-400' : 'bg-orange-500'
                                            }`}>
                                            {winner.rank}
                                        </div>
                                    </div>

                                    <div className="space-y-2 mb-4">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Prize Won:</span>
                                            <span className="font-bold text-green-600">{winner.prize}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Total Points:</span>
                                            <span className="font-bold text-blue-600">{formatNumber(winner.points)}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Date:</span>
                                            <span className="font-medium text-gray-700">{winner.date}</span>
                                        </div>
                                    </div>

                                    <button className="w-full py-2 border border-blue-600 text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-colors">
                                        View Winning Entry
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No winners found matching your filters.
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default PastWinners;
