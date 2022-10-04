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
import { HomeComponent } from './home/home.component';


@NgModule({
    declarations: [
        RegisterComponent,
        LoginComponent,
        HomeComponent
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
    ]
})
export class PagesModule {
}
