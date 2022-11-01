import { Injectable } from '@angular/core';
import { User } from '../interfaces/users';
import { Observable, of } from 'rxjs';
import { NbAuthService, NbAuthToken, decodeJwtPayload } from '@nebular/auth';

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
        //console.log(this.user)
    }
 
    public get value() : User {
        return this.user
    }

    // setUser(value: User){
    //     this.user = value;
    //     console.log(this.user)
    // }

    // getUser(): User{
    //     console.log(this.user)
    //     return this.user;
    // }
    

}