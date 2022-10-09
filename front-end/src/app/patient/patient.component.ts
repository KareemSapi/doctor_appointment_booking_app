import { Component, OnDestroy, OnInit } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { PatientMenu } from './patient-menu';
import { NbMenuItem } from '@nebular/theme';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnDestroy, OnInit {

  menu!: NbMenuItem[];
  alive: boolean = true;

  constructor(
    private patientMenu: PatientMenu,
    private tokenService: NbTokenService,) { 

      this.initMenu();  
 
      this.tokenService.tokenChange()
        .pipe(takeWhile(() => this.alive))
        .subscribe(() => {
          this.initMenu();
        });
    }

    ngOnInit(): void {
        
    }

    initMenu(){

      this.patientMenu.getMenu()
      .pipe(takeWhile(() => this.alive))
      .subscribe((menu: NbMenuItem[]) => {
        this.menu = menu;

      });
    }

  ngOnDestroy(): void {
      this.alive = false
  }

}
