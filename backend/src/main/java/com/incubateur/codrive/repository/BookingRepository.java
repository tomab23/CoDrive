package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    Booking save(Booking booking);

    @Query(value = """
            SELECT SUM(it.km) FROM info i\s
            	INNER JOIN itinerary it ON it.id = i.iti_id\s
            WHERE i.use_id = :id AND i.date_starting < CAST(now() AS Date)""", nativeQuery = true)
    Integer sumKmDriver(@Param("id") Long id);

    @Query(value = """
            SELECT SUM(it.km) FROM user_booking ub\s
            	INNER JOIN booking b ON b.id = ub.boo_id\s
            	INNER JOIN info i ON i.id = b.inf_id\s
            	INNER JOIN itinerary it ON it.id = i.iti_id\s
            WHERE ub.use_id = :id AND b.status = "ACCEPTED" AND i.date_starting < CAST(now() AS Date)""", nativeQuery = true)
    Integer sumKmPassenger(@Param("id") Long id);

    @Query(value = """
            select count(1) from user_booking c
              INNER JOIN booking b ON b.id = c.boo_id\s
              INNER JOIN info i ON i.id = b.inf_id\s
            WHERE c.use_id = :id  AND b.status = 'ACCEPTED' AND i.date_starting < CAST(now() AS Date)""", nativeQuery = true)
    Integer countPastTravelsDriver(@Param("id") Long id);

    @Query(value = """
            select count(1) from info i
            WHERE i.use_id = :id AND i.date_starting < CAST(now() AS Date)""", nativeQuery = true)
    Integer countPastTravelsPassenger(@Param("id") Long id);



}
