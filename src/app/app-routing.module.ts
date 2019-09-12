
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout.component';
import { AuthGuard } from './index/guards/auth.guard';
import { AdminGuard } from './admin/guards/admin.guard';
import { LoginComponent } from './admin/login/login.component';
import { AdminLayoutComponent } from './admin-layout.component';



const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', loadChildren: () => import('./home/home.module').then(h => h.HomeModule),

      },
    ]
  },
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      {
        path: '', loadChildren: () => import('./index/index.module').then(i => i.IndexModule),
      }
    ]
  },
  {
    path: 'admin',
    component: AdminLayoutComponent,
    canActivate: [AdminGuard],
    children: [
      {
        path: '', loadChildren: () => import('./admin/admin.module').then(i => i.AdminModule),
      }
    ]
  },
  {
    path: 'admin/login',
    component: LoginComponent,
  },
  {
    path: '**', redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
