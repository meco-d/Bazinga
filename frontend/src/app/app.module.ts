import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {HttpClient, HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app.config";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {BrowserModule} from "@angular/platform-browser";
import {CoreModule} from "@core/core.module";


@NgModule({
  imports: [CommonModule, AppRoutingModule, BrowserModule, BrowserAnimationsModule, CoreModule],
  providers: [HttpClient, DatePipe, HttpClientModule],
  exports: []
})
export class AppModule {
}
