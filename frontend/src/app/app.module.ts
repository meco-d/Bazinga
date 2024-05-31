import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {AppComponent} from "./app.component";
import {RouterModule} from "@angular/router";
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app.config";
import {CoreModule} from "@core/core.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";


@NgModule({
  imports: [CommonModule, AppRoutingModule, BrowserModule, BrowserAnimationsModule, CoreModule],
  providers: [HttpClient, DatePipe, HttpClientModule],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule {
}
