import { Component, OnDestroy } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { PatientMenu } from './patient-menu';
import { NbMenuItem } from '@nebular/theme';


@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnDestroy {

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
