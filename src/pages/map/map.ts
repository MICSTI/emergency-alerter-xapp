import { Component } from '@angular/core';
import { OnInit } from '@angular/core'

import { NavController } from 'ionic-angular';

import { PoliceStation } from '../../app/model/PoliceStation';
import { PoliceStationService } from '../../app/service/police-station.service';

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage implements OnInit {

  private policeStations: PoliceStation[];

  constructor(public navCtrl: NavController, private policeStationService: PoliceStationService) {

  }

  ngOnInit(): void {
    this.getPoliceStations();
  }

  getPoliceStations(): void {
    //this.policeStationService.getPoliceStationsNearbyMock().then(policeStations => this.policeStations = policeStations);

    this.policeStationService.getPoliceStationsNearby(47.08, 15.425, 10000)
      .subscribe(policeStations => this.policeStations = policeStations);
  }

}
