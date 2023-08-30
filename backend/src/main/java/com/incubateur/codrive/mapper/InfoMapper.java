package com.incubateur.codrive.mapper;

import com.incubateur.codrive.dto.InfoDto;
import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.Info;
import com.incubateur.codrive.entity.Itinerary;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface InfoMapper {
    
    InfoMapper INSTANCE = Mappers.getMapper(InfoMapper.class);

    InfoDto toInfoDTO(Info info);

    Info toEntity(InfoDto infoDto);

    default Itinerary toItineraryEntity(InfoDto infoDto) {
        Itinerary itinerary = new Itinerary();
        itinerary.setCityStart(infoDto.getCityStart());
        itinerary.setCityEnd(infoDto.getCityEnd());
        itinerary.setStreetStart(infoDto.getStreetStart());
        itinerary.setStreetEnd(infoDto.getStreetEnd());
        itinerary.setZipStart(infoDto.getZipStart());
        itinerary.setZipEnd(infoDto.getZipEnd());
        itinerary.setKm(infoDto.getKm());
        itinerary.setArrivedTime(infoDto.getArrivedTime());
        return itinerary;
    }

    default Car toCarEntity(InfoDto infoDto) {
        Car car = new Car();
        car.setId(infoDto.getCar().getId());
        return car;
    }
}
