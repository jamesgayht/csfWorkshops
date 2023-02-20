package com.day38.server.controllers;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.day38.server.services.UploadService;

import jakarta.json.Json;
import jakarta.json.JsonArray;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;

@Controller
@RequestMapping
public class UploadController {

    @Autowired
    private UploadService uploadService; 
    
    @PostMapping(path = "/upload")
    @ResponseBody
    public ResponseEntity<String> postContact(@RequestBody String body) {
        
        System.out.println("hello world");
        JsonReader jsonReader = Json.createReader(new StringReader(body)); 
        JsonArray jsonArray = jsonReader.readArray(); 

        System.out.println(jsonArray);

        try {
            uploadService.upload(jsonArray); 
    
            // System.out.printf("uploaded: ", uploadService.upload(jsonArray));

        } catch (Exception e) {
            e.printStackTrace();
        }
        
        return ResponseEntity.ok("hey there i am yogost"); 
    }


}
