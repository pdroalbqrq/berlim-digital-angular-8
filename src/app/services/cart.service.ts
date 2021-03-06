import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import Item from '../models/item-model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private subject = new Subject<any>();

  constructor() { }

  sendMessage(item: Item): void {
    this.subject.next(item);
  }

  clearMessages(): void {
    this.subject.next();
  }

  get getMessage(): Subject<any> {
    return this.subject;
  }


}
