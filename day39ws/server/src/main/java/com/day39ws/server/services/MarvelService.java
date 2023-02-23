package com.day39ws.server.services;

import java.io.StringReader;
import java.security.MessageDigest;
import java.util.HexFormat;
import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.day39ws.server.models.Character;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Service
public class MarvelService {
    
    public static final String URL_CHARACTERS = "https://gateway.marvel.com/v1/public/characters";

    public static final String ATTRIBUTION = "Data provided by Marvel. © 2022 MARVEL";

    @Value("${MARVEL_PUBLIC_KEY}")
    private String publicKey; 

    @Value("${MARVEL_PRIVATE_KEY}")
    private String privateKey; 

    public List<Character> searchCharacters(String name, Integer limit, Integer offset) {

        if(limit == null || limit <= 0) {
            limit = 20; 
        }
        
        if(offset == null || offset < 0) {
            offset = 0; 
        }
        
        Long ts = System.currentTimeMillis(); 
        String signature = "%d%s%s".formatted(ts, privateKey, publicKey); 
        String hash = "";

        try {

            // get an instance of MD5
            MessageDigest md5 = MessageDigest.getInstance("MD5");

            // calculate our hash & update our message digest
            md5.update(signature.getBytes());

            // get the md5 digest
            byte[] h = md5.digest(); 

            // stringify the md5 digest
            hash = HexFormat.of().formatHex(h);

        } catch (Exception e) {
            e.printStackTrace();
        }

        String url = UriComponentsBuilder.fromUriString(URL_CHARACTERS)
            .queryParam("nameStartsWith", name)
            .queryParam("limit", limit)
            .queryParam("offset", offset)
            .queryParam("ts", ts)
            .queryParam("apikey", publicKey)
            .queryParam("hash", hash)
            .toUriString();

        System.out.printf("url = %s\n", url);

        // use the url to make a call to marvel
        RequestEntity<Void> req = RequestEntity.get(url)
            .accept(MediaType.APPLICATION_JSON)
            .build();
            
        RestTemplate restTemplate = new RestTemplate(); 
        ResponseEntity<String> resp = restTemplate.exchange(req, String.class); 

        String payload = resp.getBody(); 

        // parse the string to jsonObject
        JsonReader jsonReader = Json.createReader(new StringReader(payload));

        // {data: {results: [ ] } }
        JsonObject results = jsonReader.readObject(); 
        // System.out.println("results >>> " + results.toString());
        
        JsonArray data = results.getJsonObject("data").getJsonArray("results");
        // System.out.println("data >>> " + data.toString());
        
        // retrieve the name description, image
        List<Character> characters = new LinkedList<>(); 
        
        for(Integer i=0; i<data.size(); i++) {
            characters.add(Character.createCharacter(data.getJsonObject(i)));
        }

        // System.out.printf(">>>> Super heroes: %s\n", characters.toString());
        
        return characters;

        // stream method
        // return data.stream()
        //         .map(v -> (JsonObject)v)
        //         .map(jo -> Character.createCharacter(jo))
        //         .toList(); 

    }


}
