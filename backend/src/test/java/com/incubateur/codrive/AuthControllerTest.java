package com.incubateur.codrive;

import com.incubateur.codrive.security.auth.AuthenticationRequest;
import com.incubateur.codrive.security.auth.AuthenticationResponse;
import com.incubateur.codrive.security.auth.AuthenticationService;
import com.incubateur.codrive.security.auth.RegisterRequest;
import com.incubateur.codrive.security.controller.AuthenticationController;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.time.LocalDate;

import static com.incubateur.codrive.entity.Role.USER_DRIVER;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@SpringBootTest
public class AuthControllerTest {

    @Autowired
    private AuthenticationController authenticationController;

    @MockBean
    private AuthenticationService authenticationService;

    @Test
    public void testRegister() {
        RegisterRequest request = new RegisterRequest("jean",
                "doe",
                "123456",
                USER_DRIVER,
                true,
                "jeandoe@gmail.com",
                true,
                LocalDate.parse("2019-02-08"),
                50,
                false,
                LocalDate.now());

        AuthenticationResponse expectedResponse = new AuthenticationResponse("token");

        when(authenticationService.register(request)).thenReturn(expectedResponse);

        ResponseEntity<AuthenticationResponse> responseEntity = authenticationController.register(request);


        verify(authenticationService).register(request);


        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponse, responseEntity.getBody());
    }
    @Test
    public void testAuthenticate() {
        AuthenticationRequest request = new AuthenticationRequest("Jean", "123456");

        AuthenticationResponse expectedResponse = new AuthenticationResponse("token");

        when(authenticationService.authenticate(request)).thenReturn(expectedResponse);

        ResponseEntity<AuthenticationResponse> responseEntity = authenticationController.authenticate(request);

        verify(authenticationService).authenticate(request);

        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
        assertEquals(expectedResponse, responseEntity.getBody());
    }
}
