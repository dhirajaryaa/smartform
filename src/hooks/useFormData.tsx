import { useState, useEffect } from 'react';
import { ConfigFormValue, storage } from '#imports';

export interface ConfigFormValue {
    apiKey: string;
    userInfo: string;
};

const tempData: ConfigFormValue = {
    apiKey: "lasdjfoasdfoweo23o45oipnfd",
    userInfo: `
    Name: John Doe
    Email: john.doe@example.com
    Age: 30
    Address: 123 Main St, Anytown, USA
    Education: Bachelor's Degree in Computer Science
    Occupation: Software Developer at TechCorp
    Interests: Hiking, Photography, Traveling
    Goal: Become a proficient full-stack developer and contribute to open-source projects.`
}

function useFormData() {
    const [formData, setFormData] = useState<ConfigFormValue>({
        apiKey: tempData.apiKey,
        userInfo: tempData.userInfo
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