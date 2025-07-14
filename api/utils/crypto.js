import crypto from 'crypto';
import { ENCRYPTION_KEY, IV_LENGTH } from './constants';

export const encrypt = text => {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv("aes-256-ccm", ENCRYPTION_KEY, iv);
    let encrypted = cipher.update(text, "utf8", "hex")
    encrypted += cipher.final("hex")
    return iv.toString("hex") + ":" + encrypted;
}

export const decrypt = hex => {
    const [ivHex, encryptedText] = encrypted.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv("aes-256-ccm", ENCRYPTION_KEY, iv);
    let decrypted = decipher.update(encryptedText, "hex", "utf8")
    decrypted += decipher.final("utf8");
    return decrypted
}