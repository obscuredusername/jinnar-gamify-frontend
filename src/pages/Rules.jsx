import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';
import { rulesData } from '../data/rules';
import { AlertCircleIcon, ChevronRightIcon } from '../components/ui/Icons';

const Rules = () => {
    const [openSection, setOpenSection] = useState(1); // Default first section open

    const toggleSection = (id) => {
        setOpenSection(openSection === id ? null : id);
    };

    // Helper to parse text with bolding and links
    const parseContent = (text) => {
        if (!text) return null;

        // Handle specific links first
        if (text.includes('Announcements Page')) {
            const split = text.split('Announcements Page');
            return (
                <span>
                    {parseBold(split[0])}
                    <Link to="/announcements" className="text-blue-600 hover:underline font-semibold">Announcements Page</Link>
                    {parseBold(split[1])}
                </span>
            );
        }

        if (text.includes('Prize & Rewards Page')) {
            const split = text.split('Prize & Rewards Page');
            return (
                <span>
                    {parseBold(split[0])}
                    <Link to="/winners" className="text-blue-600 hover:underline font-semibold">Prize & Rewards Page</Link>
                    {parseBold(split[1])}
                </span>
            );
        }

        return parseBold(text);
    };

    const parseBold = (text) => {
        if (!text) return null;
        const parts = text.split('**');
        return parts.map((part, index) =>
            index % 2 === 1 ? <strong key={index}>{part}</strong> : part
        );
    };

    return (
        <div className="min-h-screen bg-blue-50/50">
            <Header />

            {/* Hero / Top Section */}
            <div className="bg-white border-b border-gray-200 pt-12 pb-16 px-6 relative overflow-hidden">
                <div className="max-w-5xl mx-auto relative z-10">
                    <div className="flex justify-between items-start mb-8">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-teal-400 rounded-full flex items-center justify-center text-white font-bold text-xl">
                                    J
                                </div>
                                <span className="text-2xl font-bold text-blue-900">Jinnar Viral</span>
                            </div>
                            <h1 className="text-4xl font-bold text-blue-900 mb-2">Official Rules & Terms of Use</h1>
                            <p className="text-gray-500">Last Updated: 2025</p>
                        </div>

                    </div>

                    {/* Warning Box */}
                    <div className="bg-orange-50 border border-orange-100 rounded-xl p-6 flex gap-4 items-start max-w-3xl">
                        <div className="text-orange-500 mt-1 flex-shrink-0">
                            <AlertCircleIcon className="w-6 h-6" />
                        </div>
                        <p className="text-gray-700 text-sm leading-relaxed">
                            <span className="font-bold text-gray-900">The Jinnar Viral Challenge ("Contest", "Challenge", or "Jinnar Viral")</span> is operated by Jinnar, a product of Tropina Inc. Participation in this Contest constitutes full and unconditional acceptance of these Rules & Terms of Use. Failure to comply may lead to disqualification, account suspension, or prize forfeiture.
                        </p>
                    </div>
                </div>

                {/* Decorative Illustration (Right Side) */}
                <div className="absolute top-10 right-0 opacity-10 md:opacity-100 pointer-events-none hidden lg:block">
                    {/* Placeholder for the clipboard illustration */}
                    <div className="w-64 h-64 bg-blue-100 rounded-full flex items-center justify-center text-blue-300 text-6xl">
                        📋
                    </div>
                </div>
            </div>

            {/* Rules Content */}
            <div className="max-w-5xl mx-auto px-6 py-12 space-y-4">
                {rulesData.map((section) => (
                    <div
                        key={section.id}
                        className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden transition-all"
                    >
                        <button
                            onClick={() => toggleSection(section.id)}
                            className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors text-left"
                        >
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-orange-400 w-8">{section.id}</span>
                                <h2 className="text-xl font-bold text-blue-900">{section.title}</h2>
                            </div>
                            <div className={`transform transition-transform duration-200 ${openSection === section.id ? 'rotate-180' : ''}`}>
                                <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </button>

                        {openSection === section.id && (
                            <div className="px-6 pb-8 pt-2 border-t border-gray-100 bg-blue-50/30">
                                <div className="pl-12 space-y-4">
                                    {section.content.map((item, idx) => (
                                        <div key={idx} className="text-gray-700 leading-relaxed">
                                            {item.type === 'list' ? (
                                                <div>
                                                    <p className="mb-2">{parseContent(item.text)}</p>
                                                    <ul className="list-disc list-inside space-y-1 ml-4 text-gray-600">
                                                        {item.items.map((li, liIdx) => (
                                                            <li key={liIdx}>{parseContent(li)}</li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            ) : (
                                                <div className="flex gap-3">
                                                    <span className="font-bold text-gray-400 text-sm mt-1">{idx + 1}.</span>
                                                    <div>{parseContent(item.text)}</div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <Footer />
        </div>
    );
};

export default Rules;
