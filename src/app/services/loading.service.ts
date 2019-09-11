import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadingService {

  loading: Boolean;
  private isLoading = new BehaviorSubject<Boolean>(false);
  currentLoading = this.isLoading.asObservable();

  constructor() { }
  changeLoading(loading: Boolean) {
    this.isLoading.next(loading);
  }
}
