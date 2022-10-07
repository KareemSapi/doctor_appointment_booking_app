import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbThemeModule, 
  NbLayoutModule, 
  NbContextMenuModule, 
  NbActionsModule, 
  NbMenuModule,
  NbSidebarModule,
} from '@nebular/theme';

import { 
  HeaderComponent,
  FooterComponent
 } from './components';

import { 
  LayoutComponent,
  DoctorLayoutComponent
 } from './layouts';


const NB_MODULES = [
  NbLayoutModule,
  NbThemeModule.forRoot({name: 'default'}),
  NbActionsModule,
  NbContextMenuModule,
  NbMenuModule.forRoot(),
  NbSidebarModule
];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LayoutComponent,
  DoctorLayoutComponent
]


@NgModule({
  declarations: [ ...COMPONENTS ],
  imports: [
    CommonModule,
    ...NB_MODULES
  ],
  exports: [...COMPONENTS]
})
export class ThemeModule { }
