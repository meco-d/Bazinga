import { Component } from '@angular/core';
import { AuthService } from "./services/authentication/auth.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [AuthService],
})
export class AppComponent {
  isLoggedIn = false;
  private authService: AuthService;
  constructor(authService: AuthService) {
    this.authService = authService;
    this.isLoggedIn = location.pathname !== '/login' && location.pathname !== '/signup';
  }
  title = 'learning-enhancement';
  // ngOnInit(){
  //   this.authService.authStatus$.subscribe(isAuthenticated => {
  //     this.isLoggedIn = isAuthenticated;
  //   });
  //  }
}
