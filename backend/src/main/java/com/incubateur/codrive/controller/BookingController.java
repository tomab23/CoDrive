package com.incubateur.codrive.controller;

import com.incubateur.codrive.dto.BookingDto;
import com.incubateur.codrive.dto.UserBookingDto;
import com.incubateur.codrive.entity.*;
import com.incubateur.codrive.enums.StatusBooking;
import com.incubateur.codrive.repository.InfoRepository;
import com.incubateur.codrive.repository.UserBookingRepository;
import com.incubateur.codrive.service.BookingService;
import com.incubateur.codrive.service.InfoService;
import com.incubateur.codrive.service.UserBookingService;
import com.incubateur.codrive.service.UserService;
import jakarta.annotation.Nullable;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.*;
import java.util.stream.Collectors;

@RestController
@SpringBootApplication
@RequestMapping("/booking")
public class BookingController {

    @Autowired
    BookingService bookingService;

    @Autowired
    InfoRepository infoRepository;
    @Autowired
    UserService userService;

    @Autowired
    InfoService infoService;

    @Autowired
    UserBookingService userBookingService;

    @Autowired
    UserBookingRepository userBookingRepository;


    /**
     * Create new {@link Booking} and return new {@link UserBooking} link with is {@link Booking} and {@link User}
     * @param userDetails {@link User} connect.
     * @param dto {@link BookingDto}
     * @return UserBooking new {@link UserBooking}
     */
    @PostMapping("/reservation")
    public UserBooking newBooking (@AuthenticationPrincipal @NonNull UserDetails userDetails, @RequestBody BookingDto dto) {

        Booking newBooking = new Booking();
        UserBooking userBooking = new UserBooking();

        User user = userService.getUserByMail(userDetails.getUsername());
        Info infoId = infoService.getInfoTravel(dto.getInfo().getId());

        newBooking.setInfo(infoId);
        newBooking.setPlace(Integer.valueOf(dto.getPlace()));
        newBooking.setCredits(Integer.valueOf(dto.getCredits()));
        newBooking.setStatus(StatusBooking.WAITING);

        userBooking.setUser(user);
        userBooking.setBooking(newBooking);
        userBooking.setReference(userBooking.getReference());

        bookingService.save(newBooking);

        return userBookingService.save(userBooking);
    }

    @PutMapping("/accepted/{id}")
    public Booking bookingAccepted(@PathVariable("id") Long id) {

        Booking booking = bookingService.getBookingById(id);

        booking.setStatus(StatusBooking.ACCEPTED);

        return bookingService.save(booking);
    }

    @PutMapping("/refused/{id}")
    public Booking bookingRefused(@PathVariable("id") Long id) {

        Booking booking = bookingService.getBookingById(id);

        booking.setStatus(StatusBooking.REFUSED);

        return bookingService.save(booking);
    }

    /**
     * Get list of {@link UserBooking} for the {@link User} connect. Is reservations
     * @param userDetails {@link User} connect
     * @param status String for {@link StatusBooking} WAITING or ACCEPTED or REFUSED
     * @param date String for filter by {@link Info} DateStarting past or future or null
     * @return List of {@link UserBooking} about variables chooses
     */
    @GetMapping("/user/booking/{status}/{date}")
    public List<UserBooking> getTravelByUserConnect(@AuthenticationPrincipal @NonNull UserDetails userDetails,
                                               @PathVariable("status") String status, @PathVariable("date") String date){
        User user = userService.getUserByMail(userDetails.getUsername());
        List<UserBooking> travelPassenger = userBookingService.findAll();
        StatusBooking statusBooking = null;
        if (status != null) {
            if (Objects.equals(status, "ACCEPTED")) {
                statusBooking = StatusBooking.ACCEPTED;
            } if (Objects.equals(status, "WAITING")) {
                statusBooking = StatusBooking.WAITING;
            } if (Objects.equals(status, "REFUSED")) {
                statusBooking = StatusBooking.WAITING;
            }
        }
        StatusBooking finalStatus = statusBooking;
        if (Objects.equals(date, "past")) {
            travelPassenger = travelPassenger.stream()
                    .filter(booking -> booking.getUser().getId().equals(user.getId()))
                    .filter(booking -> booking.getBooking().getStatus().equals(finalStatus))
                    .filter(booking -> booking.getBooking().getInfo().getDateStarting().isBefore(LocalDate.now()))
                    .collect(Collectors.toList());
        } if (Objects.equals(date, "future")) {
            travelPassenger = travelPassenger.stream()
                    .filter(booking -> booking.getUser().getId().equals(user.getId()))
                    .filter(booking -> booking.getBooking().getStatus().equals(finalStatus))
                    .filter(booking -> booking.getBooking().getInfo().getDateStarting().isAfter(LocalDate.now()))
                    .collect(Collectors.toList());
        } else  {
            travelPassenger = travelPassenger.stream()
                    .filter(booking -> booking.getUser().getId().equals(user.getId()))
                    .filter(booking -> booking.getBooking().getStatus().equals(finalStatus))
                    .collect(Collectors.toList());
        }


        return travelPassenger;
    }

