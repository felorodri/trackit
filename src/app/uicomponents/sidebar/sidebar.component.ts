import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslationsService } from '../../services/translations.service';

declare const $: any;
export let AppRoutes: any[];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  allRoutes: any[];
  inAppRoutes = [];
  constructor(private router: Router, public auth: AuthService, public trans: TranslationsService) {
    this.allRoutes = this.router.config;
  }
  ngOnInit() {
    for (let i = 0; i < this.allRoutes.length; i++) {
      if (this.allRoutes[i].data) {
        this.inAppRoutes.push(this.allRoutes[i]);
      }
    }
    AppRoutes = this.inAppRoutes;
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  }
}
