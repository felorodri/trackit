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
import { NotificationsService } from '../services/notifications.service';
import { TestBed } from '@angular/core/testing';

@Injectable()
export class AuthService {
  private appUser: User;
  private user: Observable<firebase.User>;
  private userData: firebase.User = null;
  private token = null;

  constructor(
    private afAuth: AngularFireAuth,
    private router: Router,
    private zone: NgZone,
    private enc: EncryptionService,
    private notify: NotificationsService
  ) {
    if (sessionStorage.getItem('user') && sessionStorage.getItem('token')) {
      const storedData = JSON.parse(
        enc.decrypt(
          sessionStorage.getItem('token'),
          sessionStorage.getItem('user')
        )
      );
      console.log(storedData);
      this.appUser = new User(
        storedData.name,
        storedData.email,
        storedData.metadata,
        storedData.language
      );
    } else {
      this.user = this.afAuth.authState;
      this.user.subscribe(user => {
        if (user) {
          this.userData = user;
          this.appUser = new User(
            this.userData.displayName,
            this.userData.email,
            this.userData,
            'es'
          );
          sessionStorage.setItem(
            'user',
            enc.encrypt(
              this.userData['refreshToken'],
              JSON.stringify(this.appUser)
            )
          );
          sessionStorage.setItem('token', this.userData['refreshToken']);
        } else {
          this.userData = null;
        }
      });
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

  // This method create the Google provider
  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.oAuthLogin(provider);
  }

  // This method is executed to logout the user from the app
  logout(): void {
    if (this.isAuthenticated) {
      this.afAuth.auth
        .signOut()
        .then(() => {
          this.appUser = null;
          this.userData = null;
          sessionStorage.removeItem('user');
          sessionStorage.removeItem('token');
          this.router.navigate(['']);
          // this.notify.showSuccess();
        })
        .catch(function(error) {
          const errorMessage = error.message;
          this.notify.showError();
          console.log(error);
        });
    }
  }

  // This method execute the signin popup from a given selected provider.
  private async oAuthLogin(provider) {
    // return this.afAuth.auth.signInWithPopup(provider);
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(() => {
        this.zone.run(() => {
          this.notify.showSuccess();
          this.router.navigate(['/home']);
        });
      })
      .catch(error => this.loginErrorHandler(error));
  }

  // This method notify the user when the login process have experienced an error.
  loginErrorHandler(error): any {
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email;
    const credential = error.credential;
    this.notify.showError();
    console.log(error);
    console.log(errorMessage);
  }

  // This method returns the current user info.
  currentUser(): User {
    return this.appUser;
  }

  // This method returns the current user info.
  isAuthenticated(): boolean {
    if (this.appUser) {
      return true;
    } else {
      return false;
    }
  }
}
