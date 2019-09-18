import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
    private loadingService: LoadingService,
    private route: ActivatedRoute) {

    this.config.panelClass = ''
    this.config.duration = 5000

  }

  adminLoggedIn = new BehaviorSubject<boolean>(true);
  loggedIn = new BehaviorSubject<boolean>(true);

  get isLoggedIn() {

    const token = localStorage.getItem('token');

    if (token) {
      this.tokenValidate(token).subscribe((data: any) => {
        this.loggedIn.next(true)
        this.getUser(data.userId);

      }, (error => {
        this.loggedIn.next(false);
        this.router.navigate(['/login']);
        localStorage.removeItem('token');
        this.userService.changeUser(null);

      }))
    } else {
      this.router.navigate(['login']);
    }

    return this.loggedIn.asObservable();

  }


  get isAdminLoggedIn() {
    const token = localStorage.getItem('token');


    if (token) {
      this.tokenAdminValidate(token).subscribe((data: any) => {
        this.getUser(data.userId);
        this.adminLoggedIn.next(true)

      }, (error => {
        this.router.navigate(['/admin/login']);
        this.adminLoggedIn.next(false);
        localStorage.removeItem('token');
        this.userService.changeUser(null);

      }))

    } else {
      this.router.navigate(['/admin/login']);
    }


    return this.adminLoggedIn.asObservable();

  }

  getUser(id) {

    return this.http.get<User>(`${this.url}user/${id}`).subscribe(result => {
      this.userService.changeUser(result);
    });

  }

  register(form, imageId) {

    return this.http.post<any>(`${this.url}user/${imageId}`, form).subscribe(result => {
      console.log(result)
      this.snackBar.open(`Bem vindx ${result.user.name}`, 'confirmar', this.config)
    }, (error => { console.log(error); this.snackBar.open(`${error.error.error}`, 'confirmar', this.config) }))

  }

  login(user) {

    this.loadingService.changeLoading(true)
    user.password = window.btoa(user.password);
    return this.http.post<any>(`${this.url}auth/user`, user).subscribe(result => {
      this.loadingService.changeLoading(false);
      console.log(result);
      localStorage.setItem('token', result.token);
      this.loggedIn.next(true)
      this.userService.changeUser(result.user);
      this.snackBar.open(`Bem vindx ${result.user.name}`, 'confirmar', this.config)
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
    return this.http.post<any>(`${this.url}auth/admin`, user).subscribe(result => {
      localStorage.setItem('token', result.token);
      this.adminLoggedIn.next(true)
      this.userService.changeUser(result.user);
      this.snackBar.open(`Bem vindx ${result.user.name}`, 'confirmar', this.config)
      this.loadingService.changeLoading(false);
      this.router.navigate(['/admin']);
      console.log(result);
    }, (error => {
      {
        console.log(error);
        this.snackBar.open(`${error.error.error}`, 'Confirmar', this.config)
        this.loadingService.changeLoading(false)
      }
    }))

  }

  async logout(rota: string) {
    await this.loadingService.changeLoading(true)
    await localStorage.removeItem('token');
    await this.loggedIn.next(false);
    await this.adminLoggedIn.next(false);
    await this.userService.changeUser(null);
    await this.loadingService.changeLoading(false);
    this.router.navigate([rota]);
  }

  tokenValidate(user: any) {

    return this.http.get<any>(`${this.url}token`, user);


  }

  tokenAdminValidate(user: any) {

    return this.http.get<any>(`${this.url}token/admin`, user);

  }


}
