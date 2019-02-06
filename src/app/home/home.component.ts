import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { NotificationsService } from '../services/notifications.service';
import { TranslationsService } from '../services/translations.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(private auth: AuthService, private router: Router,
    private notify: NotificationsService, private trans: TranslationsService) {
    // notify.showSuccess();
  }

  ngOnInit() {
    if (this.auth.currentUser()) {
      this.router.navigate(['/dashboard']);
      console.log(this.auth.currentUser().getName());
    }
  }

}
