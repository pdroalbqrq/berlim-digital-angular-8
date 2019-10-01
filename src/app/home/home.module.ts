import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { HomeRoutingModule } from './home-routing.module';
import { TrainingComponent } from './training/training.component';
import { CoursesComponent } from './courses/courses.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MiniatureComponent } from './miniature/miniature.component';

import { DetailComponent } from './detail/detail.component';

import { GeneralModule } from '../utils/general/general.module';
import { CartComponent } from './cart/cart.component'


@NgModule({
  imports: [
    CommonModule, HomeRoutingModule, GeneralModule
  ],
  exports: [
  ],
  declarations: [HomeComponent, TrainingComponent, CoursesComponent,
    HomepageComponent, MiniatureComponent, DetailComponent, CartComponent],
  providers: [],
  entryComponents: [CartComponent]
})
export class HomeModule { }
