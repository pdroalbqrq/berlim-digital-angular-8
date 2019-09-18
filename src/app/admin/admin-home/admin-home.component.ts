import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  defaultImage = 'https://berlim-digital.s3.amazonaws.com/1568741797151-low-quality-bg.png';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568741797151-bg.png';

  logoDefault = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568831394478-low-quality-logo-berlimDigital-home.png';
  logo = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568831394478-logo-berlimDigital-home.png';

  constructor() { }

  ngOnInit() {
  }

}
