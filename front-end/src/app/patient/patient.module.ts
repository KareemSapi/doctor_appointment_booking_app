import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../theme/theme.module';

import { PatientMenu } from './patient-menu';

import { PatientRoutingModule, routedComponents } from './patient-routing.module';
import { NbAuthModule } from '@nebular/auth';
import { NbEvaIconsModule } from '@nebular/eva-icons';

import {
  NbThemeModule, 
  NbLayoutModule, 
  NbContextMenuModule, 
  NbActionsModule, 
  NbMenuModule,
  NbSidebarModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
} from '@nebular/theme';

const NB_MODULES = [
  NbLayoutModule,
  NbThemeModule.forRoot({name: 'default'}),
  NbActionsModule,
  NbContextMenuModule,
  NbMenuModule.forRoot(),
  NbSidebarModule.forRoot(),
  NbAuthModule.forRoot(),
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule
];



@NgModule({
  declarations: [routedComponents],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ...NB_MODULES,
    ThemeModule
  ],
  // exports: [
  //   routedComponents
  //  ],
  providers: [
    PatientMenu
  ]
})
export class PatientModule { }
