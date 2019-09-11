import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/utils/must-match';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  faUser = faUser;
  faEnvelope = faEnvelope
  faPhone = faPhone
  faUserLock = faLock

  form

  defaultImage = 'https://berlim-digital.s3.us-east-2.amazonaws.com/bg-home-lq.jpg';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/bg-home.jpg';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      number: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      passwordRepeat: [null, [Validators.required]],
      // date: [null, Validators.required],
      // gender: ["female"],
    }, {
      validator: MustMatch('password', 'passwordRepeat')
    })

  }

  registerSubmit() {
    const value = this.form.value;
    delete value.passwordRepeat
    value.password = window.btoa(value.password);

    this.loginService.register(value).subscribe(result => {
      console.log(result);
    }, (error => console.log(error)))
  }

}
