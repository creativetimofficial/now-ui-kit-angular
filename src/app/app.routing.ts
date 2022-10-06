import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {BrowserModule} from '@angular/platform-browser';
import {Routes, RouterModule} from '@angular/router';

import {ComponentsComponent} from './components/components.component';
import {LandingComponent} from './examples/landing/landing.component';
import {NucleoiconsComponent} from './components/nucleoicons/nucleoicons.component';


const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'index', component: ComponentsComponent},
    {path: 'nucleoicons', component: NucleoiconsComponent},
    {path: 'examples/landing', component: LandingComponent},
    // @ts-ignore
    {path: '', loadChildren: () => import('./pages/pages-routing.module').then(m => m.PagesRoutingModule)},
    {path: '**', redirectTo: 'home'},
];

@NgModule({
    imports: [
        CommonModule,
        BrowserModule,
        RouterModule.forRoot(routes)
    ],
    exports: [],
})
export class AppRoutingModule {
}
