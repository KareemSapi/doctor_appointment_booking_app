import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [{
  path: '',
  component: AppComponent,
  children: [
    {
      path: 'auth',
      loadChildren: () => import('./auth/auth.module')
        .then(module => module.AuthModule)
    },

    {
      path: 'home',
      loadChildren: () => import('./home/home.module')
        .then(module => module.HomeModule)
    },

    {
      path: 'doctor',
      canActivate: [AuthGuard],
      loadChildren: () => import('./doctor/doctor.module')
        .then(module => module.DoctorModule)
    },

    {
      path: 'patient',
      canActivate: [AuthGuard],
      loadChildren: () => import('./patient/patient.module')
        .then(module => module.PatientModule)
    },

    {
      path: 'patient-registration',
      component: PatientRegistrationComponent
    },

    { path: '', redirectTo: 'home', pathMatch: 'full' }
  ]
}];

const config: ExtraOptions = {
  useHash: true,
};

@NgModule({
  imports: [RouterModule.forRoot(routes, config)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
