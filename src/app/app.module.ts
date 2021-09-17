import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { TemplateDrivenModule } from './template-driven/template-driven.module';
import { HomeComponent } from './home/home.component';
import { DataDrivenComponent } from './data-driven/data-driven.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DataDrivenComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    TemplateDrivenModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
