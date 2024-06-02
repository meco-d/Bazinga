// import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
// import {Observable} from 'rxjs';
// import {Injectable} from '@angular/core';
// import {CookieService} from '@core/services/cookie.service';
//
// @Injectable()
// export class AuthInterceptor implements HttpInterceptor {
//   constructor(private cookieService: CookieService) {
//   }
//
//   intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     const authToken = this.cookieService.getAuthToken();
//     if (authToken) {
//       request = request.clone({
//         setHeaders: {
//           Authorization: `Bearer ${authToken.access}`
//         }
//       });
//     }
//     return next.handle(request);
//   }
// }
//
