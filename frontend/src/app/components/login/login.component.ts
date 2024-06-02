import { Component } from '@angular/core';
import {AuthService} from "../../services/authentication/auth.service";
import {HttpClient} from "@angular/common/http";
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [AuthService, HttpClient, DialogService]
})
export class LoginComponent {//implements OnInit {
  username: string | undefined;
  password: string | undefined;
  dialogRef: DynamicDialogRef | undefined;
  // constructor(private location: Location, private router: Router, private authService: AuthService) { }
  constructor(private authService: AuthService, public dialogService: DialogService) {
    this.authService = authService;
  }
  loginHandler() {
    if(this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe((res) => {
        console.log(res);
      });
    }
  }

  protected readonly location = location;

  // openSignUpDialog() {
  //   this.dialogRef  = this.dialogService.open(SignupComponent, {
  //     header: 'Sign Up',
  //   });
  // }

  GoogleAuth() {
    this.authService.GoogleAuth();
  }
}
