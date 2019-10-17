import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Image from '../models/image-model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url = 'http://localhost:3000/v1/'

  constructor(private http: HttpClient) { }

  postImage(image) {
    return this.http.post<Image>(`/v1/image/`, image);
  }
  getImages() {
    return this.http.get<Image[]>(`/v1/image`);
  }
  getProfileImages() {
    return this.http.get<Image[]>(`/v1/image/profile`);
  }
  getImage(id: number) {
    return this.http.get<Image>(`/v1/image/${id}`);
  }
}
