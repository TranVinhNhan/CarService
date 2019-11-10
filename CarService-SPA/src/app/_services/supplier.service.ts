import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../_models/supplier';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SupplierService {

  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getSuppliers(): Observable<Supplier[]> {
    return this.http.get<Supplier[]>(this.baseUrl + 'suppliers');
  }
}
