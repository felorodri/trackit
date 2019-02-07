import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'home',
    redirectTo: '',
    pathMatch: 'full'
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    data: {
      sidebar: true,
      title: 'Dashboard',
      icon: 'dashboard'
    }
  },
  {
    path: 'profile',
    component: ProfileComponent,
    data: {
      sidebar: false,
      title: 'User Profile',
      icon: 'person'
    }
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full'
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
