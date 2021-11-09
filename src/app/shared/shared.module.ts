import { InputControlErrorsComponent } from './input-control-errors/input-control-errors.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorMessageComponent } from './error-message/error-message.component';



@NgModule({
  declarations: [
    FormDebugComponent,
    InputControlErrorsComponent,
    ErrorMessageComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormDebugComponent,
    InputControlErrorsComponent,
    ErrorMessageComponent
  ]
})
export class SharedModule { }
