import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Supplier } from '../_models/supplier';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

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

  getSupplier(id: number): Observable<Supplier> {
    return this.http.get<Supplier>(this.baseUrl + 'suppliers/' + id);
  }

  addSupplier(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'suppliers', model).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteService(id: number) {
    return this.http.delete(this.baseUrl + 'suppliers/' + 'delete/' + id);
  }

  updateSupplier(id: number, model: any) {
    return this.http.put(this.baseUrl + 'suppliers/' + id, model);
  }
}
