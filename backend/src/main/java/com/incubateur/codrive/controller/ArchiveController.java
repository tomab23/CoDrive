package com.incubateur.codrive.controller;

import com.incubateur.codrive.entity.ArchiveBooking;
import com.incubateur.codrive.entity.ArchiveCommentary;
import com.incubateur.codrive.repository.ArchiveBookingRepository;
import com.incubateur.codrive.service.impl.IBookingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDate;

@RestController
@SpringBootApplication
@RequestMapping("/archive")
public class ArchiveController {

    @Autowired
    ArchiveBookingRepository archiveBookingRepository;


    record newBookingArchive(
            Integer credits,
            Integer place,
            String status,
            String firstname,
            String lastname,
            String reference,
            Long infoId,
            Long userId
    ) {}

    @PostMapping
    public void addArchive(@RequestBody ArchiveController.newBookingArchive request){
        ArchiveBooking archive = new ArchiveBooking();
        archive.setFirstname(request.firstname());
        archive.setLastname(request.lastname());
        archive.setCredits(request.credits());
        archive.setPlace(request.place());
        archive.setStatus(request.status());
        archive.setReference(request.reference());
        archive.setInfoId(request.infoId());
        archive.setUserId(request.userId());
        archiveBookingRepository.saveAndFlush(archive);
    }
}
