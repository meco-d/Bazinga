import {
  ApplicationRef,
  Component,
  ComponentFactoryResolver, ComponentRef,
  Inject,
  Injector,
  OnInit,
  PLATFORM_ID
} from "@angular/core";
import {ChargerType, Station} from "../../models/models";
import {PrimeNGConfig} from "primeng/api";
import {ApiService} from "../../services/api.service";
import {isPlatformBrowser} from "@angular/common";
import {StationPopupComponent} from "./station-popup/station-popup.component";


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
  markerList: Station[] = [];
  routeInstructions: any[] = []; // New variable to store route instructions
  showRouteCard: boolean = false; // Variable to control visibility of route card

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private primengConfig: PrimeNGConfig,
    private resolver: ComponentFactoryResolver,
    private injector: Injector,
    private appRef: ApplicationRef,
    private apiService: ApiService // Inject ApiService here
  ) { }

  ngOnInit(): void {
    this.primengConfig.ripple = true;

    if (isPlatformBrowser(this.platformId)) {
      this.loadLeafletLibraries().then(() => {
        this.initializeMap();
      }).catch(err => console.log(err));
    }

    this.apiService.getStationList().subscribe(
      (stations: Station[]) => {
        this.markerList = stations;
        console.log('Station list:', this.markerList);
      },
      error => {
        console.error('Error fetching station list:', error);
      }
    );
  }

  async loadLeafletLibraries() {
    this.Leaflet = await import('leaflet');
    // await import('leaflet.markercluster');
  }

  initializeMap(): void {
    if (!this.Leaflet) return;

    const options = {
      layers: [
        new this.Leaflet.TileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        })
      ],
      zoomControl: false // Disable the zoom control here
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
        this.addMarkersToMap(userLocation);
      }, error => {
        console.error(error);
      });
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  addMarkersToMap(userLocation?: any): void {
    if (userLocation) {
      this.markerList.forEach(marker => {
        let fastChargerCount = 0;
        let slowChargerCount = 0;
        let fastAvailableCount = 0;
        let slowAvailableCount = 0;
        let totalAvailableCount = 0;
        let iconUrl: string;
        let stationType: ChargerType;
        marker.chargerList?.forEach(charger => {
          if(charger.type === ChargerType.THREE_PHASE) {
            fastChargerCount++;
            if(charger.status === 'Free') {
              fastAvailableCount++;
              totalAvailableCount++;
            }
          } else if(charger.type === ChargerType.ONE_PHASE) {
            slowChargerCount++;
            if(charger.status === 'Free') {
              slowAvailableCount++;
              totalAvailableCount++;
            }
          }
        })

        console.log('fastChargerCount:', fastChargerCount);
        console.log('slowChargerCount:', slowChargerCount);
        console.log('fastAvailableCount:', fastAvailableCount);
        console.log('slowAvailableCount:', slowAvailableCount);
        console.log('totalAvailableCount:', totalAvailableCount);


        if(fastChargerCount > 0 && totalAvailableCount >0){
          iconUrl = 'assets/images/fast-station.svg';
          stationType = ChargerType.THREE_PHASE;
        }else if(fastChargerCount === 0 && slowChargerCount > 0 && totalAvailableCount >0){
          iconUrl = 'assets/images/normal-station.svg';
          stationType = ChargerType.ONE_PHASE;
        }else if(fastChargerCount > 0 && totalAvailableCount === 0){
          iconUrl = 'assets/images/busy-fast-station.svg';
        }else if(fastChargerCount == 0 && slowChargerCount > 0 && totalAvailableCount === 0){
          iconUrl = 'assets/images/busy-normal-station.svg';
        }else{
          iconUrl = 'assets/images/maintenance-station.svg';
        }

        const customIcon = new this.Leaflet.Icon({
          iconUrl: iconUrl,
          iconSize: [41, 41],
          iconAnchor: [20, 0],
        });

        const markerLeaflet = new this.Leaflet.Marker([marker.latitude, marker.longitude], { icon: customIcon });
        markerLeaflet.addTo(this.map);

        this.calculateRouteDistance(userLocation, new this.Leaflet.LatLng(marker.latitude, marker.longitude)).then(route => {
          this.getStreetName(marker.latitude, marker.longitude).then(streetName => {
            marker.streetName = streetName;
            marker.distance = (route.features[0].properties.summary.distance / 1000).toFixed(2);
            marker.fastAvailable = fastAvailableCount;
            marker.slowAvailable = slowAvailableCount;
            marker.route = route;
            marker.type = stationType;

            const stationPopup = this.createPopupComponent(marker);
            markerLeaflet.bindPopup(stationPopup, { minWidth: 340 });
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

    // Extract instructions from the route and update the variable
    this.routeInstructions = route.features[0].properties.segments[0].steps.map((step: any) => step.instruction);
    this.showRouteCard = true; // Show route card
  }

  // Method to clear route and hide route card
  clearRoute() {
    if (this.routeLayer) {
      this.map.removeLayer(this.routeLayer);
      this.routeInstructions = []; // Clear route instructions
    }
    this.showRouteCard = false; // Hide route card
  }

  toggleSwitches() {
    this.showSwitches = !this.showSwitches;
  }
}
