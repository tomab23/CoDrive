package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.Info;
import com.incubateur.codrive.entity.UserBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface InfoRepository extends JpaRepository<Info, Long> {
    @Query(value = "SELECT  i.*\n" +
            "FROM info i\n" +
            "JOIN itinerary it ON i.iti_id = it.id\n" +
            "JOIN car c ON i.car_id = c.id\n" +
            "JOIN user u ON i.use_id = u.id\n" +
            "WHERE it.city_start = :start\n" +
            "AND it.city_end = :end\n" +
            "AND i.date_starting = :date\n" +
            "AND i.place_available >= :place\n" +
            "ORDER BY i.`hour`", nativeQuery = true)
    List<Info> search(@Param("start") String start, @Param("end") String end,
                      @Param("date") LocalDate date, @Param("place") Integer place);

    @Query(value = """
            select count(1) from info i\s
            inner join `user` u ON u.id = i.id\s
            where i.date_starting is not null\s
            and u.id = :id""", nativeQuery = true)
    Integer countTravel(@Param("id") Long id);

    @Query(value = "SELECT i.* FROM info i\n" +
            " JOIN itinerary it ON i.iti_id = it.id\n" +
            " JOIN car c ON i.car_id = c.id\n" +
            " JOIN `user` u  ON i.use_id = u.id\n" +
            "ORDER BY i.id  DESC\n" +
            "LIMIT 8;", nativeQuery = true)
    Optional<List<Info>> carrousel();
    @Override
    Info save(Info info);

    Info save(Car car);

    Info getInfoById(Long infoId);

    /**
     * two Next travel program of the user
     * @return two next trajet of the user
     */
    @Query(value = "SELECT i.* FROM info i\n" +
            " JOIN itinerary it ON i.iti_id = it.id\n" +
            " JOIN car c ON i.car_id = c.id\n" +
            " JOIN `user` u  ON i.use_id = u.id\n" +
            "WHERE i.date_starting >= CAST( now() AS Date ) AND i.use_id = :id\n" +
            "ORDER BY i.date_starting\n" +
            "LIMIT 2;", nativeQuery = true)
    List<Info> nextTwoTravels(@Param("id") Long id);

    @Query(value = "SELECT i.* FROM info i\n" +
            "   JOIN booking b  ON b.inf_id = i.id \n" +
            "  \tJOIN user_booking ub ON ub.boo_id = b.id  \n" +
            "WHERE i.date_starting >= CAST( now() AS Date ) AND ub.use_id = :id  AND b.status = 'ACCEPTED' \n" +
            "ORDER BY i.date_starting\n" +
            "LIMIT 2", nativeQuery = true)
    List<Info> nextTwoBookings(@Param("id") Long id);


    @Query(value = "SELECT i.* FROM info i\n" +
            " JOIN itinerary it ON i.iti_id = it.id\n" +
            " JOIN car c ON i.car_id = c.id\n" +
            " JOIN `user` u  ON i.use_id = u.id\n" +
            "ORDER BY i.id  DESC", nativeQuery = true)
    Optional<List<Info>> getInfo();

    @Query(value = "\tSELECT i.* FROM info i \n" +
            "\t\tINNER JOIN booking b ON b.inf_id = i.id \n" +
            "\t\tINNER JOIN user_booking ub  ON ub.boo_id = b.id \n" +
            "\tWHERE ub.use_id  = :id AND b.status = 'ACCEPTED' ", nativeQuery = true)
    List<Info> allTravelByUserId(@Param("id") Long userId);




    List<Info> findByReferenceContaining(String reference);

    List<Info> findByUserId(Long userId);
}
