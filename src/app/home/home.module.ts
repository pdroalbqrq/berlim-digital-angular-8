import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TrainingComponent } from './training/training.component';
import { CoursesComponent } from './courses/courses.component';
import { HomepageComponent } from './homepage/homepage.component';
import { LazyLoadImageModule } from 'ng-lazyload-image';
import { MiniatureComponent } from './miniature/miniature.component';

import { DetailComponent } from './detail/detail.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MaterialModule } from '../material.module';

@NgModule({
  imports: [
    CommonModule, HomeRoutingModule, LazyLoadImageModule,
    FontAwesomeModule, MaterialModule
  ],
  declarations: [HomeComponent, TrainingComponent, CoursesComponent, HomepageComponent, MiniatureComponent, DetailComponent],
  providers: []
})
export class HomeModule { }
