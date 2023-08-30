package com.incubateur.codrive.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.Itinerary;
import com.incubateur.codrive.entity.User;
import lombok.Data;
import org.springframework.cglib.core.Local;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class InfoDto {

    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDate dateStarting;

    private Integer placeAvailable;

    private Integer bigBaggageNbr;

    private Integer smallBaggageNbr;

    private Integer price;

    private LocalTime hour;

    private User user;

    private Boolean music;

    private boolean smoking;

    private boolean discuss;

    private Car car;

    private Itinerary itinerary;

    private String zipStart;

    private String zipEnd;

    private String cityStart;

    private String cityEnd;

    private String streetStart;

    private String streetEnd;

    private Double km;

    private LocalTime arrivedTime;

}
