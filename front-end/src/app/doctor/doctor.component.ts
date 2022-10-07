import { Component, OnDestroy } from '@angular/core';
import { NbTokenService } from '@nebular/auth';
import { takeWhile } from 'rxjs/operators';
import { DoctorMenu } from './doctor-menu';
import { NbMenuItem } from '@nebular/theme';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-doctor',
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss']
})
export class DoctorComponent implements OnDestroy {

  menu!: NbMenuItem[];
  alive: boolean = true;

  constructor(
    private doctorMenu: DoctorMenu,
    private tokenService: NbTokenService,) { 

      this.initMenu();  
 
      this.tokenService.tokenChange()
        .pipe(takeWhile(() => this.alive))
        .subscribe(() => {
          this.initMenu();
        });
    }

    initMenu(){

      this.doctorMenu.getMenu()
      .pipe(takeWhile(() => this.alive))
      .subscribe((menu: NbMenuItem[]) => {
        this.menu = menu;

      });
    }

  ngOnDestroy(): void {
      this.alive = false
  }

}
