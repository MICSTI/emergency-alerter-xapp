import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Network } from 'ionic-native';
import { Location } from '../app/model/Location';
import 'rxjs/add/operator/map';
import { LocationService } from "../app/service/location.service";
import { AppSettings } from "../app/app.settings";
import { PoliceStation } from "../app/model/PoliceStation";

declare var google;

/*
 Generated class for the GoogleMaps provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class GoogleMaps {

  mapElement: any;
  map: any;
  mapInitialised: boolean = false;
  mapLoaded: any;
  mapLoadedObserver: any;
  markers: any = [];
  apiKey: string;

  constructor(public http: Http, public locationService: LocationService) {
    console.log('Hello GoogleMaps Provider');
  }

  init(mapElement: any): Promise<any> {
    this.mapElement = mapElement;

    return this.loadGoogleMaps();
  }

  loadGoogleMaps(): Promise<any> {
    return new Promise((resolve) => {
      if (typeof google === "undefined" || typeof google.maps === "undefined") {
        console.info('Google Maps JavaScript needs to be loaded.');

        this.disableMap();

        window['mapInit'] = () => {
          this.initMap().then(() => {
            resolve(true);
          });

          this.enableMap();
        };

        let script = document.createElement("script");
        script.id = "googleMaps";

        if (this.apiKey) {
          script.src = "https://maps.google.com/maps/api/js?key=" + this.apiKey + "&callback=mapInit";
        } else {
          script.src = "https://maps.google.com/maps/api/js?callback=mapInit";
        }

        document.body.appendChild(script);
      } else {
        this.initMap();
        this.enableMap();

        this.addConnectivityListeners();
      }
    });
  }

  initMap(): Promise<any> {
    this.mapInitialised = true;

    return new Promise((resolve) => {
      this.locationService.getCurrentPosition()
        .then(location => {
            let latLng = new google.maps.LatLng(location.lat, location.lng);

            let mapOptions = {
              center: latLng,
              zoom: AppSettings.GOOGLE_MAPS_ZOOM_LEVEL,
              mapTypeId: google.maps.MapTypeId.ROADMAP
            };

            this.map = new google.maps.Map(this.mapElement, mapOptions);

            resolve(true);
        });
    });
  }

  disableMap(): void {
    // TODO hide map?
  }

  enableMap(): void {
    // TODO show map?
  }

  addConnectivityListeners(): void {
    document.addEventListener('online', () => {
      console.log('online');

      setTimeout(() => {
        if(typeof google == "undefined" || typeof google.maps == "undefined"){
          this.loadGoogleMaps();
        }
        else {
          if(!this.mapInitialised){
            this.initMap();
          }

          this.enableMap();
        }
      }, 2000);
    }, false);

    document.addEventListener('offline', () => {
      console.log('offline');

      this.disableMap();
    }, false);
  }

  public addPoliceStationMarkers(policeStations: PoliceStation[]): void {
    policeStations.forEach((item) => {
      this.addMarker(item.location, item.name, 'blue');
    });
  }

  public addOwnPositionMarker(location: Location): void {
    this.addMarker(location, 'Your position', 'red');
  }

  addMarker(location: Location, title: string, color?: string): void {
    if (location.lat && location.lng) {
      let latLng = new google.maps.LatLng(location.lat, location.lng);

      let iconLink = color ? 'http://maps.google.com/mapfiles/ms/icons/' + color + '-dot.png' : 'http://maps.google.com/mapfiles/ms/icons/red-dot.png';

      let marker = new google.maps.Marker({
        map: this.map,
        animation: google.maps.Animation.DROP,
        position: latLng,
        title: title,
        icon: iconLink
      });

      this.markers.push(marker);
    } else {
      console.error("Cannot display marker", location, title);
    }
  }
}
