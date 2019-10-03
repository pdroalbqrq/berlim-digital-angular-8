import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Item from '../models/item-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new Subject<any>();

  constructor(private http: HttpClient) { }

  sendMessage(item: Item) {
    this.subject.next(item);
  }

  clearMessages() {
    this.subject.next();
  }

  get getMessage(): Subject<any> {
    return this.subject;
  }


}
