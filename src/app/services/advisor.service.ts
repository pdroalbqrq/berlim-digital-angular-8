import { Injectable } from '@angular/core';
import { HttpClient } from 'selenium-webdriver/http';

@Injectable({
  providedIn: 'root'
})
export class AdvisorService {

  url = 'http://localhost:3000/v1/'

  constructor(private http: HttpClient) { }

  postImage(image) {
    return this.http.post<Image>(`${this.url}image/`, image);
  }
  getImages() {
    return this.http.get<Image[]>(`${this.url}image`);
  }
  getProfileImages() {
    return this.http.get<Image[]>(`${this.url}image/profile`);
  }
  getImage(id: number) {
    return this.http.get<Image>(`${this.url}image/${id}`);
  }
}
