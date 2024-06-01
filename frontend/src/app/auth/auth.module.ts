import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import * as fromComponents from './components';
import {AuthRoutingModule} from "./auth-routing.module";
import {HttpClientModule} from "@angular/common/http";
import {CardModule} from "primeng/card";
import {Button} from "primeng/button";


@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, AuthRoutingModule, HttpClientModule, CardModule, Button,]
})
export class AuthModule {
}
