package com.incubateur.codrive.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "archiveUser")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ArchiveUser {

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

    @NotNull
    @Value("false")
    private Boolean isDriver;

    @Email
    @NotNull
    @Column(unique = true)
    private String mail;

    @NotNull
    private Boolean actif;

    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd", timezone= "Europe/Paris")
    private LocalDate dateOfBirth;

    @NotBlank
    private String password;

    @Min(value = 0)
    private Integer points;

    @NotNull
    @DateTimeFormat(pattern = "dd/ MMM/ yyyy")
    @JsonFormat(pattern = "dd/ MMM/ yyyy", timezone = "Europe/Paris")
    private LocalDate dateCreation;
    private String Bio;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    public Role role;

    private UUID uuid;

    @PrePersist
    public void prePersist() {
        this.uuid = UUID.randomUUID();
    }

}
