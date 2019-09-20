import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { faUser, faLock } from '@fortawesome/free-solid-svg-icons';
import { LoginService } from 'src/app/services/login.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  hide = true;
  formAdmin;

  defaultImage = 'https://berlim-digital.s3.amazonaws.com/1568741797151-low-quality-bg.png';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568741797151-bg.png';


  constructor(private formBuilder: FormBuilder, private loginService: LoginService, private loadingService: LoadingService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.formAdmin = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    });
  }

  loginSubmit() {
    this.loadingService.changeLoading(true);
    const value = this.formAdmin.value;
    if (this.formAdmin.valid) {
      this.loginService.adminLogin(value).subscribe(
        data => {
          this.snackBar.open(`Bem vindx ${data.user.name}`, 'Confirmar')
          this.loadingService.changeLoading(false)
        },
        error => {
          this.snackBar.open(`${error.error.error}`, 'Confirmar')
          this.loadingService.changeLoading(false);
          this.formAdmin.controls['password'].reset()
        })
    } else {
      this.validateAllFormFields(this.formAdmin)
      this.loadingService.changeLoading(false);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }

}
