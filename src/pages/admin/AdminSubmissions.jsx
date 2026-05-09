import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import adminService from '../../services/adminService';
import { useToast } from '../../contexts/ToastContext';
import VideoPreviewModal from '../../components/admin/VideoPreviewModal';

const AdminSubmissions = () => {
    const toast = useToast();
    const location = useLocation();
    const [submissions, setSubmissions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [filter, setFilter] = useState('all'); // all, pending, approved, rejected
    const [userFilter, setUserFilter] = useState('all');
    const [drawFilter, setDrawFilter] = useState('all');
    const [selectedSubmission, setSelectedSubmission] = useState(null);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const userIdParam = params.get('userId');
        const drawIdParam = params.get('drawId');
        if (userIdParam) setUserFilter(userIdParam);
        if (drawIdParam) setDrawFilter(drawIdParam);
        loadSubmissions();
    }, [location.search]);

    const loadSubmissions = async () => {
        try {
            setLoading(true);
            const response = await adminService.getAllSubmissions();
            const data = response?.data || (Array.isArray(response) ? response : []);
            setSubmissions(data);
        } catch (error) {
            console.error('Failed to load submissions:', error);
        } finally {
            setLoading(false);
        }
    };

    const uniqueUsers = Array.from(new Set(submissions.map(s => s.userId?._id))).map(id => {
        return submissions.find(s => s.userId?._id === id)?.userId;
    }).filter(Boolean);

    const uniqueDraws = Array.from(new Set(submissions.map(s => s.drawId?._id || s.drawId))).map(id => {
        const sub = submissions.find(s => s.drawId?._id === id || s.drawId === id);
        return typeof sub?.drawId === 'object' ? sub.drawId : { _id: sub?.drawId, title: `Draw ${sub?.drawId}` };
    }).filter(d => d && d._id);

    const openPreviewModal = (submission) => {
        setSelectedSubmission(submission);
        setShowModal(true);
    };

    const handleModalAction = (updatedSubmission) => {
        setSubmissions(prev =>
            prev.map(sub =>
                sub._id === updatedSubmission._id ? updatedSubmission : sub
            )
        );
    };

    const filteredSubmissions = submissions.filter(sub => {
        const statusMatch = filter === 'all' || sub.status === filter;
        const userMatch = userFilter === 'all' || 
                          sub.userId?._id === userFilter || 
                          sub.userId === userFilter;
        const drawMatch = drawFilter === 'all' || 
                          sub.drawId?._id === drawFilter || 
                          sub.drawId === drawFilter;
        return statusMatch && userMatch && drawMatch;
    });

    const getStatusBadge = (status) => {
        const styles = {
            pending: 'bg-yellow-100 text-yellow-800',
            approved: 'bg-green-100 text-green-800',
            rejected: 'bg-red-100 text-red-800',
        };
        return (
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${styles[status] || 'bg-gray-100 text-gray-800'}`}>
                {status}
            </span>
        );
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Submission Review</h1>
                        <p className="text-gray-600">Review and approve user submissions</p>
                    </div>
                </div>

                {/* Filters */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex flex-col sm:flex-row justify-between gap-4">
                    <div className="flex gap-3">
                        {['all', 'pending', 'approved', 'rejected'].map(status => (
                            <button
                                key={status}
                                onClick={() => setFilter(status)}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${filter === status
                                    ? 'bg-blue-800 text-white'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                    }`}
                            >
                                {status.charAt(0).toUpperCase() + status.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="flex flex-col sm:flex-row items-center gap-3">
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">User:</label>
                            <select
                                value={userFilter}
                                onChange={(e) => setUserFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                <option value="all">All Users</option>
                                {uniqueUsers.map(u => (
                                    <option key={u._id} value={u._id}>
                                        {u.name || u.email || u._id}
                                    </option>
                                ))}
                            </select>
                        </div>
                        <div className="flex items-center gap-2">
                            <label className="text-sm font-medium text-gray-700">Draw:</label>
                            <select
                                value={drawFilter}
                                onChange={(e) => setDrawFilter(e.target.value)}
                                className="border border-gray-300 rounded-lg px-3 py-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
                            >
                                <option value="all">All Draws</option>
                                {uniqueDraws.map(d => (
                                    <option key={d._id} value={d._id}>
                                        {d.title || d._id}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Submissions Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading submissions...</p>
                    </div>
                ) : filteredSubmissions.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <p className="text-gray-500 text-lg">No submissions found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Title
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        User ID
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Status
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Submitted
                                    </th>
                                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {filteredSubmissions.map((submission) => (
                                    <tr key={submission._id} className="hover:bg-gray-50 cursor-pointer" onClick={() => openPreviewModal(submission)}>
                                        <td className="px-6 py-4">
                                            <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                                                {submission.videoUrl ? '🎥' : '🔗'} {submission.title}
                                            </div>
                                            <div className="text-xs text-blue-600 mt-1">
                                                Draw: {typeof submission.drawId === 'object' ? submission.drawId?.title : submission.drawId}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {typeof submission.userId === 'object' ? submission.userId?.name : 'Unknown User'}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {typeof submission.userId === 'object' ? submission.userId?.email : submission.userId}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {getStatusBadge(submission.status)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {submission.createdAt ? new Date(submission.createdAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    openPreviewModal(submission);
                                                }}
                                                className="text-blue-600 hover:text-blue-900 bg-blue-50 px-3 py-1 rounded-md"
                                            >
                                                View Details
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}

                {/* Video Preview Modal */}
                {showModal && selectedSubmission && (
                    <VideoPreviewModal
                        submission={selectedSubmission}
                        baseUrl={import.meta.env.VITE_API_URL || 'http://localhost:5000'}
                        onClose={() => {
                            setShowModal(false);
                            setSelectedSubmission(null);
                        }}
                        onAction={handleModalAction}
                    />
                )}
            </div>
        </div>
    );
};

export default AdminSubmissions;
