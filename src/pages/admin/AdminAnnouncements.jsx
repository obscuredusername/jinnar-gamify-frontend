import React, { useState, useEffect } from 'react';
import adminService from '../../services/adminService';
import toast from 'react-hot-toast';

const CATEGORIES = ['General', 'Winner', 'Draw', 'Promotion', 'System'];

const emptyForm = { title: '', content: '', category: 'General', date: '' };

const AdminAnnouncements = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editTarget, setEditTarget] = useState(null); // null = create mode
    const [form, setForm] = useState(emptyForm);
    const [isSaving, setIsSaving] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(null);

    const fetchAnnouncements = async () => {
        try {
            setIsLoading(true);
            const res = await adminService.getAnnouncements();
            setAnnouncements(res.data || []);
        } catch (err) {
            // Graceful fallback — announcement endpoint may not exist yet
            console.warn('Announcements API not available, using empty list.', err);
            setAnnouncements([]);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => { fetchAnnouncements(); }, []);

    const openCreate = () => {
        setEditTarget(null);
        setForm(emptyForm);
        setShowModal(true);
    };

    const openEdit = (a) => {
        setEditTarget(a);
        setForm({ title: a.title, content: a.content, category: a.category || 'General', date: a.date?.split('T')[0] || '' });
        setShowModal(true);
    };

    const handleSave = async () => {
        if (!form.title.trim() || !form.content.trim()) {
            toast.error('Title and content are required.');
            return;
        }
        try {
            setIsSaving(true);
            if (editTarget) {
                await adminService.updateAnnouncement(editTarget._id, form);
                toast.success('Announcement updated!');
            } else {
                await adminService.createAnnouncement(form);
                toast.success('Announcement created!');
            }
            setShowModal(false);
            fetchAnnouncements();
        } catch (err) {
            toast.error(err?.response?.data?.error || 'Failed to save announcement.');
        } finally {
            setIsSaving(false);
        }
    };

    const handleDelete = async (id) => {
        try {
            await adminService.deleteAnnouncement(id);
            toast.success('Announcement deleted.');
            setDeleteConfirm(null);
            fetchAnnouncements();
        } catch (err) {
            toast.error('Failed to delete announcement.');
        }
    };

    const categoryColors = {
        General:   { bg: '#e0e7ff', text: '#3730a3' },
        Winner:    { bg: '#d1fae5', text: '#065f46' },
        Draw:      { bg: '#fef3c7', text: '#92400e' },
        Promotion: { bg: '#fce7f3', text: '#9d174d' },
        System:    { bg: '#f3f4f6', text: '#374151' },
    };

    return (
        <div className="min-h-screen" style={{ background: '#0f172a' }}>
            {/* Page Header */}
            <div className="px-6 py-8 max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-2xl font-bold" style={{ color: '#f1f5f9' }}>📢 Announcements</h1>
                        <p className="text-sm mt-1" style={{ color: '#94a3b8' }}>
                            Manage public announcements shown to all users.
                        </p>
                    </div>
                    <button
                        id="create-announcement-btn"
                        onClick={openCreate}
                        className="flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all"
                        style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }}
                    >
                        + New Announcement
                    </button>
                </div>

                {/* Table */}
                <div className="rounded-2xl overflow-hidden shadow-xl"
                    style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.06)' }}>
                    {isLoading ? (
                        <div className="flex justify-center items-center py-20">
                            <div className="w-8 h-8 border-4 rounded-full animate-spin"
                                style={{ borderColor: '#334155', borderTopColor: '#6366f1' }} />
                        </div>
                    ) : announcements.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 gap-3">
                            <span className="text-5xl">📭</span>
                            <p className="text-sm" style={{ color: '#94a3b8' }}>No announcements yet. Create your first one!</p>
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead>
                                <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                                    {['Title', 'Category', 'Date', 'Actions'].map(h => (
                                        <th key={h} className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wide"
                                            style={{ color: '#94a3b8' }}>
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody>
                                {announcements.map((a, i) => {
                                    const cat = categoryColors[a.category] || categoryColors.General;
                                    return (
                                        <tr key={a._id || i}
                                            style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}
                                            className="transition-colors hover:bg-white hover:bg-opacity-5">
                                            <td className="px-6 py-4">
                                                <p className="font-semibold text-sm" style={{ color: '#e2e8f0' }}>{a.title}</p>
                                                <p className="text-xs mt-0.5 line-clamp-1" style={{ color: '#94a3b8' }}>{a.content}</p>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="px-2 py-1 rounded-full text-xs font-semibold"
                                                    style={{ background: cat.bg, color: cat.text }}>
                                                    {a.category || 'General'}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 text-sm" style={{ color: '#94a3b8' }}>
                                                {a.date ? new Date(a.date).toLocaleDateString() : '—'}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => openEdit(a)}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                                        style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8' }}>
                                                        ✏️ Edit
                                                    </button>
                                                    <button
                                                        onClick={() => setDeleteConfirm(a._id)}
                                                        className="px-3 py-1.5 rounded-lg text-xs font-semibold transition-all"
                                                        style={{ background: 'rgba(239,68,68,0.12)', color: '#f87171' }}>
                                                        🗑 Delete
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}>
                    <div className="w-full max-w-lg rounded-2xl shadow-2xl"
                        style={{ background: '#1e293b', border: '1px solid rgba(255,255,255,0.08)' }}>
                        <div className="px-6 py-4 flex items-center justify-between"
                            style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                            <h2 className="text-lg font-bold" style={{ color: '#f1f5f9' }}>
                                {editTarget ? 'Edit Announcement' : 'New Announcement'}
                            </h2>
                            <button onClick={() => setShowModal(false)}
                                className="w-8 h-8 rounded-full flex items-center justify-center"
                                style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                                ✕
                            </button>
                        </div>
                        <div className="px-6 py-5 flex flex-col gap-4">
                            {/* Title */}
                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: '#94a3b8' }}>Title *</label>
                                <input
                                    id="announcement-title-input"
                                    type="text"
                                    value={form.title}
                                    onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                                    placeholder="Announcement title…"
                                    className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', colorScheme: 'dark' }}
                                />
                            </div>
                            {/* Category + Date row */}
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#94a3b8' }}>Category</label>
                                    <select
                                        value={form.category}
                                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none bg-white text-gray-900 font-medium"
                                        style={{ border: '1px solid rgba(255,255,255,0.1)' }}>
                                        {CATEGORIES.map(c => <option key={c} value={c} className="text-gray-900 bg-white">{c}</option>)}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium mb-1.5" style={{ color: '#94a3b8' }}>Date</label>
                                    <input
                                        type="date"
                                        value={form.date}
                                        onChange={e => setForm(f => ({ ...f, date: e.target.value }))}
                                        className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                                        style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', colorScheme: 'dark' }}
                                    />
                                </div>
                            </div>
                            {/* Content */}
                            <div>
                                <label className="block text-sm font-medium mb-1.5" style={{ color: '#94a3b8' }}>Content *</label>
                                <textarea
                                    id="announcement-content-input"
                                    rows={5}
                                    value={form.content}
                                    onChange={e => setForm(f => ({ ...f, content: e.target.value }))}
                                    placeholder="Write your announcement content here…"
                                    className="w-full px-4 py-3 rounded-xl text-sm resize-none outline-none"
                                    style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)', color: '#e2e8f0', colorScheme: 'dark' }}
                                />
                            </div>
                        </div>
                        <div className="px-6 py-4 flex justify-end gap-3"
                            style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                            <button onClick={() => setShowModal(false)}
                                className="px-5 py-2 rounded-xl text-sm font-medium"
                                style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                                Cancel
                            </button>
                            <button
                                id="save-announcement-btn"
                                onClick={handleSave}
                                disabled={isSaving}
                                className="px-5 py-2 rounded-xl text-sm font-semibold disabled:opacity-60"
                                style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)', color: '#fff' }}>
                                {isSaving ? 'Saving…' : editTarget ? 'Update' : 'Publish'}
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Delete Confirm Modal */}
            {deleteConfirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    style={{ background: 'rgba(0,0,0,0.7)' }}>
                    <div className="w-full max-w-sm rounded-2xl p-6 text-center"
                        style={{ background: '#1e293b', border: '1px solid rgba(239,68,68,0.3)' }}>
                        <p className="text-xl mb-2">🗑️</p>
                        <h3 className="text-lg font-bold mb-2" style={{ color: '#f1f5f9' }}>Delete Announcement?</h3>
                        <p className="text-sm mb-6" style={{ color: '#64748b' }}>This cannot be undone.</p>
                        <div className="flex gap-3">
                            <button onClick={() => setDeleteConfirm(null)}
                                className="flex-1 py-2 rounded-xl text-sm font-medium"
                                style={{ background: 'rgba(255,255,255,0.06)', color: '#94a3b8' }}>
                                Cancel
                            </button>
                            <button onClick={() => handleDelete(deleteConfirm)}
                                className="flex-1 py-2 rounded-xl text-sm font-semibold"
                                style={{ background: '#ef4444', color: '#fff' }}>
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminAnnouncements;
