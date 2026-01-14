import React, { useState } from 'react';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import announcementsData from '../data/announcements';
import { getCategoryColors } from '../utils/colors';
import { CalendarIcon, TagIcon, ChevronRightIcon } from '../components/ui/Icons';
import { formatDate } from '../utils/format';

const Announcements = () => {
    const [selectedCategory, setSelectedCategory] = useState('All');

    const categories = ['All', ...new Set(announcementsData.map(item => item.category))];

    const filteredAnnouncements = selectedCategory === 'All'
        ? announcementsData
        : announcementsData.filter(item => item.category === selectedCategory);

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            <div className="bg-blue-900 text-white py-12 px-6">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4">Announcements & Updates</h1>
                    <p className="text-blue-200">Stay up to date with the latest news from Jinnar Viral.</p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-8">
                {/* Category Filter */}
                <div className="flex gap-2 overflow-x-auto pb-4 mb-8 scrollbar-hide">
                    {categories.map(category => (
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
                    ))}
                </div>

                {/* Announcements Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredAnnouncements.map((item) => {
                        const colors = getCategoryColors(item.categoryColor);

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
                                    <p className="text-gray-600 mb-4 line-clamp-3">{item.excerpt}</p>
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
            </div>

            <Footer />
        </div>
    );
};

export default Announcements;
