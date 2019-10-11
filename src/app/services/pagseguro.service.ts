import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagseguroService {

  url = 'http://localhost:3000/v1/';

  constructor(private http: HttpClient) { }


  startSession() {

    return this.http.post<any>(`${this.url}pagseguro/session`, { email: 'pdroalbqrq@gmail.com', token: '72543F4EAB734B59B09E5862573B755A' })
  }
}
