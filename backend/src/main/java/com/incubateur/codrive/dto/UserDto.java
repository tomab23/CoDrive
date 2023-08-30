package com.incubateur.codrive.dto;

import lombok.Data;

import javax.management.relation.Role;
import java.time.LocalDate;

@Data
public class UserDto {
	
	private String lastName;
	private String firstName;
	private Boolean isDriver;
	private String mail;
	private Boolean actif;
	private LocalDate dateOfBirth;
	private String password;
	private Integer points;
	private LocalDate dateCreation;
	private String picture;
	private String Bio;
	private String role;
}
