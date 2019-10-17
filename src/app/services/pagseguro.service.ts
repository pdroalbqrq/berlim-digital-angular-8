import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PagseguroService {

  url = 'http://localhost:3000/v1/';

  constructor(private http: HttpClient) { }


  startSession() {

    return this.http.post<any>(`/v1/pagseguro/session`, { email: 'pdroalbqrq@gmail.com', token: '72543F4EAB734B59B09E5862573B755A' })
  }

  getPaymentMethods(amount: number, sessionId: string) {

    return this.http.get<any>(`/v1/pagseguro/payment-methods/${amount}/${sessionId}`)
  }

  getCardFlag(bin: number, sessionId: string) {

    return this.http.get<any>(`/v1/pagseguro/card-flag/${bin}/${sessionId}`)
  }

  getCardToken(cardData: any) {

    return this.http.post<any>(`/v1/pagseguro/card-token`, cardData)

  }

}
