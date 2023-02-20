package com.day36bgg.backend.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.day36bgg.backend.models.Game;
import com.day36bgg.backend.models.GameDetails;
import com.day36bgg.backend.repositories.GameRepo;

@Service
public class GameService {
    
    @Autowired
    private GameRepo gameRepo; 

    public List<Game> getGames() {
        return gameRepo.findGames(); 
    }

    public Optional<GameDetails> getGameById(Integer id) {
        return gameRepo.findGameById(id); 
    }
}
