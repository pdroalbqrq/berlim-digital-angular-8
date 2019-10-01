import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl } from '@angular/forms';
import { LoginService } from 'src/app/services/login.service';
import { LoadingService } from 'src/app/services/loading.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  form;

  defaultImage = 'https://berlim-digital.s3.amazonaws.com/1568741797151-low-quality-bg.png';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568741797151-bg.png';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private loadingService: LoadingService, private snackBar: MatSnackBar) { }

  ngOnInit() {

    this.form = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
    });
  }

  loginSubmit() {
    this.loadingService.changeLoading(true);
    const value = this.form.value;

    if (value.email === "pinto@berlim.com") {
      this.snackBar.open(`pinto awards`, 'confirmar')
      this.loadingService.changeLoading(false);
    } else {
      if (this.form.valid) {
        this.loginService.login(value).subscribe(
          data => {
            this.snackBar.open(`Bem vindx ${data.user.name}`, 'confirmar')
            this.loadingService.changeLoading(false)
          },
          e => {
            this.snackBar.open(`${e.error.error}`, 'Confirmar')
            this.loadingService.changeLoading(false);
            this.form.controls['password'].reset()
          })
      } else {
        this.validateAllFormFields(this.form); //{7}
        this.loadingService.changeLoading(false);
      }
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
