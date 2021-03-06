import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { UserService } from './user.service';
import User from '../models/user-model';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  url = 'http://localhost:3000/v1/'

  constructor(private http: HttpClient, private router: Router,
    private userService: UserService, private snackBar: MatSnackBar,
    private route: ActivatedRoute) {

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

    return this.http.get<User>(`/v1/user/${id}`).subscribe(result => {
      this.userService.changeUser(result);
    });

  }

  register(form, imageId) {

    return this.http.post<any>(`/v1/user/${imageId}`, form)
      .pipe(map(result => {
        localStorage.setItem('token', result.token);
        this.loggedIn.next(true)
        this.userService.changeUser(result.user);
        this.router.navigate(['/']);
        return result
      }))


  }

  login(user): Observable<any> {

    user.password = window.btoa(user.password);
    return this.http.post<any>(`/v1/auth/user`, user).pipe(map(result => {
      localStorage.setItem('token', result.token);
      this.loggedIn.next(true)
      this.userService.changeUser(result.user);
      this.router.navigate(['/']);
      return result;
    }))
  }

  adminLogin(user): Observable<any> {

    user.password = window.btoa(user.password);
    return this.http.post<any>(`/v1/auth/admin`, user).pipe(map(result => {
      localStorage.setItem('token', result.token);
      this.adminLoggedIn.next(true)
      this.userService.changeUser(result.user);
      this.router.navigate(['/admin']);
      return result;
    }));
  }

  async logout(rota: string) {
    await localStorage.removeItem('token');
    await this.loggedIn.next(false);
    await this.adminLoggedIn.next(false);
    await this.userService.changeUser(null);
    this.router.navigate([rota]);
  }

  tokenValidate(user: any) {
    return this.http.get<any>(`/v1/token`, user);
  }

  tokenAdminValidate(user: any) {
    return this.http.get<any>(`/v1/token/admin`, user);
  }


}
