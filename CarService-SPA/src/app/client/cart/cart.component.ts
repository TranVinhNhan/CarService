import { Component, OnInit } from '@angular/core';
import { AutopartService } from 'src/app/_services/autopart.service';
import { AlertifyService } from 'src/app/_services/alertify.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../client.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any = [];
  total: number;

  constructor(
    private alertify: AlertifyService
  ) { }

  ngOnInit() {
    let sum = 0;
    const cartItemsJson = JSON.parse(localStorage.getItem('cart'));
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < cartItemsJson.length; i++) {
      const item = JSON.parse(cartItemsJson[i]);
      this.cartItems.push(item);
      sum += item.price * item.quantity;
    }
    this.total = sum;
  }
}
