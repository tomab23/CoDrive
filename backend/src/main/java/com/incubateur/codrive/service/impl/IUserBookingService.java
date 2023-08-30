package com.incubateur.codrive.service.impl;

import com.incubateur.codrive.entity.UserBooking;

import java.util.List;

public interface IUserBookingService {
//    Integer countBooking(Long id);

    Integer countBookingDriver(Long id);

    Integer countBookingPassenger(Long id);

    UserBooking save(UserBooking userbooking);

    List<UserBooking> findAll();

}
