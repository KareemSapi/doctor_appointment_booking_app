import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PatientRoutingModule, routedComponents } from './patient-routing.module';


@NgModule({
  declarations: [routedComponents],
  imports: [
    CommonModule,
    PatientRoutingModule
  ],
  exports: [
    routedComponents
   ]
})
export class PatientModule { }
