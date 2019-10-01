import { CartService } from './../../services/cart.service';
import { LoadingService } from './../../services/loading.service';
import { TrainingService } from './../../services/training.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { switchMap, map } from 'rxjs/operators';
import Training from 'src/app/models/training-model';
import { Title } from '@angular/platform-browser';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  faArrowLeft = faArrowLeft;
  training: Training;
  config;
  isLoading$: BehaviorSubject<boolean> = new BehaviorSubject(false);

  defaultImage = 'https://berlim-digital.s3.amazonaws.com/1568741797151-low-quality-bg.png';
  image = 'https://berlim-digital.s3.us-east-2.amazonaws.com/1568741797151-bg.png';

  constructor(private cartService: CartService, private router: Router, private route: ActivatedRoute, private trainingService: TrainingService, private titleService: Title) { }

  ngOnInit() {
    this.isLoading$.next(true);
    this.trainingService.getTraining(parseInt(this.route.snapshot.paramMap.get('id')))
      .subscribe(
        data => {
          this.training = data;
          this.titleService.setTitle(data.title + ' - Berlim Digital');
        },
        error => {
          this.router.navigate(['treinamentos'])
        }, () => {
          this.isLoading$.next(false)
        }
      )
  }

  goBack() {
    this.router.navigate(['treinamentos'])
  }

  teste() {
    this.cartService.sendMessage('teste');
  }

}
