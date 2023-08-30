package com.incubateur.codrive.service.impl;

import com.incubateur.codrive.entity.User;

import java.util.List;
import java.util.Optional;

public interface IUserService {

    List<User> allUser();

    Optional<User> getUserById(Long id);

    User getUserTravel(Long id);


    User save(User user);


    User findById(Long id);

    User lastId();
}