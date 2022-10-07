import { NbMenuItem } from '@nebular/theme';
 import { Observable, of } from 'rxjs';
 import { Injectable } from '@angular/core';
 //import { ROLES } from '../@auth/roles';
 import { NbRoleProvider } from '@nebular/security';
 import { map } from 'rxjs/operators';
 
 @Injectable()
 export class DoctorMenu {
   constructor(private roleProvider: NbRoleProvider) {}
 
   getMenu(): Observable<NbMenuItem[]> {
     const homeMenu: NbMenuItem[] = [
       {
         title: 'Home',
         icon: 'home-outline',
         link: '/doctor/dashboard',
         home: true,
         children: undefined,
       }
     ];
 
     /* USER MENU */
     const menu: NbMenuItem[] = [
       
       {
         title: 'Dashboard',
         icon: 'grid-outline',
         link: '/doctor/dashboard'
       },
      
       {
         title: 'Appointments',
         icon: 'list-outline',
         link: '/doctor/appointments/',
       },

       {
        title: 'Profile',
        icon: 'person-outline',
        link: '/doctor/profile',
        // children: [
        //   {
        //     title: 'my-profile',
        //     icon: 'person-outline',
        //     link: '/pm/edit-profile'
        //   },
        //   {
        //     title: 'documents',
        //     icon: 'folder-outline',
        //     link: '/pm/profile/documents'
        //   },
        // ]
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