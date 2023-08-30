package com.incubateur.codrive.mapper;

import com.incubateur.codrive.dto.BookingDto;
import com.incubateur.codrive.dto.CommentaryDto;
import com.incubateur.codrive.entity.Booking;
import com.incubateur.codrive.entity.Commentary;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface BookingMapper {

    BookingMapper INSTANCE = Mappers.getMapper(BookingMapper.class);

    BookingDto toBookingDto(Booking booking);

    Booking toBookingEntity(BookingDto bookingDto);
}
