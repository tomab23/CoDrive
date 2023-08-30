package com.incubateur.codrive.mapper;

import com.incubateur.codrive.dto.ImageDataDto;
import com.incubateur.codrive.entity.ImageData;
import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ImageDataMapper {
    ImageDataMapper INSTANCE = Mappers.getMapper(ImageDataMapper.class);
    ImageDataDto toImageDataDTO(ImageData imageData);
        default ImageData toEntity(ImageDataDto imageDataDto) {
            ImageData imageData = new ImageData();
            imageData.setImage(imageDataDto.getImage());
            return imageData;
        }
}
