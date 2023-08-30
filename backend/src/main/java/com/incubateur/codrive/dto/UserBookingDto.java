package com.incubateur.codrive.dto;

import com.incubateur.codrive.entity.Booking;
import com.incubateur.codrive.entity.User;
import lombok.Data;

@Data
public class UserBookingDto {

    private User user;

    private Booking booking;
}
