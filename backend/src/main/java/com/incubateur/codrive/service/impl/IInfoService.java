package com.incubateur.codrive.service.impl;

import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.Info;
import org.springframework.data.repository.query.Param;

import java.time.LocalDate;
import java.util.List;


public interface IInfoService {
    List<Info> getsearch(String start, String end, LocalDate date, Integer place);

    Info getInfoTravel(Long id);

    Integer countTravel(Long id);

    Info save(Info info);

    Info save(Car car);

    Info getInfoById(Long infoId);

    List<Info> nextTwoTravels(Long id);

    List<Info> nextTwoBookings(Long id);

    void savePlaces(Info info);

    List<Info> allTravelByUserId(Long userId);

    List<Info> findAll();



}
