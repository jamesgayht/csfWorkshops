package com.day37ws.server.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.day37ws.server.services.S3Service;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Controller
@RequestMapping
public class UploadController {
    
    @Autowired
    private S3Service s3Service; 

    @PostMapping(path = "/uploadNG", consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<String> postUploadFromAngular(
        @RequestPart MultipartFile file,
        @RequestPart String comments
    ) {

        System.out.printf("comments: %s\n", comments);
        System.out.printf("file name: %s\n", file.getOriginalFilename());
        System.out.printf("content type: %s\n", file.getContentType());

        String key = "";

        try {
            key = s3Service.upload(file);
            System.out.println("angular upload key >>> " + key);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }
        
        JsonObject payload = Json.createObjectBuilder()
            .add("imageKey", key)
            .build(); 

        return ResponseEntity.ok(payload.toString()); 
    }

    // within springboot using thymeleaf
    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String postUpload(MultipartFile file, @RequestPart String comments, Model model) {

        String key = ""; 

        try {
            key = s3Service.upload(file);
            System.out.println("key >>> " + key);
        } catch (IOException ioe) {
            ioe.printStackTrace();
            System.out.println("error >>> " + ioe.toString());
        }

        model.addAttribute("file", file);
        model.addAttribute("comments", comments);
        model.addAttribute("key", "myobject%s".formatted(key));

        return "upload"; 

    }

}
