package com.incubateur.codrive.repository;

import java.util.List;
import java.util.Optional;

import com.incubateur.codrive.entity.Booking;
import org.springframework.data.jpa.repository.JpaRepository;
import com.incubateur.codrive.entity.User;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface UserRepository extends JpaRepository<User, Long> {
	
	public User findByMail(String mail);


	@Override
	User save(User user);



	@Query(value = "\tSELECT * FROM `user` u\n" +
			"\tORDER BY id DESC\n" +
			"\tLIMIT 1", nativeQuery = true)
	User LastUser();


    public User getUserById(Long id);
}
