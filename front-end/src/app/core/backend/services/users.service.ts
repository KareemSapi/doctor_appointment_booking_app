import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { UsersApi } from '../api/user.api';
import { UserData, User } from '../../interfaces/users';
import { NbAuthService } from '@nebular/auth';
import { switchMap, map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsersService extends UserData {

  constructor(
    private api: UsersApi, 
    private authService: NbAuthService) {
    super();
  }


  // getCurrentUser(): Observable<User> {
  //   return this.authService.isAuthenticated()
  //     .pipe(
  //       switchMap(authenticated => {
  //         return authenticated ? this.api.getCurrent() : of(null);
  //       }),
  //       map(u => {
  //         if (u && !u.setting) {
  //           u.setting = {};
  //         }
  //       return u;
  //     }));
  // }

  getCurrentUser(): Observable<any> {
    return this.api.getCurrent();
  }

  getAll(user: any): Observable<User> {
    return this.api.getAll(user)
  }


  get(id: number): Observable<User> {
    return this.api.get(id);
  }
}
