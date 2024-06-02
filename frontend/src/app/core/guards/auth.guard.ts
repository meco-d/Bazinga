// import {ActivatedRouteSnapshot, CanActivate, CanActivateChild, CanLoad, Route, Router, RouterStateSnapshot, UrlSegment, UrlTree} from '@angular/router';
// import {Injectable} from '@angular/core';
// import {Observable} from 'rxjs';
// import {AuthService, AuthorizationService} from '@core/services';
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AuthGuard implements CanActivate, CanLoad, CanActivateChild {
//
//   constructor(private authService: AuthService, private permissionService: AuthorizationService, private router: Router) {
//   }
//
//   canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     let hasPermission = true;
//     const permission = route.data.permissions?.only;
//     if (permission) {
//       hasPermission = this.permissionService.hasPermission(route.data.permissions.only)
//     }
//     return this.checkLogin(state.url) && hasPermission;
//   }
//
//   canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
//     let hasPermission = true;
//     const permission = childRoute.data.permissions?.only;
//     if (permission) {
//       hasPermission = this.permissionService.hasPermission(childRoute.data.permissions.only)
//     }
//     return this.checkLogin(state.url) && hasPermission;
//   }
//
//   canLoad(route: Route, segments: UrlSegment[]): Observable<boolean> | Promise<boolean> | boolean {
//     // return true;
//     return this.checkLogin(`/${route.path}`);
//
//   }
//
//   async checkLogin(url: string): Promise<boolean> {
//     // return this.authService.isLoggedInPermissions();
//     return true;
//   }
//
//
// }
