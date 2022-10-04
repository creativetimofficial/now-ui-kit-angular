import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FooterComponent} from './footer/footer.component';
import {NavbarComponent} from './navbar/navbar.component';
import {RouterModule} from '@angular/router';


@NgModule({
    declarations: [
        FooterComponent,
        NavbarComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
    ],
    exports: [
        FooterComponent,
        NavbarComponent
    ]
})
export class SharedModule {
}
