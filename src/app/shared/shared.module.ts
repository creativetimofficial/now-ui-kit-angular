import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import {NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalsComponent } from './modals/modals.component';


@NgModule({
    declarations: [
        FooterComponent,
        NavbarComponent,
        NotificationsComponent,
        ModalsComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbAlertModule,
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        NotificationsComponent
    ]
})
export class SharedModule {
}
