package com.incubateur.codrive.mapper;

import com.incubateur.codrive.dto.ItineraryDto;
import com.incubateur.codrive.entity.Info;
import com.incubateur.codrive.entity.Itinerary;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;
@Mapper
public interface ItineraryMapper {
    ItineraryMapper INSTANCE = Mappers.getMapper(ItineraryMapper.class);
    ItineraryDto toEntityDTO(ItineraryDto itineraryDto);
    Itinerary toEntity(ItineraryDto itineraryDto);

}
