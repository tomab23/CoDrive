package com.incubateur.codrive.dto;

import com.incubateur.codrive.entity.Info;
import com.incubateur.codrive.entity.User;
import lombok.Data;

import java.time.LocalDate;

@Data
public class ArchiveCommentaryDto {

    private String text;

    private Double note;

    private LocalDate datePublication;

    private Long infoId;

    private Long userId;
}
