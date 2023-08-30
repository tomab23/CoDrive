package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.ArchiveBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ArchiveBookingRepository extends JpaRepository<ArchiveBooking, Long> {


}
