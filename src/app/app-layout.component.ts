import { Component } from '@angular/core';

@Component({
  selector: 'app-app-main',
  template: `
    <app-header></app-header>
    <ng-scrollbar class="training">
    <router-outlet></router-outlet>
    </ng-scrollbar>  `,
})
export class AppLayoutComponent {


}
