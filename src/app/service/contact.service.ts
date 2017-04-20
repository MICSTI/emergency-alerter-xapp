import { Injectable } from '@angular/core';

import { Storage } from '@ionic/storage';
import { Contact } from '../model/Contact';


@Injectable()
export class ContactService {
    
    public contactList: Contact[]=[];
    
    constructor(private storage: Storage) {
        this.loadContacts().then(contacts => {
            this.contactList = contacts;
        });
    }

    private loadContacts(): Promise<Contact[]>{
       return this.storage.get('contacts').then((val) => {
            let contacts: Contact[] = JSON.parse(val);
           return contacts;
       });
    }
    
    public getContacts(): Contact[]{
        return this.contactList;
    }
    
    //Return the updated list of contacts
    public addContact(newContact: Contact) {
        this.contactList.push(newContact);
        this.contactList.sort(function(first, second) {
            return first.name.localeCompare(second.name);
        });
        this.storage.set('contacts', JSON.stringify(this.contactList));
        
    }
    
    public deleteContact(contact: Contact){
        let index = this.contactList.indexOf(contact);
        if(index > -1){
            this.contactList.splice(index, 1);
            this.storage.set('contacts', JSON.stringify(this.contactList));
        }
    }
}
