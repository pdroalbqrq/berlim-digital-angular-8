import { AdminRegisterHomeComponent } from './register/admin-register-home/admin-register-home.component';
import { AdminAdvisorComponent } from './register/admin-advisor/admin-advisor.component';
import { AdminCoursesComponent } from './register/admin-courses/admin-courses.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminTrainingComponent } from './register/admin-training/admin-training.component';
import { RegisterComponent } from './register/register.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent,
      },
      {
        path: 'cadastrar',
        component: RegisterComponent,
        children: [
          {
            path: '',
            component: AdminRegisterHomeComponent,
          },
          {
            path: 'treinamento',
            component: AdminTrainingComponent,
          },
          {
            path: 'curso',
            component: AdminCoursesComponent,
          },
          {
            path: 'orientador',
            component: AdminAdvisorComponent,
          }
        ]
      },
      {
        path: '**',
        redirectTo: 'admin/login',
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes),],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
