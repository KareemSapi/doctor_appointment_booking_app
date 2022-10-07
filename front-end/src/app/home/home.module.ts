import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeModule } from '../theme/theme.module';
import { HomeRoutingModule, routedComponents } from './home-routing.module';


@NgModule({
  declarations: [
    ...routedComponents
  ],
  imports: [
    CommonModule,
    ThemeModule,
    HomeRoutingModule
  ],
  exports: [
    ...routedComponents
  ]
})
export class HomeModule { }
