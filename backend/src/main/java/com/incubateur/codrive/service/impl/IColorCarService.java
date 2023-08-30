package com.incubateur.codrive.service.impl;

import com.incubateur.codrive.entity.ColorCar;

import java.util.List;

public interface IColorCarService {
    ColorCar save(ColorCar colorCar);

    List<ColorCar> findAll();
}
