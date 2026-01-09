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
            setSuccessMessage('Verification code resent successfully!');
        } catch (err) {
            console.error('Resend failed:', err);
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
            setError('OTP code is required');
            return;
        }

        try {
            await dispatch(verifyUser({ identifier, code: otp })).unwrap();
            // On success, redirect to login or dashboard
            // Assuming user needs to login after verification or if token was stored during register
            navigate('/signin');
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
                        Enter the verification code sent to {identifier || 'your email/phone'}
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-xl p-8">
                    {(error || authError) && (
                        <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-lg text-sm">
                            {error || authError}
                        </div>
                    )}
                    {successMessage && (
                        <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-lg text-sm">
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

                        <Input
                            label="Verification Code"
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder="Enter 6-digit code"
                            maxLength={6}
                        />

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
                                className="font-medium text-primary-600 hover:text-primary-700 disabled:opacity-50"
                                disabled={loading || !identifier}
                            >
                                Resend Code
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VerifyAccount;
