import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons';
import { FormValidations } from '../form-validations';

@Component({
  selector: 'app-error-msg',
  templateUrl: './error-msg.component.html',
  styleUrls: ['./error-msg.component.scss']
})
export class ErrorMsgComponent implements OnInit {
  faExclamationCircle = faExclamationCircle;

  @Input() label: string;
  @Input() control: FormControl;

  constructor() { }

  ngOnInit() {
  }

  get errorMessage() {

    for(const propertyName in this.control.errors){
      if(this.control.errors.hasOwnProperty(propertyName) &&
         this.control.dirty || this.control.touched ) {
           return FormValidations.getErrorMsg(this.label, propertyName, this.control.errors[propertyName]);
         }
    }

    return null;
  }

}
