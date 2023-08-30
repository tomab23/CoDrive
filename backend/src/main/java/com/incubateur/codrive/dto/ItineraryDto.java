package com.incubateur.codrive.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class ItineraryDto {

    private String zipStart;

    private String zipEnd;

    private String cityStart;

    private String cityEnd;

    private String streetStart;

    private String streetEnd;
}
