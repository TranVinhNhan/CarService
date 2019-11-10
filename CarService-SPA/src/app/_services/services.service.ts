import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Service } from '../_models/service';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  baseUrl = environment.apiUrl;
  constructor(
    private http: HttpClient
  ) { }

  getServices(): Observable<Service[]> {
    return this.http.get<Service[]>(this.baseUrl + 'services');
  }
}
