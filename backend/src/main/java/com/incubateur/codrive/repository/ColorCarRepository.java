package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.ColorCar;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ColorCarRepository extends JpaRepository<ColorCar, Long> {
    ColorCar save(ColorCar colorCar);

    List<ColorCar> findAll();
}
