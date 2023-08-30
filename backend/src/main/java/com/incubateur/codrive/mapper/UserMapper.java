package com.incubateur.codrive.mapper;

import com.incubateur.codrive.dto.UserDto;
import com.incubateur.codrive.entity.User;
import org.mapstruct.Mapper;


@Mapper
public interface UserMapper {
     UserDto toUserDTO(User user);
     User toEntity(UserDto userDTO);
}
