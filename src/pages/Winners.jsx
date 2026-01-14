import React from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { TrophyIcon, TrendingUpIcon } from '../components/ui/Icons';
import { formatNumber, formatCurrency } from '../utils/format';

const Winners = () => {
    // Dummy data for winners
    const currentWinners = [
        { rank: 1, name: "Sarah K.", country: "Kenya", flag: "🇰🇪", prize: 5000, points: 45200, avatar: "S" },
        { rank: 2, name: "David O.", country: "Nigeria", flag: "🇳🇬", prize: 3000, points: 41500, avatar: "D" },
        { rank: 3, name: "Grace M.", country: "Tanzania", flag: "🇹🇿", prize: 1500, points: 38900, avatar: "G" },
    ];

    const recentWinners = [
        { id: 1, name: "John D.", draw: "Draw 2", prize: 2000, date: "Oct 2025" },
        { id: 2, name: "Mary W.", draw: "Draw 2", prize: 1000, date: "Oct 2025" },
        { id: 3, name: "Peter L.", draw: "Draw 1", prize: 2000, date: "Sep 2025" },
        { id: 4, name: "Lucy A.", draw: "Draw 1", prize: 1000, date: "Sep 2025" },
    ];

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
                {/* Current Draw Leaders */}
                <div className="mb-16">
                    <div className="flex items-center justify-between mb-8">
                        <h2 className="text-3xl font-bold text-gray-900">Current Draw Leaders</h2>
                        <div className="flex items-center gap-2 text-green-600 font-semibold bg-green-50 px-4 py-2 rounded-full">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            Live Updates
                        </div>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {currentWinners.map((winner) => (
                            <div key={winner.rank} className="bg-white rounded-2xl shadow-lg overflow-hidden border-2 border-yellow-100 transform hover:-translate-y-1 transition-transform">
                                <div className={`h-2 ${winner.rank === 1 ? 'bg-yellow-400' : winner.rank === 2 ? 'bg-gray-400' : 'bg-orange-400'}`}></div>
                                <div className="p-6 text-center">
                                    <div className="relative inline-block mb-4">
                                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center text-2xl font-bold text-gray-600 border-4 border-white shadow-md">
                                            {winner.avatar}
                                        </div>
                                        <div className={`absolute -bottom-2 -right-2 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold shadow-sm ${winner.rank === 1 ? 'bg-yellow-500' : winner.rank === 2 ? 'bg-gray-500' : 'bg-orange-500'
                                            }`}>
                                            {winner.rank}
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold text-gray-900 mb-1">{winner.name}</h3>
                                    <p className="text-gray-500 text-sm mb-4">{winner.flag} {winner.country}</p>

                                    <div className="grid grid-cols-2 gap-4 bg-gray-50 rounded-lg p-4">
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Points</p>
                                            <p className="text-lg font-bold text-blue-900">{formatNumber(winner.points)}</p>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 uppercase font-bold">Est. Prize</p>
                                            <p className="text-lg font-bold text-green-600">{formatCurrency(winner.prize)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
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
                                {recentWinners.map((winner) => (
                                    <tr key={winner.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap font-medium text-gray-900">{winner.name}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{winner.draw}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-green-600 font-bold">{formatCurrency(winner.prize)}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-gray-500">{winner.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default Winners;
