import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  faUser = faUser;
  faUserLock = faLock

  formAdmin;

  defaultImage = 'https://berlim-digital.s3.amazonaws.com/1568318302412-low-quality-berlim-bg.png';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568318302412-berlim-bg.png';


  constructor(private formBuilder: FormBuilder, private loginService: LoginService) { }

  ngOnInit() {
    this.formAdmin = this.formBuilder.group({
      email: ['tiago@berlim.com', [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      password: ['berlim123', [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    });
  }

  loginSubmit() {
    const value = this.formAdmin.value;

    this.loginService.adminLogin(value)
    this.formAdmin.reset();
  }

}
