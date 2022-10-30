import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NB_AUTH_OPTIONS,
  NbAuthSocialLink,
  NbAuthService,
  NbAuthResult,
} from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { NbThemeService } from '@nebular/theme';
import { InitUserService } from '../../../theme/services/init-user.service';
// import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent implements OnInit {

  // spinnerText: string;
  minLength         : number = this.getConfigValue('forms.validation.password.minLength');
  maxLength         : number = this.getConfigValue('forms.validation.password.maxLength');
  redirectDelay     : number = this.getConfigValue('forms.login.redirectDelay');
  showMessages      : any = this.getConfigValue('forms.login.showMessages');
  strategy          : string = this.getConfigValue('forms.login.strategy');
  socialLinks       : NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');
  rememberMe        = this.getConfigValue('forms.login.rememberMe');
  isEmailRequired   : boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired: boolean = this.getConfigValue('forms.validation.password.required');

  errors   : string[] = [];
  messages : string[] = [];
  user     : any = {};
  submitted: boolean = false;
  loginForm!: FormGroup;
  alive    : boolean = true;

  get email() { return this.loginForm.get('email'); }
  get password() { return this.loginForm.get('password'); }

  constructor(
    protected service                          : NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd                               : ChangeDetectorRef,
    protected themeService                     : NbThemeService,
    private fb                                 : FormBuilder,
    protected router                           : Router,
    protected initUserService                  : InitUserService,
    // private spinner                            : NgxSpinnerService
    ) { }

  ngOnInit(): void {
    // const emailValidators = [
    //   Validators.pattern(EMAIL_PATTERN),
    // ];
    // this.isEmailRequired && emailValidators.push(Validators.required);

    const passwordValidators = [
      Validators.minLength(this.minLength),
      Validators.maxLength(this.maxLength),
    ];
    this.isPasswordRequired && passwordValidators.push(Validators.required);

    this.loginForm = this.fb.group({
      email     : this.fb.control(''),
      password  : this.fb.control('', [...passwordValidators]),
      rememberMe: this.fb.control(''),
    });
  }

  /*
    @method : keydown function. 
  */
  keyDownFunction(event: any){
    if(event.keyCode == 13){
      this.login();
    }
  }//end 

  /*
    @method : Login Method. 
  */
  login(): void {

    // this.spinnerText = "Checking Credentials...";
    //this.spinner.show();
    this.user      = {
      username: this.loginForm.value.email,
      password: this.loginForm.value.password
    };
    this.errors    = [];
    this.messages  = [];
    this.submitted = true;

    this.service.authenticate(this.strategy, this.user)
    .subscribe((result: NbAuthResult) => { //console.log(result)
      this.submitted = false;
      //this.spinner.hide();
      
      if (result.isSuccess()) {
        this.messages = result.getMessages();

        let token = result.getToken().getPayload()
        //console.log(token)

        setTimeout(() => {
          return token.is_patient? this.router.navigate(['/patient']): this.router.navigate(['/doctor']);
        }, this.redirectDelay);
        
      } else {
        this.errors = result.getErrors();
      }
      
      // const redirect = result.getRedirect();
      // if (redirect) {
      //   setTimeout(() => {
      //     return this.router.navigate(['/home']);
      //   }, this.redirectDelay);
      // }
      this.cd.detectChanges();
    });

  }//end login.

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }


}
