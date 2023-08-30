package com.incubateur.codrive.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.FutureOrPresent;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name="info")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Info {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@FutureOrPresent
	@JsonFormat(pattern="yyyy-MM-dd", timezone= "Europe/Paris")
	private LocalDate dateStarting;

	@Min(value = 0)
	@Max(value = 6)
	private Integer placeAvailable;

	@Min(value = 0)
	@Max(value = 20)
	private Integer bigBaggageNbr;

	@Min(value = 0)
	@Max(value = 20)
	private Integer smallBaggageNbr;

	@Min(value = 1)
	private Integer price;

	@NotNull
	@JsonFormat(pattern = "HH:mm:ss")
	@Column(columnDefinition = "TIME")
	private LocalTime hour;

	@NotNull
	private boolean music;

	@NotNull
	private boolean smoking;

	@NotNull
	private boolean discuss;


	@ManyToOne
	@JoinColumn(name = "use_id")
	private User user;

	@ManyToOne
	@JoinColumn(name = "car_id")
	private Car car;

	@ManyToOne
	@JoinColumn(name = "iti_id")
	private Itinerary itinerary;

	@Column(unique = true)
	private String reference;

	private UUID uuid;

	@PrePersist
	public void prePersist() {
		this.uuid = UUID.randomUUID();
		this.reference = generateReference();
	}

	private String generateReference() {
		String numbers = "0123456789";

		StringBuilder sb = new StringBuilder();
		sb.append("T");

		for (int i = 0; i < 9; i++) {
			int randomIndex = (int) (Math.random() * numbers.length());
			sb.append(numbers.charAt(randomIndex));
		}

		return sb.toString();
	}
}
