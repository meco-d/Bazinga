import {DashboardComponent} from "@core/components/dashboard/dashboard.component";
import {LoaderComponent} from "@core/components/loader/loader.component";
import {ErrorPageComponent} from "@core/components/error-page/error-page.component";
import {NavigationComponent} from '@core/components/navigation/navigation.component';
import {ToolbarComponent} from '@core/components/toolbar/toolbar.component';
import {ConfirmationDialogComponent} from '@core/components/confirmation-dialog/confirmation-dialog.component';
import {MenuItemComponent} from "@core/components/navigation/menu-item/menu-item.component";


export const components: any[] = [DashboardComponent, LoaderComponent, ErrorPageComponent, NavigationComponent, ToolbarComponent, ConfirmationDialogComponent, MenuItemComponent];

export * from './dashboard/dashboard.component';
export * from './loader/loader.component';
export * from './navigation/navigation.component';
export * from './confirmation-dialog/confirmation-dialog.component';
export * from './radex-base-dialog.component';
