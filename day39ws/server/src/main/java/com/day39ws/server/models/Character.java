package com.day39ws.server.models;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;

public class Character {

    private Integer id;
    private String name;
    private String description;
    private String image;
    private String details;

    public static Character fromCache(JsonObject jsonObject) {

        final Character character = new Character(); 
        character.setId(jsonObject.getInt("id"));
        character.setName(jsonObject.getString("name"));
        character.setDescription(jsonObject.getString("description"));
        character.setImage(jsonObject.getString("image"));
        character.setDetails(jsonObject.getString("details"));
        return character;

    }

    public JsonObject toJson() {
        return Json.createObjectBuilder()
            .add("id", id)
            .add("name", name)
            .add("description", description)
            .add("image", image)
            .add("details", details)
            .build();
    }

    public static Character createCharacter(JsonObject jsonObject) {
        
        Character character = new Character(); 
        character.setId(jsonObject.getInt("id"));
        character.setName(jsonObject.getString("name"));
        character.setDescription(jsonObject.getString("description"));

        JsonObject img = jsonObject.getJsonObject("thumbnail"); 
        character.setImage("%s.%s".formatted(img.getString("path"), img.getString("extension")));
        
        JsonArray urls = jsonObject.getJsonArray("urls");
        for(Integer i=0; i<urls.size(); i++) {
            JsonObject jo = urls.getJsonObject(i);
            if(jo.getString("type").equals("detail")) {
                character.setDetails(jo.getString("url"));
            }
        } 

        return character;
    }

    @Override
    public String toString() {
        return "SuperHero {id=%d, name=%s, description=%s, image=%s, details=%s}"
                .formatted(id, name, description, image, details);
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public String getDetails() {
        return details;
    }

    public void setDetails(String details) {
        this.details = details;
    }

}
