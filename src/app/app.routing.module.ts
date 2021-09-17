import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { DataDrivenComponent } from "./data-driven/data-driven.component";

import { HomeComponent } from "./home/home.component";
import { NotFoundComponent } from "./not-found/not-found.component";
import { TemplateDrivenComponent } from "./template-driven/template-driven.component";

@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: 'template-driven',
                component: TemplateDrivenComponent
            },
            {
                path: 'data-driven',
                component: DataDrivenComponent
            },
            {
                path: 'home',
                component: HomeComponent
            },
            {
                path: '',
                redirectTo: 'home',
                pathMatch: 'full'
            },
            {
                path: 'not-found',
                component: NotFoundComponent
            },
            {
                path: '**',
                redirectTo: 'not-found', 
                pathMatch: 'prefix'
            }
        ])
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule { }