import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../theme/theme.module';

import { DoctorRoutingModule, routedComponents } from './doctor-routing.module';
import { DoctorMenu } from './doctor-menu';

import {
  NbThemeModule, 
  NbLayoutModule, 
  NbContextMenuModule, 
  NbActionsModule, 
  NbMenuModule,
  NbSidebarModule,
} from '@nebular/theme';

const NB_MODULES = [
  NbLayoutModule,
  NbThemeModule.forRoot({name: 'default'}),
  NbActionsModule,
  NbContextMenuModule,
  NbMenuModule.forRoot(),
  NbSidebarModule
];



@NgModule({
  declarations: [...routedComponents],
  imports: [
    CommonModule,
    DoctorRoutingModule,
    ThemeModule,
    ...NB_MODULES
  ],
  exports: [
    ...routedComponents
   ],
   providers: [
    DoctorMenu
   ]
})
export class DoctorModule { }
