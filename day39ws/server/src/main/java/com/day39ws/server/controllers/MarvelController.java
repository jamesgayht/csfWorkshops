package com.day39ws.server.controllers;

import java.io.StringReader;
import java.util.List;
import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.MultiValueMap;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.day39ws.server.models.Character;
import com.day39ws.server.models.Comments;
import com.day39ws.server.repositories.CharactersCache;
import com.day39ws.server.repositories.CommentsRepo;
import com.day39ws.server.services.CommentService;
import com.day39ws.server.services.MarvelService;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonObjectBuilder;
import jakarta.json.JsonReader;
import jakarta.json.JsonString;

@Controller
@RequestMapping(path = "/api")
public class MarvelController {
    
    @Autowired
    private MarvelService marvelService;
    
    @Autowired
    private CommentService commentService;
    
    @Autowired
    private CharactersCache charactersCache;

    @Autowired
    private CommentsRepo commentsRepo;

    @GetMapping(path = "/characters", params = {"character"})
    public ResponseEntity<String> searchCharacters(@RequestParam String character) {
        return searchCharacters(character, 20, 0);
    }

    @GetMapping(path = "/characters")
    public ResponseEntity<String> searchCharacters(@RequestParam String character, @RequestParam Integer limit, @RequestParam Integer offset) {
        
        List<Character> results = null;

        Optional<List<Character>> opt = charactersCache.getCharacters("%s%d%d".formatted(character, limit, offset));

        if(opt.isEmpty()) {
            results = marvelService.searchCharacters(character, limit, offset);
            charactersCache.cacheCharacters("%s%d%d".formatted(character, limit, offset), results);
        }
        else {
            results = opt.get(); 
            System.out.println(">>> from cache <<<");
        }

        JsonArrayBuilder jsonArrayBuilder = Json.createArrayBuilder();

        for(Character c: results) {
            jsonArrayBuilder.add(c.toJson());
        }

        JsonArray resultArr = jsonArrayBuilder.build();

        System.out.println("result string >>> " + resultArr.toString());

        return ResponseEntity.ok(resultArr.toString()); 

    }

    @PostMapping(path = "/post")
    // public ResponseEntity<String> insertComment(@RequestParam Integer id, @RequestParam String comment) {
    public ResponseEntity<String> insertComment(@RequestBody String body) {

        JsonReader jsonReader = Json.createReader(new StringReader(body));
		JsonObject jsonObject = jsonReader.readObject();
		Integer id = jsonObject.getInt("id");
		String comment = jsonObject.getString("comment");

        System.out.printf("id >>> %d, comment >>> %s\n", id, comment);

        ObjectId objId = commentsRepo.insertComment(id, comment);
        
        return ResponseEntity
        .status(HttpStatus.ACCEPTED)
        .contentType(MediaType.APPLICATION_JSON)
        .body("{\"objectId\": \"%s\"}".formatted(objId.toString()));
    }

    @GetMapping(path = "/comments")
    public ResponseEntity<String> getComments(@RequestParam Integer id) {

        List<Comments> comments = commentService.getComments(id); 
        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder(); 
        comments.stream()
            .forEach(v -> {
                arrayBuilder.add(v.toJson());
            });

        return ResponseEntity.ok(arrayBuilder.build().toString()); 
    }

}
