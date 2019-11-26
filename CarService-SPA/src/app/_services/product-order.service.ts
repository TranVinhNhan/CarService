import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

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
}
