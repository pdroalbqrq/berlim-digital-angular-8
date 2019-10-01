import { CartService } from './../../services/cart.service';
import { Component, OnInit } from '@angular/core';
import Item from 'src/app/models/item-model';
import { ActivatedRoute } from '@angular/router';
import { TrainingService } from 'src/app/services/training.service';
import Training from 'src/app/models/training-model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items = ["teste1 ", "teste2"];
  subscription: Subscription;

  constructor(private cartService: CartService) {

  }

  ngOnInit() {

    this.cartService.getMessage().subscribe(
      result => {
        this.items = ["pedro1 ", "pedro2"];
        console.log(result);
      }
    );

  }

  ngOnDestroy(): void {
    // this.subscription.unsubscribe();
  }


}
