import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { HomeComponent } from './home/home.component';

import { intersectionObserverPreset, LazyLoadImageModule } from 'ng-lazyload-image';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { HeaderAdminComponent } from './header-admin/header-admin.component';


@NgModule({
  imports: [
    CommonModule, AdminRoutingModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    PerfectScrollbarModule
  ],
  declarations: [AdminComponent, HomeComponent, HeaderAdminComponent],
  providers: [
  ],

})
export class AdminModule { }
