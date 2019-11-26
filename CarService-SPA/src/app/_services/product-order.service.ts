import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductOrder } from '../_modelsProductOrder/productOrder';

@Injectable({
  providedIn: 'root'
})
export class ProductOrderService {

  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  checkout(model: any) {
    return this.http.post(this.baseUrl + 'productorders', model);
  }

  getOrders(): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>(this.baseUrl + 'productorders');
  }

  getOrdersByUser(id: number): Observable<ProductOrder[]> {
    return this.http.get<ProductOrder[]>(this.baseUrl + 'productorders/' + id);
  }
}
