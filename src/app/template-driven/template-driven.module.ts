import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateDrivenComponent } from './template-driven.component';
import { FormDebugComponent } from '../form-debug/form-debug.component';



@NgModule({
  declarations: [
    TemplateDrivenComponent,
    FormDebugComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ]
})
export class TemplateDrivenModule { }
