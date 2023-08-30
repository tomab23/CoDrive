package com.incubateur.codrive;

import com.incubateur.codrive.controller.SearchController;
import com.incubateur.codrive.dto.InfoDto;
import com.incubateur.codrive.dto.SearchResultDto;
import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.Info;
import com.incubateur.codrive.entity.Itinerary;
import com.incubateur.codrive.entity.User;
import com.incubateur.codrive.mapper.InfoMapper;
import com.incubateur.codrive.repository.InfoRepository;
import com.incubateur.codrive.service.CarService;
import com.incubateur.codrive.service.InfoService;
import com.incubateur.codrive.service.ItineraryService;
import com.incubateur.codrive.service.UserService;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

import static com.incubateur.codrive.entity.Role.USER_DRIVER;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNotNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;

@SpringBootTest
public class SearchAndRegisterTest {
    @InjectMocks
    private SearchController searchController;

    @Mock
    private InfoService infoService;
@Mock
    private UserService userService;
    @MockBean
    private InfoRepository infoRepository;

    @Mock
    private ItineraryService itineraryService;

    @Mock
    private CarService carService;

    @MockBean
    private InfoDto infoDto;

    @MockBean
    private InfoMapper infoMapper;

    @Test
    public void testGetSimplesearch() {
        String start = "Albuquerque";
        String end = "Bernalillo";
        LocalDate date = LocalDate.now();
        int place = 4;

        User user = User.builder()
                .id(1L)
                .lastname("Doe")
                .firstname("John")
                .isDriver(true)
                .mail("john.doe@google.com")
                .actif(true)
                .dateOfBirth(LocalDate.of(1985, 5, 5))
                .password("123456")
                .points(42)
                .role(USER_DRIVER)
                .build();

        Car car = Car.builder()
                .id(1L)
                .build();

        Itinerary itinerary = Itinerary.builder()
                .Id(1L)
                .cityStart(start)
                .cityEnd(end)
                .build();

        Info info = Info.builder()
                .id(1L)
                .dateStarting(date)
                .placeAvailable(place)
                .bigBaggageNbr(5)
                .smallBaggageNbr(5)
                .price(50)
                .hour(LocalTime.now())
                .music(true)
                .smoking(true)
                .discuss(true)
                .user(user)
                .car(car)
                .itinerary(itinerary)
                .build();

        List<Info> results = new ArrayList<>();
        results.add(info);
        when(infoService.getsearch(start, end,date,place)).thenReturn(results);

        SearchResultDto actualSearchResult = searchController.getSimplesearch(start, end, date, place);

        assertEquals(results, actualSearchResult.getCount());
        assertEquals(results, actualSearchResult.getResults());

    }

    @Test
    public void testSaveInfo() {
        UserDetails userDetails = User.builder()
                .id(1L)
                .lastname("Doe")
                .firstname("John")
                .isDriver(true)
                .mail("john.doe@google.com")
                .actif(true)
                .dateOfBirth(LocalDate.of(1985, 5, 5))
                .password("123456")
                .points(42)
                .role(USER_DRIVER)
                .build();

        Car car = new Car();
        car.setId(1L);
        car.setBrand("");


        InfoDto infoDto = new InfoDto();
        infoDto.setDateStarting(LocalDate.now());
        infoDto.setPlaceAvailable(4);
        infoDto.setBigBaggageNbr(5);
        infoDto.setSmallBaggageNbr(5);
        infoDto.setPrice(50);
        infoDto.setHour(LocalTime.now());
        infoDto.setMusic(true);
        infoDto.setSmoking(true);
        infoDto.setDiscuss(true);
        infoDto.setCar(car);

        Info info = InfoMapper.INSTANCE.toEntity(infoDto);

        User user = new User();
        user.setId(1L);
        user.setLastname("Doe");
        user.setFirstname("John");
        user.setIsDriver(true);
        user.setMail("john.doe@google.com");
        user.setActif(true);
        user.setDateOfBirth(LocalDate.of(1985, 5, 5));
        user.setPassword("123456");
        user.setPoints(42);
        user.setRole(USER_DRIVER);

        when(infoRepository.save(any(Info.class))).thenReturn(info);

        Info savedInfo = searchController.saveInfo(userDetails, infoDto);

        assertNotNull(savedInfo);
        assertEquals(savedInfo, searchController.saveInfo(userDetails, infoDto));
    }

}

