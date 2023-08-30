package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.Itinerary;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ItinenaryRepository extends JpaRepository<Itinerary, Long> {

    @Override
    Itinerary save(Itinerary itinerary);
}


