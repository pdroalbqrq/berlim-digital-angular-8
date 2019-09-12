import { LoadingService } from './../services/loading.service';
import { LoginService } from 'src/app/services/login.service';
import { Component, OnInit } from '@angular/core';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  user;
  loading;

  constructor(private loginService: LoginService, private userService: UserService,private loadingService: LoadingService) { }

  ngOnInit() {
    this.userService.currentUser.subscribe(user => this.user = user);
    this.loadingService.currentLoading.subscribe(loading => this.loading = loading);
  }


  logout() {
    this.loginService.logout('login');
  }

}
