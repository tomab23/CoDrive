package com.incubateur.codrive.service;

import com.incubateur.codrive.entity.ImageData;
import com.incubateur.codrive.entity.User;
import com.incubateur.codrive.repository.ImageRepository;
import com.incubateur.codrive.service.impl.IImageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ImageService implements IImageService {

    @Autowired
    ImageRepository imageRepository;

    @Override
    public ImageData saveImage(ImageData imageData) {
        return imageRepository.save(imageData);
    }

    @Override
    public ImageData findByUserAndCarIsNull(User user) {
        return imageRepository.findByUserAndCarIsNull(user);
    }

    @Override
    public List<ImageData> findByCarId(Long carId) {
        return imageRepository.findByCarId(carId);
    }

}
