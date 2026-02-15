import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within ToastProvider');
    }
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        const toast = { id, message, type, duration };

        setToasts(prev => [...prev, toast]);

        if (duration > 0) {
            setTimeout(() => {
                removeToast(id);
            }, duration);
        }
    }, []);

    const removeToast = useCallback((id) => {
        setToasts(prev => prev.filter(toast => toast.id !== id));
    }, []);

    const success = useCallback((message, duration) => addToast(message, 'success', duration), [addToast]);
    const error = useCallback((message, duration) => addToast(message, 'error', duration), [addToast]);
    const warning = useCallback((message, duration) => addToast(message, 'warning', duration), [addToast]);
    const info = useCallback((message, duration) => addToast(message, 'info', duration), [addToast]);

    return (
        <ToastContext.Provider value={{ success, error, warning, info, addToast, removeToast }}>
            {children}
            <ToastContainer toasts={toasts} removeToast={removeToast} />
        </ToastContext.Provider>
    );
};

const ToastContainer = ({ toasts, removeToast }) => {
    return (
        <div className="fixed top-4 right-4 z-50 space-y-3 max-w-md">
            {toasts.map(toast => (
                <Toast key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
            ))}
        </div>
    );
};

const Toast = ({ toast, onClose }) => {
    const { type, message } = toast;

    const styles = {
        success: {
            bg: 'bg-green-50 border-green-500',
            icon: '✓',
            iconBg: 'bg-green-500',
            text: 'text-green-800'
        },
        error: {
            bg: 'bg-red-50 border-red-500',
            icon: '✕',
            iconBg: 'bg-red-500',
            text: 'text-red-800'
        },
        warning: {
            bg: 'bg-yellow-50 border-yellow-500',
            icon: '⚠',
            iconBg: 'bg-yellow-500',
            text: 'text-yellow-800'
        },
        info: {
            bg: 'bg-blue-50 border-blue-500',
            icon: 'ℹ',
            iconBg: 'bg-blue-500',
            text: 'text-blue-800'
        }
    };

    const style = styles[type] || styles.info;

    return (
        <div className={`${style.bg} border-l-4 rounded-lg shadow-lg p-4 flex items-start gap-3 animate-slide-in-right`}>
            <div className={`${style.iconBg} w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                {style.icon}
            </div>
            <p className={`${style.text} flex-1 font-medium text-sm leading-relaxed`}>
                {message}
            </p>
            <button
                onClick={onClose}
                className={`${style.text} hover:opacity-70 transition-opacity flex-shrink-0`}
            >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
            </button>
        </div>
    );
};
