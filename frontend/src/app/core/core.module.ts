import {NgModule, Optional, SkipSelf} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from '@core/components';
import {HTTP_INTERCEPTORS} from "@angular/common/http";
import {RadexBaseDialogComponent} from "@core/components";




@NgModule({
  declarations: [...fromComponents.components],
  imports: [CommonModule],
  exports: [...fromComponents.components],
  providers: [
    // {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    // {provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true}
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule) {
      throw new Error('Core Module is already loaded. Import it in the AppModule only');
    }
  }
}
