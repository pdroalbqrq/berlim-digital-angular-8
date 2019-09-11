import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';
import { take, map } from 'rxjs/operators';

@Component({
  template: `<router-outlet></router-outlet>`,
})
export class AdminComponent {

  constructor(private router: Router, private loginService: LoginService, private userService: UserService) { }

  ngOnInit(): void { }

}
