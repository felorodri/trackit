import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [{
    path: 'home',
    component: HomeComponent,
    data: {
    	sidebar: false,
    	title: '',
    	icon: ''
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
    	sidebar: false,
    	title: '',
    	icon: ''
    }
  }, 
  {
  	path: 'dashboard',
  	component: DashboardComponent,
  	data: {
    	sidebar: true,
    	title: '',
    	icon: ''
    }
  },
  {
    path: '',
    component: HomeComponent,
    data: {
    	sidebar: false,
    	title: '',
    	icon: ''
    }
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
