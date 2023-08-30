package com.incubateur.codrive.service.impl;

import com.incubateur.codrive.entity.User;
import com.incubateur.codrive.entity.UserPreference;

import java.util.List;

public interface IUserPreferenceService {

    UserPreference getPrefUser(User user);

}
