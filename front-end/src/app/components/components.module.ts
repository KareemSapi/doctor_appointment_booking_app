import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxValidationMessageComponent } from './validation-message/validation-message.component';



@NgModule({
  declarations: [
    NgxValidationMessageComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    NgxValidationMessageComponent
  ]
})
export class ComponentsModule { }
