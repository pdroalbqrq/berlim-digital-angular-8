import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { faUser, faCrosshairs, faAlignLeft, faUpload, faLevelUpAlt, faUsers, faUniversity } from '@fortawesome/free-solid-svg-icons';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Image from '../../../models/image-model'
import { ModalImagesComponent } from '../../modal/modal-images/modal-images.component';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-admin-advisor',
  templateUrl: './admin-advisor.component.html',
  styleUrls: ['./admin-advisor.component.scss']
})
export class AdminAdvisorComponent implements OnInit {

  faUser = faUser;
  faUsers = faUsers;
  faLevelUpAlt = faLevelUpAlt;
  faCrosshairs = faCrosshairs;
  faAlignLeft = faAlignLeft;
  faUniversity = faUniversity;
  faUpload = faUpload;
  pic;

  images: Image;

  defaultImage = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568829881292-low-quality-bg-ead.jpg';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568829881292-bg-ead.jpg';

  formAdvisor;

  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private fileService: FileService) { }

  ngOnInit() {
    this.getAvatars()
    this.formAdvisor = this.formBuilder.group({
      title: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(600)]],
      target: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(600)]],
      advisor: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      level: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      vacancies: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      status: [1, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(ModalImagesComponent, {
      width: '98%',
      maxWidth: 700,
    });
    dialogRef.beforeClose().subscribe(result => {
      this.images = result;
    })
  }


  advisorSubmit() {
    const value = this.formAdvisor.value;
    console.log(value);
  }

  getAvatars() {
    this.fileService.getImage(2).subscribe((data: Image) => {
      this.images = data;
      console.log(data);
    });
  }

}
