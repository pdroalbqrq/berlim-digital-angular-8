import { HttpClient } from '@angular/common/http';

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QueryCepService {

  constructor(private http: HttpClient) { }

  queryCep(cep: string) {
    return this.http.get(`/ws/${cep}/json`)
  }
}
