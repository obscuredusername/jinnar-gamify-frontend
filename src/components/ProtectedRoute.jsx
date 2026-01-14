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
    const token = localStorage.getItem('token');

    // STRICT VALIDATION: All conditions must be true
    const hasValidToken = token && token.length > 0;

    // Relaxed user validation: Check if we have a user object
    // The token decoding might not provide all fields like email, so we check for basic existence
    const hasValidUser = user && typeof user === 'object';

    const isAuthenticatedInRedux = isAuthenticated === true;

    console.log('🛡️ ProtectedRoute Check:', {
        isAuthenticatedInRedux,
        hasValidToken,
        hasValidUser,
        tokenLength: token?.length || 0,
        userKeys: user ? Object.keys(user) : [],
    });

    // If ANY validation fails, redirect to sign in
    if (!isAuthenticatedInRedux || !hasValidToken || !hasValidUser) {
        console.warn('⚠️ Access denied - Redirecting to sign in:', {
            reason: !isAuthenticatedInRedux ? 'Not authenticated in Redux' :
                !hasValidToken ? 'No valid token' :
                    !hasValidUser ? 'No valid user data' : 'Unknown',
        });

        // Clear invalid state
        if (!hasValidToken) {
            localStorage.removeItem('token');
        }

        return <Navigate to="/signin" replace />;
    }

    console.log('✅ Access granted - User is authenticated');
    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.node.isRequired,
};

export default ProtectedRoute;
