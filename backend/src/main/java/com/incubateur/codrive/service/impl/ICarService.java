package com.incubateur.codrive.service.impl;

import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.ColorCar;
import com.incubateur.codrive.entity.User;

import java.util.List;
import java.util.Optional;

public interface ICarService {
    Car getCarUser(User user);

    List<Car> findByUserId(Long userId);

    Optional<Car> findById(Long carId);

    Car getInfoCar(Long id);

    Car save(Car car);

    Car save(ColorCar colorCar);

    Car save(User user);
}