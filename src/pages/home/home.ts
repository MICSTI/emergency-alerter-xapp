import { Component } from '@angular/core';
import { OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocationService } from '../../app/service/location.service';
import { Location } from '../../app/model/Location';
import { ContactService} from '../../app/service/contact.service';
import { EmergencyContact } from "../../app/model/Contact";
import { SMS } from '@ionic-native/sms';


@Component({
    selector: 'page-home',
    templateUrl: 'home.html'
})
export class HomePage implements OnInit {

    private currentLocation: Location;
    private currentAddress: string;

    constructor(public navCtrl: NavController, public locationService: LocationService,
                 private contactService: ContactService, private sms: SMS) {

      this.currentAddress = "";

    }

    ngOnInit(): void {
        this.locationService.locationWatcher
            .subscribe(locationUpdate => {
              this.currentLocation = locationUpdate;

              // perform reverse geocoding to get address
              this.locationService.getAddressToLocation(locationUpdate)
                .subscribe(address => this.currentAddress = address);
            });
    }

    getAddress(): string {
      return this.currentAddress;
    }

    getFormattedLocation(): string {
        if (this.currentLocation) {
            return this.currentLocation.lat.toFixed(5) + " / " + this.currentLocation.lng.toFixed(5);
        } else {
            return "Sorry, we have not received a location yet.";
        }
    }

    sendAlertMessage(): void {

        let message: string = "I am in trouble and need help.\n My current location is: Lat: "
        + this.currentLocation.lat.toFixed(5)
        + " Long: " + this.currentLocation.lng.toFixed(5) + "\n";
        let mapsLink: string = "http://www.google.com/maps/place/"+this.currentLocation.lat+","+this.currentLocation.lng;
        /*
        //Test content
        let message: string =  "I am in trouble and need help.\n My current location is: \n"
        let mapsLink: string = "http://www.google.com/maps/place/47.07133,15.40682";
        */
        message = message.concat(mapsLink);

        for(var contact of this.contactService.contactList){
            this.sms.send(contact.telNumber,message);
        }

    }

}
