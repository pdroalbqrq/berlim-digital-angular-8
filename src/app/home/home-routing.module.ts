import { DetailComponent } from './detail/detail.component';
import { HomepageComponent } from './homepage/homepage.component';
import { CoursesComponent } from './courses/courses.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { TrainingComponent } from './training/training.component';

const homeRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: HomepageComponent,
      },
      {
        path: 'treinamentos',
        component: TrainingComponent,
      },
      {
        path: 'treinamentos/:id/:name',
        component: DetailComponent,
      },
      {
        path: 'cursos',
        component: CoursesComponent,
      },
      {
        path: 'treinamentos/**',
        component: TrainingComponent,
      }
    ]
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(homeRoutes),],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
