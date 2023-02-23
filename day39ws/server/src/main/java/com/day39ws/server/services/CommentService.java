package com.day39ws.server.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.day39ws.server.models.Comments;
import com.day39ws.server.repositories.CommentsRepo;

@Service
public class CommentService {
    
    @Autowired
    private CommentsRepo commentsRepo; 

    public List<Comments> getComments(Integer id) {
        return commentsRepo.findCommentsByCharacterId(id); 
    }

}
