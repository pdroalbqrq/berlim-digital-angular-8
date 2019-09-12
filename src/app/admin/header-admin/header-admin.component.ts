import { FileService } from './../../services/file.service';
import { UserService } from 'src/app/services/user.service';
import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/services/login.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-header-admin',
  templateUrl: './header-admin.component.html',
  styleUrls: ['./header-admin.component.scss']
})
export class HeaderAdminComponent implements OnInit {

  loading;
  user;

  constructor(private loginService: LoginService, private userService: UserService, private loadingService: LoadingService, private fileService: FileService) { }

  ngOnInit() {

    this.userService.currentUser.subscribe(user => this.user = user);
    this.loadingService.currentLoading.subscribe(loading => this.loading = loading);
  }

  logout() {
    this.loginService.logout('admin/login');
  }

  uploadFile(file: any){
    const selectedImage = file.target.files;

    if (selectedImage && selectedImage[0]) {
      console.log(selectedImage[0]);
      const image = selectedImage[0];

    const formData = new FormData();
    formData.append('file', image);
    this.fileService.postImage(formData);
   }
  }

}



