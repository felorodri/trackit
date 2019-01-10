import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})

export class SidebarComponent implements OnInit {
  menuItems: any[];
    constructor(private router: Router){
        console.log(this.router.config);
    }
    ngOnInit() {
      // this.menuItems = ROUTES.filter(menuItem => menuItem);
      // console.log(this.menuItems);
    }
    isMobileMenu() {
        // if ($(window).width() > 991) {
        //     return false;
        // }
        // return true;
    };
}
