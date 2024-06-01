import { Component, OnInit, ViewChild } from '@angular/core';
import { state, style, trigger } from '@angular/animations';
import { MENU, MenuItem } from './menu';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss'],
  animations: [
    trigger('openClose', [
      state('true', style({ transform: 'translateX(0)' })),
      state('false', style({ transform: 'translateX(-100%)' })),
    ]),
    trigger('openCloseBig', [
      state('true', style({ width: '270px' })),
      state('false', style({ width: '64px' })),
    ]),
    trigger('openCloseSideContent', [
      state('true', style({ padding: '0 0 0 270px' })),
      state('false', style({ padding: '0 0 0 64px' })),
    ]),
  ],
})
export class NavigationComponent implements OnInit {
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

  @ViewChild('sidenav', { static: true }) sidenav: any;

  constructor(private readonly router: Router) {
    this.nextWeek.setDate(this.today.getDate() + 7);
    this.filteredMenu = this.menu.filter(menuItem => this.menuItemCanLoad(menuItem));
  }

  ngOnInit() {
    this.hasTitle = false;
    this.title = 'ZAP MAP';
  }

  private menuItemCanLoad(menuItem: MenuItem) {
    if (menuItem && menuItem.children) {
      menuItem.children = menuItem.children.filter(ch => ch);
      return true;
    }
    return false;
  }

  toggleSidenav() {
    this.sidenav.toggle();
  }

  minimizeMenu() {
    this.maximize = !this.maximize;
  }

  logout() {
    this.router.navigate(['login/']).finally();
  }
}
