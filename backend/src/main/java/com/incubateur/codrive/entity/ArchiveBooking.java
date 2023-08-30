package com.incubateur.codrive.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name = "archiveBooking")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArchiveBooking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @NotNull
    @Pattern(regexp = "^[a-zA-Z\\s\\u00E0-\\u00E2\\u00E8-\\u00EA'-]+$")
    private String lastname;

    @NotBlank
    @NotNull
    @Pattern(regexp = "^[a-zA-Z\\s\\u00E0-\\u00E2\\u00E8-\\u00EA'-]+$")
    private String firstname;

    private String reference;

    @NotNull
    private Integer Credits;

    @Min(value = 0)
    @Max(value = 6)
    private Integer place;

    @NotNull
    private String status;

    @NotNull
    private Long infoId;

    @NotNull
    private Long userId;

    private UUID uuid;



    @PrePersist
    public void prePersist() {
        this.uuid = UUID.randomUUID();
    }
}
