package com.incubateur.codrive.security.auth;

import com.incubateur.codrive.entity.Role;
import com.incubateur.codrive.entity.User;
import com.incubateur.codrive.security.UserSecurityRepository;
import com.incubateur.codrive.security.config.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final UserSecurityRepository repository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) {
        Role role = request.isDriver() ? Role.USER_DRIVER : Role.USER;
        var user = User.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .mail(request.getMail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(role)
                .isDriver(request.getIsDriver())
                .actif(true)
                .dateOfBirth(request.getDateOfBirth())
                .points(50)
                .dateCreation(LocalDate.now())
                .build();
        repository.save(user);
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getMail(),
                        request.getPassword()
                )
        );
        var user = repository.findByMail(request.getMail())
                .orElseThrow();
        var jwtToken = jwtService.generateToken(user);
        return AuthenticationResponse.builder()
                .token(jwtToken)
                .build();
    }

}