package com.incubateur.codrive.service;

import com.incubateur.codrive.entity.Booking;
import com.incubateur.codrive.repository.BookingRepository;
import com.incubateur.codrive.service.impl.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookingService implements IBookingService {

    @Autowired
    private BookingRepository bookingRepository;
    @Override
    public Booking save(Booking booking) {
        return bookingRepository.save(booking);
    }

    @Override
    public Booking getBookingById(Long id) {
        return bookingRepository.getReferenceById(id);
    }

    /**
     * get List of all {@link Booking}.
     * @return List of {@link Booking}
     */
    @Override
    public List<Booking> findAll() {
        return bookingRepository.findAll();
    }

    /**
     * get sum of number km travels past for User connect.
     * @param id User connect
     * @return Integer
     */
    @Override
    public Integer sumKmDriver(Long id) {
        return bookingRepository.sumKmDriver(id);
    }

    /**
     * get sum of number km reserved past for User connect.
     * @param id User connect
     * @return Integer
     */
    @Override
    public Integer sumKmPassenger(Long id) {
        return bookingRepository.sumKmPassenger(id);
    }

    /**
     * get count numbers of travel for User connect.
     * @param id User connect
     * @return Integer
     */
    @Override
    public Integer countPastTravelsDriver(Long id) {
        return bookingRepository.countPastTravelsDriver(id);
    }

    /**
     * get count numbers of booking for User connect.
     * @param id User connect
     * @return Integer
     */
    @Override
    public Integer countPastTravelsPassenger(Long id) {
        return bookingRepository.countPastTravelsPassenger(id);
    }

}
