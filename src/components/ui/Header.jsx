import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/userSlice';
import logo from '../../assets/images/jinnar-viral-logo.png';
import { MenuIcon, CloseIcon } from './Icons';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [showDropdown, setShowDropdown] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/home');
        setShowDropdown(false);
        setIsMobileMenuOpen(false);
    };

    const isActive = (path) => location.pathname === path;

    const closeMobileMenu = () => setIsMobileMenuOpen(false);

    const navLinks = [
        { path: '/home', label: 'Home' },
        { path: '/leaderboards', label: 'Leaderboards' },
        { path: '/rules', label: 'Rules and Agreement' },
        { path: '/announcements', label: 'Announcements' },
        { path: '/faq', label: 'FAQ' },
    ];

    return (
        <nav className="bg-white px-6 py-4 shadow-sm relative z-50">
            <div className="flex justify-between items-center">
                <Link to="/home" className="flex items-center gap-2" onClick={closeMobileMenu}>
                    <img src={logo} alt="Jinnar Viral Logo" className="h-16 md:h-24 w-auto" />
                </Link>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-gray-700 focus:outline-none"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <CloseIcon className="w-8 h-8" /> : <MenuIcon className="w-8 h-8" />}
                </button>

                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-8">
                    {isAuthenticated ? (
                        <>
                            <div className="flex gap-6">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        className={`text-sm font-medium transition-colors ${isActive(link.path)
                                            ? 'text-blue-800 border-b-2 border-blue-800 pb-1'
                                            : 'text-gray-700 hover:text-blue-800'
                                            }`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>

                            <div className="flex gap-4 items-center">
                                <button
                                    onClick={() => navigate('/challenge')}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded-md transition-colors"
                                >
                                    Join Active Draw
                                </button>
                                <button
                                    onClick={() => navigate('/upload')}
                                    className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-md flex items-center gap-2 transition-colors"
                                >
                                    Upload Video
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>

                                {/* Profile Avatar Dropdown */}
                                <div className="relative">
                                    <button
                                        onClick={() => setShowDropdown(!showDropdown)}
                                        className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center hover:bg-gray-400 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </button>

                                    {showDropdown && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                                            <div className="px-4 py-2 border-b border-gray-200">
                                                <p className="text-sm font-semibold text-gray-900">
                                                    {user?.name || user?.email || 'User'}
                                                </p>
                                                {user?.email && (
                                                    <p className="text-xs text-gray-500">{user.email}</p>
                                                )}
                                            </div>
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setShowDropdown(false)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                My Dashboard
                                            </Link>
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setShowDropdown(false)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                My Videos
                                            </Link>
                                            <Link
                                                to="/dashboard"
                                                onClick={() => setShowDropdown(false)}
                                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                            >
                                                Settings
                                            </Link>
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex gap-4">
                            <button
                                onClick={() => navigate('/register')}
                                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-2 px-6 rounded-md transition-colors"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => navigate('/login')}
                                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-2 px-6 rounded-md transition-colors"
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            {isMobileMenuOpen && (
                <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-lg border-t border-gray-100 py-4 px-6 flex flex-col gap-4">
                    {isAuthenticated ? (
                        <>
                            <div className="flex flex-col gap-3">
                                {navLinks.map((link) => (
                                    <Link
                                        key={link.path}
                                        to={link.path}
                                        onClick={closeMobileMenu}
                                        className={`text-base font-medium py-2 ${isActive(link.path) ? 'text-blue-800' : 'text-gray-700'}`}
                                    >
                                        {link.label}
                                    </Link>
                                ))}
                            </div>
                            <hr className="border-gray-100" />
                            <div className="flex flex-col gap-3">
                                <Link to="/dashboard" onClick={closeMobileMenu} className="text-gray-700 py-2">My Dashboard</Link>
                                <Link to="/dashboard" onClick={closeMobileMenu} className="text-gray-700 py-2">My Videos</Link>
                                <button onClick={handleLogout} className="text-red-600 text-left py-2">Logout</button>
                            </div>
                            <div className="flex flex-col gap-3 mt-2">
                                <button
                                    onClick={() => { navigate('/challenge'); closeMobileMenu(); }}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-md text-center"
                                >
                                    Join Active Draw
                                </button>
                                <button
                                    onClick={() => { navigate('/upload'); closeMobileMenu(); }}
                                    className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-md flex items-center justify-center gap-2"
                                >
                                    Upload Video
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex flex-col gap-4">
                            <button
                                onClick={() => { navigate('/register'); closeMobileMenu(); }}
                                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-bold py-3 px-6 rounded-md text-center"
                            >
                                Register
                            </button>
                            <button
                                onClick={() => { navigate('/login'); closeMobileMenu(); }}
                                className="bg-blue-800 hover:bg-blue-900 text-white font-bold py-3 px-6 rounded-md text-center"
                            >
                                Login
                            </button>
                        </div>
                    )}
                </div>
            )}
        </nav>
    );
};

export default Header;
