import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Image from '../models/image-model';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  url = 'http://localhost:3000/v1/'

  constructor(private http: HttpClient) { }

  postImage(image){
    return this.http.post<Image>(`${this.url}image/`, image).subscribe(result => {
      console.log(result)
    });
  }
}
