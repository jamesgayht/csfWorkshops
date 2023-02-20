package com.day36bgg.backend.controllers;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.day36bgg.backend.models.GameDetails;
import com.day36bgg.backend.services.GameService;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;

@Controller
@RequestMapping(path = "/api")
public class GameController {

    @Autowired
    private GameService gameService;

    @GetMapping(path = "/games")
    @ResponseBody
    public ResponseEntity<String> getGames() {
        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();
        gameService.getGames().stream()
                .forEach(v -> {
                    jsonArrayBuilder.add(v.toGame());
                });
        return ResponseEntity.ok(jsonArrayBuilder.build().toString());
    }

    @GetMapping(path = "/game/{id}")
    @ResponseBody
    public ResponseEntity<String> getGameById(@PathVariable Integer id) {
        Optional<GameDetails> opt = gameService.getGameById(id);
        if (opt.isEmpty()) {
            return ResponseEntity.status(404)
                    .body(
                            Json.createObjectBuilder()
                                    .add("message", "Unable to find game id %d".formatted(id))
                                    .build().toString());
        }
        
        return ResponseEntity.ok(opt.get().toGameDetails().toString());
    }
}
