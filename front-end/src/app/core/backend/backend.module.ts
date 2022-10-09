import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersApi } from './api/user.api';
import { DoctorsApi } from './api/doctor.api';
import { PatientsApi } from './api/patient.api';
import { AppointmentsApi } from './api/appointment.api';
import { UsersService } from './services/users.service';
import { PatientsService } from './services/patients.service';
import { DoctorsService } from './services/doctors.service';
import { AppointmentsService } from './services/appointments.service';
import { SearchService } from './services/search.service';

import { NbAuthModule } from '@nebular/auth';

const API = [
  UsersApi,
  PatientsApi,
  DoctorsApi,
  AppointmentsApi
];

const SERVICES = [
  UsersService,
  PatientsService,
  DoctorsService,
  AppointmentsService,
  SearchService
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NbAuthModule
  ],
  providers: [
    ...API,
    ...SERVICES
  ]
})
export class BackendModule { }
