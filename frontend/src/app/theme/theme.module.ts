import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NbLayoutModule
} from '@nebular/theme';

import { 
  HeaderComponent,
  FooterComponent
} from './components';

import { LayoutComponent } from './layouts';


const NB_MODULES = [
  NbLayoutModule
];

const COMPONENTS = [
  HeaderComponent,
  FooterComponent,
  LayoutComponent
];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, ...NB_MODULES],
  exports: [...COMPONENTS]
})
export class ThemeModule { }
