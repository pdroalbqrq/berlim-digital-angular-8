import { FileService } from './../../../services/file.service';
import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-images',
  templateUrl: './modal-images.component.html',
  styleUrls: ['./modal-images.component.scss']
})
export class ModalImagesComponent implements OnInit {

  config;
  images;

  constructor(private fileService: FileService, public dialogRef: MatDialogRef<ModalImagesComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    this.fileService.getImages().subscribe(data => this.images = data);
  }

  selectedImage(image) {
    this.dialogRef.close(image);
  }

}
