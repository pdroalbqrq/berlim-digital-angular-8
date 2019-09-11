import { TrainingService } from './../../services/training.service';
import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrls: ['./training.component.scss']
})
export class TrainingComponent implements OnInit {

  training;

  defaultImage = 'https://berlim-digital.s3.us-east-2.amazonaws.com/bg-treinamentos-lq.jpg';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/bg-treinamentos.jpg';

  constructor(private trainingService: TrainingService, private titleService: Title) { }

  ngOnInit() {
    this.titleService.setTitle('Treinamentos - Berlim Digital');
    this.trainingService.getTrainings().subscribe(data => {
      this.training = data;
    })
  }

}
