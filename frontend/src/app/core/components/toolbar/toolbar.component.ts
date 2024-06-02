import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {MENU, MenuItem} from "@core/components/navigation/menu";

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrl: './toolbar.component.scss'
})
export class ToolbarComponent implements OnInit {

  userEmail: string = '';
  userFullName: string = '';
  today = new Date();
  nextWeek: Date = new Date();
  currentComponent: any;
  hasTitle: boolean = false;
  title: string = '';
  maximize = true;
  readonly menu = MENU;
  filteredMenu: MenuItem[] = [];

  constructor(private router: Router) {
    this.nextWeek.setDate(this.today.getDate() + 7);
    this.filteredMenu = this.menu.filter(menuItem => this.menuItemCanLoad(menuItem));
  }

  ngOnInit() {
    this.hasTitle = false;
    this.title = 'ZAP MAP';
  }

  logout() {
    this.router.navigate(['login/']).finally();
  }

  private menuItemCanLoad(menuItem: MenuItem) {
    if (menuItem && menuItem.children) {
      menuItem.children = menuItem.children.filter(ch => ch);
      return true;
    }
    return false;
  }

}
