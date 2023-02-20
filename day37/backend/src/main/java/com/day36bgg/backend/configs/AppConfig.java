package com.day36bgg.backend.configs;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.amazonaws.auth.AWSStaticCredentialsProvider;
import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.client.builder.AwsClientBuilder.EndpointConfiguration;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3ClientBuilder;

@Configuration
public class AppConfig {
    
    // get the keys
    @Value("${ACCESS_KEY}")
    private String accessKey;

    @Value("${SECRET_KEY}")
    private String secretKey;

    @Bean
    public AmazonS3 createS3Client() {
        BasicAWSCredentials credentials = new BasicAWSCredentials(accessKey, secretKey); 

        // service end point and the region
        EndpointConfiguration ep = new EndpointConfiguration("sgp1.digitaloceanspaces.com", "sgp1"); 

        return AmazonS3ClientBuilder.standard()
                .withEndpointConfiguration(ep)
                .withCredentials(new AWSStaticCredentialsProvider(credentials))
                .build();
    }

}
