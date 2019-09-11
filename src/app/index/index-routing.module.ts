import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IndexComponent } from './index.component';
import { RegisterComponent } from './register/register.component';

const indexRoutes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: [
      {
        path: 'cadastro',
        component: RegisterComponent,
      },
      {
        path: 'login',
        component: LoginComponent,
      },
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(indexRoutes),],
  exports: [RouterModule]
})
export class IndexRoutingModule { }
