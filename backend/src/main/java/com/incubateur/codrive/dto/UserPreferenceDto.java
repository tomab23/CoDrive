package com.incubateur.codrive.dto;

import com.incubateur.codrive.entity.Preference;
import com.incubateur.codrive.entity.User;
import lombok.Data;

@Data
public class UserPreferenceDto {

    private User user;

    private Preference preference;

}
