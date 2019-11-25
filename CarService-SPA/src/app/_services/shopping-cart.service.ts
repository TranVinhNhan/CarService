import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShoppingCart } from '../_models/shoppingcartdto';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCartItem } from '../_models/shoppingcartitem';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  baseUrl = environment.apiUrl;
  cartItemsJson: any = [];
  total: number;
  itemCount = new BehaviorSubject<number>(0);
  currentItemCount = this.itemCount.asObservable();


  constructor(private http: HttpClient) { }

  changeItemCount(count: number) {
    this.itemCount.next(count);
  }

  getShoppingCart(): Observable<ShoppingCart> {
    return this.http.get<ShoppingCart>(this.baseUrl + 'shoppingcart');
  }

  addToShoppingCart(id: number) {
    return this.http.put(this.baseUrl + 'shoppingcart/add/' + id, null);
  }

  removeFromShoppingCart(id: number) {
    return this.http.put(this.baseUrl + 'shoppingcart/remove/' + id, id);
  }

}
