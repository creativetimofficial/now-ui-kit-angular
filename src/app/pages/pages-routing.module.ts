import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {RegisterComponent} from './register/register.component';
import {LoginComponent} from './login/login.component';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import {ProfileSettingsComponent} from './profile-settings/profile-settings.component';
import {AdminComponent} from './admin/admin.component';
import {FindARoomComponent} from './find-a-room/find-a-room.component';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {ImpressComponent} from './impress/impress.component';

const routes: Routes = [
    {path: 'register', component: RegisterComponent},
    {path: 'login', component: LoginComponent},
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ProfileComponent},
    {path: 'profile/:id', component: ProfileComponent},
    {path: 'profile-settings', component: ProfileSettingsComponent},
    {path: 'admin', component: AdminComponent},
    {path: 'find-a-room', component: FindARoomComponent},
    {path: 'reset-password', component: ResetPasswordComponent},
    {path: 'impress', component: ImpressComponent},
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {
}
