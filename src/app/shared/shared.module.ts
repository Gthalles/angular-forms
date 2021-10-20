import { InputControlErrorsComponent } from './input-control-errors/input-control-errors.component';
import { FormDebugComponent } from './form-debug/form-debug.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropdownService } from './services/dropdown.service';



@NgModule({
  declarations: [
    FormDebugComponent,
    InputControlErrorsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    FormDebugComponent,
    InputControlErrorsComponent
  ]
})
export class SharedModule { }
