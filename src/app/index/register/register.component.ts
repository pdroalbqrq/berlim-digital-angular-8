import { FileService } from './../../services/file.service';
import { LoginService } from '../../services/login.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MustMatch } from 'src/app/utils/must-match';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  i = 0;

  form;

  avatarArray = [];
  avatar;

  defaultImage = 'https://berlim-digital.s3.amazonaws.com/1568741797151-low-quality-bg.png';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568741797151-bg.png';

  constructor(private formBuilder: FormBuilder, private loginService: LoginService,
    private fileService: FileService, private snackBar: MatSnackBar,
    private loadingService: LoadingService, ) { }

  ngOnInit() {
    this.getAvatars();

    this.form = this.formBuilder.group({
      name: [null, [Validators.required, Validators.minLength(4), Validators.maxLength(100)]],
      email: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      number: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(11)]],
      password: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      passwordRepeat: [null, [Validators.required]],
    }, {
      validator: MustMatch('password', 'passwordRepeat')
    })

  }


  registerSubmit() {
    this.loadingService.changeLoading(true);
    const value = this.form.value;
    delete value.passwordRepeat
    value.password = window.btoa(value.password);

    this.loginService.register(value, this.avatar.id).subscribe(
      result => {
        this.snackBar.open(`Bem vindx ${result.user.name}`, 'confirmar')
        this.loadingService.changeLoading(false);
      },
      error => {

        this.snackBar.open(`${error.error.error}`, 'confirmar')
        this.loadingService.changeLoading(false);
      })
  }

  getUserImage() {
    this.avatar = this.nextArrayItem();
  }

  nextArrayItem() {
    this.i = this.i + 1;
    this.i = this.i % this.avatarArray.length;
    return this.avatarArray[this.i];
  }

  getAvatars() {
    this.fileService.getProfileImages().subscribe(data => {
      this.avatarArray = data;
      this.getUserImage();
    });
  }

}
