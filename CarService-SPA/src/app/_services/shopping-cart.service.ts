import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { ShoppingCartItem } from '../_models/shoppingcartitem';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  baseUrl = environment.apiUrl;
  cartItemsJson: any = [];
  itemCount = new BehaviorSubject<number>(0);
  currentItemCount = this.itemCount.asObservable();


  constructor(private http: HttpClient) { }

  changeItemCount(count: number) {
    this.itemCount.next(count);
  }
}
