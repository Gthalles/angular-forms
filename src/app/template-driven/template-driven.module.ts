import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateDrivenComponent } from './template-driven.component';
import { FormDebugComponent } from '../form-debug/form-debug.component';
import { InputControlErrorsComponent } from '../input-control-errors/input-control-errors.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    TemplateDrivenComponent,
    FormDebugComponent,
    InputControlErrorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ]
})
export class TemplateDrivenModule { }
