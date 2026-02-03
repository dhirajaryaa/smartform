import { useState, useEffect } from 'react';
import { storage } from '#imports';

export interface ConfigFormValue {
    apiKey: string;
    userInfo: string;
    dataType: 'real' | 'random';
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
    Goal: Become a proficient full-stack developer and contribute to open-source projects.`,
    dataType: "real"
}

function useFormData() {
    const [formData, setFormData] = useState<ConfigFormValue>({
        apiKey: tempData.apiKey,
        userInfo: tempData.userInfo,
        dataType: tempData.dataType,
    });

    useEffect(() => {
        async function getDataFromStorage() {
            const data = await storage.getItem('local:configData');
            return data as ConfigFormValue;
        };
        getDataFromStorage().then(data => {
            if (data) {
                setFormData(data);
            }
        })
    }, []);

    return {
        formData,
        setFormData
    }
}

export default useFormData;