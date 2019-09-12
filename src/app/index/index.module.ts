import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';
import { ReactiveFormsModule } from '@angular/forms';


import { IndexComponent } from './index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { LazyLoadImageModule, intersectionObserverPreset } from 'ng-lazyload-image';
import { ErrorMsgComponent } from '../utils/error-msg/error-msg.component';


@NgModule({
  imports: [
    CommonModule, IndexRoutingModule,
    LazyLoadImageModule.forRoot({
      preset: intersectionObserverPreset
    }), ReactiveFormsModule
    , FontAwesomeModule
  ],
  declarations: [IndexComponent, RegisterComponent, LoginComponent, ErrorMsgComponent],
  providers: [
  ],

})
export class IndexModule { }
