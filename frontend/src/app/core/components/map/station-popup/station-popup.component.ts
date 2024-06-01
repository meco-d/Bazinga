import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Station } from "@core/models/models";

@Component({
  selector: 'app-station-popup',
  templateUrl: './station-popup.component.html',
  styleUrls: ['./station-popup.component.scss']
})
export class StationPopupComponent {
  @Input() station!: Station;
  @Output() drawRouteEvent = new EventEmitter<any>();

  drawRoute() {
    this.drawRouteEvent.emit(this.station.route);
  }
}
