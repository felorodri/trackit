/**
  * Created by: Julian Rodriguez
  * Created on: 07/11/2018
  * Description: Auth service for the whole app.
*/
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from '../clases/user';
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';
import { EncryptionService } from '../services/encryption.service';

@Injectable()

export class AuthService {
  private appUser: User;
  private user: Observable<firebase.User>;
  private userData: firebase.User = null;
  private token = null;

  constructor (private afAuth: AngularFireAuth, private router: Router, private zone: NgZone, private enc: EncryptionService) {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
      const storedData = JSON.parse(enc.decrypt(sessionStorage.getItem('token'), sessionStorage.getItem('user')));
      this.appUser = new User(storedData.name, storedData.email, storedData.metadata, storedData.language);
    } else {
      this.user = this.afAuth.authState;
      this.user.subscribe(
        (user) => {
          if (user) {
            this.userData = user;
            this.appUser = new User(this.userData.displayName, this.userData.email, this.userData, 'es');
            sessionStorage.setItem('user', enc.encrypt(this.userData['refreshToken'], JSON.stringify(this.appUser)));
            sessionStorage.setItem('token', this.userData['refreshToken']);
          } else {
            this.userData = null;
          }
        }
      );
    }
  }

  // login(email: string, password: string) {
  //   this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then(value => {
  //       console.log('Nice, it worked!');
  //       this.router.navigateByUrl('/profile');
  //     })
  //     .catch(err => {
  //       console.log('Something went wrong: ', err.message);
  //     });
  // }

  // emailSignup(email: string, password: string) {
  //   this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //     .then(value => {
  //       console.log('Sucess', value);
  //       this.router.navigateByUrl('/profile');
  //     })
  //     .catch(error => {
  //       console.log('Something went wrong: ', error);
  //     });
  // }

  // This method execute the Google provider login popup
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(() => {
      this.zone.run(() => { this.router.navigate(['/home']); });
    });
  }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.appUser = null;
      this.userData = null;
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('token');
      this.router.navigate(['']);
    });
  }

  // This method execute the signin popup from the selected provider.
  // private oAuthLogin(provider) {
  //   return this.afAuth.auth.signInWithPopup(provider);
  // }

  // This method returns the current user info.
  currentUser() {
    return this.appUser;
  }
}