    /**
     * Get list of {@link Info} for the {@link User} connect. Is travels
     * @param userDetails {@link User} connect.
     * @param date date String for filter by {@link Info} DateStarting past or future or null
     * @return List of {@link Info} about variables chooses
     */
    @GetMapping("/user/travel/{date}")
    public List<Info> getTravelOfUserConnect(@AuthenticationPrincipal @NonNull UserDetails userDetails,
                                               @PathVariable("date") String date){
        User user = userService.getUserByMail(userDetails.getUsername());
        List<Info> allTravels = infoService.findAll();

        if (Objects.equals(date, "past")) {
            allTravels = allTravels.stream()
                    .filter(info -> info.getUser().getId().equals(user.getId()))
                    .filter(info -> info.getDateStarting().isBefore(LocalDate.now()))
                    .sorted(Comparator.comparing(Info::getDateStarting).reversed())
                    .collect(Collectors.toList());
        } if (Objects.equals(date, "future")) {
            allTravels = allTravels.stream()
                    .filter(info -> info.getUser().getId().equals(user.getId()))
                    .filter(info -> info.getDateStarting().isAfter(LocalDate.now()))
                    .sorted(Comparator.comparing(Info::getDateStarting))
                    .collect(Collectors.toList());
        } else  {
            allTravels = allTravels.stream()
                    .filter(info -> info.getUser().getId().equals(user.getId()))
                    .sorted(Comparator.comparing(Info::getDateStarting).reversed())
                    .collect(Collectors.toList());
        }

        return allTravels;
    }


        @GetMapping("/getTravelBookinByUserId/{userId}")
        public List<UserBooking> getInfoByUserId(@PathVariable("userId") Long userId) {
            List<UserBooking> travelPassager = userBookingRepository.findByUserId(userId);
            return travelPassager.stream()
                    .filter(booking -> booking.getBooking().getStatus().equals(StatusBooking.ACCEPTED))
                    .collect(Collectors.toList());
        }


    @GetMapping("/user/getTravelBookinByUserId/{userId}/{status}/{date}")
    public List<UserBooking> getTravelByUserId(@AuthenticationPrincipal @NonNull UserDetails userDetails,@PathVariable("userId") Long userId,
                                               @PathVariable("status") String status, @PathVariable("date") String date){
        User user = userService.findById(userId);
        List<UserBooking> travelPassenger = userBookingService.findAll();
        StatusBooking statusBooking = null;
        if (status != null) {
            if (Objects.equals(status, "ACCEPTED")) {
                statusBooking = StatusBooking.ACCEPTED;
            } if (Objects.equals(status, "WAITING")) {
                statusBooking = StatusBooking.WAITING;
            } if (Objects.equals(status, "REFUSED")) {
                statusBooking = StatusBooking.WAITING;
            }
        }
        StatusBooking finalStatus = statusBooking;
        if (Objects.equals(date, "past")) {
            travelPassenger = travelPassenger.stream()
                    .filter(booking -> booking.getUser().getId().equals(user.getId()))
                    .filter(booking -> booking.getBooking().getStatus().equals(finalStatus))
                    .filter(booking -> booking.getBooking().getInfo().getDateStarting().isBefore(LocalDate.now()))
                    .collect(Collectors.toList());
        } if (Objects.equals(date, "future")) {
            travelPassenger = travelPassenger.stream()
                    .filter(booking -> booking.getUser().getId().equals(user.getId()))
                    .filter(booking -> booking.getBooking().getStatus().equals(finalStatus))
                    .filter(booking -> booking.getBooking().getInfo().getDateStarting().isAfter(LocalDate.now()))
                    .collect(Collectors.toList());
        } else  {
            travelPassenger = travelPassenger.stream()
                    .filter(booking -> booking.getUser().getId().equals(user.getId()))
                    .filter(booking -> booking.getBooking().getStatus().equals(finalStatus))
                    .collect(Collectors.toList());
        }


        return travelPassenger;
    }

