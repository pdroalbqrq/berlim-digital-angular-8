import { Component } from '@angular/core';

@Component({
  selector: 'app-app-main',
  template: `
  <app-header-admin></app-header-admin>
    <router-outlet></router-outlet>
  `,
})
export class AdminLayoutComponent {

}
