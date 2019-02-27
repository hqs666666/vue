import crypto from 'crypto-js'
import { secret } from '@/config'

const key = crypto.enc.Utf8.parse(secret.key);  //十六位十六进制数作为密钥
const iv = crypto.enc.Utf8.parse(secret.iv);   //十六位十六进制数作为密钥偏移量

//AES + BASE64
//解密
export function decrypt(word){
    let encryptedHexStr = crypto.enc.Hex.parse(word);
    let srcs = crypto.enc.Base64.stringify(encryptedHexStr);
    let decrypts = crypto.AES.decrypt(srcs, key, { iv: iv, mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 });
    let decryptedStr = decrypts.toString(crypto.enc.Utf8);
    return decryptedStr.toString();    
}

//加密
export function encrypt(word) {
    let srcs = crypto.enc.Utf8.parse(word);
    let encrypted = crypto.AES.encrypt(srcs, key, { iv: iv, mode: crypto.mode.CBC, padding: crypto.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
} 