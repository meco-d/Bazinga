import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CommonModule} from '@angular/common';
import {LoginComponent} from "./components/login/login.component";

const routes: Routes = [
  {path: '', component: LoginComponent, pathMatch: 'full'}
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule {
}
