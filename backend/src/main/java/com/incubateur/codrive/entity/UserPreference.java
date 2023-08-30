package com.incubateur.codrive.entity;

import java.util.UUID;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="user_preference")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPreference {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;

	@ManyToOne
	@JoinColumn(name="use_id")
	private User user;

	@ManyToOne
	@JoinColumn(name="pref_id")
	private Preference preference;
	
	private UUID uuid;
	@PrePersist
	public void prePersist(){
		this.uuid = UUID.randomUUID();
	}
}
