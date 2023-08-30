package com.incubateur.codrive.entity;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.incubateur.codrive.enums.StatusBooking;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.NonNull;
import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Booking {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(nullable = false)
	@Enumerated(EnumType.STRING)
	private StatusBooking status;

	@ManyToOne
	@JoinColumn(name="inf_id")
	private Info info;

	@NotNull
	private Integer Credits;

	@Min(value = 0)
	@Max(value = 6)
	private Integer place;

	private UUID uuid;

	@PrePersist
	public void prePersist() {
		this.uuid = UUID.randomUUID();
	}


}
