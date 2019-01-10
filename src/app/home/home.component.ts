import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router) {
  	// console.log(this.auth.currentUser());
  }
  
  ngOnInit() {
  	// console.log('On init de home');
  	// console.log(this.auth.currentUser());
  }

  login(){
  	this.router.navigate(['/']);
  }
}
