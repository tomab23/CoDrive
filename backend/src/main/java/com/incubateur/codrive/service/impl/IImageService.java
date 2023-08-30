package com.incubateur.codrive.service.impl;

import com.incubateur.codrive.entity.ImageData;
import com.incubateur.codrive.entity.User;

import java.awt.*;
import java.util.List;
import java.util.Optional;

public interface IImageService {
    ImageData saveImage(ImageData imageData);

    ImageData findByUserAndCarIsNull(User user);

    List<ImageData> findByCarId(Long carId);

}
