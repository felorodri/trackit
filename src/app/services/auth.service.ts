import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/auth';
import { auth } from 'firebase/app';
import { User } from '../clases/user';
import { Observable } from 'rxjs';
import { NgZone } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
	private appUser: User;
  private user: Observable<firebase.User>;
  private userData: firebase.User = null;

  constructor (private afAuth: AngularFireAuth, private router: Router, private zone: NgZone) { 
    this.user = this.afAuth.authState; 
    this.user.subscribe(
      (user) => {
        if (user) {
          this.userData = user;
          this.appUser = {
            name: this.userData.displayName,
            email: this.userData.email
          };
          // console.log(this.userData);
        } else {
          this.userData = null;
        }
      }
    );
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


  googleLogin() {
    const provider = new auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider).then(()=>{
      this.zone.run(() => { this.router.navigate(['/home']); });
    });
  }



  // googleLogin() {
  //   const provider = new auth.GoogleAuthProvider();
  //   return this.oAuthLogin(provider)
  //     .then(value => {
  //       console.log('Sucess', value),
  //       // console.log('The given name is ' + value.user.displayName),
  //       this.appUser={
  //         name: value.user.displayName
  //       };
  //       this.zone.run(() => { this.router.navigate(['/home']); });
  //       // this.router.navigateByUrl('/home');
  //     })
  //     .catch(error => {
  //       console.log('Something went wrong: ', error);
  //     });
  // }

  logout() {
    this.afAuth.auth.signOut().then(() => {
      this.appUser = null;
      this.userData = null;
      this.router.navigate(['/']);
    });
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider);
  }

  currentUser() {
  	return this.appUser;
  }
}

