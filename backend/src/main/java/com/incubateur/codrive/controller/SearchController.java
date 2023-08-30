package com.incubateur.codrive.controller;


import com.incubateur.codrive.dto.CarDto;
import com.incubateur.codrive.dto.ImageDataDto;
import com.incubateur.codrive.dto.InfoDto;
import com.incubateur.codrive.dto.SearchResultDto;
import com.incubateur.codrive.entity.*;
import com.incubateur.codrive.mapper.CarMapper;
import com.incubateur.codrive.mapper.ImageDataMapper;
import com.incubateur.codrive.mapper.InfoMapper;
import com.incubateur.codrive.repository.ImageRepository;
import com.incubateur.codrive.repository.InfoRepository;
import com.incubateur.codrive.service.*;
import lombok.NonNull;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.awt.*;
import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@RestController
@SpringBootApplication
@RequestMapping("find")
public class SearchController {
    private final ColorCarService colorCarService;
    private final UserService userService;
    private final InfoService infoService;
    private final CommentaryServices commentaryServices;
    private final CarService carService;
    private final ItineraryService itineraryService;

    @Autowired
    private InfoRepository infoRepository;
    private final ImageService imageService;


    @Autowired
    public SearchController(UserService userService, InfoService infoService, CommentaryServices commentaryServices, ItineraryService itineraryService, CarService carService, BookingService bookingService, UserBookingService userBookingService, ColorCarService colorCarService, ImageService imageService) {
        this.userService = userService;
        this.infoService = infoService;
        this.commentaryServices = commentaryServices;
        this.itineraryService = itineraryService;
        this.carService = carService;
        this.colorCarService = colorCarService;
        this.imageService = imageService;
    }

    @GetMapping("/getTravel/{start},{end},{date},{place}")
    public SearchResultDto getSimplesearch(final @PathVariable("start") String start, final @PathVariable("end") String end, final @PathVariable("date") LocalDate date, final @PathVariable("place") Integer place) {
        List<Info> results = infoService.getsearch(start, end, date, place);

        int count = results.size();
        return new SearchResultDto(results, count);
    }

    @GetMapping("/countTravel/{id}")
    public Integer getcountTravel(final @PathVariable("id") Long id) {
        return infoService.countTravel(id);
    }

    @GetMapping("/countCommentary/{id}")
    public Integer getcountCommentary(final @PathVariable("id") Long id) {
        return commentaryServices.countCommentary(id);
    }

    @PostMapping("/saveInfo")
    public Info saveInfo(@AuthenticationPrincipal @NonNull UserDetails userDetails, @RequestBody @NonNull InfoDto infodto) {

        User user = userService.getUserByMail(userDetails.getUsername());

        Itinerary itinerary = InfoMapper.INSTANCE.toItineraryEntity(infodto);
        itineraryService.save(itinerary);

        Car car = InfoMapper.INSTANCE.toCarEntity(infodto);
        Long carId = infodto.getCar().getId();
        car.setId(carId);

        Info info = InfoMapper.INSTANCE.toEntity(infodto);
        info.setUser(user);
        info.setCar(car);
        info.setItinerary(itinerary);
        infoService.save(info);

        return info;
    }

    @GetMapping("/car")
    public Optional<List<Car>> findAll(@AuthenticationPrincipal @NonNull UserDetails userDetails) {
        User user = userService.getUserByMail(userDetails.getUsername());
        return Optional.ofNullable(carService.findByUserId(user.getId()));
    }

    @GetMapping("/carrousel")
    public Optional<List<Info>> getCarrousel() {
        Optional<List<Info>> carrousel = infoService.carrousel();
        return carrousel;

    }

    @PostMapping("/addCar")
    public Car saveCar(@AuthenticationPrincipal @NonNull UserDetails userDetails, @RequestBody @NonNull CarDto cardto) {

        User user = userService.getUserByMail(userDetails.getUsername());

        ColorCar colorCar = CarMapper.INSTANCE.toColorCarEntity(cardto);
        Long colorCarId = cardto.getColorCar().getId();
        colorCar.setId(colorCarId);

        Car car = CarMapper.INSTANCE.toEntity(cardto);
        car.setColor(colorCar);
        car.setUser(user);
        carService.save(car);

        return car;
    }

    @GetMapping("colorCar")
    public List<ColorCar> getColor() {
        return colorCarService.findAll();
    }

    @GetMapping("/getCar/{id}")
    public ResponseEntity<CarDto> getCar(@PathVariable("id") Long id, @AuthenticationPrincipal @NonNull UserDetails userDetails) {
        User user = userService.getUserByMail(userDetails.getUsername());
        Optional<Car> optionalCar = Optional.ofNullable(carService.getInfoCar(id));
        if (optionalCar.isPresent()) {
            Car car = optionalCar.get();
            CarDto carDto = CarMapper.INSTANCE.toCarDtoWithColor(car);
            return ResponseEntity.ok(carDto);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/post/image")
    public ResponseEntity<?> uploadImage(@AuthenticationPrincipal @NonNull UserDetails userDetails, @RequestBody @NonNull ImageDataDto imageDataDto, @RequestParam(value = "id", required = false) Long carId) throws IOException {
        User user = userService.getUserByMail(userDetails.getUsername());
        Optional<Car> car = Optional.empty();
        if (carId != null) {
            car = carService.findById(carId);
        }

        ImageData imageData = ImageDataMapper.INSTANCE.toEntity(imageDataDto);
        imageData.setUser(user);
        imageData.setCar(car.orElse(null));
        ImageData response = imageService.saveImage(imageData);

        return ResponseEntity.status(HttpStatus.OK).body(response);
    }

    @GetMapping("/getImage/{carId}")
    public ResponseEntity<List<ImageData>> getImage(@AuthenticationPrincipal @NonNull UserDetails userDetails, @PathVariable("carId") Long carId) {
        User user = userService.getUserByMail(userDetails.getUsername());
        List<ImageData> imageList = imageService.findByCarId(carId);

        if (imageList.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(imageList);
    }

    @PutMapping("/put/image/profile")
    public ResponseEntity<?> uploadImageProfile(@AuthenticationPrincipal @NonNull UserDetails userDetails,
                                                @RequestBody @NonNull ImageDataDto imageDataDto) throws IOException {
        User user = userService.getUserByMail(userDetails.getUsername());

        ImageData existingProfileImage = imageService.findByUserAndCarIsNull(user);

        if (existingProfileImage == null) {
            existingProfileImage = ImageDataMapper.INSTANCE.toEntity(imageDataDto);
            existingProfileImage.setUser(user);
        } else {
            existingProfileImage.setImage(imageDataDto.getImage());
        }
        imageService.saveImage(existingProfileImage);

        return ResponseEntity.ok().build();
    }

    @GetMapping("/getImageProfile")
    public ResponseEntity<ImageData> getImageProfile(@AuthenticationPrincipal @NonNull UserDetails userDetails) {
        User user = userService.getUserByMail(userDetails.getUsername());

        ImageData profileImage = imageService.findByUserAndCarIsNull(user);

        if (profileImage == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profileImage);
    }

    @GetMapping("/getImageProfileById/{id}")
    public ResponseEntity<ImageData> getImageProfile( @PathVariable("id") Long id) {

        User user = userService.findById(id);

        ImageData profileImage = imageService.findByUserAndCarIsNull(user);

        if (profileImage == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(profileImage);
    }

    @GetMapping("/getInfoByUserId/{userId}")
    public List<Info> getInfoByUserId(@PathVariable("userId") Long userId) {
        return infoRepository.findByUserId(userId);
    }
}