import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DoctorRoutingModule, routedComponents } from './doctor-routing.module';


@NgModule({
  declarations: [routedComponents],
  imports: [
    CommonModule,
    DoctorRoutingModule
  ],
  exports: [
    routedComponents
   ]
})
export class DoctorModule { }
