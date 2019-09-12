import { GeneralModule } from './../utils/general/general.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminTrainingComponent } from './admin-training/admin-training.component';


@NgModule({
  imports: [
    CommonModule, AdminRoutingModule, GeneralModule,
  ],
  declarations: [AdminComponent, AdminHomeComponent, AdminHomeComponent, AdminTrainingComponent],
  providers: [
  ],

})
export class AdminModule { }
