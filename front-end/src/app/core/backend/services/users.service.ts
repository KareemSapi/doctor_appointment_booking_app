import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UsersApi } from '../api/user.api';
import { UserData, User } from '../../interfaces/users';
import { NbAuthService } from '@nebular/auth';


@Injectable({
  providedIn: 'root'
})
export class UsersService extends UserData {

  constructor(
    private api: UsersApi, 
    private authService: NbAuthService) {
    super();
  }

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
