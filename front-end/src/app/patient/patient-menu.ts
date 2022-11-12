import { NbMenuItem } from '@nebular/theme';
 import { Observable, of } from 'rxjs';
 import { Injectable } from '@angular/core';
 
 @Injectable()
 export class PatientMenu {
 
   getMenu(): Observable<NbMenuItem[]> {
     const homeMenu: NbMenuItem[] = [
       {
         title: 'Dashboard',
         icon: 'home-outline',
         link: '/patient/dashboard',
         home: true,
         children: undefined,
       }
     ];
 
     /* USER MENU */
     const menu: NbMenuItem[] = [
       
       {
         title: 'Appointments',
         icon: 'list-outline',
         link: '/patient/appointments',
       },

       {
        title: 'Profile',
        icon: 'person-outline',
        link: '/patient/profile',
       },
       
       {
        title: 'Log out',
         icon: 'log-out-outline',
         link: '/auth/logout',
       }
       
     ];
 
     return of([...homeMenu, ...menu]);
   }
 }