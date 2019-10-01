import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

@Component({
  template: `
              <router-outlet></router-outlet>
            `
})
export class HomeComponent {

  constructor(public router: Router) {

  }

  prepareRoute(outlet: RouterOutlet) { }

}
