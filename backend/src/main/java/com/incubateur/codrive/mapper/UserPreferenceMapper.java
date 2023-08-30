package com.incubateur.codrive.mapper;

import com.incubateur.codrive.dto.UserPreferenceDto;
import com.incubateur.codrive.entity.UserPreference;
import org.mapstruct.Mapper;

@Mapper
public interface UserPreferenceMapper {
    UserPreferenceDto toUserPreferenceDTO (UserPreference userPreference);

    UserPreference toEntity(UserPreferenceDto UserPreferenceDto);
}
