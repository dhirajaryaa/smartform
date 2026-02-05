import { useState, useEffect } from 'react';
import { ConfigFormValue, storage } from '#imports';

export interface ConfigFormValue {
    apiKey: string;
    userInfo: string;
};

function useFormData() {
    const [formData, setFormData] = useState<ConfigFormValue>({
        apiKey: '',
        userInfo: ''
    });

    useEffect(() => {
        async function getDataFromStorage() {
            // const data = await storage.getItem('local:configData');
            const apiKey = await storage.getItem('local:geminiApiKey');
            const userInfo = await storage.getItem('local:userInfo');

            return { apiKey, userInfo };
        };
        getDataFromStorage().then(({ apiKey, userInfo }) => {
            if (apiKey || userInfo) {
                setFormData({
                    apiKey: apiKey || "",
                    userInfo: userInfo || ""
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