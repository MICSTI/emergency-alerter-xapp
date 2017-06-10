import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ContactService} from '../../app/service/contact.service';
import { EmergencyContact } from "../../app/model/Contact";
import { Contacts, Contact} from '@ionic-native/contacts';
 
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',

})
export class ContactsPage {
        
  constructor(public navCtrl: NavController, private contactService: ContactService, private contacts: Contacts) {  }
  
  addContact(){
    this.contacts.pickContact().then((contact : Contact) => {
        let newContact: EmergencyContact = new EmergencyContact();
        newContact.name = contact.displayName;
        newContact.telNumber = contact.phoneNumbers[0].value;
        this.contactService.addContact(newContact);
    }).catch((error) =>{
        console.log('No contact added');
    });
      
  }
  
  deleteContact(contact: EmergencyContact){
    this.contactService.deleteContact(contact);
  }
}
