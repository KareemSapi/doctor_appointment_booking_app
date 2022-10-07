import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  NbThemeModule, 
  NbLayoutModule, 
  NbContextMenuModule, 
  NbActionsModule, 
  NbMenuModule
} from '@nebular/theme';

import { 
  HeaderComponent,
  FooterComponent
 } from './components';

import { LayoutComponent } from './layouts';


const NB_MODULES = [
  NbLayoutModule,
  NbThemeModule.forRoot({name: 'default'}),
  NbActionsModule,
  NbContextMenuModule,
  NbMenuModule.forRoot()
];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LayoutComponent
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
