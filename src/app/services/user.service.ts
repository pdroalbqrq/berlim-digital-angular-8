import { Injectable } from '@angular/core';
import User from '../models/user-model';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user:User;
  private userIsLogged= new BehaviorSubject<User>(this.user);
  currentUser = this.userIsLogged.asObservable();

  constructor() { }

  changeUser(user:User){
    this.userIsLogged.next(user);
  }

}
