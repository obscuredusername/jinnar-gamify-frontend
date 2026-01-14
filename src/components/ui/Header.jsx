import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/userSlice';
import logo from '../../assets/images/jinnar-viral-logo.png';

const Header = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const [showDropdown, setShowDropdown] = useState(false);

    const handleLogout = () => {
        dispatch(logout());
        navigate('/home');
        setShowDropdown(false);
    };

    const isActive = (path) => location.pathname === path;

    return (
        <nav className="bg-white px-6 py-4 shadow-sm">
            <div className="flex justify-between items-center">
                <Link to="/home" className="flex items-center gap-2">
                    <img src={logo} alt="Jinnar Viral Logo" className="h-24 w-auto" />
                </Link>

                {isAuthenticated ? (
                    <div className="flex items-center gap-8">
                        {/* Navigation Tabs */}
                        <div className="flex gap-6">
                            <Link
                                to="/home"
                                className={`text-sm font-medium transition-colors ${isActive('/home')
                                    ? 'text-blue-800 border-b-2 border-blue-800 pb-1'
                                    : 'text-gray-700 hover:text-blue-800'
                                    }`}
                            >
                                Home
                            </Link>
                            <Link
                                to="/leaderboards"
                                className={`text-sm font-medium transition-colors ${isActive('/leaderboards')
                                    ? 'text-blue-800 border-b-2 border-blue-800 pb-1'
                                    : 'text-gray-700 hover:text-blue-800'
                                    }`}
                            >
                                Leaderboards
                            </Link>
                            <Link
                                to="/rules"
                                className={`text-sm font-medium transition-colors ${isActive('/rules')
                                    ? 'text-blue-800 border-b-2 border-blue-800 pb-1'
                                    : 'text-gray-700 hover:text-blue-800'
                                    }`}
                            >
                                Rules and Agreement
                            </Link>
                            <Link
                                to="/announcements"
                                className={`text-sm font-medium transition-colors ${isActive('/announcements')
                                    ? 'text-blue-800 border-b-2 border-blue-800 pb-1'
                                    : 'text-gray-700 hover:text-blue-800'
                                    }`}
                            >
                                Announcements
                            </Link>
                            <Link
                                to="/faq"
                                className={`text-sm font-medium transition-colors ${isActive('/faq')
                                    ? 'text-blue-800 border-b-2 border-blue-800 pb-1'
                                    : 'text-gray-700 hover:text-blue-800'
                                    }`}
                            >
                                FAQ
                            </Link>
                        </div>

                        {/* Action Buttons */}
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

                                {/* Dropdown Menu */}
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
                    </div>
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
        </nav>
    );
};

export default Header;
