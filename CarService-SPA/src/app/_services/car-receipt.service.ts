import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CarReceiptDetail } from '../_models/carReceiptDetail';
import { Receipt } from '../_models/receipt';

@Injectable({
  providedIn: 'root'
})
export class CarReceiptService {

  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  addCarReceipt(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'carreceipts', model).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  getCarReceiptsByUser(userId: number): Observable<CarReceiptDetail[]> {
    return this.http.get<CarReceiptDetail[]>(this.baseUrl + 'carreceipts/' + userId);
  }

  getCarReceipts(): Observable<Receipt[]> {
    return this.http.get<Receipt[]>(this.baseUrl + 'carreceipts');
  }
}
