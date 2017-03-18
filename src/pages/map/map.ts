import { Component } from '@angular/core';
import { OnInit } from '@angular/core';

import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { PoliceStation } from '../../app/model/PoliceStation';
import { PoliceStationService } from '../../app/service/police-station.service';
import { LocationService } from '../../app/service/location.service';
import { Location } from "../../app/model/Location";
import { AppSettings } from '../../app/app.settings';

@Component({
    selector: 'page-map',
    templateUrl: 'map.html'
})
export class MapPage implements OnInit {

    private policeStations: PoliceStation[];

    constructor(public navCtrl: NavController, public policeStationService: PoliceStationService, public locationService: LocationService, public toastCtrl: ToastController) {

    }

    public ngOnInit(): void {
        this.locationService.getCurrentPosition()
            .then(location => {
                this.fetchPoliceStations(location);
            })
            .catch(err => {
                console.error(err);

                this.presentToast("Unfortunately, we were not able to locate the police stations around you.");
            });
    }

    public fetchPoliceStations(location: Location): void {
        this.policeStationService.getPoliceStationsNearby(location, AppSettings.POLICE_STATION_RADIUS_METRES)
            .subscribe(
                (policeStations) => this.policeStations = policeStations,
                (err) => {
                    console.error(err);

                    // get the mock stations instead
                   this.policeStations = PoliceStationService.mockPoliceStations;

                    this.presentToast("We currently cannot reach the API server, so we are showing you some demo data.");
                }
            );

        // MOCK CALL (in case API is not available)
        //this.policeStationService.getPoliceStationsNearbyMock().then(policeStations => this.policeStations = policeStations);
    }

    public getPoliceStations(): PoliceStation[] {
        return this.policeStations;
    }

    private presentToast(message: string, duration = AppSettings.TOAST_DEFAULT_DURATION): void {
        let toast = this.toastCtrl.create({
            message: message,
            duration: 3000
        });

        toast.present();
    }

}
