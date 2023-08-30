package com.incubateur.codrive.entity;

import java.util.UUID;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="discussion")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Talk {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@ManyToOne
	@JoinColumn(name="boo_id")
	private Booking booking;
	
	private UUID uuid;
	@PrePersist
	public void prePersist(){
		this.uuid = UUID.randomUUID();
	}
}
