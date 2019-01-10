import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class EncryptionService {
  constructor() { }
    //This method is used for encrypt a given value value.
    encrypt(salt, value){
      var key = CryptoJS.enc.Utf8.parse(salt);
      var iv = CryptoJS.enc.Utf8.parse(salt);
      var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString()), key,
      {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });

      return encrypted.toString();
    }
    //This method is used for decrypt a given value.
    decrypt(salt, value){
      var key = CryptoJS.enc.Utf8.parse(salt);
      var iv = CryptoJS.enc.Utf8.parse(salt);
      var decrypted = CryptoJS.AES.decrypt(value, key, {
          keySize: 128 / 8,
          iv: iv,
          mode: CryptoJS.mode.CBC,
          padding: CryptoJS.pad.Pkcs7
      });

      return decrypted.toString(CryptoJS.enc.Utf8);
    }
}
