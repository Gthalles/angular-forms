import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { TemplateDrivenModule } from './template-driven/template-driven.module';
import { DataDrivenModule } from './data-driven/data-driven.module'
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TemplateDrivenModule,
    DataDrivenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
