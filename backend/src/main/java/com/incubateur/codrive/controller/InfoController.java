package com.incubateur.codrive.controller;

import com.incubateur.codrive.dto.InfoDto;
import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.Info;
import com.incubateur.codrive.entity.User;
import com.incubateur.codrive.mapper.InfoMapper;
import com.incubateur.codrive.repository.BookingRepository;
import com.incubateur.codrive.repository.UserBookingRepository;
import com.incubateur.codrive.repository.UserRepository;
import com.incubateur.codrive.service.*;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@SpringBootApplication
@RequestMapping("/info")
public class InfoController {

    @Autowired
    private UserService userService ;
    @Autowired
    private CarService carService ;

    @Autowired
    private UserBookingService userBookingService;
    @Autowired
    private CommentaryServices commentaryServices;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private  InfoService infoService;


    @GetMapping("/getInfoTravel/{id}")
    //@PreAuthorize("isAuthenticated()")
    public Map<String, Object> InfoTravel(@PathVariable("id") long id){
        //Get id of the Travel
        Info info = infoService.getInfoTravel(id);
        //Get car of the travel
        Car car = carService.getInfoCar(info.getCar().getId());

        //Get User of the travel
        User user = userService.getUserTravel(info.getUser().getId());
        // Get number of travel for the user driver
        Integer travelDriver = userBookingService.countBookingDriver(user.getId());
        Integer travelPassenger = userBookingService.countBookingPassenger(user.getId());
        //Get notation
        Double note = commentaryServices.findNoteByUser(user.getId());
        //Get number of comments
        Integer comment = commentaryServices.countCommentary(user.getId());

        Map<String, Object> userMap = new HashMap<>();

        userMap.put("id", info.getId());
        userMap.put("reference", info.getReference());
        userMap.put("mail", user.getMail());

        userMap.put("dateStarting", info.getDateStarting());
        userMap.put("userTravel_id", user.getId());
        userMap.put("firstname", user.getFirstname());
        userMap.put("lastname", user.getLastname());
        userMap.put("creationDate",user.getDateCreation());

        userMap.put("note",note);
        userMap.put("commentNumber",comment);
        userMap.put("countTravel",travelPassenger + travelDriver);

        userMap.put("discuss", info.isDiscuss());
        userMap.put("music", info.isMusic());
        userMap.put("smoking", info.isSmoking());

        userMap.put("hour", info.getHour());
        userMap.put("placeAvailable", info.getPlaceAvailable());
        userMap.put("itinerary", info.getItinerary());
        userMap.put("price", info.getPrice());

        userMap.put("carId", car.getId());
        userMap.put("carName", car.getBrand());
        userMap.put("carDoor", car.isDoor());
        userMap.put("carClim", car.isAirConditioner());
        userMap.put("carColor", car.getColor().getColor());
        userMap.put("carTrunk", car.isChest());

        return userMap;
    }

    @PutMapping("place/{id}")
    public void UpdatePlace(@PathVariable long id, @RequestBody InfoDto infoDto) {
        Info newInfo = infoService.getInfoTravel(id);

        newInfo.setPlaceAvailable(infoDto.getPlaceAvailable());

        infoService.savePlaces(newInfo);

    }

    @GetMapping("/user/travels")
    public List<Info> allTravelsByUserId(@AuthenticationPrincipal @NonNull UserDetails userDetails) {
        User user = userRepository.findByMail(userDetails.getUsername());

        return infoService.allTravelByUserId(user.getId());
    }




}
