package com.incubateur.codrive.entity;

import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="user_booking")
@Data
@NoArgsConstructor
@AllArgsConstructor
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class UserBooking {

	@Id
	@GeneratedValue(strategy=GenerationType.IDENTITY)
	private Long id;
	
	
	@ManyToOne
	@JoinColumn(name="use_id")
	private User user;

	@ManyToOne
	@JoinColumn(name="boo_id")
	private Booking booking;

	@Column(unique = true)
	private String reference;
	
	
	private UUID uuid;
	@PrePersist
	public void prePersist(){
		this.uuid = UUID.randomUUID();
		this.reference = generateReference();
	}


	private String generateReference() {
		String numbers = "0123456789";

		StringBuilder sb = new StringBuilder();
		sb.append("B");

		for (int i = 0; i < 9; i++) {
			int randomIndex = (int) (Math.random() * numbers.length());
			sb.append(numbers.charAt(randomIndex));
		}

		return sb.toString();
	}
	
}
