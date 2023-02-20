import { Injectable } from "@angular/core";
import Dexie from "dexie";
import { Contact } from "./models";

@Injectable()
export class ContactRepository extends Dexie {

    // type of table and primary key <Contact, string> 
    contact!: Dexie.Table<Contact, string> 

    constructor() {
        // name of the database
        super('contactdb')
        this.version(1).stores({
            // contact table with email as the primary key
            contact: 'email'
        })

        this.contact = this.table('contact')
    }

    addContact(contact: Contact): Promise<string> {
        // returns a promise, which is the key 
        return this.contact.add(contact) 
    }

    getAllContacts(): Promise<Contact[]> {
        console.info("retrieving all contacts >>> ", this.contact.toArray())
        return this.contact.orderBy('email').toArray()
    }

}