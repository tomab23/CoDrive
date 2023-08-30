package com.incubateur.codrive.dto;

import com.incubateur.codrive.entity.Info;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Data
public class BookingDto {
    private String status;
    private Info info;
    private String place;
    private String credits;
}
