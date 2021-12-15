import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {HttpClientModule} from '@angular/common/http';
import {authInterceptorProviders} from './_helpers/auth.interceptor';
import {AppComponent} from './app.component';
import {ApiService} from './api.service';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AdModalComponent} from './ad-modal/ad-modal.component';
import {MatDialogModule, MatDialogRef} from '@angular/material/dialog';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {AdDetailsComponent} from './ad-details/ad-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactModalComponent } from './contact-modal/contact-modal.component';
import { WriteReviewComponent } from './write-review/write-review.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'board-admin', component: BoardAdminComponent},
  {path: 'contactModal/:username', component: ContactModalComponent},
  //{path: '**', component: PageNotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    AdModalComponent,
    UserProfileComponent,
    AdDetailsComponent,
    PageNotFoundComponent,
    ContactModalComponent,
    WriteReviewComponent

  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    BrowserAnimationsModule,
    NgbModule
  ],
  providers: [ApiService, authInterceptorProviders, {
    provide: MatDialogRef,
    useValue: {}
  }],
  bootstrap: [AppComponent],
  entryComponents: [AdModalComponent]

})
export class AppModule {
}
