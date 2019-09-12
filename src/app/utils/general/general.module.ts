import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from '../../material.module';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';


import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { InterceptorService } from '../../services/interceptor.service';
import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import { ReactiveFormsModule } from '@angular/forms';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MaterialModule,
    PerfectScrollbarModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }),
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  exports: [
    MaterialModule,
    PerfectScrollbarModule,
    LazyLoadImageModule,
    FontAwesomeModule,
    ReactiveFormsModule
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: InterceptorService,
    multi: true
  }]
})
export class GeneralModule { }
