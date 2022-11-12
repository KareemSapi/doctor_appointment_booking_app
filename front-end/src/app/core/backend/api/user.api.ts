
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpService } from './http.service';
import { map } from 'rxjs/operators';

@Injectable()
export class UsersApi {
  private readonly apiController: string = 'user';

  constructor(private api: HttpService) {}

  getCurrent(): Observable<any> {
    return this.api.get(`${this.apiController}/current`)
      .pipe(map(data => {
        return { ...data };
      }));
  }
  
  getAll(user:any):Observable<any>{
    return this.api.get(`${this.apiController}/all/${user.id}`)
  }

  get(id: any): Observable<any> {
    return this.api.get(`${this.apiController}/${id}`)
      .pipe(map(data => {
        return { ...data };
      }));
  }

}
