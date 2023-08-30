package com.incubateur.codrive.service;

import com.incubateur.codrive.entity.UserBooking;
import com.incubateur.codrive.repository.UserBookingRepository;
import com.incubateur.codrive.service.impl.IUserBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
public class UserBookingService implements IUserBookingService {

    @Autowired
    private UserBookingRepository userBookingRepository;
//    @Override
//    public Integer countBooking(Long id) {
//        return userBookingRepository.countBooking(id);
//    }

    @Override
    public Integer countBookingDriver(Long id) {
        return userBookingRepository.countBookingDriver(id);
    }

    @Override
    public Integer countBookingPassenger(Long id) {
        return userBookingRepository.countBookingPassenger(id);
    }

    @Override
    public UserBooking save(UserBooking userbooking) {
        return userBookingRepository.save(userbooking);
    }

    @Override
    public List<UserBooking> findAll() {
        return userBookingRepository.findAll();
    }


}
