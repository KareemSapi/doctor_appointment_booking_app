import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PatientComponent } from './patient.component';
import { 
  DashboardComponent,
  AppointmentComponent,
  ProfileComponent
 } from './components';

const routes: Routes = [{
  path: '',
  component: PatientComponent,
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
export class PatientRoutingModule { }

export const routedComponents = [
  PatientComponent,
  AppointmentComponent,
  DashboardComponent,
  ProfileComponent
];
