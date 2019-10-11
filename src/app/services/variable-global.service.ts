import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VariableGlobalService {

  public status: boolean;

  constructor() { }

  setStatusScript(status: boolean) {

    this.status = status;
  }

  getStatusScript() {

    return this.status;
  }
}
