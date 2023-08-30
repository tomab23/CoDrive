package com.incubateur.codrive.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonInclude;
import com.incubateur.codrive.entity.Info;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Optional;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SearchResultDto {
    private List<Info> results;
    private int count;

    public SearchResultDto(List<Info> results) {
        this.results = results;
        this.count = results.size();
    }
}
