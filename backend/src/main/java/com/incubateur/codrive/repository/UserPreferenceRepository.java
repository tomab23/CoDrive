package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.User;
import com.incubateur.codrive.entity.UserPreference;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface    UserPreferenceRepository extends JpaRepository<UserPreference, Long> {

    UserPreference findByUser(User user);

}
