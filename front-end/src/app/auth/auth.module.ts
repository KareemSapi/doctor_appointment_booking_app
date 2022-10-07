import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';



@NgModule({
  declarations: [
   routedComponents
  ],
  imports: [
    CommonModule,
    AuthRoutingModule
  ],
  exports: [
   routedComponents
  ]
})
export class AuthModule { }
