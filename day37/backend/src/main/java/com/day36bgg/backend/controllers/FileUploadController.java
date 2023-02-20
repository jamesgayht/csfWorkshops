package com.day36bgg.backend.controllers;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import com.day36bgg.backend.services.S3Service;

@Controller
@RequestMapping
public class FileUploadController {
    
    @Autowired
    private S3Service s3Service; 

    @PostMapping(path = "/upload", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public String postUpload(@RequestPart MultipartFile file, @RequestPart String name, Model model) {

        String key = ""; 

        try {
            key = s3Service.upload(file);
        } catch (IOException ioe) {
            ioe.printStackTrace();
        }

        model.addAttribute("name", name);
        model.addAttribute("file", file);
        model.addAttribute("key", "myobject/%s".formatted(key));
        System.out.println("key >>> " + "myobject/%s".formatted(key));
        return "upload"; 
    }
}
