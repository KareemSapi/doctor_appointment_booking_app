import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ThemeModule } from './theme/theme.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { CoreModule } from './core/core.module';
import { AuthModule } from './auth/auth.module';

import { AppComponent } from './app.component';
//import { PatientRegistrationComponent } from './patient-registration/patient-registration.component';

import { NbAuthModule } from '@nebular/auth';

import {
  NbLayoutModule,
  NbThemeModule, 
  NbActionsModule, 
  NbButtonModule,
  NbSelectModule,
  NbInputModule,
  NbCardModule,
  NbContextMenuModule, 
  NbIconModule,
  NbMenuModule,
  NbSidebarModule,
} from '@nebular/theme';

const NB_MODULES = [
  NbThemeModule.forRoot({name: 'default'}),
  NbActionsModule,
  NbAuthModule.forRoot(),
  NbButtonModule,
  NbSelectModule,
  NbInputModule,
  NbCardModule,
  NbLayoutModule,
  NbIconModule,
  NbContextMenuModule,
  NbMenuModule,
  NbSidebarModule
];

@NgModule({
  declarations: [
    AppComponent,
    //PatientRegistrationComponent
  ],
  imports: [
    BrowserModule,
    ThemeModule,
    AppRoutingModule,
    ...NB_MODULES,
    ReactiveFormsModule,
    FormsModule,
    AuthModule.forRoot(),
    CoreModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
