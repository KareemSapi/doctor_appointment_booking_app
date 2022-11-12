import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthToken, decodeJwtPayload } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;
  token: any;
  payload: any;

  constructor( 
    private router: Router,
    private authService: NbAuthService,
    ) { }

  ngOnInit(): void {

    this.authService.isAuthenticated()
      .subscribe((authenticated) => {
        if(authenticated){
          this.authService.getToken()
            .subscribe((result: NbAuthToken) => {
              this.token = result.getValue()
              this.payload = decodeJwtPayload(this.token)

              return this.payload.is_patient? this.router.navigate(['/patient']): this.router.navigate(['/doctor']);
            })
        }
      })

 }

}
