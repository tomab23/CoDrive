package com.incubateur.codrive.service;

import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.Info;
import com.incubateur.codrive.repository.InfoRepository;
import com.incubateur.codrive.service.impl.IInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

@Service
public class InfoService implements IInfoService {


    @Autowired
    private InfoRepository infoRepository;

    @Override
    public List<Info> getsearch(String start, String end, LocalDate date, Integer place) {
        return infoRepository.search(start, end, date, place);
    }

    @Override
    public Info getInfoTravel(Long id) {
        return infoRepository.getReferenceById(id);
    }


    @Override
    public Integer countTravel(Long id) {
        return infoRepository.countTravel(id);
    }

    public Optional<List<Info>> carrousel() {
        return infoRepository.carrousel();
    }

    public Optional<List<Info>> getInfo() {
        return infoRepository.getInfo();
    }
    @Override
    public Info save(Info info) {
        return infoRepository.save(info);
    }

    @Override
    public Info save(Car car) {
        return infoRepository.save(car);
    }

    @Override
    public Info getInfoById(Long infoId) {
        return getInfoById(infoId);
    }

    @Override
    public List<Info> nextTwoTravels(Long id) {
        return infoRepository.nextTwoTravels(id);
    }

    @Override
    public List<Info> nextTwoBookings(Long id) {
        return infoRepository.nextTwoBookings(id);
    }

    @Override
    public void savePlaces(Info info) {
        infoRepository.saveAndFlush(info);
    }

    @Override
    public List<Info> allTravelByUserId(Long userId) {
        return infoRepository.allTravelByUserId(userId);
    }

    @Override
    public List<Info> findAll() {
        return infoRepository.findAll();
    }


}