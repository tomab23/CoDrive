package com.incubateur.codrive.dto;

import com.incubateur.codrive.entity.Info;
import com.incubateur.codrive.entity.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class CommentaryDto {

    private String text;

    private Double note;

    private LocalDate datePublication;

    private Boolean anonymous;

    private Boolean report;

    private Info info;

    private User user;
}
