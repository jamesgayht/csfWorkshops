package com.day38.server.repositories;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Repository;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Repository
public class ContactRepository {

    public static final String C_CONTACT = "contact"; 

    @Autowired MongoTemplate mongoTemplate; 

    public void insertContact(JsonObject jsonObject) {
        // JsonObject toInsert = Json.createObjectBuilder()
        //                         .add("name", name)
        //                         .add("email", email)
        //                         .build();

        Document contact = Document.parse(jsonObject.toString());
        Document inserted = mongoTemplate.insert(contact, C_CONTACT); 
        System.out.println("inserting >>>" + inserted.toJson());
    }
    
}
