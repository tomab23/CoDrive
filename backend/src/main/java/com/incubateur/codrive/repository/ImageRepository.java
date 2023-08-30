package com.incubateur.codrive.repository;

import com.incubateur.codrive.entity.ImageData;
import com.incubateur.codrive.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.awt.*;
import java.util.List;

@Repository
public interface ImageRepository extends JpaRepository<ImageData, Long> {
    ImageData save(ImageData imageData);

    List<ImageData> findByCarId(Long carId);

    ImageData findByUserAndCarIsNull(User user);
}
