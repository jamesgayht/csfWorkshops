package com.day36bgg.backend.repositories;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

import com.day36bgg.backend.models.Game;
import com.day36bgg.backend.models.GameDetails;

@Repository
public class GameRepo {
    
    public static final String C_GAMES = "games"; 
    public static final String C_COMMENTS = "comments"; 

    @Autowired
    private MongoTemplate mongoTemplate; 

    public List<Game> findGames() {
        List<Document> results = mongoTemplate.find(new Query().limit(20).skip(0), Document.class, C_GAMES); 

        List<Game> games = new LinkedList<>(); 

        for(Document d: results) {
            games.add(Game.createGame(d)); 
        }
        System.out.println("games >>> " + games.toString());

        return games; 
    }

    public Optional<GameDetails> findGameById(Integer id) {
        
        Criteria criteria = Criteria.where("gid").is(id); 
        Query query = Query.query(criteria); 
        List<Document> results = mongoTemplate.find(query, Document.class, C_GAMES); 
        GameDetails gameDetails = new GameDetails(); 

        Document document = results.iterator().next(); 
        gameDetails = GameDetails.createGameDetails(document); 

        System.out.println("Game details >>> " + gameDetails.toString());
        
        if(!results.iterator().hasNext()) {
            return Optional.empty();
        }

        return Optional.of(gameDetails); 
    }

    
}
