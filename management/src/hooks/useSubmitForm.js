// useSubmitForm.js
import { useState } from 'react';
import axios from 'axios';

const useSubmitForm = (url, data, config, onSuccess, onError) => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios({ method: config.method, url, data, headers: config.headers });
            onSuccess(response);
        } catch (error) {
            setError(error.message || 'An error occurred');
            onError(error);
        } finally {
            setIsLoading(false);
        }
    };

    return { handleSubmit, isLoading, error };
};

export default useSubmitForm;
