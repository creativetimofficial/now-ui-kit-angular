import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {User} from '../../data/user';

@Component({
  selector: 'app-profile-image',
  templateUrl: './profile-image.component.html',
  styleUrls: ['./profile-image.component.css']
})
export class ProfileImageComponent implements AfterViewInit  {

  @Input('user') user: User;
  @Input('border') border: boolean = false;
  @Input('size') size: string = '100%';
  @Input('smallImg') smallImg: boolean = true;
  @Input('fontSize') fontSize: string = '35px';

  constructor() {
  }

  ngAfterViewInit(): void {
    // if(this.size.endsWith("px")){
    //   this.fontSize=
    // }
  }


  getSizeNumber(): number {
    return this.getNumberFromString(this.size);
  }

  getFontSizeNumber(): number {
    return this.getNumberFromString(this.fontSize);
  }

  getNumberFromString(text: string): number {
    const matches = text.match(/(\d+)/);
    if (matches) {
      return parseFloat(matches[0]);
    }
  }

  getProfileLetter(): string {
    return this.user?.firstName.substring(0, 1) + this.user?.lastName.substring(0, 1);
  }

  get hasImg() {
    return this.user?.imgUrl != null && this.user?.imgUrl.length > 0;
  }

}
