import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { AutoType } from '../_models/autotype';

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
}
