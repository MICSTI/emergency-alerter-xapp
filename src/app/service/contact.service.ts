import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { EmergencyContact } from '../model/Contact';


@Injectable()
export class ContactService {
    
    public contactList: EmergencyContact[];
    
    constructor(private storage: Storage) {
        this.loadContacts().then(contacts => {
            this.contactList = contacts || [];
        });
    }

    private loadContacts(): Promise<EmergencyContact[]>{
       return this.storage.get('contacts').then((val) => {
        let contacts: EmergencyContact[] = JSON.parse(val);
           return contacts;
       });
    }
    
    public getContacts(): EmergencyContact[]{
        return this.contactList;
    }
    
    //Return the updated list of contacts
    public addContact(newContact: EmergencyContact) {
        
        let checkList: EmergencyContact[] = this.contactList.filter(
            function(e){
                return e.telNumber === newContact.telNumber;
        });
        //check if number already in list
        if(checkList.length == 0){
            this.contactList.push(newContact);
            this.contactList.sort(function(first, second) {
                return first.name.localeCompare(second.name);
            });
            this.storage.set('contacts', JSON.stringify(this.contactList));
        }  
    }
        
    public deleteContact(contact: EmergencyContact){
        let index = this.contactList.indexOf(contact);
        if(index > -1){
            this.contactList.splice(index, 1);
            this.storage.set('contacts', JSON.stringify(this.contactList));
        }
    }
}
