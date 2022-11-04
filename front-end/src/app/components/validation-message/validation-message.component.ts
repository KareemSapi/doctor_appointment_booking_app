import { Component, Input, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
    selector: 'app-validation-message',
    styleUrls: ['./validation-message.component.scss'],
    template: `
             <p class="caption status-danger" style="color: red;"
                *ngIf="showMinLength"> Min {{ label }} length is {{ minLength }} symbols </p>
             <p class="caption status-danger" style="color: red;"
                *ngIf="showMaxLength"> Max {{ label }} length is {{ maxLength }} symbols </p>
             <p class="caption status-danger" style="color: red;" *ngIf="showPattern"> Incorrect {{ label }} </p>
             <p class="caption status-danger" style="color: red;" *ngIf="showRequired"> {{ label }} is required</p>
             <p class="caption status-danger" style="color: red;" *ngIf="showMin">Min value of {{ label }} is {{ min }}</p>
             <p class="caption status-danger" style="color: red;" *ngIf="showMax">Max value of {{ label }} is {{ max }}</p>
             <p class="caption status-danger" style="color: red;" *ngIf="showValidity"> {{ label }} is  not a valid file</p>
  `,
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => NgxValidationMessageComponent),
            multi: true,
        },
    ],
})
export class NgxValidationMessageComponent {
    @Input()
    label: string = '';

    @Input()
    showRequired?: boolean;

    @Input()
    min?: number;

    @Input()
    showMin?: boolean;

    @Input()
    max?: number;

    @Input()
    showMax?: boolean;

    @Input()
    minLength?: number;

    @Input()
    showMinLength?: boolean;

    @Input()
    maxLength?: number;

    @Input()
    showMaxLength?: boolean;

    @Input()
    showPattern?: boolean;
    
    @Input()
    showValidity?: boolean;
}

