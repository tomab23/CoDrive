package com.incubateur.codrive.entity;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="preference")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Preference {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@NotNull
	private boolean music;

	@NotNull
	private boolean smoking;

	@NotNull
	private boolean discuss;

	private UUID uuid;
	@PrePersist
	public void prePersist(){
		this.uuid = UUID.randomUUID();
	}

}
