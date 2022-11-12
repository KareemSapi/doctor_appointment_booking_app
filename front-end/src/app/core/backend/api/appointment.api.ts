
import { Injectable } from '@angular/core';
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
        return { ...data };
      }));
  }
  
  getAll():Observable<any>{
    return this.api.get(`${this.apiController}/all`)
     .pipe(map(data => {
      return [...data] 
     }))
  }

  get(id: any): Observable<any> {
    return this.api.get(`${this.apiController}/${id}/details`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

  add(data: any): Observable<any> {
    return this.api.post(`${this.apiController}/add`, data)
  }

  update( data: any): Observable<any> {
    return this.api.put(`${this.apiController}/${data.id}/update`, data)
  }
  
}
