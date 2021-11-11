import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router'
import {HttpClientModule} from '@angular/common/http';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

import { AppRoutingModule } from './app-routing.module';
import {AppComponent} from './app.component';
import {ApiService} from './api.service';
import {FormsModule} from '@angular/forms';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {BoardUserComponent} from './board-user/board-user.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdModalComponent } from './ad-modal/ad-modal.component';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'board-admin', component: BoardAdminComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardUserComponent,
    AdModalComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
    MatDialogModule,
    BrowserAnimationsModule
  ],
  providers: [ApiService, authInterceptorProviders],
  bootstrap: [AppComponent],
  entryComponents: [AdModalComponent]

})
export class AppModule {
}
