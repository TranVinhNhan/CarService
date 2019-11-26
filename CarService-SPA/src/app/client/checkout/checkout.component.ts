import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Order } from 'src/app/_models/order';
import { ShoppingCartItem } from 'src/app/_models/shoppingcartitem';
import { ProductOrderService } from 'src/app/_services/product-order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {

  cartItems: any = [];
  total: number;
  cartItemCount: number;
  checkoutForm: FormGroup;
  constructor(
    private alertify: AlertifyService,
    private productorderService: ProductOrderService,
    private shoppingcartService: ShoppingCartService,
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData();
    this.createcheckoutForm();
  }

  loadData() {
    let sum = 0;
    const cartItemsJson = JSON.parse(localStorage.getItem('cart'));
    if (cartItemsJson) {
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < cartItemsJson.length; i++) {
        const item = JSON.parse(cartItemsJson[i]);
        this.cartItems.push(item);
        sum += item.price * item.quantity;
      }
      this.total = sum;
      this.shoppingcartService.currentItemCount.subscribe(itemCount => this.cartItemCount = itemCount);
    } else {
      this.alertify.error('Error');
    }
  }

  createcheckoutForm() {
    this.checkoutForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      address: ['', Validators.required],
      addressOptional: ['']
    });
  }

  checkout() {
    if (this.checkoutForm.valid) {
      const order = new Order();
      const items: ShoppingCartItem[] = [];
      order.productOrderDetailForCreationDtos = items;
      this.authService.decodedToken ? order.userId = this.authService.decodedToken.nameid : order.userId = 2;
      order.productOrderForCreationDto = this.checkoutForm.value;
      this.cartItems.forEach(item => {
        order.productOrderDetailForCreationDtos.push(item);
      });

      this.productorderService.checkout(order).subscribe(next => {
        this.alertify.success('Checkout completed');
        localStorage.removeItem('cart');
        this.shoppingcartService.changeItemCount(0);
        this.router.navigate(['/']);
      }, error => {
        this.alertify.error('error');
      });
    }
  }
}
