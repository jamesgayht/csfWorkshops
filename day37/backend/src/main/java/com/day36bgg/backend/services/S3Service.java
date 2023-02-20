package com.day36bgg.backend.services;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;

@Service
public class S3Service {
    
    @Autowired
    private AmazonS3 s3Client; 

    public String upload(MultipartFile file) throws IOException {

        // create our own user data to help with searching
        Map<String, String> userData = new HashMap<>(); 
        userData.put("name", "jack");
        userData.put("originalFileName", file.getOriginalFilename());
        userData.put("uploadTime", new Date().toString()); 

        //metadata of the file 
        ObjectMetadata metadata = new ObjectMetadata(); 
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        metadata.setUserMetadata(userData);

        String key = UUID.randomUUID().toString().substring(0, 8); 

        // create a put request 
        PutObjectRequest putRequest = new PutObjectRequest(
            "jackbucket", //bucket name 
            "myobject/%s".formatted(key), //creates a directory myobject and places the item into the directory
            file.getInputStream(), //inputstream
            metadata);

        //only if you want to allow public access
        putRequest.withCannedAcl(CannedAccessControlList.PublicRead); 

        s3Client.putObject(putRequest); 

        return key; 
    }
}
