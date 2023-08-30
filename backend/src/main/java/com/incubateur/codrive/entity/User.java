package com.incubateur.codrive.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;



@Entity
@Table(name="user")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder()
@JsonIgnoreProperties({"hibernateLazyInitializer"})
public class User implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @NotNull
    @Pattern(regexp = "^[a-zA-Z\\s\\u00E0-\\u00E2\\u00E8-\\u00EA'-]+$")
    private String lastname;

    @NotBlank
    @NotNull
    @Pattern(regexp = "^[a-zA-Z\\s\\u00E0-\\u00E2\\u00E8-\\u00EA'-]+$")
    private String firstname;

    @NotNull
    @Value("false")
    private Boolean isDriver;

    @Email
    @NotNull
    @Column(unique = true)
    private String mail;

    @NotNull
    private Boolean actif;

    @Past
    @NotNull
    @JsonFormat(pattern="yyyy-MM-dd", timezone= "Europe/Paris")
    private LocalDate dateOfBirth;

    @NotBlank
    private String password;

    @Min(value = 0)
    private Integer points;

    @NotNull
//    @DateTimeFormat(pattern = "dd/ MMM/ yyyy")
//    @JsonFormat(pattern = "dd/ MMM/ yyyy", timezone = "Europe/Paris")
    @JsonFormat(pattern="yyyy-MM-dd", timezone= "Europe/Paris")
    private LocalDate dateCreation;

 //   @Max(value = 300)
    private String Bio;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    public Role role;

    private UUID uuid;

    @PrePersist
    public void prePersist() {
        this.uuid = UUID.randomUUID();
    }


    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        List<GrantedAuthority> list = new ArrayList<>();
        list.add(new SimpleGrantedAuthority(role.value));
        return list;
    }

    @Override
    public String getUsername() {
        return mail;
    }

    @Override
    public String getPassword() {
        return password;
    }

    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }


}