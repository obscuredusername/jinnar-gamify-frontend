import React, { useEffect, useState } from 'react';

const ApiTest = () => {
    const [apiUrl, setApiUrl] = useState('');
    const [envVars, setEnvVars] = useState({});

    useEffect(() => {
        // Get the API URL from environment
        const url = import.meta.env.VITE_API_URL;
        setApiUrl(url || 'NOT SET');

        // Get all environment variables
        setEnvVars(import.meta.env);

        // Log to console
        console.log('=== API CONFIGURATION TEST ===');
        console.log('VITE_API_URL:', url);
        console.log('All env vars:', import.meta.env);
    }, []);

    return (
        <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
            <h1 style={{ color: '#333' }}>🔧 API Configuration Test</h1>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h2>Current API Base URL:</h2>
                <p style={{
                    fontSize: '18px',
                    fontWeight: 'bold',
                    color: apiUrl === 'NOT SET' ? 'red' : 'green',
                    padding: '10px',
                    backgroundColor: '#f0f0f0',
                    borderRadius: '4px'
                }}>
                    {apiUrl}
                </p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px', marginBottom: '20px' }}>
                <h2>Expected:</h2>
                <p style={{ color: 'green' }}>✅ https://api.jinnar.com/api</p>
            </div>

            <div style={{ backgroundColor: 'white', padding: '20px', borderRadius: '8px' }}>
                <h2>All Environment Variables:</h2>
                <pre style={{ backgroundColor: '#f0f0f0', padding: '10px', borderRadius: '4px', overflow: 'auto' }}>
                    {JSON.stringify(envVars, null, 2)}
                </pre>
            </div>

            <div style={{ backgroundColor: '#fff3cd', padding: '20px', borderRadius: '8px', marginTop: '20px', border: '2px solid #ffc107' }}>
                <h3>📝 Note:</h3>
                <p><strong>localhost:5173</strong> is your FRONTEND (React app) - this is CORRECT!</p>
                <p><strong>API requests</strong> should go to the URL shown above.</p>
                <p>Check the <strong>Network tab</strong> in DevTools (F12) to see actual API calls.</p>
            </div>
        </div>
    );
};

export default ApiTest;
