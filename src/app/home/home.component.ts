import { CartService } from './../services/cart.service';
import { CartComponent } from './cart/cart.component';
import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import Item from '../models/item-model';

@Component({
  template: `
              <div class="cart" *ngIf="this.items.length > 0" (click)="openDialog()">
                  <mat-icon>
                    shopping_cart
                  </mat-icon>
              </div>
              <router-outlet></router-outlet>
            `
})
export class HomeComponent implements OnInit {

  items: Item[] = JSON.parse(localStorage.getItem('item')) ? JSON.parse(localStorage.getItem('item')) : [];


  constructor(public router: Router, private dialog: MatDialog, private cartService: CartService) { }


  ngOnInit(): void {
    this.cartService.getMessage.subscribe(data => {


      if (this.items.length > 0) {

        if (this.items.some(item => item.product.title === data.product.title)) {

          for (let index = 0; index < this.items.length; index++) {
            const element = this.items[index];
            if (element.product.title == data.product.title) {
              this.items[index].quantity += 1;
              this.itemStorage()
            }
          }

        } else {
          this.items.push(data);
          this.itemStorage()
        }
      } else {
        this.items.push(data);
        this.itemStorage()
      }

    })
  }

  itemStorage() {
    localStorage.setItem('item', JSON.stringify(this.items))
  }

  openDialog() {

    const dialogRef = this.dialog.open(CartComponent, {
      width: '98%',
      maxWidth: 700,
      data: JSON.parse(localStorage.getItem('item'))
    })
  };

  prepareRoute(outlet: RouterOutlet) { }
}

