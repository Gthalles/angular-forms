import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TemplateDrivenComponent } from './template-driven.component';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    TemplateDrivenComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule,
    SharedModule
  ]
})
export class TemplateDrivenModule { }
