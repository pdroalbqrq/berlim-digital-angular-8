import { GeneralModule } from './../utils/general/general.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';

import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminTrainingComponent } from './register/admin-training/admin-training.component';
import { ModalImagesComponent } from './modal/modal-images/modal-images.component';
import { MiniatureComponent } from './modal/modal-images/miniature/miniature.component';
import { RegisterComponent } from './register/register.component';
import { AdminCoursesComponent } from './register/admin-courses/admin-courses.component';
import { AdminAdvisorComponent } from './register/admin-advisor/admin-advisor.component';
import { AdminRegisterHomeComponent } from './register/admin-register-home/admin-register-home.component';


@NgModule({
  imports: [
    CommonModule, AdminRoutingModule, GeneralModule,
  ],
  declarations: [AdminComponent, AdminHomeComponent, AdminHomeComponent, AdminTrainingComponent, ModalImagesComponent, MiniatureComponent, RegisterComponent, AdminCoursesComponent, AdminAdvisorComponent, AdminRegisterHomeComponent],
  providers: [],
  entryComponents: [ModalImagesComponent]

})
export class AdminModule { }
