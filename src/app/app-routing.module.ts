import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {BoardUserComponent} from './board-user/board-user.component';
import {BoardAdminComponent} from './board-admin/board-admin.component';
import {PageNotFoundComponent} from "./page-not-found/page-not-found.component";
import {ContactModalComponent} from "./contact-modal/contact-modal.component";
import {AdMessagesDetailsComponent} from "./ad-messages-details/ad-messages-details.component";

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'user', component: BoardUserComponent},
  {path: 'admin', component: BoardAdminComponent},
  {path: 'contactModal/:username', component: ContactModalComponent},
  {path: '**', component: PageNotFoundComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'adMessagesDetails', component: AdMessagesDetailsComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
