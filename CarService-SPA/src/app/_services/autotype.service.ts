import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AutoType } from '../_models/autotype';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AutotypeService {

  baseUrl = environment.apiUrl;

  constructor(
    private http: HttpClient
  ) { }

  getTypes(): Observable<AutoType[]> {
    return this.http.get<AutoType[]>(this.baseUrl + 'automotivetypes');
  }

  getType(id: number): Observable<AutoType> {
    return this.http.get<AutoType>(this.baseUrl + 'automotivetypes/' + id);
  }

  deleteType(id: number) {
    return this.http.delete(this.baseUrl + 'automotivetypes/' + id);
  }

  addType(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'automotivetypes', model).pipe(
      map((response: any) => {
        return response;
      })
    );
  }

  updateType(id: number, model: any) {
    return this.http.put(this.baseUrl + 'automotivetypes/' + id, model);
  }
}
