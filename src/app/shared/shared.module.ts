import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';
import { NotificationsComponent } from './notifications/notifications.component';
import {NgbAlertModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ModalsComponent } from './modals/modals.component';
import { EnumToArrayPipe } from './enum-to-array-pipe-.pipe';


@NgModule({
    declarations: [
        FooterComponent,
        NavbarComponent,
        NotificationsComponent,
        ModalsComponent,
        EnumToArrayPipe
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgbAlertModule,
        NgbModule,
    ],
    exports: [
        FooterComponent,
        NavbarComponent,
        NotificationsComponent,
        EnumToArrayPipe
    ]
})
export class SharedModule {
}
