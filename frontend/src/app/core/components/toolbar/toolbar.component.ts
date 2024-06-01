import {Component, EventEmitter, Output} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent {

  userEmail: string = '';
  userFullName: string = '';
  @Output() sidenavToggleClick: EventEmitter<any> = new EventEmitter<any>();

  constructor(private router: Router,private activateRoute: ActivatedRoute) {
  }

  logout() {
    this.router.navigate(['login/']).finally();
  }

  toggleSidenav(): void {
    this.sidenavToggleClick.emit();
  }
}
