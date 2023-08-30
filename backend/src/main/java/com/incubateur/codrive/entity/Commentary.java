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
@Table(name = "commentary")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Commentary {

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
    @PastOrPresent

    @JsonFormat(pattern="yyyy-MM-dd", timezone= "Europe/Paris")
    private LocalDate datePublication;
    @NotNull
    private Boolean report;

    @Min(value = 0)
    private Integer numberReport;

    private Boolean anonymous;
    @ManyToOne
    @JoinColumn(name = "inf_id")
    private Info info;
    @ManyToOne
    @JoinColumn(name = "use_id")
    private User user;

    private UUID uuid;

    @PrePersist
    public void prePersist() {
        this.uuid = UUID.randomUUID();
    }

}
