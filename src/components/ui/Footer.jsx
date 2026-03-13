import { Link, useLocation } from 'react-router-dom';

const Footer = () => {
    const location = useLocation();
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Hide footer on auth pages
    const authPaths = ['/login', '/register', '/signin', '/signup', '/verify', '/forgot-password', '/reset-password'];
    if (authPaths.includes(location.pathname)) {
        return null;
    }

    return (
        <footer className="bg-slate-900 text-gray-400 py-6 border-t border-slate-800 relative">
            <div className="max-w-7xl mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    {/* Platform Column */}
                    <div>
                        <h3 className="font-bold text-white text-[10px] mb-3 uppercase tracking-wider">Platform</h3>
                        <ul className="space-y-1.5 text-xs">
                            <li><Link to="/home" className="hover:text-yellow-400 transition-colors">Home Page</Link></li>
                            <li><Link to="/challenge" className="hover:text-yellow-400 transition-colors">Viral Challenge</Link></li>
                            <li><Link to="/announcements" className="hover:text-yellow-400 transition-colors">Announcements</Link></li>
                            <li><Link to="/media" className="hover:text-yellow-400 transition-colors">Media Hub</Link></li>
                            <li><Link to="/rules" className="hover:text-yellow-400 transition-colors">Rules</Link></li>
                        </ul>
                    </div>

                    {/* Community Column */}
                    <div>
                        <h3 className="font-bold text-white text-[10px] mb-3 uppercase tracking-wider">Community</h3>
                        <ul className="space-y-1.5 text-xs">
                            <li><Link to="/leaderboards" className="hover:text-yellow-400 transition-colors">Leaderboards</Link></li>
                            <li><Link to="/winners" className="hover:text-yellow-400 transition-colors">Current Winners</Link></li>
                            <li><Link to="/past-winners" className="hover:text-yellow-400 transition-colors">Past Winners</Link></li>
                            <li><Link to="/faq" className="hover:text-yellow-400 transition-colors">FAQ</Link></li>
                            <li><a href="mailto:support@jinnar.com" className="hover:text-yellow-400 transition-colors">Support</a></li>
                        </ul>
                    </div>

                    {/* Account Column */}
                    <div>
                        <h3 className="font-bold text-white text-[10px] mb-3 uppercase tracking-wider">Account</h3>
                        <ul className="space-y-1.5 text-xs">
                            <li><Link to="/dashboard" className="hover:text-yellow-400 transition-colors">My Dashboard</Link></li>
                            <li><Link to="/submit-link" className="hover:text-yellow-400 transition-colors">Submit Entry</Link></li>
                            <li><Link to="/upload" className="hover:text-yellow-400 transition-colors">Upload Video</Link></li>
                            <li><Link to="/settings" className="hover:text-yellow-400 transition-colors">Settings</Link></li>
                        </ul>
                    </div>


                </div>

                <div className="border-t border-slate-800 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <div className="flex gap-6 text-[10px] font-medium text-gray-500">
                        <div className="flex gap-4 items-center">
                            <a href="https://www.facebook.com/share/1F2AEC5cYr/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#1877F2] hover:text-white transition-all text-[12px]" title="Facebook">
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
                            </a>
                            <a href="https://www.instagram.com/ji_nnar?igsh=M3Z4cnBidDYyaHhp" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#E4405F] hover:text-white transition-all text-[12px]" title="Instagram">
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.17.054 1.805.249 2.227.412.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36.17.412 1.34s.053 1.646.07 4.849-.012 3.584-.07 4.85c-.054 1.17-.249 1.805-.412 2.227-.217.562-.477.96-.896 1.382-.42.419-.819.679-1.381.896-.422.164-1.057.359-2.227.412-1.266.058-1.646.07-4.85.07s-3.584-.012-4.85-.07c-1.17-.054-1.805-.249-2.227-.412-.562-.217-.96-.477-1.382-.896-.419-.42-.679-.819-.896-1.381-.164-.422-.359-1.056-.412-2.227-.058-1.266-.07-1.646-.07-4.85s.012-3.584.07-4.85c.054-1.17.249-1.805.412-2.227.217-.562.477-.96.896-1.382.42-.419.819-.679 1.381-.896.422-.164 1.056-.359 2.227-.412 1.266-.058 1.646-.07 4.85-.07zm0-2.163c-3.259 0-3.667.014-4.947.072-1.28.058-2.152.261-2.917.559-.791.307-1.462.718-2.13 1.387s-1.08 1.339-1.387 2.13c-.298.765-.501 1.637-.559 2.917-.058 1.28-.072 1.688-.072 4.947s.014 3.668.072 4.948c.058 1.279.261 2.151.559 2.916.307.791.718 1.462 1.387 2.13s1.339 1.08 2.13 1.387c.765.298 1.637.501 2.917.559 1.28.058 1.688.072 4.947.072s3.668-.014 4.948-.072c1.279-.058 2.151-.261 2.916-.559.791-.307 1.462-.718 2.13-1.387s1.08-1.339 1.387-2.13c.298-.765.501-1.637.559-2.917.058-1.28.072-1.688.072-4.947s-.014-3.668-.072-4.947c-.058-1.28-.261-2.152-.559-2.917-.307-.791-.718-1.462-1.387-2.13s-1.339-1.08-2.13-1.387c-.765-.298-1.637-.501-2.917-.559-1.28-.058-1.688-.072-4.948-.072zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.162 6.162 6.162 6.162-2.759 6.162-6.162-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.791-4-4s1.791-4 4-4 4 1.791 4 4-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" /></svg>
                            </a>
                            <a href="https://youtube.com/@jinnarcompany?si=jfCGJtzcumw4PfGV" target="_blank" rel="noopener noreferrer" className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all text-[12px]" title="YouTube">
                                <svg className="w-3 h-3 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" /></svg>
                            </a>
                        </div>
                        <div className="flex gap-4 items-center">
                        </div>
                    </div>
                    <div className="text-[10px] text-gray-600 font-medium">
                        © 2026 Jinnar Viral • All Rights Reserved
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
