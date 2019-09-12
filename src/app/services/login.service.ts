import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import User from '../models/user-model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { LoadingService } from './loading.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  config = new MatSnackBarConfig();
  url = 'http://localhost:3000/v1/'

  constructor(private http: HttpClient, private router: Router,
    private userService: UserService, private snackBar: MatSnackBar,
    private loadingService: LoadingService) {

    this.config.panelClass = ''
    this.config.duration = 5000

  }

  private adminLoggedIn = new BehaviorSubject<boolean>(true);
  private loggedIn = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {

    try {

      this.tokenValidate(localStorage.getItem('token')).subscribe((data: any) => {

        this.getUser(data.userId);
        this.loggedIn.next(true)

      }, (error => {
        this.loggedIn.next(false);
        this.router.navigate(['/indice/login']);
        localStorage.removeItem('token');
        this.userService.changeUser(null);

      }))
    } catch (e) {
      this.loggedIn.next(false);
      this.router.navigate(['/indice/login']);
      localStorage.removeItem('token');
      this.userService.changeUser(null);
    }

    return this.loggedIn.asObservable();

  }


  get isAdminLoggedIn() {

    try {

      this.tokenAdminValidate(localStorage.getItem('token')).subscribe((data: any) => {

        this.getUser(data.userId);
        this.adminLoggedIn.next(true)

      }, (error => {
        this.router.navigate(['/admin/login']);
        this.adminLoggedIn.next(false);
        localStorage.removeItem('token');
        this.userService.changeUser(null);

      }))
    } catch (e) {
      this.router.navigate(['/admin/login']);
      this.adminLoggedIn.next(false);
      localStorage.removeItem('token');
      this.userService.changeUser(null);
    }

    return this.adminLoggedIn.asObservable();

  }

  getUser(id) {

    return this.http.get<User>(`${this.url}user/${id}`).subscribe(result => {
      this.userService.changeUser(result);
    });

  }

  register(form) {

    return this.http.post<any>(`${this.url}user/`, form).subscribe(result => {
      console.log(result)
      this.snackBar.open(`Bem vindx ${result.user.name}`, 'confirmar', this.config)
    }, (error => { console.log(error); this.snackBar.open(`${error.error.error}`, 'confirmar', this.config) }))

  }

  login(user) {

    this.loadingService.changeLoading(true)
    user.password = window.btoa(user.password);
    return this.http.post<any>(`${this.url}user/auth`, user).subscribe(result => {
      localStorage.setItem('token', result.token);
      this.loggedIn.next(true)
      this.userService.changeUser(result.user);
      this.snackBar.open(`Bem vindx ${result.user.name}`, 'confirmar', this.config)
      this.loadingService.changeLoading(false);
      this.router.navigate(['/']);
    }, (error => {
      {
        console.log(error);
        this.snackBar.open(`${error.error.error}`, 'Confirmar', this.config)
        this.loadingService.changeLoading(false)
      }
    }))

  }

  adminLogin(user) {

    this.loadingService.changeLoading(true)
    user.password = window.btoa(user.password);
    return this.http.post<any>(`${this.url}user/admin_auth`, user).subscribe(result => {
      localStorage.setItem('token', result.token);
      this.adminLoggedIn.next(true)
      this.userService.changeUser(result.user);
      this.snackBar.open(`Bem vindx ${result.user.name}`, 'confirmar', this.config)
      this.loadingService.changeLoading(false);
      this.router.navigate(['/admin']);
    }, (error => {
      {
        console.log(error);
        this.snackBar.open(`${error.error.error}`, 'Confirmar', this.config)
        this.loadingService.changeLoading(false)
      }
    }))

  }

  async logout() {

    await this.loadingService.changeLoading(true)
    await localStorage.removeItem('token');
    await this.loggedIn.next(false);
    await this.userService.changeUser(null);
    await this.loadingService.changeLoading(false);
    await this.router.navigate(['/indice/login']);

  }

  tokenValidate(user: any) {
    return this.http.get<any>(`${this.url}token`, user);

  }

  tokenAdminValidate(user: any) {
    return this.http.get<any>(`${this.url}token/admin`, user);
  }


}
