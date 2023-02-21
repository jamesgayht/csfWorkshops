package com.day37ws.server.services;

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
        
        // user data
        Map<String, String> userPost = new HashMap<>(); 
        userPost.put("uploadTime", new Date().toString()); 
        userPost.put("originalFileName", file.getOriginalFilename());

        // metadata of the file 
        ObjectMetadata metadata = new ObjectMetadata(); 
        metadata.setContentLength(file.getSize());
        metadata.setContentType(file.getContentType());
        metadata.setUserMetadata(userPost);

        String key = UUID.randomUUID().toString().substring(0, 8); 

        // create a post request
        PutObjectRequest putReq = new PutObjectRequest(
            "jackbucket",
            "myobject%s".formatted(key),
            file.getInputStream(),
            metadata); 

        putReq.withCannedAcl(CannedAccessControlList.PublicRead); 
        s3Client.putObject(putReq);
        
        return key; 

    }

    

}
