import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { resetPassword } from '../store/slices/userSlice';
import { Button, Input } from '../components/ui';
import logoImage from '../assets/images/jinnar-viral-logo.png';

const ResetPassword = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { loading, error: authError } = useSelector((state) => state.user);

    const [identifier, setIdentifier] = useState('');
    const [code, setCode] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        if (location.state?.identifier) {
            setIdentifier(location.state.identifier);
        }
    }, [location.state]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!identifier) {
            setError('Identifier is required');
            return;
        }
        if (!code) {
            setError('Reset code is required');
            return;
        }
        if (!newPassword) {
            setError('New password is required');
            return;
        }
        if (newPassword.length < 6) {
            setError('Password must be at least 6 characters');
            return;
        }
        if (newPassword !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            await dispatch(resetPassword({ identifier, code, newPassword })).unwrap();
            navigate('/signin');
        } catch (err) {
            console.error('Reset password failed:', err);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 flex items-center justify-center px-4 py-12">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <img
                        src={logoImage}
                        alt="Jinnar Viral"
                        className="h-20 w-auto mx-auto mb-4"
                    />
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">
                        Reset Password
                    </h1>
                    <p className="text-gray-600">
                        Enter the code sent to {identifier} and your new password
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {(error || authError) && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                            {error || authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        {!location.state?.identifier && (
                            <Input
                                label="Email or Phone"
                                type="text"
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                                placeholder="Enter your email or phone"
                            />
                        )}

                        <Input
                            label="Reset Code"
                            type="text"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                            placeholder="Enter code"
                        />

                        <Input
                            label="New Password"
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            placeholder="••••••••"
                        />

                        <Input
                            label="Confirm New Password"
                            type="password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            placeholder="••••••••"
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Resetting...' : 'Reset Password'}
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default ResetPassword;
