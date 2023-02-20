package com.day39.server.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.day39.server.services.S3Service;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Controller
@RequestMapping
public class PostController {

    @Autowired
    private S3Service s3Service;

    @PostMapping(path="/upload", 
        consumes=MediaType.MULTIPART_FORM_DATA_VALUE, 
        produces=MediaType.APPLICATION_JSON_VALUE)
    @ResponseBody
    @CrossOrigin()
    public ResponseEntity<String> postUploadFromAngular(
        @RequestPart MultipartFile myImage,
        @RequestPart String title,
        @RequestPart String image,
        @RequestPart String comments) {

        System.out.printf("title: %s\n", title);
        System.out.printf("comments: %s\n", comments);
        System.out.printf("file name: %s\n", myImage.getOriginalFilename());
        System.out.printf("content type: %s\n", myImage.getContentType());

        String key = "";

        try {
            key = s3Service.upload(myImage);
        } catch (IOException ex) {
            ex.printStackTrace();
        }

        JsonObject payload = Json.createObjectBuilder()
            .add("imageKey", key)
            .build();

        return ResponseEntity.ok(payload.toString());
    }
    
}
