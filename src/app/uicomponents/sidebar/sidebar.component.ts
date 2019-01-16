import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { TranslationsService } from '../../services/translations.service';

declare const $: any;

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  allRoutes: any[];
  menuItems = [];
  constructor(private router: Router, private auth: AuthService, 
    private trans: TranslationsService){
    this.allRoutes = this.router.config;
  }
  ngOnInit() {
    for (var i = 0; i< this.allRoutes.length; i++) {
      if (this.allRoutes[i].data && 
      this.allRoutes[i].data.sidebar && 
      this.allRoutes[i].data.sidebar == true) {
        this.menuItems.push(this.allRoutes[i]);
      }      
    }
  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
