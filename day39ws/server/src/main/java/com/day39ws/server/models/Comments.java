package com.day39ws.server.models;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Comments {

    private Integer id;
    private String comment;

    public static Comments createComments(Document doc) {
        Comments comments = new Comments(); 
        comments.setId(doc.getInteger("id"));
        comments.setComment(doc.getString("comment"));
        return comments;
    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("id", id)
            .add("comment", comment)
            .build();
            
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

}
