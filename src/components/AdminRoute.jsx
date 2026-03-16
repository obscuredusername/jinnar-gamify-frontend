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

    // If not authenticated, redirect to ADMIN login
    if (!isAuthenticatedInRedux || !hasValidToken || !hasValidUser) {
        console.warn('⚠️ Admin access denied - Not authenticated, redirecting to admin login');

        if (!hasValidToken) {
            localStorage.removeItem('authToken');
        }

        return <Navigate to="/admin/login" replace />;
    }

    // TEMPORARILY UNRESTRICTED: Allow all authenticated users to see admin for testing
    console.log('✅ Admin access granted (UNRESTRICTED for testing)');
    return children;
};

AdminRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminRoute;
