import React, { useState, useEffect } from 'react';
import announcementsData from '../data/announcements'; // Fallback data
import viralService from '../services/viralService';
import { getCategoryColors } from '../utils/colors';
import { CalendarIcon, TagIcon, ChevronRightIcon } from '../components/ui/Icons';
import { formatDate } from '../utils/format';

const Announcements = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [announcements, setAnnouncements] = useState([]);
    const [loading, setLoading] = useState(true);

    // Fetch announcements from API
    useEffect(() => {
        const fetchAnnouncements = async () => {
            try {
                const response = await viralService.getAnnouncements();
                if (response.success && response.data.length > 0) {
                    setAnnouncements(response.data);
                } else {
                    // Fallback to static data if API returns empty/fails (for demo/development stability)
                    console.log('Using static announcement data as fallback');
                    setAnnouncements(announcementsData);
                }
            } catch (error) {
                console.error('Error fetching announcements:', error);
                setAnnouncements(announcementsData); // Fallback on error
            } finally {
                setLoading(false);
            }
        };

        fetchAnnouncements();
    }, []);

    // Extract unique categories from actual data
    const categories = ['All', ...new Set(announcements.map(item => item.category))];

    const filteredAnnouncements = selectedCategory === 'All'
        ? announcements
        : announcements.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">

            <div className="bg-blue-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Announcements & Updates</h1>
                    <p className="text-blue-200">Stay up to date with the latest news from Jinnar Viral.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                    {loading ? (
                        <div className="w-full flex gap-2">
                            {[1, 2, 3, 4].map(i => (
                                <div key={i} className="h-10 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                            ))}
                        </div>
                    ) : (
                        categories.map(category => (
                            <button
                                key={category}
                                onClick={() => setSelectedCategory(category)}
                                className={`px-4 py-2 rounded-full whitespace-nowrap font-medium transition-colors ${selectedCategory === category
                                    ? 'bg-blue-800 text-white'
                                    : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
                                    }`}
                            >
                                {category}
                            </button>
                        ))
                    )}
                </div>

                {/* Announcements Grid */}
                {loading ? (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1, 2, 3, 4, 5, 6].map(i => (
                            <div key={i} className="bg-white rounded-xl shadow-sm h-64 animate-pulse p-6">
                                <div className="h-4 bg-gray-200 rounded w-1/3 mb-4"></div>
                                <div className="h-6 bg-gray-200 rounded w-3/4 mb-4"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredAnnouncements.map((item) => {
                            const colors = getCategoryColors(item.categoryColor || 'blue'); // Fallback color

                            return (
                                <div key={item.id} className="bg-white rounded-xl shadow-sm overflow-hidden hover:shadow-md transition-shadow border border-gray-100 flex flex-col">
                                    <div className="p-6 flex-1">
                                        <div className="flex items-center justify-between mb-4">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${colors.bg} ${colors.text}`}>
                                                {item.category}
                                            </span>
                                            <span className="text-gray-400 text-sm flex items-center gap-1">
                                                <CalendarIcon className="w-3 h-3" />
                                                {formatDate(item.date)}
                                            </span>
                                        </div>

                                        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">{item.title}</h3>
                                        <p className="text-gray-600 mb-4 line-clamp-3">
                                            {item.excerpt || (item.content ? item.content.substring(0, 120) + '...' : '')}
                                        </p>
                                    </div>

                                    <div className="px-6 py-4 bg-gray-50 border-t border-gray-100 flex justify-between items-center">
                                        <button className="text-blue-600 font-semibold text-sm hover:text-blue-800 flex items-center gap-1">
                                            Read More <ChevronRightIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

        </div>
    );
};

export default Announcements;
