import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';

import { LocationService } from '../../app/service/location.service';

import { Location } from '../../app/model/Location';

@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    private currentLocation: Location;

    constructor(public navCtrl: NavController, public locationService: LocationService) {

    }

    ngOnInit(): void {
        this.locationService.locationWatcher
            .subscribe(locationUpdate => this.currentLocation = locationUpdate);
    }

    getFormattedLocation(): string {
        if (this.currentLocation) {
            return this.currentLocation.lat.toFixed(5) + " / " + this.currentLocation.lng.toFixed(5);
        } else {
            return "Sorry, we have not received a location yet."
        }
    }
}
