package com.incubateur.codrive.mapper;

import com.incubateur.codrive.dto.CarDto;
import com.incubateur.codrive.dto.InfoDto;
import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.ColorCar;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
@Mapper
public interface CarMapper {
    CarMapper INSTANCE = Mappers.getMapper(CarMapper.class);
    CarDto toCarDTO(Car car);
    Car toEntity(CarDto carDto);

    default ColorCar toColorCarEntity(CarDto carDto) {
        ColorCar colorCar = new ColorCar();
        colorCar.setId(carDto.getColorCar().getId());
        return colorCar;
    }

    default CarDto toCarDtoWithColor(Car car) {
        CarDto carDto = new CarDto();
        carDto.setId(car.getId());
        carDto.setBrand(car.getBrand());
        carDto.setDoor(car.isDoor());
        carDto.setAirConditioner(car.isAirConditioner());
        carDto.setChest(car.isChest());
        carDto.setColorCar(car.getColor());
        carDto.setCarColor(car.getColor().getColor());
        return carDto;
    }

}
