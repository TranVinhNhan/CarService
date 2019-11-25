import { Component, OnInit } from '@angular/core';
import { AutopartService } from 'src/app/_services/autopart.service';
import { AutoPart } from 'src/app/_models/autopart';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';
import { ShoppingCartItem } from 'src/app/_models/shoppingcartitem';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['../client.component.css']
})
export class HomeComponent implements OnInit {

  parts: AutoPart[];
  constructor(
    private autopartService: AutopartService,
    private alertify: AlertifyService,
    private shoppingcartService: ShoppingCartService
  ) { }

  ngOnInit() {
    this.autopartService.getParts().subscribe((parts: AutoPart[]) => {
      this.parts = parts;
    }, error => {
      this.alertify.error(error);
    });
  }

  addToCart(id: number, price: number) {
    if (id) {
      const cartItem: ShoppingCartItem = {
        id,
        price,
        quantity: 1
      };

      const cart = localStorage.getItem('cart');
      if (cart == null) {
        // tslint:disable-next-line: no-shadowed-variable
        const cart: any = [];
        cart.push(JSON.stringify(cartItem));
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        const cartItemsJson = JSON.parse(cart);
        let index = -1;
        for (let i = 0; i < cartItemsJson.length; i++) {
          const item = JSON.parse(cartItemsJson[i]);
          if (item.id === id) {
            index = i;
            break;
          }
        }

        if (index === -1) {// sản phẩm mới không có trong giỏ hàng
          cartItemsJson.push(JSON.stringify(cartItem));
          localStorage.setItem('cart', JSON.stringify(cartItemsJson));
        } else {
          const item = JSON.parse(cartItemsJson[index]);
          item.quantity++;
          cartItemsJson[index] = JSON.stringify(item);
          localStorage.setItem('cart', JSON.stringify(cartItemsJson));
        }
      }
      this.alertify.success('Added to Cart');
      this.loadCart();
    } else {
      this.alertify.error('Did not found the product');
      this.loadCart();
    }
  }

  loadCart() {
    let sum = 0;
    this.shoppingcartService.cartItemsJson = JSON.parse(localStorage.getItem('cart'));
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.shoppingcartService.cartItemsJson.length; i++) {
      const item: ShoppingCartItem = JSON.parse(this.shoppingcartService.cartItemsJson[i]);
      sum += item.quantity * item.price;
    }
    // this.shoppingcartService.itemCount = this.shoppingcartService.cartItemsJson.length;
    this.shoppingcartService.changeItemCount(JSON.parse(localStorage.getItem('cart')).length);
    this.shoppingcartService.total = sum;
  }
}
