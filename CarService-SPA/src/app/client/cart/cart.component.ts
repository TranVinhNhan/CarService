import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../client.component.css']
})
export class CartComponent implements OnInit {

  cartItems: any = [];
  total = 0;
  count: number;
  cartItemsJson = JSON.parse(localStorage.getItem('cart'));
  constructor(
    private shoppingcartService: ShoppingCartService
  ) { }

  ngOnInit() {
    let sum = 0;
    if (this.cartItemsJson) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.cartItemsJson.length; i++) {
        const item = JSON.parse(this.cartItemsJson[i]);
        this.cartItems.push(item);
        sum += item.price * item.quantity;
      }
      this.total = sum;
    }
  }

  addQty(id: number) {
    if (this.cartItemsJson) {
      for (let i = 0; i < this.cartItemsJson.length; i++) {
        const item = JSON.parse(this.cartItemsJson[i]);
        if (item.id === id) {
          item.quantity++;
          this.cartItemsJson[i] = JSON.stringify(item);
          localStorage.setItem('cart', JSON.stringify(this.cartItemsJson));
          this.cartItems = [];
          this.ngOnInit();
        }
      }
    }
  }

  minusQty(id: number) {
    if (this.cartItemsJson) {
      for (let i = 0; i < this.cartItemsJson.length; i++) {
        const item = JSON.parse(this.cartItemsJson[i]);
        if (item.id === id) {
          item.quantity--;
          if (item.quantity === 0) {
            this.cartItemsJson.splice(i, 1);
            this.shoppingcartService.currentItemCount.subscribe(itemCount => this.count = itemCount);
            this.count--;
            this.shoppingcartService.changeItemCount(this.count);
          } else {
            this.cartItemsJson[i] = JSON.stringify(item);
          }
          localStorage.setItem('cart', JSON.stringify(this.cartItemsJson));
          this.cartItems = [];
          this.ngOnInit();
        }
      }
    }
  }

  clearCart() {
    this.cartItems = [];
    this.cartItemsJson = null;
    localStorage.removeItem('cart');
    this.shoppingcartService.changeItemCount(0);
    this.ngOnInit();
  }
}
