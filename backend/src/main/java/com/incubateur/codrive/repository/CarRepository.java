package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.ColorCar;
import com.incubateur.codrive.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;
@Repository
public interface CarRepository extends JpaRepository<Car, Long> {
  public Car findByUser(User user);

  List<Car> findByUserId(Long userId);

  Optional<Car> findById(Long carId);

  Car save(Car car);

  Car save(ColorCar colorCar);

  Car save(User user);
}