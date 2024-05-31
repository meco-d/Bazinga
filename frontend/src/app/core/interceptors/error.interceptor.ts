// import {Injectable} from '@angular/core';
// import {HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// import {NavigationExtras, Router} from '@angular/router';
// import {Observable} from 'rxjs';
// import {catchError, flatMap} from 'rxjs/operators';
// import {environment} from "@env";
// import {AuthService} from "@core/services";
// import {MESSAGE_403} from "@shared/cons";
// import {CookieService} from "@core/services/cookie.service";
// import {AuthToken} from "@core/models/models";
//
//
// @Injectable()
// export class ErrorInterceptor implements HttpInterceptor {
//   private readonly REFRESH_URL = `${environment.API_HOST}/auth/knock-knock/refresh/`;
//   private readonly REFRESH_TOKEN = 'refresh';
//   private readonly ACCESS_TOKEN = 'access';
//   // private readonly CURRENT_GROUPS = 'groups';
//   // private readonly CURRENT_PERMISSIONS = 'permissions';
//
//   today = new Date();
//   tomorrow: Date = new Date();
//   nextWeek: Date = new Date();
//
//   navigationExtras: NavigationExtras = {
//     state: {
//       message: '',
//       path: ''
//     }
//   };
//
//   constructor(private authService: AuthService, private router: Router, private cookieService: CookieService, private http: HttpClient) {
//
//     this.tomorrow.setDate(this.today.getDate() + 1);
//     this.nextWeek.setDate(this.today.getDate() + 7);
//   }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(request).pipe(catchError((error: any) => {
//       let err = error.error;
//       if (error.status === 0) {
//         err.message = $localize`Lidhja me serverin dështoi`;
//         throw(err);
//       }
//       if (error.status === 401) {
//         if (error.error.detail && error.error.detail === 'Authentication credentials were not provided.') {
//           this.authService.logout();
//           this.router.navigate(['login/']).then();
//         } else {
//           const authToken: AuthToken | null = this.cookieService.getAuthToken();
//           // @ts-ignore
//           return this.http.post<Token>(this.REFRESH_URL, {'refresh': authToken.refresh}).pipe(flatMap((data: any) => {
//             if (data) { //@ToDo - Change to use AuthToken and reuse functions
//               this.cookieService.delete(this.ACCESS_TOKEN);
//               this.cookieService.delete(this.REFRESH_TOKEN);
//
//               this.cookieService.set(this.ACCESS_TOKEN, data.access);
//               this.cookieService.set(this.REFRESH_TOKEN, data.refresh);
//
//               request = request.clone({
//                 setHeaders: {
//                   Authorization: `Bearer ${data['access']}`
//                 }
//               });
//               return next.handle(request);
//             } else {
//               this.authService.logout();
//               this.router.navigate(['login/']).then();
//             }
//           }));
//         }
//       } else if (error.status === 400) {
//         err = error.error;
//       } else if (error.status === 500) {
//         err = error.error;
//       } else if (error.status === 403) {
//         // this.authService.logout();
//         // this.router.navigate(['login/']).then();
//
//         // @ts-ignore
//         this.navigationExtras.state['message'] = error.error.errors ? error.error.errors : MESSAGE_403;
//         // @ts-ignore
//         this.navigationExtras.state['path'] = '';
//         this.router.navigate([`error-page/`], this.navigationExtras).finally();
//       }
//
//       throw(err || error.statusText);
//     }));
//   }
// }
//
