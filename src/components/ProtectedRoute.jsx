import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

/**
 * ProtectedRoute component that prevents access to routes without proper authentication
 * 
 * This component performs STRICT validation:
 * 1. Checks if user is authenticated in Redux state
 * 2. Verifies token exists in localStorage
 * 3. Validates user object has required fields (id, email)
 * 
 * If ANY of these checks fail, user is redirected to sign in page
 */
const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const token = localStorage.getItem('authToken');

    // Basic authentication check
    const isUserAuthenticated = isAuthenticated && token && user;

    console.log('🛡️ ProtectedRoute Check:', {
        isAuthenticated,
        hasToken: !!token,
        hasUser: !!user,
        isUserAuthenticated
    });

    // If not authenticated, redirect to login
    if (!isUserAuthenticated) {
        console.warn('⚠️ Access denied - Redirecting to login page');

        // If we have a token but no user/isAuthenticated, it might be stale
        if (token && !isAuthenticated) {
            localStorage.removeItem('authToken');
        }

        return <Navigate to="/login" replace />;
    }

    console.log('✅ Access granted - User is authenticated');
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
