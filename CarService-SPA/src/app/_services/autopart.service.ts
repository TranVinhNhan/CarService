import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutoPart } from '../_models/autopart';
import { map } from 'rxjs/operators';

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
    return this.http.get<AutoPart>(this.baseUrl + 'automotives/' + id);
  }

  deletePart(id: number) {
    return this.http.delete(this.baseUrl + 'automotives/delete/' + id);
  }

  addPart(model: any): Observable<any> {
    return this.http.post(this.baseUrl + 'automotives', model).pipe(
      map((response: any) => {
        return response;
      }
      ));
  }

  deletePhoto(userId: number, id: number) {
    return this.http.delete(this.baseUrl + 'automotives/' + userId + '/photos/' + id);
  }

  updatePart(id: number, model: any) {
    return this.http.put(this.baseUrl + 'automotives/' + id, model);
  }
}
