import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import viralService from '../services/viralService';
import { PlayIcon, FilterIcon, ChevronRightIcon } from '../components/ui/Icons';
import { formatNumber } from '../utils/format';

const PastWinners = () => {
    const [draws, setDraws] = useState([]);
    const [selectedDraw, setSelectedDraw] = useState('');
    const [winners, setWinners] = useState([]);
    const [loading, setLoading] = useState(true);

    // Initial Load: Fetch Closed Draws
    useEffect(() => {
        const fetchDraws = async () => {
            try {
                const response = await viralService.getClosedDraws();
                const closedDraws = response.success ? response.data : (Array.isArray(response) ? response : []);

                setDraws(closedDraws);
                if (closedDraws.length > 0) {
                    setSelectedDraw(closedDraws[0]._id); // Default to most recent closed draw
                } else {
                    setLoading(false); // No data to load if no draws
                }
            } catch (error) {
                console.error("Error fetching past draws:", error);
                setLoading(false);
            }
        };
        fetchDraws();
    }, []);

    // Fetch Winners when Draw Changes
    useEffect(() => {
        if (!selectedDraw) return;

        const fetchWinners = async () => {
            setLoading(true);
            try {
                const response = await viralService.getDrawWinners(selectedDraw);
                if (response.success) {
                    setWinners(response.data);
                } else {
                    setWinners([]);
                }
            } catch (error) {
                console.error("Error fetching winners:", error);
                setWinners([]);
            } finally {
                setLoading(false);
            }
        };

        fetchWinners();
    }, [selectedDraw]);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero / Top Section */}
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
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Filters & Actions */}
                <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 mb-8 flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-4 items-center">
                        <div className="flex items-center gap-2 text-gray-600 font-semibold">
                            <FilterIcon className="w-5 h-5" />
                            Select Draw:
                        </div>

                        {draws.length > 0 ? (
                            <select
                                value={selectedDraw}
                                onChange={(e) => setSelectedDraw(e.target.value)}
                                className="px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500 min-w-[200px]"
                            >
                                {draws.map(draw => (
                                    <option key={draw._id} value={draw._id}>
                                        {draw.title || `Draw ${draw._id}`}
                                    </option>
                                ))}
                            </select>
                        ) : (
                            <span className="text-gray-500 italic">No past draws available</span>
                        )}
                    </div>

                    <Link to="/leaderboards" className="text-blue-600 hover:text-blue-800 font-semibold flex items-center gap-1">
                        View Leaderboard
                        <ChevronRightIcon className="w-4 h-4" />
                    </Link>
                </div>

                {/* Winners Grid */}
                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading winners...</div>
                ) : winners.length > 0 ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {winners.map((winner, index) => (
                            <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow border border-gray-100">
                                <div className="h-48 bg-gradient-to-br from-gray-200 to-gray-300 relative flex items-center justify-center">
                                    <div className="absolute top-3 right-3 bg-black/70 text-white px-3 py-1 rounded-full text-xs font-bold">
                                        #{winner.rank}
                                    </div>
                                    <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center text-2xl font-bold text-gray-700 uppercase">
                                        {winner.userName ? winner.userName.charAt(0) : '?'}
                                    </div>
                                </div>

                                <div className="p-6">
                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h3 className="font-bold text-gray-900 text-lg mb-1">{winner.userName || 'Winner'}</h3>
                                            <p className="text-gray-500 text-sm flex items-center gap-1">
                                                {winner.country || 'Global'}
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
                                            <span className="font-bold text-green-600">{winner.reward ? `$${winner.reward.toLocaleString()}` : '-'}</span>
                                        </div>
                                        <div className="flex justify-between text-sm">
                                            <span className="text-gray-500">Points:</span>
                                            <span className="font-bold text-blue-600">{winner.points ? formatNumber(winner.points) : '-'}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-lg mb-2">No winners found for this draw.</p>
                        <p className="text-sm">Check back later or select another draw.</p>
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default PastWinners;
