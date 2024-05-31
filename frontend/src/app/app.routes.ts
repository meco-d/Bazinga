import {Routes} from '@angular/router';
import {DashboardComponent, NavigationComponent} from "@core/components";
import {ErrorPageComponent} from "@core/components/error-page/error-page.component";

export const routes: Routes = [
  {path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)},
  {path: 'error-page', component: ErrorPageComponent},
  {
    path: '', component: NavigationComponent, children: [
      {path: '', component: DashboardComponent},
    ]
  }
];
