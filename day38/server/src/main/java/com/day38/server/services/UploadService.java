package com.day38.server.services;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.day38.server.models.Contact;
import com.day38.server.repositories.ContactRepository;

import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

@Service
public class UploadService {

    @Autowired
    private ContactRepository contactRepo; 
    
    public String upload(JsonArray jsonArray) {

        List<Contact> contacts = new LinkedList<>(); 

        contacts = jsonArray.stream()
                    .map(v -> (JsonObject) v)
                    .map(v -> Contact.fromPayLoad(v))
                    .toList();

        for(int i=0; i<contacts.size(); i++) {

            System.out.println(">>> inserting " + contacts.get(i).toJson().toString());

            contactRepo.insertContact(contacts.get(i).toJson());
            
            i++;
        }
        
        return "inserted"; 
    }

}
