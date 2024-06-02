import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss']
})
export class DashboardListComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() columns: { field: string, header: string }[] = [];

  constructor() { }

  ngOnInit(): void { }

  resolveField(obj: any, path: string): any {
    return path.split('.').reduce((prev, curr) => prev ? prev[curr] : null, obj);
  }
}
