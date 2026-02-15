import React, { useState, useEffect } from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { TrophyIcon } from '../components/ui/Icons';
import { formatNumber, formatCurrency } from '../utils/format';
import viralService from '../services/viralService';

const Winners = () => {
    // State
    const [currentLeaders, setCurrentLeaders] = useState([]);
    const [recentWinners, setRecentWinners] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Get Active Draw for "Current Leaders"
                const activeDrawsRes = await viralService.getActiveDraws();
                const activeDraw = activeDrawsRes.success && activeDrawsRes.data.length > 0 ? activeDrawsRes.data[0] : null;

                if (activeDraw) {
                    // Fetch Leaderboard for active draw (Top 3)
                    const leaderboardRes = await viralService.getLeaderboard(activeDraw._id, 'global', 3);
                    if (leaderboardRes.success) {
                        setCurrentLeaders(leaderboardRes.data.slice(0, 3));
                    }
                }

                // 2. Get Past Draws for "Recent Winners"
                const closedDrawsRes = await viralService.getClosedDraws();
                const closedDraws = closedDrawsRes.success ? closedDrawsRes.data : [];

                if (closedDraws.length > 0) {
                    // Get winners from the most recent closed draw
                    const lastDraw = closedDraws[0];
                    const winnersRes = await viralService.getDrawWinners(lastDraw._id);
                    if (winnersRes.success) {
                        // Map to simplified format and add Draw Title
                        const formattedWinners = winnersRes.data.map(w => ({
                            id: w.userId,
                            name: w.userName || 'Winner',
                            draw: lastDraw.title,
                            prize: w.reward || 0,
                            date: new Date(lastDraw.endDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                        }));
                        setRecentWinners(formattedWinners);
                    }
                }

            } catch (error) {
                console.error("Error fetching winners data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero */}
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white py-16 px-6">
                <div className="max-w-7xl mx-auto text-center">
                    <TrophyIcon className="w-16 h-16 mx-auto mb-4 text-yellow-100" />
                    <h1 className="text-5xl font-bold mb-4">Hall of Fame</h1>
                    <p className="text-yellow-100 text-xl">Celebrating the top creators and viral stars of Jinnar.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">

                {loading ? (
                    <div className="text-center py-12 text-gray-500">Loading hall of fame...</div>
                ) : (
                    <>
                        {/* Current Draw Leaders */}
                        <div className="mb-16">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-3xl font-bold text-gray-900">Current Draw Leaders</h2>
                                <div className="flex items-center gap-2 text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-full">
                                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                                    Live Updates
                                </div>
                            </div>

                            {currentLeaders.length > 0 ? (
                                <div className="grid md:grid-cols-3 gap-8">
                                    {currentLeaders.map((leader, index) => (
                                        <div key={leader.userId || index} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-100 transform hover:-translate-y-1 transition-transform">
                                            <div className={`h-2 ${index === 0 ? 'bg-yellow-400' : index === 1 ? 'bg-gray-400' : 'bg-orange-400'}`}></div>
                                            <div className="p-6 text-center">
                                                <div className="relative inline-block mb-4">
                                                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 border-4 border-white shadow-md">
                                                        {leader.name ? leader.name.charAt(0) : '?'}
                                                    </div>
                                                    <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-500' : 'bg-orange-500'}`}>
                                                        {index + 1}
                                                    </div>
                                                </div>

                                                <h3 className="text-xl font-bold text-gray-900 mb-1">{leader.name || 'Anonymous'}</h3>
                                                <p className="text-gray-500 text-sm mb-4">Global Leader</p>

                                                <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase font-bold">Points</p>
                                                        <p className="text-lg font-bold text-blue-900">{formatNumber(leader.totalPoints)}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-xs text-gray-500 uppercase font-bold">Est. Rank</p>
                                                        <p className="text-lg font-bold text-green-600">#{index + 1}</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-8 text-gray-500">
                                    No active leaders right now. Be the first!
                                </div>
                            )}
                        </div>

                        {/* Recent Winners Table */}
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6 border-b border-gray-200">
                                <h3 className="text-xl font-bold text-gray-900">Recent Winners</h3>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Winner</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Draw</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prize Won</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-200">
                                        {recentWinners.length > 0 ? (
                                            recentWinners.map((winner, idx) => (
                                                <tr key={idx} className="hover:bg-gray-50">
                                                    <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{winner.name}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{winner.draw}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold">{winner.prize ? formatCurrency(winner.prize) : '-'}</td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">{winner.date}</td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan="4" className="px-6 py-8 text-center text-gray-500">
                                                    No recent winners found.
                                                </td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default Winners;
