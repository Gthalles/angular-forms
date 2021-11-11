import { InputControlErrorsComponent } from './input-control-errors/input-control-errors.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { InputFieldComponent } from './input-field/input-field.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    FormDebugComponent,
    InputControlErrorsComponent,
    ErrorMessageComponent,
    InputFieldComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    FormDebugComponent,
    InputControlErrorsComponent,
    ErrorMessageComponent,
    InputFieldComponent
  ]
})
export class SharedModule { }
