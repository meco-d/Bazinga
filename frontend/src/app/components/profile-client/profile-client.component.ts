import {AfterViewInit, Component, ElementRef, ViewChild} from '@angular/core';

@Component({
  selector: 'app-profile-client',
  templateUrl: './profile-client.component.html',
  styleUrl: './profile-client.component.scss'
})
export class ProfileClientComponent implements AfterViewInit {
  @ViewChild('svgContainer', { static: true }) svgContainer!: ElementRef;

  ngAfterViewInit() {
    if (this.svgContainer) {
      const rangeText = this.svgContainer.nativeElement.querySelector('#tspan13');
      const chargerText = this.svgContainer.nativeElement.querySelector('#tspan14');
      const timeText = this.svgContainer.nativeElement.querySelector('#tspan12');
      console.log(rangeText); // Ensure that the element is found
      if (rangeText) {
        rangeText.textContent = '121 km';
        chargerText.textContent = '23%';
        timeText.textContent = '1h 23m';
      } else {
        console.log('range-text not found');
      }
    } else {
      console.log('svgContainer not found');
    }
  }
}
