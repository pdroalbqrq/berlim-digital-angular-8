import { Injectable } from '@angular/core';
import Advisor from '../models/advisor-model'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {

  url = 'http://localhost:3000/v1/'

  constructor(private http: HttpClient) { }

  postAdvisor(imageId, advisor) {
    return this.http.post<Advisor>(`/v1/advisor/${imageId}`, advisor);
  }
  getAdvisors() {
    return this.http.get<Advisor[]>(`/v1/advisor`);
  }
  getImage(id: number) {
    return this.http.get<Advisor>(`/v1/advisor/${id}`);
  }
}
