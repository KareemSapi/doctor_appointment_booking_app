import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeModule } from './theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PatientRegistrationComponent } from './auth/components';

import { NbAuthModule } from '@nebular/auth';

import {
  NbThemeModule, 
  NbActionsModule, 
  NbButtonModule,
  NbSelectModule,
  NbInputModule,
  NbCardModule
} from '@nebular/theme';

const NB_MODULES = [
  NbThemeModule.forRoot({name: 'default'}),
  NbActionsModule,
  NbAuthModule.forRoot(),
  NbButtonModule,
  NbSelectModule,
  NbInputModule,
  NbCardModule
];

@NgModule({
  declarations: [
    AppComponent,
    PatientRegistrationComponent
  ],
  imports: [
    BrowserModule,
    ThemeModule,
    AppRoutingModule,
    ...NB_MODULES,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
