import { Injectable } from '@angular/core';
import { NbAuthService } from '@nebular/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { UsersService } from '../core/backend/services/users.service';
import { UserStore } from '../core/stores/user.store';

@Injectable()
export class AuthGuard implements CanActivate {
  user: any;

  constructor(
     private authService: NbAuthService,
     private router: Router,
     private userService: UsersService,
     private userStore: UserStore
    ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<any> | Promise<any> | any {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (!authenticated) {
             this.router.navigate(['auth/login']);

          }else{
            this.userService.getCurrentUser()
              .subscribe(result => { 
                result.is_patient? this.router.navigate(['/patient']): this.router.navigate(['/doctor']);
              })

          }
        }),
      );

  }
}