import {Component} from '@angular/core';
import {BasicPageComponent} from '../basic-page/basic-page.component';
import {GlobalService} from '../../shared/global/global.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BasicPageComponent {

    focus;
    focus1;

    constructor(protected global: GlobalService) {
        super(global);
    }

    // ngOnInit() {
    //     var body = document.getElementsByTagName('body')[0];
    //     body.classList.add('login-page');
    //
    //     var navbar = document.getElementsByTagName('nav')[0];
    //     navbar.classList.add('navbar-transparent');
    // }
    // ngOnDestroy(){
    //     var body = document.getElementsByTagName('body')[0];
    //     body.classList.remove('login-page');
    //
    //     var navbar = document.getElementsByTagName('nav')[0];
    //     navbar.classList.remove('navbar-transparent');
    // }

}
