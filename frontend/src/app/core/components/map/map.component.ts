import { Component, OnInit, Injector, ComponentFactoryResolver, ApplicationRef, ComponentRef } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Inject, PLATFORM_ID } from '@angular/core';
import { PrimeNGConfig } from "primeng/api";
import { StationPopupComponent } from "@core/components";
import { Station } from "@core/models/models";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  title = 'AngularOSM';
  Leaflet: any;
  map: any;
  searchValue: any;
  availableChecked: boolean = false;
  fastChecked: boolean = false;
  openChecked: boolean = false;
  showSwitches: boolean = false;
  routeLayer: any;

  markerList: Station[] = [
    { lat: 41.3275, lng: 19.8187, name: 'Marker 1' },
    { lat: 41.3300, lng: 19.8200, name: 'Marker 2' },
    { lat: 41.3250, lng: 19.8170, name: 'Marker 3' },
  ];

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private primengConfig: PrimeNGConfig,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    if (isPlatformBrowser(this.platformId)) {
      this.loadLeafletLibraries().then(() => {
        this.initializeMap();
      }).catch(err => console.log(err));
    }
  }

  async loadLeafletLibraries() {
    this.Leaflet = await import('leaflet');
    await import('leaflet.markercluster');
  }

  initializeMap(): void {
    if (!this.Leaflet) return;

    const options = {
      layers: [
        new this.Leaflet.TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        })
      ],
    };

    this.map = new this.Leaflet.Map('map', options);
    this.map.setView(new this.Leaflet.LatLng(41.3275, 19.8187), 17);

    const customIcon = new this.Leaflet.Icon({
      iconUrl: 'assets/images/normal-station.svg',
      iconSize: [41, 41],
      iconAnchor: [20, 0],
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const userLocation = new this.Leaflet.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.setView(userLocation, 14);
        this.markerList.forEach(marker => {
          const markerLeaflet = new this.Leaflet.Marker([marker.lat, marker.lng], { icon: customIcon });
          markerLeaflet.addTo(this.map);

          this.calculateRouteDistance(userLocation, new this.Leaflet.LatLng(marker.lat, marker.lng)).then(route => {
            this.getStreetName(marker.lat, marker.lng).then(streetName => {
              marker.streetName = streetName;
              marker.distance = (route.features[0].properties.summary.distance / 1000).toFixed(2)
              marker.fastAvailable = 0;
              marker.slowAvailable = 2;
              marker.route = route;

              const stationPopup = this.createPopupComponent(marker);
              markerLeaflet.bindPopup(stationPopup, {minWidth: 340});
            }).catch(error => {
              console.error(error);
            });
          }).catch(error => {
            console.error(error);
          });
        });

        const userMarker = new this.Leaflet.Marker(userLocation, {
          icon: new this.Leaflet.Icon({
            iconUrl: 'assets/images/user-location.svg',
            iconSize: [30, 30],
          })
        });
        userMarker.addTo(this.map);
      }, error => {
        console.error(error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  getStreetName(lat: number, lng: number): Promise<string> {
    const nominatimUrl = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`;
    return fetch(nominatimUrl)
      .then(response => response.json())
      .then(data => data.address.road)
      .catch(error => {
        console.error(error);
        return 'Unknown';
      });
  }

  calculateRouteDistance(latLng1: any, latLng2: any): Promise<any> {
    const orsUrl = `https://api.openrouteservice.org/v2/directions/driving-car?api_key=5b3ce3597851110001cf6248f39a41473106414d9754fb9bab55f881&start=${latLng1.lng},${latLng1.lat}&end=${latLng2.lng},${latLng2.lat}`;
    return fetch(orsUrl)
      .then(response => response.json())
      .then(data => data) // Convert meters to kilometers
      .catch(error => {
        console.error(error);
        return 0;
      });
  }

  createPopupComponent(station: Station): HTMLElement {
    const componentFactory = this.resolver.resolveComponentFactory(StationPopupComponent);
    const componentRef: ComponentRef<StationPopupComponent> = componentFactory.create(this.injector);
    componentRef.instance.station = station;
    componentRef.instance.drawRouteEvent.subscribe((route: any) => {
      this.drawRoute(route);
    });
    this.appRef.attachView(componentRef.hostView);
    const div = document.createElement('div');
    div.appendChild(componentRef.location.nativeElement);
    return div;
  }

  drawRoute(route: any) {
    if (this.routeLayer) {
      this.map.removeLayer(this.routeLayer);
    }

    this.routeLayer = this.Leaflet.geoJSON(route, {
      style: {
        color: '#2c65cb', // Change color as needed
        weight: 10 // Adjust this value to change the thickness
      }
    }).addTo(this.map);

    this.map.fitBounds(this.routeLayer.getBounds());
  }

  toggleSwitches() {
    this.showSwitches = !this.showSwitches;
  }
}
