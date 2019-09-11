import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { NgScrollbarModule } from 'ngx-scrollbar';
import { AdminComponent } from './admin.component';
import { intersectionObserverPreset, LazyLoadImageModule } from 'ng-lazyload-image';
import { HomeComponent } from './home/home.component';


@NgModule({
  imports: [
    CommonModule, AdminRoutingModule, NgScrollbarModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    })
  ],
  declarations: [AdminComponent, HomeComponent],
  providers: [
  ],

})
export class AdminModule { }
