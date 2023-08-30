package com.incubateur.codrive.entity;

import java.time.LocalTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.Builder;
import org.hibernate.validator.constraints.Length;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="itinerary")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Itinerary {
	
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long Id;
	@Length(max=5)
	private String zipStart;
	@Length(max=5)
	private String zipEnd;
	@Length(max=100)
	private String cityStart;
	@Length(max=100)
	private String cityEnd;
	@Length(max=150)
	private String streetStart;
	@Length(max=150)
	private String streetEnd;
	@NotNull
	private Double Km;
	@NotNull
	@JsonFormat(pattern = "HH:mm:ss")
	@Column(columnDefinition = "TIME")
	private LocalTime arrivedTime;

	private UUID uuid;
	@PrePersist
	public void prePersist(){
		this.uuid = UUID.randomUUID();
	}

}
