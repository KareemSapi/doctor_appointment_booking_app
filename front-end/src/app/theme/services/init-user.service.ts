import { Observable } from 'rxjs';
import { User, UserData } from '../../core/interfaces/users';
import { tap } from 'rxjs/operators';
import { UserStore } from '../../core/stores/user.store';
import { Injectable } from '@angular/core';
import { NbThemeService } from '@nebular/theme';

@Injectable()
export class InitUserService {
    usersService!: UserData;
    
    constructor(
        protected userStore: UserStore,
        //protected usersService: UserData,
        // protected profileServie : ProfileData,
        protected themeService: NbThemeService) { }

    initCurrentUser(): Observable<User> {
      return this.usersService.getCurrentUser()
            .pipe(tap((user: User) => {
                if (user) {
                    this.userStore.setUser(user);
                }
            }));
    }//end initCurrentUser


    // initCurrentProfile(): Observable<Profile> {
    //   return this.profileServie.getCurrentProfile()
    //         .pipe(tap((profile: Profile) => {
    //             if (profile) {
    //                 if (profile.settings && profile.settings.themeName) {
    //                   this.themeService.changeTheme(profile.settings.themeName);
    //                 }
    //             }
    //         }));
    // }//end initCurrentUser

}