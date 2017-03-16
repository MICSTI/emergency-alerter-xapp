/**
 * Created by michael.stifter on 16.03.2017.
 */
import { Geolocation } from 'ionic-native';
import { Injectable } from '@angular/core';
import { Subject } from "rxjs/Subject";
import { Location } from '../model/Location';

@Injectable()
export class LocationService {

    private locationUpdateSource = new Subject<Location>();
    public locationWatcher = this.locationUpdateSource.asObservable();

    // cache the latest location for bette user experience
    private locationCache: Location;

    constructor() {
        Geolocation.watchPosition()
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
            return Geolocation.getCurrentPosition().then(pos => {
                if (pos.coords && pos.coords.latitude && pos.coords.longitude) {
                    return new Location(pos.coords.latitude, pos.coords.longitude);
                } else {
                    console.error('received invalid location update');
                }
            });
        }
    }

}