package com.incubateur.codrive.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Entity
@Table(name="colorCar")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ColorCar {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String Color;

    private UUID uuid;
    @PrePersist
    public void prePersist(){
        this.uuid = UUID.randomUUID();
    }

}
