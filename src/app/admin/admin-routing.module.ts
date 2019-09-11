import { HomeComponent } from './home/home.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
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
