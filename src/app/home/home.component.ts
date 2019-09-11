import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  template: `
                <router-outlet #outlet="outlet"></router-outlet>
                `
})
export class HomeComponent {


  prepareRoute(outlet: RouterOutlet) {
  }
}
