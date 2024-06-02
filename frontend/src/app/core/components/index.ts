import {LoaderComponent} from "@core/components/loader/loader.component";
import {ErrorPageComponent} from "@core/components/error-page/error-page.component";
import {NavigationComponent} from '@core/components/navigation/navigation.component';
import {ToolbarComponent} from '@core/components/toolbar/toolbar.component';
import {ConfirmationDialogComponent} from '@core/components/confirmation-dialog/confirmation-dialog.component';
import {MenuItemComponent} from "@core/components/navigation/menu-item/menu-item.component";


export const components: any[] = [LoaderComponent, ErrorPageComponent, NavigationComponent, ToolbarComponent, ConfirmationDialogComponent, MenuItemComponent];

export * from './loader/loader.component';
export * from './navigation/navigation.component';
export * from './confirmation-dialog/confirmation-dialog.component';
export * from './radex-base-dialog.component';
