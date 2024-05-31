import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as fromComponents from './components';
import {AuthRoutingModule} from "./auth-routing.module";
import {HttpClientModule} from "@angular/common/http";


@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, AuthRoutingModule, HttpClientModule,]
})
export class AuthModule {
}
