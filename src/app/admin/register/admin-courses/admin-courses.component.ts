import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Image from '../../../models/image-model'
import { ModalImagesComponent } from '../../modal/modal-images/modal-images.component';
import { AdvisorService } from 'src/app/services/advisor.service';

@Component({
  selector: 'app-admin-courses',
  templateUrl: './admin-courses.component.html',
  styleUrls: ['./admin-courses.component.scss']
})
export class AdminCoursesComponent implements OnInit {

  advisors = [];
  pic;

  images: Image = {
    url: 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568662807304-default-image.jpg', lowQualityUrl: 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568662807304-low-quality-default-image.jpg'
  };

  banner: Image = {
    url: 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568833466058-default-banner.jpg', lowQualityUrl: 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568833466058-low-quality-default-banner.jpg'
  };

  defaultImage = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568829352888-low-quality-bg-cursos.jpg';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568829352888-bg-cursos.jpg';

  formCourses;


  constructor(private formBuilder: FormBuilder, public dialog: MatDialog, private advisorService: AdvisorService) { }

  ngOnInit() {
    this.advisorService.getAdvisors().subscribe(data => {
      this.advisors = data
      console.log(data);
    });
    this.formCourses = this.formBuilder.group({
      title: [null, [Validators.required, Validators.email, Validators.minLength(4), Validators.maxLength(100)]],
      description: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(600)]],
      target: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(600)]],
      advisor: [null, [Validators.required, Validators.minLength(8), Validators.maxLength(100)]],
      level: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(100)]],
      vacancies: [null, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
      status: [1, [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(ModalImagesComponent, {
      width: '98%',
      maxWidth: 700,
    });
    dialogRef.beforeClose().subscribe(result => {
      this.images = result;
    })
  }

  openBannerDialog() {
    const dialogRef = this.dialog.open(ModalImagesComponent, {
      width: '98%',
      maxWidth: 700,
    });
    dialogRef.beforeClose().subscribe(result => {
      this.banner = result;
    })
  }

  coursesSubmit() {
    const value = this.formCourses.value;
    console.log(value);
  }

}
