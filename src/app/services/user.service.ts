import { Injectable } from '@angular/core';
import User from '../models/user-model';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private user = new Subject<User>();

  constructor() { }

  changeUser(user: User): void {
    this.user.next(user);
  }

  clearUser(): void {
    this.user.next();
  }

  get currentUser(): Subject<User> {
    return this.user;
  }
}
