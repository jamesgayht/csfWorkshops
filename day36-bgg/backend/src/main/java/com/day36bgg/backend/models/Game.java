package com.day36bgg.backend.models;

import org.bson.Document;

import jakarta.json.Json;
import jakarta.json.JsonObject;

public class Game {
    
    private Integer id;
    private String name;

    @Override
    public String toString() {
        return "ID: %d, Name : %s ".formatted(id, name); 
    }

    public JsonObject toGame() {
        return Json.createObjectBuilder()
            .add("id", id)
            .add("name", name)
            .build();
    }

    public static Game createGame(Document document) {
        Game game = new Game(); 
        game.setId(document.getInteger("gid"));
        game.setName(document.getString("name"));
        return game; 
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

}
