import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-slate-900 text-white py-6 text-xs">
            <div className="max-w-7xl mx-auto px-4 flex flex-wrap justify-center gap-6 md:gap-8 opacity-80">
                <Link to="/home" className="hover:text-yellow-400 transition-colors">Home</Link>
                <Link to="/dashboard" className="hover:text-yellow-400 transition-colors">Registration & Dashboard</Link>
                <Link to="/announcements" className="hover:text-yellow-400 transition-colors">Announcements</Link>
                <Link to="/upload" className="hover:text-yellow-400 transition-colors">Submit Video</Link>
                <Link to="/leaderboards" className="hover:text-yellow-400 transition-colors">Leaderboards</Link>
                <Link to="/rules" className="hover:text-yellow-400 transition-colors">Rules & Terms</Link>
                <Link to="/winners" className="hover:text-yellow-400 transition-colors">Prize & Rewards</Link>
                <Link to="/past-winners" className="hover:text-yellow-400 transition-colors">Past Winners</Link>
                <Link to="/media" className="hover:text-yellow-400 transition-colors">Media & Highlights</Link>
                <Link to="/home" className="hover:text-yellow-400 transition-colors">About Jinnar Viral</Link>
                <a href="mailto:support@jinnar.com" className="hover:text-yellow-400 transition-colors">Contact Support</a>
            </div>
            <div className="text-center mt-4 text-slate-500">
                Copyright © 2025 • Jinnar — Verified. Trusted. Empowered.
            </div>
        </footer>
    );
};

export default Footer;
