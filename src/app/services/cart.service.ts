import { Injectable } from '@angular/core';
import { Observable, of, BehaviorSubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  sendMessage(message: string) {
    this.subject.next(message);
  }

  clearMessages() {
    this.subject.next();
  }

  getMessage(): Subject<any> {
    return this.subject;
  }


}
