import { useState, useEffect } from 'react';
import { storage } from '#imports';

export interface ConfigFormValue {
    apiKey: string;
    userInfo: string;
    dataType: 'real' | 'random';
};

function useFormData() {
    const [formData, setFormData] = useState<ConfigFormValue>({
        apiKey: '',
        userInfo: '',
        dataType: 'real',
    });

    useEffect(() => {
        async function getDataFromStorage() {
            const data = await storage.getItem('local:configData');
            return data as ConfigFormValue;
        };
        getDataFromStorage().then(data => setFormData(data))
    }, []);

    return {
        formData,
        setFormData
    }
}

export default useFormData;