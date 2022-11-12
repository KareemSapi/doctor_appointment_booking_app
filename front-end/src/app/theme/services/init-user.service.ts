import { Observable } from 'rxjs';
import { User } from '../../core/interfaces/users';
import { tap } from 'rxjs/operators';
import { UserStore } from '../../core/stores/user.store';
import { Injectable } from '@angular/core';
import { NbThemeService } from '@nebular/theme';
import { UsersService } from 'src/app/core/backend/services/users.service';

@Injectable()
export class InitUserService {
   
    constructor(
        protected userStore: UserStore,
        protected usersService: UsersService,
        protected themeService: NbThemeService) { }

    initCurrentUser(): Observable<User> {
      return this.usersService.getCurrentUser()
            .pipe(tap((user: User) => { 
                if (user) { 
                    this.userStore.value = user;
                }
            }));
    }//end initCurrentUser

}