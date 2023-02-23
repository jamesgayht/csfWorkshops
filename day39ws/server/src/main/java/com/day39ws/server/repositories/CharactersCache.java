package com.day39ws.server.repositories;

import java.io.StringReader;
import java.time.Duration;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Repository;

import com.day39ws.server.models.Character;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Repository
public class CharactersCache {
    
    @Autowired @Qualifier("characters")
    private RedisTemplate<String, String> redisTemplate; 

    public void cacheCharacters (String key, List<Character> values) {
        
        ValueOperations<String, String> ops = redisTemplate.opsForValue();

        JsonArrayBuilder arrayBuilder = Json.createArrayBuilder(); 
        values.stream()
            .forEach(c -> {
                arrayBuilder.add(c.toJson()); 
            });
        
        ops.set(key, arrayBuilder.build().toString());
        Duration.ofMinutes(60); 
    }

    public Optional<List<Character>> getCharacters (String name) {

        ValueOperations<String, String> ops = redisTemplate.opsForValue(); 
        String value = ops.get(name); 
        
        if(null == value) 
            return Optional.empty(); 
        
        JsonReader jsonReader = Json.createReader(new StringReader(value)); 
        JsonArray results = jsonReader.readArray(); 

        List<Character> characters = results.stream()
            .map(v -> (JsonObject)v)
            .map(v -> Character.fromCache(v))
            .toList(); 

        return Optional.of(characters); 
    }

}
