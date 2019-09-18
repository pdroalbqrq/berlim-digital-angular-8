import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';

@Component({
  template: `
  <router-outlet></router-outlet>`,
})
export class AdminComponent {

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    // this.userService.currentUser.subscribe((user: any) => {
    //   if (user.role = "User") {
    //     this.router.navigate(['admin/login'])
    //   }
    // })
  }

}
