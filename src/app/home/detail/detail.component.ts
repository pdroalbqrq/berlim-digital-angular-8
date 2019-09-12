import { LoadingService } from './../../services/loading.service';
import { TrainingService } from './../../services/training.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import Training from 'src/app/models/training-model';
import { Title } from '@angular/platform-browser';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  training: Training;
  config;
  defaultImage = 'https://berlim-digital.s3.amazonaws.com/1568318302412-low-quality-berlim-bg.png';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568318302412-berlim-bg.png';

  constructor(private loadingService: LoadingService, private router: Router, private route: ActivatedRoute, private trainingService: TrainingService, private titleService: Title) { }

  ngOnInit() {
    this.trainingService.getTraining(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe(data => {
        this.training = data
        console.log(data);
        this.titleService.setTitle(data.title + ' - Berlim Digital');
      },
        (error => {
          this.router.navigate(['treinamentos'])
        }))
  }

  goBack() {
    this.router.navigate(['treinamentos'])
  }

}
