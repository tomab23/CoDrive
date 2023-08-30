package com.incubateur.codrive.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

import java.util.List;
import java.util.UUID;

@Entity
@Table(name="car")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class Car {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Length(max=150)
	private String brand;

	@NotNull
	private boolean door;

	@NotNull
	private boolean airConditioner;

	@NotNull
	private boolean chest;

	@ManyToOne
	@JoinColumn(name="col_id")
	private ColorCar color;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "use_id")
	private User user;
	
	private UUID uuid;
	@PrePersist
	public void prePersist(){
		this.uuid = UUID.randomUUID();
	}
}
