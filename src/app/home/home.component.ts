import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationsService } from '../services/notifications.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router, private notify: NotificationsService) {
  	notify.showSuccess();
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
