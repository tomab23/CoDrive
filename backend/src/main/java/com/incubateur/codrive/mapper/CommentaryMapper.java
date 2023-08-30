package com.incubateur.codrive.mapper;

import com.incubateur.codrive.dto.CommentaryDto;
import com.incubateur.codrive.entity.Commentary;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CommentaryMapper {

    CommentaryMapper INSTANCE = Mappers.getMapper(CommentaryMapper.class);

    CommentaryDto toCommentaryDto(Commentary commentary);

    Commentary toEntity(CommentaryDto commentaryDto);
}
