import React, { useState } from 'react';
import { faqData } from '../data/FAQ';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const FAQ = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [openId, setOpenId] = useState(1); // Default first one open

    const filteredFAQs = faqData.filter(faq =>
        faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleFAQ = (id) => {
        setOpenId(openId === id ? null : id);
    };

    return (
        <div className="min-h-screen bg-blue-50 font-sans text-slate-800">
            <Header />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 pb-12 pt-10">
                <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 z-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-4">
                            Frequently Asked Questions (FAQ)
                        </h1>
                        <p className="text-lg text-slate-600 mb-8">
                            Find answers to common questions about the Jinnar Viral Challenge:
                        </p>

                        <div className="relative max-w-md">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <input
                                type="text"
                                className="block w-full pl-10 pr-3 py-3 border border-gray-200 rounded-lg leading-5 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm shadow-sm"
                                placeholder="Search questions..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>

                    {/* Illustration Placeholder */}
                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
                        {/* Decorative elements simulating the clouds/questions in the image */}
                        <div className="absolute top-0 right-10 text-blue-200 text-6xl font-bold opacity-50">?</div>
                        <div className="absolute bottom-10 left-10 text-yellow-200 text-8xl font-bold opacity-50">?</div>

                        <div className="relative w-64 h-64">
                            {/* Simple SVG illustration of person with laptop */}
                            <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-xl">
                                <circle cx="100" cy="100" r="90" fill="#EBF8FF" />
                                <rect x="40" y="120" width="120" height="10" rx="2" fill="#FCD34D" /> {/* Books */}
                                <rect x="50" y="110" width="100" height="10" rx="2" fill="#F59E0B" />
                                <rect x="60" y="100" width="80" height="10" rx="2" fill="#3B82F6" />

                                <circle cx="100" cy="60" r="25" fill="#8D5524" /> {/* Head */}
                                <path d="M70 100 Q100 140 130 100 L130 130 L70 130 Z" fill="#FCD34D" /> {/* Shirt */}
                                <rect x="60" y="90" width="40" height="30" rx="2" fill="#1E40AF" transform="rotate(-10 80 105)" /> {/* Laptop */}
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Accordion Section */}
            <div className="max-w-4xl mx-auto px-4 pb-20">
                <div className="space-y-3">
                    {filteredFAQs.map((faq) => (
                        <div key={faq.id} className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                            <button
                                onClick={() => toggleFAQ(faq.id)}
                                className={`w-full flex items-center justify-between p-4 text-left transition-colors ${openId === faq.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-yellow-400 rounded-md text-blue-900 font-bold text-sm">
                                        {faq.id}
                                    </span>
                                    <span className="font-semibold text-blue-900 text-lg">
                                        {faq.question}
                                    </span>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${openId === faq.id ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openId === faq.id && (
                                <div className="px-4 pb-6 pt-2 pl-16 pr-8 bg-blue-50/30">
                                    <div className="text-slate-700 leading-relaxed whitespace-pre-line">
                                        {faq.answer.split('**').map((part, i) =>
                                            i % 2 === 1 ? <strong key={i}>{part}</strong> : part
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}

                    {filteredFAQs.length === 0 && (
                        <div className="text-center py-10 text-gray-500">
                            No questions found matching your search.
                        </div>
                    )}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default FAQ;
