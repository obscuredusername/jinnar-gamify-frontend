import { Link } from 'react-router-dom';

const Footer = () => {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="bg-slate-900 text-gray-400 py-6 border-t border-slate-800 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
                    {/* Explore Column */}
                    <div>
                        <h3 className="font-bold text-white text-[10px] mb-3 uppercase tracking-wider">Explore</h3>
                        <ul className="space-y-1.5 text-xs">
                            <li><Link to="/home" className="hover:text-yellow-400 transition-colors">Home Page</Link></li>
                            <li><Link to="/home" className="hover:text-yellow-400 transition-colors">Courses</Link></li>
                            <li><Link to="/home" className="hover:text-yellow-400 transition-colors">Blog</Link></li>
                            <li><Link to="/faq" className="hover:text-yellow-400 transition-colors">FAQ</Link></li>
                        </ul>
                    </div>

                    {/* Resources Column */}
                    <div>
                        <h3 className="font-bold text-white text-[10px] mb-3 uppercase tracking-wider">Resources</h3>
                        <ul className="space-y-1.5 text-xs">
                            <li><Link to="/rules" className="hover:text-yellow-400 transition-colors">Rules</Link></li>
                            <li><Link to="/rules" className="hover:text-yellow-400 transition-colors">Privacy</Link></li>
                            <li><Link to="/winners" className="hover:text-yellow-400 transition-colors">Prizes</Link></li>
                            <li><Link to="/past-winners" className="hover:text-yellow-400 transition-colors">Winners</Link></li>
                        </ul>
                    </div>

                    {/* Company Column */}
                    <div>
                        <h3 className="font-bold text-white text-[10px] mb-3 uppercase tracking-wider">Company</h3>
                        <ul className="space-y-1.5 text-xs">
                            <li><Link to="/home" className="hover:text-yellow-400 transition-colors">About</Link></li>
                            <li><Link to="/dashboard" className="hover:text-yellow-400 transition-colors">Account</Link></li>
                            <li><Link to="/home" className="hover:text-yellow-400 transition-colors">Contact</Link></li>
                            <li><a href="mailto:support@jinnar.com" className="hover:text-yellow-400 transition-colors">Support</a></li>
                        </ul>
                    </div>

                    {/* Social Column */}
                    <div>
                        <h3 className="font-bold text-white text-[10px] mb-3 uppercase tracking-wider">Follow Us</h3>
                        <div className="flex gap-3">
                            <a href="#" className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-all text-[10px]">𝕏</a>
                            <a href="#" className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-all text-xs">📸</a>
                            <a href="#" className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center hover:bg-yellow-400 hover:text-blue-900 transition-all text-xs">🎵</a>
                        </div>
                    </div>
                </div>

                <div className="border-t border-slate-800 pt-4 flex flex-col md:flex-row justify-between items-center gap-2">
                    <div className="flex gap-4 text-[10px] font-medium text-gray-500">
                        <Link to="/rules" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link to="/rules" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                    <div className="text-[10px] text-gray-600 font-medium">
                        © 2026 Jinnar Viral
                    </div>
                </div>
            </div>

            {/* Back to Top Button */}
            <button
                onClick={scrollToTop}
                className="fixed bottom-4 right-4 z-50 bg-yellow-400 text-blue-900 p-3 rounded-full shadow-xl hover:bg-yellow-500 hover:scale-105 transition-all border-2 border-slate-900"
                aria-label="Back to top"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 font-bold" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 15l7-7 7 7" />
                </svg>
            </button>
        </footer>
    );
};

export default Footer;
