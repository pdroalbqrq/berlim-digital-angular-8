import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Training from '../models/training-model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class TrainingService {

  currentTraining;
  config = new MatSnackBarConfig();

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
    this.config.panelClass = ''
    this.config.duration = 5000
  }

  get training(): Training {
    return this.currentTraining;
  }

  set training(training: Training) {
    this.currentTraining = training;
  }


  getTrainings() {
    return this.http.get<Training[]>(`/v1/training`);
  }

  getTraining(id: number): Observable<Training> {
    return this.http.get<Training>(`/v1/training/${id}`).pipe(
      map(result => result)
    );
  }

  createTraining(brandId, bannerId, advisorId, training) {
    return this.http.post<Training>(`/v1/training/${brandId}/${bannerId}`, training).subscribe(data => {
      this.snackBar.open(`Treinamento criado com sucesso`, 'confirmar', this.config)
    }, (e => this.snackBar.open(`Ocorreu um erro, tente novamente mais tarde`, 'confirmar', this.config)))
  }



}
