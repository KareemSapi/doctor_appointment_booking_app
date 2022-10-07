import { NgModule } from '@angular/core';
import { ExtraOptions, RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

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
      loadChildren: () => import('./doctor/doctor.module')
        .then(module => module.DoctorModule)
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