    @GetMapping("/getInfoByInfoId/{infoId}")
    public List<UserBooking> getInfoByInfoId(@PathVariable("infoId") Long infoId) {
        List<UserBooking> travelPassager = userBookingService.findAll();
        return travelPassager.stream()
                .filter(booking -> booking.getBooking().getStatus().equals(StatusBooking.ACCEPTED))
                .filter(booking -> booking.getBooking().getInfo().getId().equals(infoId))
                .collect(Collectors.toList());
    }

    @GetMapping("/stats")
    public Map<String, Object> getStatsOfBooking(@AuthenticationPrincipal @NonNull UserDetails userDetails){
        User user = userService.getUserByMail(userDetails.getUsername());

        List<Info> allTravels = infoService.findAll();
             allTravels = allTravels.stream()
                    .filter(info -> info.getUser().getId().equals(user.getId()))
                    .filter(info -> info.getDateStarting().isAfter(LocalDate.now()))
                    .collect(Collectors.toList());

        List<UserBooking> travelsPassenger = userBookingService.findAll();
            travelsPassenger = travelsPassenger.stream()
                    .filter(booking -> booking.getUser().getId().equals(user.getId()))
                    .filter(booking -> booking.getBooking().getStatus().equals(StatusBooking.ACCEPTED))
                    .filter(booking -> booking.getBooking().getInfo().getDateStarting().isAfter(LocalDate.now()))
                    .collect(Collectors.toList());

        List<UserBooking> bookingWaiting = userBookingService.findAll();
        bookingWaiting = bookingWaiting.stream()
                .filter(booking -> booking.getUser().getId().equals(user.getId()))
                .filter(booking -> booking.getBooking().getStatus().equals(StatusBooking.WAITING))
                .filter(booking -> booking.getBooking().getInfo().getDateStarting().isAfter(LocalDate.now()))
                .collect(Collectors.toList());


        Integer kmDriver = bookingService.sumKmDriver(user.getId());
        Integer kmPassenger = bookingService.sumKmPassenger(user.getId());
        Integer pastTravels = bookingService.countPastTravelsDriver(user.getId());
        Integer pastBooking = bookingService.countPastTravelsPassenger(user.getId());
        Integer nextTravels = allTravels.size();
        Integer nextBookins = travelsPassenger.size();
        Integer nextBookingWaiting = bookingWaiting.size();

        Map<String, Object> statsMap = new HashMap<>();
        statsMap.put("kmDriver",kmDriver);
        statsMap.put("kmPassenger",kmPassenger);
        statsMap.put("totalHistoric",pastTravels + pastBooking);
        statsMap.put("nextTravels", nextTravels);
        statsMap.put("nextBookings", nextBookins);
        statsMap.put("nextBookingWaiting", nextBookingWaiting);

        return statsMap;
    }

    @GetMapping("/travel/exist/{infoId}")
    public List<UserBooking> getBookingForInfo(@AuthenticationPrincipal @NonNull UserDetails userDetails,
                                                    @PathVariable("infoId") Long id){
        User user = userService.getUserByMail(userDetails.getUsername());
        List<UserBooking> travelPassenger = userBookingService.findAll();

            travelPassenger = travelPassenger.stream()
                    .filter(booking -> booking.getUser().getId().equals(user.getId()))
                    .filter(booking -> booking.getBooking().getInfo().getId().equals(id))
                    .collect(Collectors.toList());

        return travelPassenger;
    }

    /**
     * Get the size of {@link UserBooking} list for {@link Info} id when status of {@link Booking} is ACCEPTED.
     * @param id {@link Info}
     * @return Integer size about list of {@link UserBooking}
     */
//    TODO: get list for manage booking with status accepted and waiting
    @GetMapping("booking/number/{infoId}")
    public Integer getBookingNumberForInfo(@PathVariable("infoId") Long id) {
        List<UserBooking> travelPassenger = userBookingService.findAll();

        travelPassenger = travelPassenger.stream()
                .filter(booking -> booking.getBooking().getInfo().getId().equals(id))
                .collect(Collectors.toList());

        return travelPassenger.size();
    }

    /**
     * get list of {@link UserBooking} about {@link Info} id.
     * @param id id of {@link Info}
     * @return list of {@link UserBooking}
     */
    @GetMapping("user/booking/{infoId}")
    public List<UserBooking> getBookingByInfo(@PathVariable("infoId") Long id) {
        List<UserBooking> travelPassenger = userBookingService.findAll();

        travelPassenger = travelPassenger.stream()
                .filter(booking -> booking.getBooking().getInfo().getId().equals(id))
                .filter(booking -> booking.getBooking().getStatus().equals(StatusBooking.ACCEPTED))
                .collect(Collectors.toList());

        return travelPassenger;
    }
}