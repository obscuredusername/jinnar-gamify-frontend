import React, { useState } from 'react';
import { rulesData } from '../data/rules';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const Rules = () => {
    const [openId, setOpenId] = useState(1); // Default first one open

    const toggleSection = (id) => {
        setOpenId(openId === id ? null : id);
    };

    const renderContent = (item, index) => {
        if (item.type === 'list') {
            return (
                <div key={index} className="mb-2">
                    <div className="text-slate-700 mb-1">
                        {index + 1}. {item.text}
                    </div>
                    <ul className="list-disc pl-8 text-slate-600 space-y-1">
                        {item.items.map((subItem, subIndex) => (
                            <li key={subIndex} dangerouslySetInnerHTML={{
                                __html: subItem.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                            }} />
                        ))}
                    </ul>
                </div>
            );
        }
        return (
            <div key={index} className="mb-2 text-slate-700 flex gap-2">
                <span className="font-semibold text-slate-900 min-w-[1.5rem]">{index + 1}.</span>
                <span dangerouslySetInnerHTML={{
                    __html: item.text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                }} />
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-blue-50 font-sans text-slate-800">
            <Header />

            {/* Hero Section */}
            <div className="relative overflow-hidden bg-gradient-to-b from-white to-blue-50 pb-8 pt-10">
                <div className="max-w-5xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between">
                    <div className="md:w-1/2 z-10">
                        <h1 className="text-4xl md:text-5xl font-bold text-blue-900 mb-2">
                            Official Rules & Terms of Use
                        </h1>
                        <p className="text-sm text-slate-500 mb-6 uppercase tracking-wide">
                            Last Updated: 2025
                        </p>

                        {/* Disclaimer Box */}
                        <div className="bg-orange-50 border-l-4 border-orange-400 p-4 rounded-r-md flex gap-4 shadow-sm">
                            <div className="flex-shrink-0 text-orange-500 pt-1">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                            </div>
                            <div className="text-xs md:text-sm text-slate-700 leading-relaxed">
                                The <strong>Jinnar Viral Challenge</strong> ("Contest", "Challenge", or "Jinnar Viral") is operated by Jinnar, a product of Tropina Inc. Participation in this Contest constitutes full and unconditional acceptance of these Rules & Terms of Use. Failure to comply may lead to disqualification, account suspension, or prize forfeiture.
                            </div>
                        </div>
                    </div>

                    {/* Illustration Placeholder */}
                    <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center relative">
                        <div className="relative w-72 h-64">
                            {/* SVG illustration of Rules/Clipboard */}
                            <svg viewBox="0 0 300 250" className="w-full h-full drop-shadow-xl">
                                {/* Background elements */}
                                <circle cx="250" cy="50" r="10" fill="#FCD34D" opacity="0.5" />
                                <rect x="20" y="40" width="20" height="20" rx="4" fill="#BFDBFE" opacity="0.5" />

                                {/* Clipboard */}
                                <rect x="150" y="40" width="120" height="160" rx="5" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
                                <rect x="150" y="40" width="120" height="160" rx="5" fill="#EFF6FF" />
                                <rect x="160" y="50" width="100" height="140" rx="2" fill="#FFFFFF" />

                                {/* Clip */}
                                <rect x="180" y="30" width="60" height="20" rx="5" fill="#F59E0B" />
                                <circle cx="210" cy="40" r="5" fill="#FFFFFF" />

                                {/* Text Lines */}
                                <rect x="170" y="70" width="80" height="8" rx="2" fill="#3B82F6" opacity="0.2" />
                                <rect x="170" y="90" width="80" height="4" rx="2" fill="#94A3B8" opacity="0.5" />
                                <rect x="170" y="100" width="60" height="4" rx="2" fill="#94A3B8" opacity="0.5" />
                                <rect x="170" y="110" width="70" height="4" rx="2" fill="#94A3B8" opacity="0.5" />

                                {/* Gavel */}
                                <rect x="80" y="120" width="80" height="20" rx="2" fill="#D97706" transform="rotate(-20 120 130)" />
                                <rect x="60" y="110" width="40" height="40" rx="5" fill="#F59E0B" transform="rotate(-20 80 130)" />
                                <rect x="100" y="160" width="60" height="15" rx="2" fill="#78350F" />

                                {/* RULES Text */}
                                <text x="175" y="85" fontFamily="sans-serif" fontSize="16" fontWeight="bold" fill="#1E40AF">RULES</text>
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            {/* Accordion Section */}
            <div className="max-w-4xl mx-auto px-4 pb-20">
                <div className="space-y-3">
                    {rulesData.map((section) => (
                        <div key={section.id} className="bg-white rounded-lg shadow-sm border border-blue-100 overflow-hidden">
                            <button
                                onClick={() => toggleSection(section.id)}
                                className={`w-full flex items-center justify-between p-4 text-left transition-colors ${openId === section.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
                            >
                                <div className="flex items-center gap-4">
                                    <span className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-orange-100 text-orange-600 rounded-md font-bold text-lg">
                                        {section.id}
                                    </span>
                                    <span className="font-bold text-blue-900 text-lg">
                                        {section.title}
                                    </span>
                                </div>
                                <svg
                                    className={`w-5 h-5 text-gray-400 transform transition-transform duration-200 ${openId === section.id ? 'rotate-180' : ''}`}
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>

                            {openId === section.id && (
                                <div className="px-4 pb-6 pt-2 pl-16 pr-8 bg-blue-50/20 border-t border-blue-50">
                                    <div className="space-y-2">
                                        {section.content.map((item, idx) => renderContent(item, idx))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </div>
    );
};

export default Rules;
