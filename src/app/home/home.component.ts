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
  public currentDate: Date;
  private materialKit = {
    misc: {
      navbar_menu_visible: 0,
      window_width: 0,
      transparent: true,
      fixedTop: false,
      navbar_initialized: false
    }
  };

  constructor( public auth: AuthService, public router: Router, private notify: NotificationsService,
  private trans: TranslationsService) {
    // notify.showSuccess();
    this.currentDate = new Date();
  }

  ngOnInit() {
    if (this.auth.currentUser()) {
      this.router.navigate(['/dashboard']);
    }
  }

}
