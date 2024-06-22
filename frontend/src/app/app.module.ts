import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';

import { HttpClientModule } from "@angular/common/http";
import { MapComponent } from './components/map/map.component';
import { StationPopupComponent } from './components/map/station-popup/station-popup.component';
import {CardModule} from "primeng/card";
import {FloatLabelModule} from "primeng/floatlabel";
import {InputTextModule} from "primeng/inputtext";
import {PasswordModule} from "primeng/password";
import {TagModule} from "primeng/tag";
import {NavbarComponent} from "./components/navbar/navbar.component";
import {PanelModule} from "primeng/panel";
import {Button} from "primeng/button";
import {FormsModule} from "@angular/forms";
import {DropdownModule} from "primeng/dropdown";
import {PaginatorModule} from "primeng/paginator";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputSwitchModule} from "primeng/inputswitch";
import {DividerModule} from "primeng/divider";
import {ToolbarModule} from "primeng/toolbar";
import {RouterOutlet} from "@angular/router";
import {BrowserModule} from "@angular/platform-browser";
import {LeafletModule} from "@asymmetrik/ngx-leaflet";
import {ApiService} from "./services/api.service";
import {AppRoutingModule} from "./app-routing.module";
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import { SignupComponent } from './components/signup/signup.component';
import {TooltipModule} from "primeng/tooltip";
import { ProfileComponent } from './components/profile/profile.component';
import {ToastModule} from "primeng/toast";
import {TableModule} from "primeng/table";
import {KnobModule} from "primeng/knob";
import { ProfileClientComponent } from './components/profile-client/profile-client.component';
import {OverlayPanelModule} from "primeng/overlaypanel";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MapComponent,
    NavbarComponent,
    StationPopupComponent,
    SignupComponent,
    ProfileComponent,
    ProfileClientComponent
  ],
    imports: [
        PanelModule,
        // FlexModule,
        Button,
        FloatLabelModule,
        FormsModule,
        DropdownModule,
        PaginatorModule,
        InputTextModule,
        InputTextareaModule,
        PasswordModule,
        CardModule,
        InputSwitchModule,
        DividerModule,
        TagModule,
        ToolbarModule,
        RouterOutlet,
        BrowserModule,
        HttpClientModule,
        LeafletModule,
        CardModule,
        FloatLabelModule,
        InputTextModule,
        PasswordModule,
        TagModule,
        AppRoutingModule,
        AngularFireModule.initializeApp(environment.firebaseConfig),
        TooltipModule,
        ToastModule,
        TableModule,
        KnobModule,
        OverlayPanelModule,
        BrowserAnimationsModule,

    ],
  providers: [ ApiService,
    // { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
