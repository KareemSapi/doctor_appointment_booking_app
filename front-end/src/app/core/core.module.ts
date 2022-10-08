import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendModule } from './backend/backend.module';
import { NbAuthModule } from '@nebular/auth';
import { UserStore } from './stores/user.store';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BackendModule,
    NbAuthModule
  ],
  providers: [
    UserStore,
    BackendModule
  ]
})
export class CoreModule { }
