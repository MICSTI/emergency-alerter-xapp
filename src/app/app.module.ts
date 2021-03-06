import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { AboutPage } from '../pages/about/about';
import { ContactsPage } from '../pages/settings/contacts';
import { MapPage } from '../pages/map/map';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { PoliceStationService } from './service/police-station.service';
import { LocationService } from './service/location.service';
import { ContactService } from './service/contact.service';
import { GoogleMaps } from "../providers/google-maps";
import { IonicStorageModule } from '@ionic/storage';
import { Contacts } from '@ionic-native/contacts';
import { SMS } from '@ionic-native/sms';
import { Geolocation } from '@ionic-native/geolocation';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactsPage,
    HomePage,
    MapPage,
    TabsPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot({name: '__contacts'})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactsPage,
    HomePage,
    MapPage,
    TabsPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},Geolocation, PoliceStationService, LocationService, GoogleMaps, ContactService, Contacts, SMS]
})
export class AppModule {}
