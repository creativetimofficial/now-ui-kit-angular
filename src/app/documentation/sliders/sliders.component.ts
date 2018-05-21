import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.scss']
})
export class SlidersComponent implements OnInit {
    doubleSlider = [1000, 5000];
    simpleSlider = 3000;

  constructor() { }

  ngOnInit() {
  }

}
