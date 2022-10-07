import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../theme/theme.module';
import { HomeRoutingModule, routedComponents } from './home-routing.module';

import {
  NbThemeModule, 
  NbLayoutModule, 
  NbContextMenuModule, 
  NbActionsModule, 
  NbMenuModule
} from '@nebular/theme';

const NB_MODULES = [
  NbLayoutModule,
  NbThemeModule.forRoot({name: 'default'}),
  NbActionsModule,
  NbContextMenuModule,
  NbMenuModule.forRoot()
];


@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    CommonModule,
    ThemeModule,
    HomeRoutingModule,
    ...NB_MODULES
  ],
  exports: [
    ...routedComponents
  ]
})
export class HomeModule { }
