import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {PagesRoutingModule} from './pages-routing.module';
import {RegisterComponent} from './register/register.component';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from './login/login.component';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NouisliderModule} from 'ng2-nouislider';
import {JwBootstrapSwitchNg2Module} from 'jw-bootstrap-switch-ng2';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';
import { BasicAuthPageComponent } from './basic-auth-page/basic-auth-page.component';
import {ComponentsModule} from '../components/components.module';
import { BasicModalPageComponent } from './basic-modal-page/basic-modal-page.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { AdminComponent } from './admin/admin.component';
import { EmptyComponent } from './empty/empty.component';
import {ImageCropperModule} from 'ngx-image-cropper';
import { FindARoomComponent } from './find-a-room/find-a-room.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { ImpressComponent } from './impress/impress.component';


@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        HomeComponent,
        ProfileComponent,
        BasicAuthPageComponent,
        BasicModalPageComponent,
        ProfileSettingsComponent,
        AdminComponent,
        EmptyComponent,
        FindARoomComponent,
        ResetPasswordComponent,
        ImpressComponent
    ],
    imports: [
        RouterModule,
        CommonModule,
        FormsModule,
        NgbModule,
        NouisliderModule,
        JwBootstrapSwitchNg2Module,
        PagesRoutingModule,
        SharedModule,
        ComponentsModule,
        ImageCropperModule,
    ]
})
export class PagesModule {
}
