import {Component, Input, OnInit} from '@angular/core';
import {MenuItem} from "@core/components/navigation/menu";

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.scss'
})
export class MenuItemComponent implements OnInit {

  @Input() item: MenuItem = new MenuItem();
  hasChildren: boolean = false;
  active: boolean = false;

  constructor() {
  }

  ngOnInit(): void {
    this.hasChildren = this.item.children.length > 0;
  }

  activate(): void {
    this.active = true;
  }

}
