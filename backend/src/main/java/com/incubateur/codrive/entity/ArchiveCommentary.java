package com.incubateur.codrive.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "archiveCommentary")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ArchiveCommentary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Length(min = 0, max = 500)
    @NotBlank
    private String text;
    @Min(value = 0)
    @Max(value = 5)
    @JsonFormat(pattern = "0.0")
    private Double note;
    @JsonFormat(pattern="yyyy-MM-dd", timezone= "Europe/Paris")
    private LocalDate datePublication;
    @NotNull
    private Boolean report;

    private Boolean anonymous;

    @NotNull
    private Long infoId;

    @NotNull
    private Long userId;

    private UUID uuid;

    @NotBlank
    @NotNull
    @Pattern(regexp = "^[a-zA-Z\\s\\u00E0-\\u00E2\\u00E8-\\u00EA'-]+$")
    private String lastname;

    @NotBlank
    @NotNull
    @Pattern(regexp = "^[a-zA-Z\\s\\u00E0-\\u00E2\\u00E8-\\u00EA'-]+$")
    private String firstname;

    @PrePersist
    public void prePersist() {
        this.uuid = UUID.randomUUID();
    }

}
