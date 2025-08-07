import CryptoJS from "crypto-js";

//Encryption Methos using AES method by CryptoJS
const EncryptData = (data) => {
  let encrypted = CryptoJS.AES.encrypt(
    data,
    import.meta.env.VITE_SECRET
  ).toString();
  return encrypted;
};

//Decrypt Data using CryptoJS AES method.
const DecryptData = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, import.meta.env.VITE_SECRET);
  let decrypted = bytes.toString(CryptoJS.enc.Utf8);
  return decrypted;
};

export { DecryptData, EncryptData };
