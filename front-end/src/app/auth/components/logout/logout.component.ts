import { Component, Inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { 
  NB_AUTH_OPTIONS, 
  NbAuthService, 
  NbAuthResult,
  NbTokenService 
  } from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
})
export class LogoutComponent implements OnInit {

  //spinnerText: string; 
  redirectDelay: number = this.getConfigValue('forms.logout.redirectDelay');
  strategy: string = this.getConfigValue('forms.logout.strategy');

  constructor(protected service: NbAuthService,
              @Inject(NB_AUTH_OPTIONS) protected options = {},
              protected router: Router,
              protected tokenService: NbTokenService) { }

  ngOnInit(): void {
    this.logout(this.strategy);
  }

  /*
   @method : logout.
  */
  logout(strategy: string): void {
    
    localStorage.clear();
    this.tokenService.clear();
    this.service.logout(strategy)
      .subscribe((result: NbAuthResult) => {

      const redirect = result.getRedirect();
      if (redirect) {
        setTimeout(() => {
          return this.router.navigate(['/home']);
        }, this.redirectDelay);
      }
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }
}
