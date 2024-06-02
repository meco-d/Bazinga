import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from '@rdx-dashboards/components';
import {RdxDashboardsRoutingModule} from "./rdx-dashboards-routing.module";
import {PrimeTemplate} from "primeng/api";
import {TableModule} from "primeng/table";
import {MenubarModule} from "primeng/menubar";
import {ToolbarModule} from "primeng/toolbar";
import {CardModule} from "primeng/card";



@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule, RdxDashboardsRoutingModule, PrimeTemplate, TableModule,  MenubarModule, ToolbarModule, CardModule],
  exports: [],
})
export class RdxDashboardsModule { }
