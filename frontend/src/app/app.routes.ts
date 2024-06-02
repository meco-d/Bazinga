import {Routes} from '@angular/router';
import {DashboardComponent} from "@rdx-dashboards/components";
import {ErrorPageComponent} from "@core/components/error-page/error-page.component";
import {ToolbarComponent} from "@core/components/toolbar/toolbar.component";

export const routes: Routes = [
  {path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'error-page', component: ErrorPageComponent},
  {path: '', loadChildren: () => import('./rdx-dashboards/rdx-dashboards.module').then(m => m.RdxDashboardsModule)}

  // {
  //   path: '', component: ToolbarComponent, children: [
  //     {path: '', component: DashboardComponent},
  //   ]
  // }
];
