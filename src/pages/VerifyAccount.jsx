import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { verifyUser, resendCode } from '../store/slices/userSlice';
import { Button, Input } from '../components/ui';
import logoImage from '../assets/images/jinnar-viral-logo.png';

const VerifyAccount = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();
    const { loading, error: authError } = useSelector((state) => state.user);

    const [identifier, setIdentifier] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        if (location.state?.identifier) {
            setIdentifier(location.state.identifier);
            // Show initial message if coming from signup
            setSuccessMessage(`We've sent a verification code to ${location.state.identifier}`);
        }
    }, [location.state]);

    const handleResendCode = async () => {
        if (!identifier) {
            setError('Identifier is required to resend code');
            return;
        }
        setError('');
        setSuccessMessage('');

        try {
            await dispatch(resendCode(identifier)).unwrap();
            setSuccessMessage(`A new verification code has been sent to ${identifier}`);
        } catch (err) {
            console.error('Resend failed:', err);
            // Error is handled by redux state, but we can also set local error if needed
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setSuccessMessage('');

        if (!identifier) {
            setError('Identifier is required');
            return;
        }

        if (!otp) {
            setError('Please enter the verification code');
            return;
        }

        try {
            await dispatch(verifyUser({ identifier, code: otp })).unwrap();
            // On success, redirect to login
            setSuccessMessage('Account verified successfully! Redirecting to login...');
            setTimeout(() => {
                navigate('/signin');
            }, 2000);
        } catch (err) {
            console.error('Verification failed:', err);
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
                        Verify Your Account
                    </h1>
                    <p className="text-gray-600">
                        Enter the 6-digit code sent to your email/phone
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {(error || authError) && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm border border-red-100">
                            {error || authError}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm border border-green-100">
                            {successMessage}
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

                        <div>
                            <Input
                                label="Verification Code"
                                type="text"
                                value={otp}
                                onChange={(e) => setOtp(e.target.value)}
                                placeholder="e.g. 758037"
                                maxLength={6}
                                className="text-center tracking-widest text-lg"
                            />
                            <p className="mt-2 text-xs text-gray-500 text-center">
                                The code is 6 digits long
                            </p>
                        </div>

                        <Button
                            type="submit"
                            variant="primary"
                            size="lg"
                            className="w-full"
                            disabled={loading}
                        >
                            {loading ? 'Verifying...' : 'Verify Account'}
                        </Button>
                    </form>

                    <div className="mt-6 text-center">
                        <p className="text-sm text-gray-600">
                            Didn't receive the code?{' '}
                            <button
                                type="button"
                                onClick={handleResendCode}
                                className="font-medium text-primary-600 hover:text-primary-700 disabled:opacity-50 transition-colors"
                                disabled={loading || !identifier}
                            >
                                {loading ? 'Sending...' : 'Resend Code'}
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
