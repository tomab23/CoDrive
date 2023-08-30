package com.incubateur.codrive.dto;

import com.incubateur.codrive.entity.Car;
import com.incubateur.codrive.entity.User;
import lombok.Data;

@Data
public class ImageDataDto {
    private Long id;
    private String image;
    private User user;
    private Car car;
}
