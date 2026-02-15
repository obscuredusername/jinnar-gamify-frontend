import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * AdminRoute component that restricts access to admin-only pages
 * 
 * This component performs validation:
 * 1. Checks if user is authenticated
 * 2. Verifies user has admin role
 * 
 * If user is not authenticated, redirects to login
 * If user is authenticated but not admin, shows unauthorized message and redirects to home
 */
const AdminRoute = ({ children }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const token = localStorage.getItem('authToken');

    // Check authentication
    const hasValidToken = token && token.length > 0;
    const hasValidUser = user && typeof user === 'object';
    const isAuthenticatedInRedux = isAuthenticated === true;

    console.log('🔐 AdminRoute Check:', {
        isAuthenticatedInRedux,
        hasValidToken,
        hasValidUser,
        userRole: user?.role,
        isAdmin: user?.isAdmin,
    });

    // If not authenticated, redirect to login
    if (!isAuthenticatedInRedux || !hasValidToken || !hasValidUser) {
        console.warn('⚠️ Admin access denied - Not authenticated, redirecting to login');

        if (!hasValidToken) {
            localStorage.removeItem('authToken');
        }

        return <Navigate to="/login" replace />;
    }

    // Check if user has admin role
    // Support both user.role === 'admin' and user.isAdmin === true patterns
    const isAdmin = user.role === 'admin' || user.isAdmin === true;

    if (!isAdmin) {
        console.warn('⚠️ Admin access denied - User is not an admin');

        // Show unauthorized message and redirect to home
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
                    <div className="text-6xl mb-4">🚫</div>
                    <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
                    <p className="text-gray-600 mb-6">
                        You don't have permission to access this page. Admin privileges are required.
                    </p>
                    <a
                        href="/home"
                        className="inline-block bg-blue-800 hover:bg-blue-900 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
                    >
                        Go to Home
                    </a>
                </div>
            </div>
        );
    }

    console.log('✅ Admin access granted');
    return children;
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminRoute;
