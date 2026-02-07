import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPassword } from '../store/slices/userSlice';
import { Button, Input } from '../components/ui';
import logoImage from '../assets/images/jinnar-viral-logo.png';

const ForgotPassword = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { loading, error: authError } = useSelector((state) => state.user);

    const [identifier, setIdentifier] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!identifier) {
            setError('Email or phone is required');
            return;
        }

        try {
            await dispatch(forgotPassword(identifier)).unwrap();
            navigate('/reset-password', { state: { identifier } });
        } catch (err) {
            console.error('Forgot password failed:', err);
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
                        Forgot Password?
                    </h1>
                    <p className="text-gray-600">
                        Enter your email or phone to receive a reset code
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {(error || authError) && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                            {error || authError}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <Input
                            label="Email or Phone"
                            type="text"
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            placeholder="Enter your email or phone"
                        />

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Sending Code...' : 'Send Reset Code'}
                        </Button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-600">
                        Remember your password?{' '}
                        <Link
                            to="/signin"
                            className="font-medium text-primary-600 hover:text-primary-700"
                        >
                            Sign in
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
