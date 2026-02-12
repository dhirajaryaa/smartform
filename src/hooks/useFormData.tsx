import { useState, useEffect } from 'react';
import { ConfigFormValue, storage } from '#imports';

export interface ConfigFormValue {
    apiKey: string;
    provider: string;
    userInfo: string;
};

function useFormData() {
    const [formData, setFormData] = useState<ConfigFormValue>({
        apiKey: '',
        userInfo: '',
        provider: ''
    });

    useEffect(() => {
        async function getDataFromStorage() {
            // const data = await storage.getItem('local:configData');
            const apiKey = await storage.getItem('local:geminiApiKey');
            const userInfo = await storage.getItem('local:userInfo');
            const provider = await storage.getItem('local:provider');

            return { apiKey, userInfo, provider };
        };
        getDataFromStorage().then(({ apiKey, userInfo, provider }) => {
            if (apiKey || userInfo || provider) {
                setFormData({
                    apiKey: apiKey || "",
                    userInfo: userInfo || "",
                    provider: provider || ""
                });
            }
        });
    }, []);

    return {
        formData,
        setFormData
    }
}

export default useFormData;