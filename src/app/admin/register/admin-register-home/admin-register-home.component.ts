import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-register-home',
  templateUrl: './admin-register-home.component.html',
  styleUrls: ['./admin-register-home.component.scss']
})
export class AdminRegisterHomeComponent implements OnInit {


  constructor() { }

  defaultImage = 'https://berlim-digital.s3.amazonaws.com/1568741797151-low-quality-bg.png';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568741797151-bg.png';

  ngOnInit() {
  }

}
