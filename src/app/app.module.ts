
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './admin/login/login.component';
import { AppLayoutComponent } from './app-layout.component';
import { HeaderAdminComponent } from './admin/header-admin/header-admin.component';
import { AdminLayoutComponent } from './admin-layout.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { GeneralModule } from './utils/general/general.module';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HeaderAdminComponent,
    AppLayoutComponent,
    AdminLayoutComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    GeneralModule

  ],
  providers: [


  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
