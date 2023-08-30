package com.incubateur.codrive.service.impl;

import com.incubateur.codrive.entity.Booking;

import java.util.List;

public interface IBookingService {
    Booking save(Booking booking);

    Booking getBookingById (Long id);

    List<Booking> findAll();

    Integer sumKmDriver(Long id);

    Integer sumKmPassenger(Long id);

    Integer countPastTravelsDriver(Long id);

    Integer countPastTravelsPassenger(Long id);

}
