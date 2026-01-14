import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { faqData } from '../data/FAQ';
import { ChevronRightIcon, SearchIcon } from '../components/ui/Icons';

const FAQ = () => {
    const [openItem, setOpenItem] = useState(1); // Default first item open
    const [searchQuery, setSearchQuery] = useState('');

    const toggleItem = (id) => {
        setOpenItem(openItem === id ? null : id);
    };

    const filteredFAQ = faqData.filter(item =>
        item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Helper to parse bold text
    const parseContent = (text) => {
        if (!text) return null;
        const parts = text.split('**');
        return parts.map((part, index) =>
            index % 2 === 1 ? <strong key={index}>{part}</strong> : part
        );
    };

    return (
        <div className="min-h-screen bg-blue-50/30">
            <Header />

            {/* Hero / Top Section */}
            <div className="bg-white border-b border-gray-200 pt-12 pb-16 px-6 relative overflow-hidden">
                <div className="max-w-6xl mx-auto relative z-10">
                    <div className="flex flex-col lg:flex-row justify-between items-start gap-12">
                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h1 className="text-4xl font-bold text-blue-900 mb-4">Frequently Asked Questions (FAQ)</h1>
                                    <p className="text-gray-600 text-lg mb-8 max-w-xl">
                                        Find answers to common questions about the Jinnar Viral Challenge:
                                    </p>
                                </div>
                                <div className="flex gap-3 lg:hidden">
                                    {/* Mobile buttons if needed, but keeping layout clean */}
                                </div>
                            </div>

                            {/* Search Bar */}
                            <div className="relative max-w-xl">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    className="block w-full pl-11 pr-4 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
                                    placeholder="Search questions..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Right Side Actions & Illustration Placeholder */}
                        <div className="flex flex-col items-end gap-6">


                            {/* Illustration Placeholder matching design */}
                            <div className="hidden lg:block relative">
                                <div className="w-64 h-48 bg-blue-100/50 rounded-2xl flex items-center justify-center text-blue-300">
                                    <span className="text-6xl">❓</span>
                                </div>
                                {/* Decorative elements */}
                                <div className="absolute -top-4 -right-4 text-4xl text-blue-200 transform rotate-12">?</div>
                                <div className="absolute bottom-4 -left-8 text-5xl text-yellow-200 transform -rotate-12">?</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* FAQ List */}
            <div className="max-w-5xl mx-auto px-6 py-12 space-y-3">
                {filteredFAQ.length > 0 ? (
                    filteredFAQ.map((item) => (
                        <div
                            key={item.id}
                            className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all hover:shadow-md"
                        >
                            <button
                                onClick={() => toggleItem(item.id)}
                                className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-yellow-400 rounded-lg flex items-center justify-center text-gray-900 font-bold text-lg flex-shrink-0 shadow-sm">
                                        {item.id}
                                    </div>
                                    <h2 className="text-lg font-bold text-gray-900">{item.question}</h2>
                                </div>
                                <div className={`transform transition-transform duration-200 text-gray-400 ${openItem === item.id ? 'rotate-90' : ''}`}>
                                    <ChevronRightIcon className="w-5 h-5" />
                                </div>
                            </button>

                            {openItem === item.id && (
                                <div className="px-4 pb-6 pt-2 ml-14 border-t border-gray-50">
                                    <div className="text-gray-700 leading-relaxed bg-blue-50/50 p-4 rounded-lg border border-blue-100">
                                        {item.answer.split('\n\n').map((paragraph, idx) => (
                                            <p key={idx} className={idx > 0 ? 'mt-4' : ''}>
                                                {parseContent(paragraph)}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))
                ) : (
                    <div className="text-center py-12 text-gray-500">
                        No questions found matching "{searchQuery}".
                    </div>
                )}
            </div>

            <Footer />
        </div>
    );
};

export default FAQ;
