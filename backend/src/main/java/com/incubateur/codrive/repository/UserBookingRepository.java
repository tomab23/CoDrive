package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.Info;
import com.incubateur.codrive.entity.UserBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserBookingRepository extends JpaRepository<UserBooking, Long> {
    @Query(value = """
            select count(1) from user_booking c\s
            inner join booking b ON b.id = c.boo_id\s\s
            where c.id = :id AND b.status = 'ACCEPTED'""", nativeQuery = true )
    Integer countBooking(@Param("id") Long id);

    @Query(value = """
            select count(1) from user_booking c
              INNER JOIN booking b ON b.id = c.boo_id\s
              INNER JOIN info i ON i.id = b.inf_id\s
            WHERE c.use_id = :id AND b.status = 'ACCEPTED' AND i.date_starting < CAST(now() AS Date)""", nativeQuery = true )
    Integer countBookingPassenger(@Param("id") Long id);

    @Query(value = """
            select count(1) from info i
            WHERE i.use_id = :id AND i.date_starting < CAST(now() AS Date)""", nativeQuery = true )
    Integer countBookingDriver(@Param("id") Long id);

    UserBooking save(UserBooking userBooking);

    List<UserBooking> findByUserId(Long userId);


}
