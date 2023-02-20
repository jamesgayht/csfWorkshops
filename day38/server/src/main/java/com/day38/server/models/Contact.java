package com.day38.server.models;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Contact {

    public static Contact fromPayLoad(JsonObject doc) {
        final Contact contact = new Contact(); 
        contact.setName(doc.getString("name"));
        contact.setEmail(doc.getString("email"));
        return contact; 
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
                .add("name", name)
                .add("email", email)
                .build(); 
    }

    private String name;
    private String email;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}
