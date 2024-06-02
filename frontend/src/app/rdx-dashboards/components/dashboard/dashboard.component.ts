import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboardItems = [
    { title: 'Manage Badges', icon: 'pi-key' },
    { title: 'Define Charging Authorizations', icon: 'pi-cog' },
    { title: 'Manage Companies', icon: 'pi-building' },
    { title: 'Define Tariff Elements', icon: 'pi-file' },
    { title: 'Manage Tariff Setups', icon: 'pi-sitemap' },
    { title: 'Manage Charging Stations', icon: 'pi-charging-station' },
    { title: 'Monitor Charging Sessions', icon: 'pi-chart-bar' },
    { title: 'Manage Locations', icon: 'pi-map-marker' },
  ];

  constructor() { }

  ngOnInit(): void { }
}
