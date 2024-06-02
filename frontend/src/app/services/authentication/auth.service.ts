import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {BehaviorSubject, catchError, Observable, tap} from "rxjs";
import {AngularFireAuth} from "@angular/fire/compat/auth";
import firebase from "firebase/compat/app";
import {Router} from "@angular/router";
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  gatewayUrl = 'http://localhost:4000/'; // locally
  // gatewayUrl = 'database-service:80/'; //deployed
  private accessTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private role = 'role';

  private authStatus = new BehaviorSubject<boolean>(this.isAuthenticated());
  authStatus$ = this.authStatus.asObservable();

  constructor(private http: HttpClient, public afAuth: AngularFireAuth, private router: Router) { }

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded')
        .set('Accept', 'application/json');

    const body = new HttpParams()
        .set('grant_type', '')
        .set('username', username)
        .set('password', password)
        .set('scope', '')
        .set('client_id', '')
        .set('client_secret', '');

    return this.http.post<any>(this.gatewayUrl + 'token', body.toString(), { headers }).pipe(
        tap((tokens) => {
          if (tokens.access_token) {
            localStorage.setItem(this.accessTokenKey, tokens.access_token);
            localStorage.setItem(this.refreshTokenKey, tokens.refresh_token);
            localStorage.setItem(this.role, tokens.role);
            this.authStatus.next(true); // update authStatus
            location.replace('/map');
          }
        }),
        catchError(error => {
          console.error('Error in login request:', error); // Debugging line
          throw error;
        })
    );
  }

  logout() {
    // Perform your logout logic here
    localStorage.removeItem(this.accessTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
    localStorage.removeItem(this.role);
    this.authStatus.next(false); // update authStatus
    location.replace('/login');
  }

  signup(email: string, username: string, password: string): Observable<any> {
    return this.http.post<any>(this.gatewayUrl + 'users', { email, password, username }).pipe();
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem(this.accessTokenKey);
  }

  GoogleAuth() {
    try {
      this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider()).then(() => {
        location.replace('/map');
      });
      // return true;
    } catch (error) {
      // return false;
    }
  }
}
