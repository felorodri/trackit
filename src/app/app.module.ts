// Angular Core components and modules
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// External services modules and components
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { ToastrModule } from 'ng6-toastr-notifications';
// Own app modules
import { UicomponentsModule } from './uicomponents/uicomponents.module';
// Own app services
import { AuthService } from './services/auth.service';
import { EncryptionService } from './services/encryption.service';
import { NotificationsService } from './services/notifications.service';
import { TranslationsService } from './services/translations.service';
// Own app components
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProfileComponent } from './profile/profile.component';
// Own app config files
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    DashboardComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    AppRoutingModule,
    UicomponentsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), // imports firebase/app needed for everything
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features,
    AngularFireStorageModule // imports firebase/storage only needed for storage features
  ],
  providers: [
    AuthService,
    EncryptionService,
    NotificationsService,
    TranslationsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor (private auth: AuthService, private trans: TranslationsService) { }
}
