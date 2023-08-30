package com.incubateur.codrive.dto;

import com.incubateur.codrive.entity.ColorCar;
import com.incubateur.codrive.entity.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import java.awt.*;

@Data
public class CarDto {

    private Long id;

    private String brand;

    private String fuel;

    private Integer placeNbr;

    private boolean door;

    private boolean airConditioner;

    private boolean chest;

    private ColorCar colorCar;

    private String CarColor;

    private User user;

}
