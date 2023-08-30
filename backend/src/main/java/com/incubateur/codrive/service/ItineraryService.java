package com.incubateur.codrive.service;

import com.incubateur.codrive.entity.Itinerary;
import com.incubateur.codrive.repository.ItinenaryRepository;
import com.incubateur.codrive.service.impl.IItineraryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ItineraryService implements IItineraryService{

    @Autowired
    private ItinenaryRepository itinenaryRepository;
    @Override
    public Itinerary save(Itinerary itinerary) {
        return itinenaryRepository.save(itinerary);
    }

}
