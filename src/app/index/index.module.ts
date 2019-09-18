
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IndexRoutingModule } from './index-routing.module';


import { IndexComponent } from './index.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

import { GeneralModule } from '../utils/general/general.module';


@NgModule({
  imports: [
    CommonModule, IndexRoutingModule, GeneralModule
  ],
  declarations: [IndexComponent, RegisterComponent, LoginComponent],
  providers: [
  ],

})
export class IndexModule { }
