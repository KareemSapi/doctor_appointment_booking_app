import { Injectable } from '@angular/core';
import { User } from '../interfaces/users';
import { NbAuthService } from '@nebular/auth';

@Injectable({
  providedIn: 'root',
})
export class UserStore {
    private user!: User;

    constructor(
        private authService: NbAuthService,
    ){}

    public set value(v : User) {
        this.user = v;
    }
 
    public get value() : User {
        return this.user
    }
    
}