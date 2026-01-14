import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/ui/Header';
import Footer from '../components/ui/Footer';

const UploadVideo = () => {
    const [dragActive, setDragActive] = useState(false);
    const [uploadedFile, setUploadedFile] = useState(null);
    const [selectedDraw, setSelectedDraw] = useState('');
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    // TODO: Replace with API call - Fetch active draws from backend
    const activeDraws = [
        {
            id: 'draw-4',
            name: 'Draw 4 - Pan-African Spotlight',
            status: 'Open',
            endDate: 'Dec 30, 2025',
            theme: 'Show how Jinnar empowers local workers and communities',
            hashtags: '#JinnarViral #EmpowerAfrica #Draw4'
        }
    ];

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            const file = e.dataTransfer.files[0];
            if (file.type.startsWith('video/')) {
                setUploadedFile(file);
            }
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file.type.startsWith('video/')) {
                setUploadedFile(file);
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (uploadedFile && selectedDraw && agreedToTerms) {
            // TODO: Replace with actual API call to submit video
            alert('Video submitted for approval!');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Header />

            {/* Hero Section */}
            <div className="bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white py-12 px-6">
                <div className="max-w-5xl mx-auto text-center">
                    <div className="flex justify-center mb-4">
                        <div className="w-16 h-16 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                            <svg className="w-8 h-8 text-yellow-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                            </svg>
                        </div>
                    </div>
                    <h1 className="text-4xl font-bold mb-4">Upload Video for Approval</h1>
                    <p className="text-xl text-blue-100">
                        Submit your video for AI + human review to ensure quality and brand alignment
                    </p>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid lg:grid-cols-3 gap-6">

                    {/* Main Upload Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit} className="space-y-6">

                            {/* Step 1: Select Draw */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold">
                                        1
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Select Active Draw</h2>
                                </div>

                                <div className="space-y-3">
                                    {activeDraws.map(draw => (
                                        <label
                                            key={draw.id}
                                            className={`block p-4 border-2 rounded-xl cursor-pointer transition-all ${selectedDraw === draw.id
                                                    ? 'border-blue-800 bg-blue-50'
                                                    : 'border-gray-200 hover:border-blue-300'
                                                }`}
                                        >
                                            <input
                                                type="radio"
                                                name="draw"
                                                value={draw.id}
                                                checked={selectedDraw === draw.id}
                                                onChange={(e) => setSelectedDraw(e.target.value)}
                                                className="sr-only"
                                            />
                                            <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{draw.name}</h3>
                                                    <p className="text-sm text-gray-600 mt-1">{draw.theme}</p>
                                                </div>
                                                <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                    {draw.status}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-4 text-sm text-gray-600 flex-wrap">
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                    </svg>
                                                    Closes: {draw.endDate}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                                    </svg>
                                                    {draw.hashtags}
                                                </span>
                                            </div>
                                        </label>
                                    ))}
                                </div>
                            </div>

                            {/* Step 2: Upload Video */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold">
                                        2
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Upload Your Video</h2>
                                </div>

                                {!uploadedFile ? (
                                    <div
                                        className={`border-4 border-dashed rounded-xl p-12 text-center transition-all ${dragActive
                                                ? 'border-blue-800 bg-blue-50'
                                                : 'border-gray-300 hover:border-blue-400 bg-gray-50'
                                            }`}
                                        onDragEnter={handleDrag}
                                        onDragLeave={handleDrag}
                                        onDragOver={handleDrag}
                                        onDrop={handleDrop}
                                    >
                                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                            <svg className="w-8 h-8 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-bold text-gray-900 mb-2">
                                            Drag and drop your video here
                                        </h3>
                                        <p className="text-gray-600 mb-4">or</p>
                                        <label className="inline-block px-6 py-3 bg-blue-800 hover:bg-blue-900 text-white rounded-lg font-semibold cursor-pointer transition-colors">
                                            Browse Files
                                            <input
                                                type="file"
                                                accept="video/*"
                                                onChange={handleFileChange}
                                                className="hidden"
                                            />
                                        </label>
                                        <p className="text-sm text-gray-500 mt-4">
                                            Supported: MP4, MOV, AVI • Max size: 500MB • Duration: 15s - 3min
                                        </p>
                                    </div>
                                ) : (
                                    <div className="border-2 border-green-500 bg-green-50 rounded-xl p-6">
                                        <div className="flex items-center justify-between flex-wrap gap-4">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center flex-shrink-0">
                                                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                </div>
                                                <div>
                                                    <h3 className="font-bold text-gray-900">{uploadedFile.name}</h3>
                                                    <p className="text-sm text-gray-600">
                                                        {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                                                    </p>
                                                </div>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setUploadedFile(null)}
                                                className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                                            >
                                                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                            </button>
                                        </div>
                                        <button
                                            type="button"
                                            onClick={() => setShowPreview(!showPreview)}
                                            className="mt-4 w-full py-2 bg-white border border-gray-300 rounded-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-2 transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                            </svg>
                                            {showPreview ? 'Hide Preview' : 'Preview Video'}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* Step 3: Video Details */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold">
                                        3
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Video Details (Optional)</h2>
                                </div>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Video Title
                                        </label>
                                        <input
                                            type="text"
                                            value={videoTitle}
                                            onChange={(e) => setVideoTitle(e.target.value)}
                                            placeholder="e.g., How Jinnar Changed My Business"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Description (Optional)
                                        </label>
                                        <textarea
                                            value={videoDescription}
                                            onChange={(e) => setVideoDescription(e.target.value)}
                                            rows="3"
                                            placeholder="Brief description of your video content..."
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                        ></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Step 4: Terms Agreement */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="w-8 h-8 bg-blue-800 text-white rounded-full flex items-center justify-center font-bold">
                                        4
                                    </div>
                                    <h2 className="text-xl font-bold text-gray-900">Review & Agree</h2>
                                </div>

                                <div className="space-y-4">
                                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                        <h4 className="font-bold text-gray-900 mb-2">Before Submitting:</h4>
                                        <ul className="space-y-2 text-sm text-gray-700">
                                            <li className="flex items-start gap-2">
                                                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                </svg>
                                                Video follows the selected Draw theme
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                </svg>
                                                Content is original and created by you
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                </svg>
                                                No hateful, unsafe, or inappropriate content
                                            </li>
                                            <li className="flex items-start gap-2">
                                                <svg className="w-4 h-4 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z" />
                                                </svg>
                                                Jinnar is represented positively
                                            </li>
                                        </ul>
                                    </div>

                                    <label className="flex items-start gap-3 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={agreedToTerms}
                                            onChange={(e) => setAgreedToTerms(e.target.checked)}
                                            className="mt-1 w-5 h-5 text-blue-800 border-gray-300 rounded focus:ring-blue-500"
                                        />
                                        <span className="text-sm text-gray-700">
                                            I agree to the{' '}
                                            <Link to="/rules" className="text-blue-800 font-semibold hover:underline">
                                                Rules & Guidelines
                                            </Link>{' '}
                                            and grant Jinnar permission to feature my video in official promotions.
                                        </span>
                                    </label>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!uploadedFile || !selectedDraw || !agreedToTerms}
                                className="w-full py-4 bg-blue-800 text-white rounded-xl font-bold text-lg hover:bg-blue-900 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
                            >
                                {!uploadedFile
                                    ? 'Please Upload a Video'
                                    : !selectedDraw
                                        ? 'Please Select a Draw'
                                        : !agreedToTerms
                                            ? 'Please Agree to Terms'
                                            : 'Submit for Approval →'}
                            </button>
                        </form>
                    </div>

                    {/* Right Sidebar - Info */}
                    <div className="lg:col-span-1">
                        <div className="space-y-6 sticky top-24">

                            {/* Review Process */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-blue-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Review Process
                                </h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                                            1
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">AI Review</p>
                                            <p className="text-gray-600">Automated content screening</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                                            2
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Human Review</p>
                                            <p className="text-gray-600">Quality & brand check</p>
                                        </div>
                                    </div>
                                    <div className="flex gap-3">
                                        <div className="w-6 h-6 bg-blue-100 text-blue-800 rounded-full flex items-center justify-center font-bold text-xs flex-shrink-0">
                                            3
                                        </div>
                                        <div>
                                            <p className="font-semibold text-gray-900">Notification</p>
                                            <p className="text-gray-600">Approval or feedback sent</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-800">
                                        <strong>Typical turnaround:</strong> 24-48 hours
                                    </p>
                                </div>
                            </div>

                            {/* Status Indicators */}
                            <div className="bg-white rounded-xl shadow-md p-6">
                                <h3 className="font-bold text-gray-900 mb-4">Status Labels</h3>
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full font-bold text-xs whitespace-nowrap">
                                            ⏳ Pending Review
                                        </span>
                                        <span className="text-gray-600">Under review</span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full font-bold text-xs whitespace-nowrap">
                                            ✓ Approved
                                        </span>
                                        <span className="text-gray-600">Ready to post</span>
                                    </div>
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full font-bold text-xs whitespace-nowrap">
                                            ✗ Rejected
                                        </span>
                                        <span className="text-gray-600">Needs revision</span>
                                    </div>
                                </div>
                            </div>

                            {/* Help */}
                            <div className="bg-gradient-to-br from-blue-800 to-teal-600 rounded-xl shadow-md p-6 text-white">
                                <h3 className="font-bold mb-2">Need Help?</h3>
                                <p className="text-sm text-blue-100 mb-4">
                                    Check our guidelines or contact support for assistance.
                                </p>
                                <Link to="/rules">
                                    <button className="w-full py-2 bg-white hover:bg-blue-50 text-blue-800 rounded-lg font-semibold transition-colors">
                                        View Guidelines
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default UploadVideo;
