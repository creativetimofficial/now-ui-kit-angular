import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GlobalService {


  public updateNavBar: Subject<string> = new Subject<string>();
  public useDefaultFooter: Subject<boolean> = new Subject<boolean>();

  constructor() {

  }
}
