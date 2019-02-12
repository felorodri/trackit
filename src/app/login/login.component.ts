import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit() {
    if (this.auth.currentUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

  loginGoogle() {
    this.auth.googleLogin();
  }
}
