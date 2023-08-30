package com.incubateur.codrive.dto;

import com.incubateur.codrive.entity.Talk;
import com.incubateur.codrive.entity.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class MessageDto {

    private String text;

    private LocalDate date;

    private User user;

    private Talk talk;

}
