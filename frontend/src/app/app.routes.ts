import {Routes} from '@angular/router';
import {ErrorPageComponent} from "@core/components/error-page/error-page.component";
import {MapComponent} from "@core/components/map/map.component";

export const routes: Routes = [
  {path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'error-page', component: ErrorPageComponent},
  { path: 'map', component: MapComponent},
  // {
  //   path: '', component: ToolbarComponent, children: [
  //     {path: '', component: DashboardComponent},
  //   ]
  // }
];
