import {DashboardComponent} from "@core/components/dashboard/dashboard.component";
import {LoaderComponent} from "@core/components/loader/loader.component";
import {ErrorPageComponent} from "@core/components/error-page/error-page.component";
import {NavigationComponent} from '@core/components/navigation/navigation.component';
import {ToolbarComponent} from '@core/components/toolbar/toolbar.component';
import {ConfirmationDialogComponent} from '@core/components/confirmation-dialog/confirmation-dialog.component';
import {MenuItemComponent} from "@core/components/navigation/menu-item/menu-item.component";
import {MapComponent} from "@core/components/map/map.component";
import {StationPopupComponent} from "@core/components/map/station-popup/station-popup.component";


export const components: any[] = [DashboardComponent, LoaderComponent, ErrorPageComponent, NavigationComponent, ToolbarComponent, ConfirmationDialogComponent, MenuItemComponent, MapComponent, StationPopupComponent];

export * from './dashboard/dashboard.component';
export * from './loader/loader.component';
export * from './navigation/navigation.component';
export * from './confirmation-dialog/confirmation-dialog.component';
export * from './radex-base-dialog.component';
export * from './map/map.component';
export * from '@core/components/map/station-popup/station-popup.component';
