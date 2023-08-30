package com.incubateur.codrive.controller;

import com.incubateur.codrive.dto.UserDto;
import com.incubateur.codrive.entity.*;
import com.incubateur.codrive.repository.PreferenceRepository;
import com.incubateur.codrive.repository.UserRepository;
import com.incubateur.codrive.service.*;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Min;
import lombok.NonNull;
import org.aspectj.bridge.MessageUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.*;


@RestController
@SpringBootApplication
@RequestMapping("/user")
@CrossOrigin
public class UserController {

    @Autowired
    private UserService userService;
    @Autowired
    private UserPreferenceService prefService;
    @Autowired
    private CarService carService;

    @Autowired
    private UserBookingService userBookingService;
    @Autowired
    private CommentaryServices commentaryServices;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private InfoService infoService;

    @Autowired
    private BookingService bookingService;
    private MessageUtil log;

    @Autowired
    private PasswordEncoder passwordEncoder;



    @GetMapping("/profile")
    public Map<String, Object> Profile(@AuthenticationPrincipal @NonNull UserDetails userDetails) throws IOException {
        User user = userService.getUserByMail(userDetails.getUsername());

        Integer commentary = commentaryServices.countCommentary(user.getId());
        // Get number of travel for the user driver
        Integer travelDriver = userBookingService.countBookingDriver(user.getId());
        Integer travelPassenger = userBookingService.countBookingPassenger(user.getId());
        Double note = commentaryServices.findNoteByUser(user.getId());
        List<Car> listCar = carService.findByUserId(user.getId());

        List<Info> listNextTwoTravels = infoService.nextTwoTravels(user.getId());
        List<Info> listNextTwoBookings = infoService.nextTwoBookings(user.getId());

        List<Commentary> listCommentaries = commentaryServices.listCommentaries(user.getId());


        Map<String, Object> userMap = new HashMap<>();
        // toutes les informations concernant le user
        userMap.put("id", user.getId());
        userMap.put("mail",user.getMail());
        userMap.put("firstname", user.getFirstname());
        userMap.put("lastname", user.getLastname());
        userMap.put("dateOfBirth", user.getDateOfBirth());
        userMap.put("creationDate",user.getDateCreation());
        userMap.put("bio",user.getBio());
        userMap.put("points", user.getPoints());
        userMap.put("driver", user.getIsDriver());
        userMap.put("actif", user.getActif());

        //infos sur commentaire, reservation, trajet et note
        userMap.put("commentNumber",commentary);
        userMap.put("countTravel",travelPassenger + travelDriver);
        userMap.put("note",note);
        userMap.put("car", listCar);
        userMap.put("listNextTwoTravels", listNextTwoTravels);
        userMap.put("listNextTwoBookings", listNextTwoBookings);
        userMap.put("listCommentaries", listCommentaries);

        return userMap;
    }

    @GetMapping("/preference")
    public UserPreference getUserPreference (@AuthenticationPrincipal @NonNull UserDetails userDetails){
        User user = userService.getUserByMail(userDetails.getUsername());
        return prefService.getPrefUser(user);
    }

    @GetMapping("/getUserById/{id}")
    public ResponseEntity<UserService> getUserById(@Valid @PathVariable Long id)
    {
        return this.userService.getUserById(id)
                .map(user-> {
                    MessageUtil.info("Account with id {} was found");
                    return new ResponseEntity<>(userService, HttpStatus.OK);
                }).orElseThrow();
    }

    @PutMapping("/updateUser")
    public User updateUserProfile(@AuthenticationPrincipal @NonNull UserDetails userDetails, @RequestBody User updateUser) {
        User user = userService.getUserByMail(userDetails.getUsername());

        user.setLastname(updateUser.getLastname());
        user.setFirstname(updateUser.getFirstname());
        user.setIsDriver(updateUser.getIsDriver());
        user.setMail(updateUser.getMail());
        user.setBio(updateUser.getBio());
        User savedUser = userRepository.save(user);
        return savedUser;
    }

    /**
     * Get the note of one user.
     * @param id id of the {@link User}
     * @return note of this {@link User}
     */
    @GetMapping("note/{id}")
    public Double getNoteUser (@PathVariable("id") long id) {
        User user = userService.findById(id);

        return commentaryServices.findNoteByUser(user.getId());
    }

