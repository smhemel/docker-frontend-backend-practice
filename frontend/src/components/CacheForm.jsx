import React, { useState } from 'react';
import axios from 'axios';

const CacheForm = () => {
    const [cacheValue, setCacheValue] = useState('');
    const [message, setMessage] = useState('');

    const handleGetCache = async () => {
        try {
            const response = await axios.get('http://localhost:5000/cache');
            setMessage(response.data.cached || response.data.message);
        } catch (error) {
            setMessage('Error retrieving cache');
        }
    };

    const handleSetCache = async () => {
        try {
            const response = await axios.get('http://localhost:5000/set-cache');
            setMessage(response.data.message);
            setCacheValue('');
        } catch (error) {
            setMessage('Error setting cache');
        }
    };

    return (
        <div>
            <h2>Cache Access</h2>
            <button onClick={handleGetCache}>Get Cache Value</button>
            <button onClick={handleSetCache}>Set Cache Value</button>
            {message && <p>{message}</p>}
        </div>
    );
};

export default CacheForm;
