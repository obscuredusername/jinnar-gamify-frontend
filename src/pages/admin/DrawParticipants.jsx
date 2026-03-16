import { useState, useEffect } from 'react';
import viralService from '../../services/viralService';

const DrawParticipants = () => {
    const [participants, setParticipants] = useState([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('points'); // points or date

    const [drawInfo, setDrawInfo] = useState(null);

    useEffect(() => {
        loadParticipants();
    }, []);

    const loadParticipants = async () => {
        try {
            setLoading(true);
            const response = await viralService.getLatestParticipants();

            // Extract from { data: { draw: {}, participants: [], count: 0 } }
            const data = response?.data || {};
            const participantsList = data.participants || (Array.isArray(response) ? response : []);

            setParticipants(participantsList);
            if (data.draw) setDrawInfo(data.draw);
        } catch (error) {
            console.error('Failed to load participants:', error);
            setParticipants([]);
        } finally {
            setLoading(false);
        }
    };

    const sortedParticipants = Array.isArray(participants)
        ? [...participants].sort((a, b) => {
            if (sortBy === 'points') {
                return (b.submissionsCount || 0) - (a.submissionsCount || 0);
            } else {
                return new Date(b.lastSubmittedAt || 0) - new Date(a.lastSubmittedAt || 0);
            }
        })
        : [];

    const exportToCSV = () => {
        const headers = ['Username', 'Points', 'Submission Date'];
        const rows = sortedParticipants.map(p => [
            p.username,
            p.points,
            new Date(p.submissionDate).toLocaleDateString()
        ]);

        const csvContent = [
            headers.join(','),
            ...rows.map(row => row.join(','))
        ].join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `participants_${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Draw Participants</h1>
                        {drawInfo && (
                            <p className="text-blue-600 font-medium leading-relaxed">
                                Active Draw: <span className="text-gray-900 font-bold">{drawInfo.title}</span>
                                <span className="block md:inline md:ml-2 text-gray-500 text-sm">
                                    ({new Date(drawInfo.startDate).toLocaleDateString()} - {new Date(drawInfo.endDate).toLocaleDateString()})
                                </span>
                            </p>
                        )}
                    </div>
                    <button
                        onClick={exportToCSV}
                        disabled={participants.length === 0}
                        className="w-full md:w-auto bg-blue-800 hover:bg-blue-900 text-white font-medium py-3 px-6 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-center"
                    >
                        Export CSV
                    </button>
                </div>

                {/* Sort Options */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex gap-3">
                        <button
                            onClick={() => setSortBy('points')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${sortBy === 'points'
                                ? 'bg-blue-800 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Sort by Submissions
                        </button>
                        <button
                            onClick={() => setSortBy('date')}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${sortBy === 'date'
                                ? 'bg-blue-800 text-white'
                                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                        >
                            Sort by Last Active
                        </button>
                    </div>
                </div>

                {/* Participants Table */}
                {loading ? (
                    <div className="text-center py-12">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto"></div>
                        <p className="mt-4 text-gray-600">Loading participants...</p>
                    </div>
                ) : participants.length === 0 ? (
                    <div className="bg-white rounded-lg shadow-sm p-12 text-center">
                        <p className="text-gray-500 text-lg">No participants found</p>
                    </div>
                ) : (
                    <div className="bg-white rounded-lg shadow-sm overflow-x-auto">
                        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
                            <p className="text-sm text-gray-600">
                                Total Participants: <span className="font-semibold text-gray-900">{participants.length}</span>
                            </p>
                        </div>
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Rank
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Participant
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Submissions
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Last Activity
                                    </th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Location
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {sortedParticipants.map((participant, index) => (
                                    <tr key={participant._id || index} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-400">
                                                #{index + 1}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center gap-3">
                                                {participant.profilePicture ? (
                                                    <img src={participant.profilePicture} className="w-8 h-8 rounded-full border border-gray-200" alt="" />
                                                ) : (
                                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                                                        {participant.name?.charAt(0)}
                                                    </div>
                                                )}
                                                <div className="text-sm font-bold text-gray-900">
                                                    {participant.name}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900 font-semibold bg-gray-100 px-2 py-1 rounded w-fit">
                                                {participant.submissionsCount} entries
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {participant.lastSubmittedAt ? new Date(participant.lastSubmittedAt).toLocaleDateString() : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {participant.country || participant.city ? `${participant.city || ''} ${participant.country || ''}`.trim() : 'Unknown'}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DrawParticipants;
