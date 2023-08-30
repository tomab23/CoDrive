package com.incubateur.codrive.dto;

import com.incubateur.codrive.entity.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class TransactionDto {

    private Integer credits;

    private Double payement;

    private LocalDate transactionalDate;

    private String description;

    private Boolean buy;

    private User user;
}
