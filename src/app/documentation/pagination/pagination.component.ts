import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss']
})
export class PaginationComponent implements OnInit {
    page = 3;
    page1 = 4;
    page2 = 5;
    page3 = 6;
    page4 = 5;
    page5 = 4;

  constructor() { }

  ngOnInit() {
  }

}
