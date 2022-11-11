import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import {
  NB_AUTH_OPTIONS,
  NbAuthSocialLink,
  NbAuthService,
  NbAuthResult,
} from '@nebular/auth';
import { getDeepFromObject } from '../../helpers';
import { NbThemeService } from '@nebular/theme';
import { EMAIL_PATTERN } from '../constants'


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegisterComponent implements OnInit {

  minLength           : number = 8 //this.getConfigValue('forms.validation.password.minLength');
  maxLength           : number = 50 //this.getConfigValue('forms.validation.password.maxLength');
  isOrgNameRequired   : boolean = this.getConfigValue('forms.validation.orgName.required');
  isGivenNameRequired : boolean = this.getConfigValue('forms.validation.givenName.required');
  isFamilyNameRequired: boolean = this.getConfigValue('forms.validation.familyName.required');
  isEmailRequired     : boolean = this.getConfigValue('forms.validation.email.required');
  isPasswordRequired  : boolean = this.getConfigValue('forms.validation.password.required');
  redirectDelay       : number = this.getConfigValue('forms.register.redirectDelay');
  showMessages        : any = this.getConfigValue('forms.register.showMessages');
  strategy            : string = this.getConfigValue('forms.register.strategy');
  socialLinks         : NbAuthSocialLink[] = this.getConfigValue('forms.login.socialLinks');

  submitted          = false;
  errors             : string[] = [];
  messages           : string[] = [];  
  registrationForm!: FormGroup;
  loading!: boolean;
  user               : any = {};
  disable: boolean = false
  
  constructor(
    protected service                          : NbAuthService,
    @Inject(NB_AUTH_OPTIONS) protected options = {},
    protected cd                               : ChangeDetectorRef,
    protected router                           : Router,
  ) { }

  get email() { return this.registrationForm.get('email'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  ngOnInit(): void {

    this.registrationForm = new FormGroup({
      email                   : new FormControl(null,{validators:[Validators.required, Validators.pattern(EMAIL_PATTERN)]}),
      password                : new FormControl(null, {validators:[Validators.required, Validators.minLength(8), Validators.maxLength(50)]}),
      confirmPassword         : new FormControl(null,{validators:[Validators.required, Validators.minLength(8), Validators.maxLength(50)]}),
    })
  }

    /*
    @method : keydown function. 
  */
    keyDownFunction(event: any){
      if(event.keyCode == 13){
        this.register();
      }
    }//end 

    compare(): void{
      if(this.registrationForm.value.password !== this.registrationForm.value.confirmPassword){
        this.disable = true
      }else{
        this.disable = false
      }
    }

  register(): void {

     this.user = {
      username: this.registrationForm.value.email,
      password: this.registrationForm.value.password,
      confirm_password: this.registrationForm.value.confirmPassword
    }

    this.service.register(this.strategy, this.user)
    .subscribe((result: NbAuthResult) => {
      
      this.submitted = false;

      if (result.isSuccess()) {
        // this.spinner.hide();
        this.messages = result.getMessages();
        
      } else {
        // this.spinner.hide();
        this.errors = result.getErrors();
      }

      this.registrationForm.reset();

      return this.router.navigate(['/auth/login']);

      // this.cd.detectChanges();
    }, error => {
      // console.log(error);
    });
  }

  getConfigValue(key: string): any {
    return getDeepFromObject(this.options, key, null);
  }

}
