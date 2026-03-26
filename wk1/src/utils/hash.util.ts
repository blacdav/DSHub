import argon2 from "argon2";

export const hash = async (str: string): Promise<string> => {
    const hash = await argon2.hash(str);
    return hash;
}

export const verifyHash = async (hash: string, str: string): Promise<boolean> => {
    const isValid = await argon2.verify(hash, str);
    return isValid;
}