import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';
import { LoginService } from '../services/login.service';

@Component({
  template: `
  <div class="load-admin" *ngIf="load" style="z-index:9998;display:flex;align-items:center;justify-content:center;position:fixed; height: 100vh;width:100%; background:white;">
    <mat-spinner></mat-spinner>
  </div>
  <router-outlet></router-outlet>`,
})
export class AdminComponent {

  load = true;

  constructor(private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    this.userService.currentUser.subscribe((user: any) => {
      if (user.role == "User") {

        this.router.navigate(['admin/login'])
      } else {
        this.load = false;
      }
    })
  }

}
