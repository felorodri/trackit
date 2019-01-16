import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [SidebarComponent, NavbarComponent, FooterComponent],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
  	SidebarComponent,
  	NavbarComponent
  ]
})
export class UicomponentsModule { }
