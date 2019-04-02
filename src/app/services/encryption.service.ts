/**
  * Created by: Julian Rodriguez
  * Created on: 11/01/2019
  * Description: Encryption service created to encrypt and decrypt
  * the logged user info and settings based in a salt called token.
*/
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  constructor() { }
  // This method is used for encrypt a given value value.
  encrypt(salt, value) {
    const key = CryptoJS.enc.Utf8.parse(salt);
    const iv = CryptoJS.enc.Utf8.parse(salt);
    const encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
      });
      return encrypted.toString();
    }
  // This method is used for decrypt a given value.
  decrypt(salt, value) {
    const key = CryptoJS.enc.Utf8.parse(salt);
    const iv = CryptoJS.enc.Utf8.parse(salt);
    const decrypted = CryptoJS.AES.decrypt(value, key, {
      keySize: 128 / 8,
      iv: iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);
  }
}
