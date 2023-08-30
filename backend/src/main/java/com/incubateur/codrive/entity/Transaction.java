package com.incubateur.codrive.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.util.UUID;

@Entity
@Table(name = "transaction")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Transaction {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private Integer credits;

    @NotNull
    private Double payement;

    @JsonFormat(pattern="yyyy-MM-dd", timezone= "Europe/Paris")
    private LocalDate transactionalDate;

    @NotNull
    private String description;

    @NotNull
    private Boolean buy;

    @ManyToOne
    @JoinColumn(name = "use_id")
    private User user;

    private UUID uuid;

    @PrePersist
    public void prePersist() {
        this.uuid = UUID.randomUUID();
        this.transactionalDate = LocalDate.now();
    }
}