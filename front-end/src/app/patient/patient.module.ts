import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ThemeModule } from '../theme/theme.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

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
  NbInputModule,
  NbCardModule,
  NbListModule
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
  NbEvaIconsModule,
  NbInputModule,
  NbCardModule,
  NbListModule
];



@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    PatientRoutingModule,
    ...NB_MODULES,
    ThemeModule,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule
  ],
  // exports: [
  //   routedComponents
  //  ],
  providers: [
    PatientMenu,
    DatePipe
  ]
})
export class PatientModule { }
