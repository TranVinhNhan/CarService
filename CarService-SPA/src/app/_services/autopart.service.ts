import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutoPart } from '../_models/autopart';

@Injectable({
  providedIn: 'root'
})
export class AutopartService {

  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getParts(): Observable<AutoPart[]> {
    return this.http.get<AutoPart[]>(this.baseUrl + 'automotives');
  }

  getPart(id: number): Observable<AutoPart> {
    return this.http.get<AutoPart>(this.baseUrl + 'automotives' + id);
  }

  deletePart(id: number): Observable<any> {
    return this.http.delete(this.baseUrl + 'automotives/delete/' + id);
  }

  addPart(model: any) {
    return this.http.post(this.baseUrl + 'automotives', model);
  }
}
