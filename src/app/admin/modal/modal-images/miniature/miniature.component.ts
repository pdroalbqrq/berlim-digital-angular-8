import { Component, OnInit, Input, Output } from '@angular/core';

@Component({
  selector: 'app-miniature',
  templateUrl: './miniature.component.html',
  styleUrls: ['./miniature.component.scss']
})
export class MiniatureComponent implements OnInit {

  @Input() image;

  constructor() { }

  ngOnInit() {
  }


}
