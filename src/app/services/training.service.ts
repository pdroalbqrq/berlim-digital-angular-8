import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Training from '../models/training-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  url = 'http://localhost:3000/v1/';
  currentTraining;

  constructor(private http: HttpClient) { }

  get training(): Training {
    return this.currentTraining;
  }

  set training(training: Training) {
    this.currentTraining = training;
  }


  getTrainings() {
    return this.http.get<Training[]>(`${this.url}training`);
  }

  getTraining(id: number): Observable<Training> {
    return this.http.get<Training>(`${this.url}training/${id}`).pipe(
      map(result => result)
    );
  }

  createTraining(bannerId, brandId, training) {
    return this.http.post<Training>(`${this.url}training/${bannerId}/${brandId}`, training);
  }
}
