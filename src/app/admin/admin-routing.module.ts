
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminComponent } from './admin.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminTrainingComponent } from './admin-training/admin-training.component';

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
        path: 'treinamento',
        component: AdminTrainingComponent,
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
