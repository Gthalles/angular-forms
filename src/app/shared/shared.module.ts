import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { InputControlErrorsComponent } from './input-control-errors/input-control-errors.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { InputFieldComponent } from './input-field/input-field.component';



@NgModule({
  declarations: [
    InputControlErrorsComponent,
    FormDebugComponent,
    ErrorMessageComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    InputControlErrorsComponent,
    FormDebugComponent,
    ErrorMessageComponent,
    InputFieldComponent
  ]
})
export class SharedModule { }
