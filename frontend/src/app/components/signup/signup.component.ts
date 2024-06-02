import { Component } from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";
import {HttpClient} from "@angular/common/http";
import {DialogService} from "primeng/dynamicdialog";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
  providers: [AuthService, HttpClient],
})
export class SignupComponent {
    constructor(private authService: AuthService, private router: Router) {
    }
    name: string = '';
    email: string = '';
    password1: string = '';
    password2: string = '';
    username: string = '';
    isClient: boolean = true;

    signupHandler() {
        if (this.username && this.password1 === this.password2) {
            this.authService.signup(this.email, this.username, this.password1).subscribe(
                (res) => {
                    console.log('Signup response:', res);
                    if (res.code === 200) {
                        console.log('Redirecting to login');
                        this.router.navigate(['/login']);
                    } else {
                        console.error('Error in signup request:', res);
                        // Handle error condition if needed
                    }
                },
                (error) => {
                    console.error('Error in signup request:', error);
                    // Handle error condition if needed
                }
            );
        }
    }
}
