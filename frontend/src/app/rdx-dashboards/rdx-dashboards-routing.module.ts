import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from "@angular/common";
import {DashboardComponent, DashboardDetailsComponent, DashboardFormComponent, DashboardListComponent} from "@rdx-dashboards/components";


const routes: Routes = [

  {path: '', component: DashboardComponent, pathMatch: 'full'},
  {path: 'list', component: DashboardListComponent, pathMatch: 'full'},
  {path: 'form', component: DashboardFormComponent, pathMatch: 'full'},
  {path: 'form/:id', component: DashboardFormComponent, pathMatch: 'full'},
  {path: 'details/', component: DashboardDetailsComponent},
  {path: 'details/:id', component: DashboardDetailsComponent},

];

@NgModule({
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RdxDashboardsRoutingModule {
}
