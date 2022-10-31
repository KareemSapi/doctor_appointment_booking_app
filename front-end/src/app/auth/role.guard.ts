import { Injectable } from '@angular/core';
import { NbAuthService, NbAuthToken, decodeJwtPayload } from '@nebular/auth';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable()
export class RoleGuard implements CanActivate {

    token: any;
    payload: any;

  constructor(private authService: NbAuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> | Promise<boolean> | boolean {
    return this.authService.isAuthenticated()
      .pipe(
        tap(authenticated => {
          if (authenticated) {
            this.authService.getToken()
            .subscribe((result: NbAuthToken) => {
              this.token = result.getValue()
              this.payload = decodeJwtPayload(this.token)
              //console.log(this.payload)
              return this.payload.is_patient? this.router.navigate(['/patient']): this.router.navigate(['/doctor']);
            })
          }
        }),
      );

  }
}