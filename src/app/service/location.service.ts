/**
 * Created by michael.stifter on 16.03.2017.
 */
import { Geolocation } from '@ionic-native/geolocation';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject } from "rxjs/Subject";
import { Location } from '../model/Location';
import { AppSettings } from '../app.settings';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class LocationService {

    private locationUpdateSource = new Subject<Location>();
    public locationWatcher = this.locationUpdateSource.asObservable();

    // cache the latest location for bette user experience
    private locationCache: Location;

    constructor(private geolocation: Geolocation, private http: Http) {
        this.geolocation.watchPosition()
            .subscribe(pos => {
                if (pos.coords && pos.coords.latitude && pos.coords.longitude) {
                    let currentLocation = new Location(pos.coords.latitude, pos.coords.longitude);

                    this.locationCache = currentLocation;

                    this.locationUpdateSource.next(currentLocation);
                } else {
                    console.error('received invalid location update');
                }
            });
    }

    public getCurrentPosition(): Promise<Location> {
        if (this.locationCache) {
            return Promise.resolve(this.locationCache);
        } else {
            return this.geolocation.getCurrentPosition().then(pos => {
                if (pos.coords && pos.coords.latitude && pos.coords.longitude) {
                    return new Location(pos.coords.latitude, pos.coords.longitude);
                } else {
                    console.error('received invalid location update');
                }
            });
        }
    }

    public getAddressToLocation(location: Location): Observable<string> {
      return this.http.get(AppSettings.GOOGLE_MAPS_REVERSE_GEOCODING_API.replace("{LAT}", location.lat.toString()).replace("{LNG}", location.lng.toString()))
        .map(res => res.json())
        .map((jsonResponse: any) => {
          if (jsonResponse.results !== undefined && jsonResponse.results.length > 0) {
            return jsonResponse.results[0].formatted_address;
          } else {
            return "";
          }
        });
    }

}