    /**
     * Get the points of the user connect.
     * @param userDetails {@link User} connect
     * @return the points of the {@link User} connect
     */
    @GetMapping("/credits")
    public Integer getUserCredits (@AuthenticationPrincipal @NonNull UserDetails userDetails){
        User user = userService.getUserByMail(userDetails.getUsername());
        return user.getPoints();
    }

//    @GetMapping("/id")
//    public Long getUserId (@AuthenticationPrincipal @NonNull UserDetails userDetails){
//        User user = userService.getUserByMail(userDetails.getUsername());
//        return user.getId();
//    }

    /**
     * Update credits for user connect.
     * @param userDetails {@link User} connect
     * @param dto {@link UserDto}
     * @return save points with the new value
     */
    @PutMapping("/updatePoints")
    public User updateCredits(@AuthenticationPrincipal UserDetails userDetails, @RequestBody UserDto dto) {
        User user = userService.getUserByMail(userDetails.getUsername());

        user.setPoints(dto.getPoints());

        return userService.save(user);
    }

    /**
     * Update credits for one user by is id.
     * @param id if of the {@link User}
     * @param dto {@link UserDto}
     * @return save points with the new value
     */
    @PutMapping("/updatePoints/{id}")
    public User updateCreditsByUserId(@PathVariable("id") Long id, @RequestBody UserDto dto) {
        User user = userService.findById(id);

        user.setPoints(dto.getPoints());

        return userService.save(user);
    }

    @GetMapping("/find/{id}")
    public Map<String, Object> findPeople(@PathVariable Long id){
        User user = userService.findById(id);


        Integer commentary = commentaryServices.countCommentary(user.getId());
        // Get number of travel for the user driver
        Integer travelDriver = userBookingService.countBookingDriver(user.getId());
        Integer travelPassenger = userBookingService.countBookingPassenger(user.getId());
        Double note = commentaryServices.findNoteByUser(user.getId());
        List<Car> listCar = carService.findByUserId(user.getId());
        List<Info> listNextTwoTravels = infoService.nextTwoTravels(user.getId());

        List<Info> listNextTwoBookings = infoService.nextTwoBookings(user.getId());
        List<Commentary> listCommentaries = commentaryServices.listCommentaries(user.getId());
        System.out.println(listCommentaries.toString());


        Map<String, Object> userMap = new HashMap<>();
        // toutes les informations concernant le user
        userMap.put("id", user.getId());
        userMap.put("mail",user.getMail());
        userMap.put("firstname", user.getFirstname());
        userMap.put("lastname", user.getLastname());
        userMap.put("dateOfBirth", user.getDateOfBirth());
        userMap.put("creationDate",user.getDateCreation());
        userMap.put("bio",user.getBio());
        userMap.put("points", user.getPoints());
        userMap.put("driver", user.getIsDriver());
        userMap.put("actif", user.getActif());

        //infos sur commentaire, reservation, trajet et note
        userMap.put("commentNumber",commentary);
        userMap.put("countTravel",travelPassenger + travelDriver);
        userMap.put("note",note);
        userMap.put("car", listCar);
        userMap.put("listNextTwoTravels", listNextTwoTravels);
        userMap.put("listNextTwoBookings", listNextTwoBookings);
        userMap.put("listCommentaries", listCommentaries);

        return userMap;
    }

    @PutMapping("/actif/{choice}")
    public User updateUserNoActifact(@AuthenticationPrincipal UserDetails userDetails,
                                     @PathVariable("choice") Boolean choice, @RequestBody UserDto dto) {
        User user = userService.getUserByMail(userDetails.getUsername());

        if (passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            user.setActif(choice);
            return userService.save(user);
        } else {
            return null;
        }
    }

    @GetMapping("actif")
    public Map<String, Object> getActifChoice(@AuthenticationPrincipal UserDetails userDetails) {
        User user = userService.getUserByMail(userDetails.getUsername());

        Map<String, Object> userMap = new HashMap<>();
        userMap.put("actif", user.getActif());

        return userMap;
    }

    /**
     * Get boolean about {@link User} is actif or not
     * @param id {@link User}
     * @return boolean
     */
    @GetMapping("actif/{userId}")
    public Boolean getActifChoiceByUserId(@PathVariable("userId") Long id) {
        User user = userService.findById(id);

        return user.getActif();
    }
}