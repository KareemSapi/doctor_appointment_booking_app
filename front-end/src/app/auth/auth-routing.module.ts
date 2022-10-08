import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {
  AuthComponent,
  LoginComponent,
  RegisterComponent,
} from './components'


const routes: Routes = [{
  path: '',
  component: AuthComponent,
  children: [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    
    {
      path: 'login',
      component: LoginComponent,
    },
    {
      path: 'register',
      component: RegisterComponent,
    },
    // {
    //   path: 'patient-registration',
    //   component: PatientRegistrationComponent,
    // },
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }

//routed components.
export const routedComponents = [
  LoginComponent,
  AuthComponent,
  RegisterComponent,
  // PatientRegistrationComponent
];
