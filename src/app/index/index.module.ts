
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';


import { IndexComponent } from './index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { ErrorMsgComponent } from '../utils/error-msg/error-msg.component';
import { GeneralModule } from '../utils/general/general.module';


@NgModule({
  imports: [
    CommonModule, IndexRoutingModule, GeneralModule
  ],
  declarations: [IndexComponent, RegisterComponent, LoginComponent, ErrorMsgComponent],
  providers: [
  ],

})
export class IndexModule { }
