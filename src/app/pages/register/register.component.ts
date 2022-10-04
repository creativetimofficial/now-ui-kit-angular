import { Component} from '@angular/core';
import {BasicPageComponent} from '../basic-page/basic-page.component';
import {GlobalService} from '../../shared/global/global.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BasicPageComponent {

  focusFirst;
  focusLast;
  focusMail;

  constructor(protected global: GlobalService) {
    super(global);
  }

}
