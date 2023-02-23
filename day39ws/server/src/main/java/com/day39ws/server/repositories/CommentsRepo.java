package com.day39ws.server.repositories;

import java.util.List;

import org.bson.Document;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.day39ws.server.models.Comments;

import jakarta.json.Json;
import jakarta.json.JsonObject;

@Repository
public class CommentsRepo {
    
    public static final String C_COMMENTS = "comments";

    @Autowired
    private MongoTemplate mongoTemplate; 

    public ObjectId insertComment(Integer id, String comment) {
        
        JsonObject toInsert = Json.createObjectBuilder()
            .add("id", id)
            .add("comment", comment)
            .build();

        Document commentDoc = Document.parse(toInsert.toString());

        System.out.printf("commentDoc >>> %s, C_COMMENTS >>>> %s", commentDoc.toString(), C_COMMENTS);

        Document inserted = mongoTemplate.insert(commentDoc, C_COMMENTS);
        
        System.out.println("inserted >>> " + inserted.toJson());

        return inserted.getObjectId("_id");

    }  
    
    public List<Comments> findCommentsByCharacterId(Integer id) {
        Criteria criteria = Criteria.where("id").is(id); 
        Query query = Query.query(criteria); 
        return mongoTemplate.find(query, Document.class, C_COMMENTS)
            .stream()
            .map(v -> {
                return Comments.createComments(v);
            })
            .toList();
    }

}
