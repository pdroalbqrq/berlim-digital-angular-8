import { UserService } from './../../services/user.service';
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { faUser, faEnvelope, faPhone, faLock } from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, Validators } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faUser = faUser;
  faUserLock = faLock

  form;

  defaultImage = 'https://berlim-digital.s3.us-east-2.amazonaws.com/bg-home-lq.jpg';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/bg-home.jpg';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    });
  }

  loginSubmit() {
    const value = this.form.value;

    this.loginService.login(value)
    this.form.reset();
  }

}
