import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../theme/theme.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

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
  NbInputModule
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
  NbInputModule
];



@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ThemeModule,
    ...NB_MODULES,
    ReactiveFormsModule,
    FormsModule
  ],
  // exports: [
  //   ...routedComponents
  //  ],
   providers: [
    DoctorMenu
   ]
})
export class DoctorModule { }
