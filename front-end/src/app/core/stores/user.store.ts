import { Injectable } from '@angular/core';
import { User } from '../interfaces/users';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
    private user!: User;

    getUser(): User {
        return this.user;
    }

    setUser(paramUser: User) {
        this.user = paramUser;
    }

}