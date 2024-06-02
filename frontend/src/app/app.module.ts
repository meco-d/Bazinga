import { ApplicationRef, DoBootstrap,NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app.config';
import { CoreModule } from '@core/core.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { CardModule } from 'primeng/card';
import {AppComponent} from "./app.component";

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    CoreModule,
    LeafletModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    CardModule,
  ],
  providers: [HttpClient, DatePipe, HttpClientModule],
  exports: [],
})
export class AppModule implements DoBootstrap {
  constructor(private appRef: ApplicationRef) {
  }

  ngDoBootstrap() {
    // Manually bootstrap the root component
    this.appRef.bootstrap(AppComponent);
  }
}
