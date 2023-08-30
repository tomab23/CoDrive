package com.incubateur.codrive.service;

import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.ColorCar;
import com.incubateur.codrive.entity.User;
import com.incubateur.codrive.repository.CarRepository;
import com.incubateur.codrive.service.impl.ICarService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


import java.util.List;
import java.util.Optional;

@Service
public class CarService implements ICarService {
    @Autowired
    private CarRepository carRepository;

    @Override
    public Car getCarUser(User user) {
        return carRepository.findByUser(user);
    }

    @Override
    public Car getInfoCar(Long id) {
        return carRepository.getReferenceById(id);
    }
    @Override
    public List<Car> findByUserId(Long userId) {
        return carRepository.findByUserId(userId);
    }
    @Override
    public Optional<Car> findById(Long carId) {
        return carRepository.findById(carId);
    }

    @Override
    public Car save(Car car){return carRepository.save(car);}

    @Override
    public Car save(ColorCar colorCar) {
        return carRepository.save(colorCar);
    }

    @Override
    public Car save(User user) {
        return carRepository.save(user);
    }
}