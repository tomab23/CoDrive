package com.incubateur.codrive.service;

import com.incubateur.codrive.entity.ColorCar;
import com.incubateur.codrive.repository.ColorCarRepository;
import com.incubateur.codrive.service.impl.IColorCarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ColorCarService implements IColorCarService {
    @Autowired
    private ColorCarRepository colorCarRepository;
    @Override
    public ColorCar save(ColorCar colorCar) {
        return colorCarRepository.save(colorCar);
    }

    @Override
    public List<ColorCar> findAll() {
        return colorCarRepository.findAll();
    }
}
