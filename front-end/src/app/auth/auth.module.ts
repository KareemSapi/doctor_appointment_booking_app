import { NgModule, ModuleWithProviders } from '@angular/core';
import { HttpRequest } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthRoutingModule, routedComponents } from './auth-routing.module';
import { CoreModule } from '../core/core.module';
import {
  NbAuthJWTInterceptor,
  NbAuthModule,
  NB_AUTH_TOKEN_INTERCEPTOR_FILTER,
  NbTokenLocalStorage,
} from '@nebular/auth';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AuthInterceptor } from './auth.interceptor';
//guards
import { AuthGuard } from './auth.guard';

import {
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule
} from '@nebular/theme'

import { AuthPipe } from './auth.pipe';
import { RoleProvider } from './role.provider';
import { NbRoleProvider, NbSecurityModule } from '@nebular/security';
import { authOptions } from './auth.settings';
import { authSettings } from './access.settings';
import { LogoutComponent } from './components/logout/logout.component';

const GUARDS = [
  AuthGuard, 
  // ModeratorGuard, 
  // AdminGuard
];

const NB_MODULES = [
  NbCardModule,
  NbInputModule,
  NbSelectModule,
  NbButtonModule,
  NbAuthModule.forRoot(authOptions),
]

const PIPES = [AuthPipe];

export function filterInterceptorRequest(req: HttpRequest<any>): boolean {
  return [
  '/auth/login', 
  '/auth/sign-up', 
  '/auth/request-pass', 
  '/auth/refresh-token', 
  '/auth/create-pass']
  .some(url => req.url.includes(url));
}

@NgModule({
  declarations: [
   ...routedComponents,
   ...PIPES,
   LogoutComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ...NB_MODULES,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    CoreModule
  ],
  exports: [
   ...routedComponents,
   ...PIPES
  ],
  providers: [
    //@ts-ignore
    NbSecurityModule.forRoot({
      accessControl: authSettings,
    }).providers,
    {
      provide: NbRoleProvider, useClass: RoleProvider,
    },
    {
      provide: NbTokenLocalStorage, useClass: NbTokenLocalStorage,
    },
  ],
})
export class AuthModule { 
  //@ts-ignore
  static forRoot(): ModuleWithProviders<AuthModule> {
    //@ts-ignore
    return <ModuleWithProviders>{
      ngModule: AuthModule,
      providers: [
        { provide: NB_AUTH_TOKEN_INTERCEPTOR_FILTER, useValue: filterInterceptorRequest },
        { provide: HTTP_INTERCEPTORS, useClass: NbAuthJWTInterceptor, multi: true },
        { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
        ...GUARDS],
    };
  }
}
