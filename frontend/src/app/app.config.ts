import {ApplicationConfig, NgModule} from '@angular/core';
import {provideRouter, RouterModule} from '@angular/router';

import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideClientHydration()]
};


@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false, useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
