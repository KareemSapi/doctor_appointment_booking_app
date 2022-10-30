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
    private router: Router
    ) { }

  ngOnInit(): void {

 }

}
