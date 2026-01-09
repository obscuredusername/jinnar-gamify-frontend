import React from 'react';
import logo from '../../assets/images/jinnar-viral-logo.png';

const Header = () => {
    return (
        <nav className="bg-white px-6 py-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
                <img src={logo} alt="Jinnar Viral Logo" className="h-24 w-auto" />
            </div>
            <div className="flex gap-4">
                <button className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded-md transition-colors">
                    Join Active Draw
                </button>
                <button className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-md flex items-center gap-2 transition-colors">
                    Upload Video
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </button>
            </div>
        </nav>
    );
};

export default Header;
