
import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable()
export class AppointmentsApi {
  private readonly apiController: string = 'appointment';

  constructor(private api: HttpService) {}

  getCurrent(): Observable<any> {
    return this.api.get(`${this.apiController}/current`)
      .pipe(map(data => {
        //const picture = `${this.api.apiUrl}/${this.apiController}/${data.id}/photo`;
        return { ...data };
      }));
  }
  
  getAll(items: any):Observable<any>{
    return this.api.get(`${this.apiController}/all/${items.id}`)
  }

  get(id: any): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        //const picture = `${this.api.apiUrl}/${this.apiController}/${data.id}/photo`;
        return { ...data };
      }));
  }

  add(data: any): Observable<any> {
    return this.api.post(`${this.apiController}/add`, data)
  }
  
}
