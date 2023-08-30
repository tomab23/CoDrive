package com.incubateur.codrive.entity;


import jakarta.persistence.*;
import lombok.*;

import java.util.UUID;

@Setter
@Getter
@Entity
@Table(name = "imageData")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageData {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "image", length = 1000)
    private String image;

    @ManyToOne
    @JoinColumn(name="use_id")
    private User user;

    @ManyToOne
    @JoinColumn(name="car_id")
    private Car car;

    private UUID uuid;
    @PrePersist
    public void prePersist(){
        this.uuid = UUID.randomUUID();
    }
}
