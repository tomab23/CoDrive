package com.incubateur.codrive.service;

import com.incubateur.codrive.entity.User;
import com.incubateur.codrive.entity.UserPreference;
import com.incubateur.codrive.repository.UserPreferenceRepository;
import com.incubateur.codrive.service.impl.IUserPreferenceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service

public class UserPreferenceService implements IUserPreferenceService {

    @Autowired
    private UserPreferenceRepository userPrefRepo;
    @Override
    public UserPreference getPrefUser(User user) {
        return   userPrefRepo.findByUser(user);

    }
}
