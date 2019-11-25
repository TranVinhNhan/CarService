import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/_models/shoppingcartdto';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['../client.component.css']
})
export class CartComponent implements OnInit {

  constructor(
  ) { }

  ngOnInit() {

  }

}
