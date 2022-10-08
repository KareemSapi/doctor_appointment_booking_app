import { Component, OnInit } from '@angular/core';
import { NbAuthService, NbAuthJWTToken } from '@nebular/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  user: any;

  constructor( 
    private authService: NbAuthService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.user = null;
    this.authService.getToken()
    //@ts-ignore
    .subscribe((token: NbAuthJWTToken) => {
      if(token.isValid()){
        this.user = token.getPayload();
        console.log(this.user)
        
        return this.user.is_patient? this.router.navigate(['/patient']): this.router.navigate(['/doctor']);
      }
  })
 }

}
