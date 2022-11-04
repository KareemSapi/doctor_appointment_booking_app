import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ThemeModule } from '../theme/theme.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ComponentsModule } from '../components/components.module';

import { DoctorRoutingModule, routedComponents } from './doctor-routing.module';
import { DoctorMenu } from './doctor-menu';

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
    DoctorRoutingModule,
    ThemeModule,
    ...NB_MODULES,
    ReactiveFormsModule,
    FormsModule,
    ComponentsModule
  ],
  // exports: [
  //   ...routedComponents
  //  ],
   providers: [
    DoctorMenu, DatePipe
   ]
})
export class DoctorModule { }
