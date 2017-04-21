import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactService} from '../../app/service/contact.service';
import { EmergencyContact } from "../../app/model/Contact";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
    
})
export class SettingsPage {
        
  constructor(public navCtrl: NavController, private contactService: ContactService) {  }
  
  addContact(){
    this.contactService.addContact({'name': 'anton', 'telNumber': '4321'});
  }
  
  deleteContact(contact: EmergencyContact){
    this.contactService.deleteContact(contact);
  }
  

}
