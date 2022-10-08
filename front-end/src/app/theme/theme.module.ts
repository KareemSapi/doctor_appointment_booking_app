import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import { InitUserService } from './services/init-user.service';

import {
  NbThemeModule, 
  NbLayoutModule,
  NbSearchModule, 
  NbContextMenuModule, 
  NbActionsModule, 
  NbMenuModule,
  NbSidebarModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
} from '@nebular/theme';

import { 
  HeaderComponent,
  FooterComponent,
  PatientHeaderComponent
 } from './components';

import { 
  LayoutComponent,
  DoctorLayoutComponent,
  PatientLayoutComponent
 } from './layouts';


const NB_MODULES = [
  NbLayoutModule,
  NbThemeModule.forRoot({name: 'default'}),
  NbActionsModule,
  NbContextMenuModule,
  NbMenuModule.forRoot(),
  NbSidebarModule,
  NbSearchModule,
  NbButtonModule,
  NbSelectModule,
  NbIconModule,
  NbEvaIconsModule
];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LayoutComponent,
  DoctorLayoutComponent,
  PatientLayoutComponent,
  PatientHeaderComponent
]


@NgModule({
  declarations: [ ...COMPONENTS],
  imports: [
    CommonModule,
    ...NB_MODULES
  ],
  exports: [...COMPONENTS],
  providers: [InitUserService]
})
export class ThemeModule { }
