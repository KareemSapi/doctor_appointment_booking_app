import { Component, Input, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

   //vars
 isPostTopicRequired: boolean = true;
 isPostTitleRequired: boolean = true;
 isPostTextRequired : boolean = true;
 submitted          = false;
 //disabled           = false;
 errors             : string[] = [];
 messages           : string[] = [];  
 profileForm!: FormGroup;
 loading!: boolean;
 spinnerMsg         : string = "Processing...";
 data               : any;
 files              : any;
 profile            : any;

 constructor( 
  private router          : Router,
  private route           : ActivatedRoute,
  //private profileService  : ProfileDataService,
  ){
  const userId : any = this.route.snapshot.paramMap.get('id');
  //this.getProfile(userId)
  }

   //Form getters
   get firstName() { return this.profileForm.get('firstName'); }
   get middleName() { return this.profileForm.get('middleName'); }
   get surName() { return this.profileForm.get('surName'); }
   get date_of_birth() { return this.profileForm.get('date_of_birth'); }
   get gender() { return this.profileForm.get('gender'); }
  //  get country() { return this.profileForm.get('country'); }
   get bloodGroup() { return this.profileForm.get('bloodGroup'); }
   get Address() { return this.profileForm.get('Address'); }
   get phone() { return this.profileForm.get('phone'); }
   get medicalConditions() { return this.profileForm.get('medicalConditions');}
 

  ngOnInit(): void {

      //Form validators.
  const postTopicValidators = [];
  const postTitleValidators = [];
  const postTextValidators  = [];
  
  this.isPostTopicRequired && postTopicValidators.push(Validators.required);
  this.isPostTitleRequired && postTitleValidators.push(Validators.required);
  this.isPostTextRequired && postTextValidators.push(Validators.required);

  this.profileForm = new FormGroup({
    firstName                     : new FormControl(null,{validators:[Validators.required]}),
    middleName                    : new FormControl(null),
    surName                       : new FormControl(null,{validators:[Validators.required]}),
    date_of_birth                 : new FormControl(null,{validators:[Validators.required]}),
    gender                        : new FormControl(null,{validators:[Validators.required]}),
    bloodGroup                          : new FormControl(null,{validators:[Validators.required]}),
    Address                 : new FormControl(null,{validators:[Validators.required]}),
    medicalConditions              : new FormControl(null,{validators:[Validators.required]}),
    phone                         : new FormControl(null,{validators:[Validators.minLength(9)]}),
    
 });
  }

  // getProfile(id: any){
  //   this.profileService.get(id)
  //    .subscribe(res => {
  //      this.profile = res;
  //      console.log(this.profile)
  //      this.profileForm.setValue({
  //       firstName                     : this.profile.firstName,
  //       middleName                    : this.profile.middleName,
  //       surName                       : this.profile.surName,
  //       date_of_birth                 : this.profile.date_of_birth,
  //       gender                        : this.profile.gender,
  //       country                       : this.profile.country,
  //       city                          : this.profile.city,
  //       postalAddress                 : this.profile.postalAddress,
  //       physicalAddress               : this.profile.physicalAddress,
  //       phone                         : this.profile.phoneNumber,
  //      });
  //    });
  // }

update(){}


}
