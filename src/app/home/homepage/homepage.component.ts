import { UserService } from './../../services/user.service';
import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/user-model';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  defaultImage = 'https://berlim-digital.s3.amazonaws.com/1568318302412-low-quality-berlim-bg.png';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568318302412-berlim-bg.png';
  defaultLogo = 'https://berlim-digital.s3.us-east-2.amazonaws.com/logo-berlim-lq.png';
  logo = 'https://berlim-digital.s3.us-east-2.amazonaws.com/logo-berlim.png';

  user: User;

  constructor(private userService: UserService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Berlim Digital');
    this.userService.currentUser.subscribe(user => this.user = user);
  }

}
