package com.incubateur.codrive.mapper;

import com.incubateur.codrive.dto.PreferenceDto;
import com.incubateur.codrive.entity.Preference;

import org.mapstruct.Mapper;

@Mapper
public interface PreferenceMapper {
    PreferenceDto toPreferenceDTO (Preference preference);
    Preference toEntity(PreferenceDto preferenceDto);
}
