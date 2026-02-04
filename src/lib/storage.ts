import { storage } from "#imports";

export const getStorageItem = async (key: string): Promise<any> => {
    const item = await storage.getItem(`local:${key}`);
    return item || null;
}