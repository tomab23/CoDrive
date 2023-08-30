package com.incubateur.codrive.security;

import com.incubateur.codrive.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
public interface UserSecurityRepository extends JpaRepository<User, Long> {

    Optional<User> findByMail(String mail);

}
