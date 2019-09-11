import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-miniature',
  templateUrl: './miniature.component.html',
  styleUrls: ['./miniature.component.scss']
})
export class MiniatureComponent implements OnInit {

  @Input() training;

  constructor() { }

  ngOnInit() {
  }

}
