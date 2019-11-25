import { Component, OnInit } from '@angular/core';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { ShoppingCartService } from 'src/app/_services/shopping-cart.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['../client.component.css']
})
export class NavComponent implements OnInit {

  cartItemCount: number;

  constructor(
    private alertify: AlertifyService,
    public authService: AuthService,
    private shoppingcartService: ShoppingCartService,
    private router: Router
  ) { }

  ngOnInit() {

    const cart = JSON.parse(localStorage.getItem('cart'));
    if (cart) {
      this.shoppingcartService.changeItemCount(cart.length);
    }
    this.shoppingcartService.currentItemCount.subscribe(itemCount => this.cartItemCount = itemCount);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loggedInAsAdmin() {
    return this.authService.loggedIn() && this.authService.decodedToken.role === 'Admin';
  }

  loggedInAsUser() {
    return this.authService.loggedIn() && this.authService.decodedToken.role !== 'Admin';
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/']);
    this.alertify.message('Logged Out');
  }
}
