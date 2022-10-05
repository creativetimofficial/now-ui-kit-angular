import {BrowserAnimationsModule} from '@angular/platform-browser/animations'; // this is needed!
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {RouterModule} from '@angular/router';
import {AppRoutingModule} from './app.routing';
import {ComponentsModule} from './components/components.module';
import {ExamplesModule} from './examples/examples.module';

import {AppComponent} from './app.component';
import {BasicPageComponent} from './pages/basic-page/basic-page.component';
import {SharedModule} from './shared/shared.module';
import {PagesModule} from './pages/pages.module';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
    declarations: [
        AppComponent,
        BasicPageComponent,
    ],
    imports: [
        BrowserAnimationsModule,
        NgbModule,
        FormsModule,
        RouterModule,
        AppRoutingModule,
        ComponentsModule,
        ExamplesModule,
        SharedModule,
        PagesModule,
        HttpClientModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {
}
