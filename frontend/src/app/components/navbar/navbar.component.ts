import { Component } from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  providers: [AuthService],
})
export class NavbarComponent {
  constructor(private authService: AuthService) {
    this.authService = authService;
  }
  logout() {
    this.authService.logout()
  }
}
