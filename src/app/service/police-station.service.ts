/**
 * Created by michael.stifter on 15.03.2017.
 */
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { PoliceStation } from '../model/PoliceStation';
import { AppSettings } from '../app.settings';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';

@Injectable()
export class PoliceStationService {

  constructor(private http: Http) {}

  getPoliceStationsNearby(lat: number, lng: number, radius: number): Observable<PoliceStation[]> {
    return this.http.get(AppSettings.API_ENDPOINT + '/nearest/police?lat=' + lat + '&lng=' + lng + '&radius=' + radius)
      .map((responseData) => {
        return responseData.json();
      })
      .map((jsonResponse: any) => {
        if (jsonResponse.status === "success") {
          return jsonResponse.data;
        } else {
          // TODO handle error case?
          return [];
        }
      })
      .map((policeStations: Array<any>) => {
        return policeStations;
      });
  }

  getPoliceStationsNearbyMock(): Promise<PoliceStation[]> {
    return Promise.resolve([
      { name: "Polizeiinspektion Graz - Wiener Straße", location: { lat: 47.0897329, lng: 15.4100455 } },
      { name: "Polizeiinspektion Graz-Andritz", location: { lat: 47.1033302, lng: 15.4229339 } },
      { name: "Polizeiinspektion Graz-Lendplatz", location: { lat: 47.0765347, lng: 15.4287876 } }
    ]);
  }
}
