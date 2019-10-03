import { CartService } from './../../services/cart.service';
import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  items = [];
  displayedColumns = ['id', 'title', 'photo', 'quantity', 'total']

  constructor(private cartService: CartService,
    @Inject(MAT_DIALOG_DATA) public data: any) {

  }

  ngOnInit() {

    this.items = this.data;

  }

  descreaseQuantity(item) {

    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];

      if (element.product.title == item.product.title) {
        console.log(this.items);
        this.items[index].quantity -= 1;
        this.itemStorage()
        if (this.items[index].quantity <= 0) {

          this.data.splice(index, 1);
          localStorage.setItem('item', JSON.stringify(this.data))
          this.items = JSON.parse(localStorage.getItem('item'))

        }
      }
    }

  }

  increaseQuantity(item) {
    for (let index = 0; index < this.items.length; index++) {
      const element = this.items[index];
      if (element.product.title == item.product.title) {
        this.items[index].quantity += 1;
        this.itemStorage()
      }
    }
  }

  getTotalCost() {
    return this.items.map(t => t.product.price * t.quantity).reduce((acc, value) => acc + value, 0);
  }

  clear() {
    this.items = [];
    localStorage.removeItem('item');
  }

  itemStorage() {
    localStorage.setItem('item', JSON.stringify(this.items))
  }


}