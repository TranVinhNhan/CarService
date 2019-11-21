import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Service } from '../_models/service';
import { map } from 'rxjs/operators';

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

  getService(id: number): Observable<Service> {
    return this.http.get<Service>(this.baseUrl + 'services/' + id);
  }

  addService(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'services', model).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  deleteService(id: number) {
    return this.http.delete(this.baseUrl + 'services/' + 'delete/' + id);
  }

  updateService(id: number, model: any) {
    return this.http.put(this.baseUrl + 'services/' + id, model);
  }
}
