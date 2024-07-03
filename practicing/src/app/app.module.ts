import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsernameGeneratorComponent } from './username-generator/username-generator.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { OnlineFormComponent } from './online-form/online-form.component';
import { IncrementButtonComponent } from './increment-button/increment-button.component';

@NgModule({
  declarations: [
    AppComponent,
    UsernameGeneratorComponent,
    OnlineFormComponent,
    IncrementButtonComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        FormsModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
