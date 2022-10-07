import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DoctorComponent } from './doctor.component';
import { 
  DashboardComponent,
  AppointmentComponent,
  ProfileComponent
 } from './components';

const routes: Routes = [{
  path: '',
  component: DoctorComponent,
  children: [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },

    {
      path: 'dashboard',
      component: DashboardComponent
    },

    {
      path: 'appointments',
      component: AppointmentComponent
    },

    {
      path: 'profile',
      component: ProfileComponent
    },

    // {
    //   path: 'dashboard',
    //   component: DashboardComponent
    // },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DoctorRoutingModule { }

export const routedComponents = [
  DoctorComponent,
  DashboardComponent,
  AppointmentComponent,
  ProfileComponent
];
