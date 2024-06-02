import {Component, OnInit} from '@angular/core';
import {TableRowCollapseEvent, TableRowExpandEvent} from "primeng/table";
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [MessageService],
})
export class ProfileComponent implements OnInit{

  listStations: any;
  ngOnInit(): void {
    this.listStations = [ {name: 'Tirana parking', id:3 } ];
  }
  stations = [
    {
      userId: 1,
      id: 2,
      name: "Tirana Parking",
      status: "Free",
      country: "Alb",
      city: "Tirana",
      latitude: 41.318897,
      longitude: 19.810223,
      created_at: "2024-06-02T00:06:45",
      updated_at: "2024-06-02T00:06:45",
      chargers: [
        {
          charging_station_id: 2,
          id: 4,
          status: "Free",
          type: "One-Phase",
          rated_power: "string",
          updated_at: "2024-06-02T01:07:05",
          created_at: "2024-06-02T01:07:05"
        },
        {
          charging_station_id: 2,
          id: 5,
          status: "Free",
          type: "One-Phase",
          rated_power: "string",
          updated_at: "2024-06-02T01:07:06",
          created_at: "2024-06-02T01:07:06"
        }
      ]
    },
  ];

  expandedRows = {};
  addingStation: boolean = true;
  addingCharger: boolean = false;
  name: any;
  lnglat: any;
  selectedCity: any;

  constructor() {}


  onRowExpand(event: TableRowExpandEvent) {
    console.log(event.data.orders)
    // this.messageService.add({ severity: 'info', summary: 'Product Expanded', detail: event.data.name, life: 3000 });
  }

  onRowCollapse(event: TableRowCollapseEvent) {
    console.log(event.data.orders)
    // this.messageService.add({ severity: 'success', summary: 'Product Collapsed', detail: event.data.name, life: 3000 });
  }

}
