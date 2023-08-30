package com.incubateur.codrive;

import com.incubateur.codrive.entity.Role;
import com.incubateur.codrive.entity.User;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

import java.time.LocalDate;
@SpringBootTest
public class UserTest {

            private User user;


            @BeforeEach
            public void setUp() {
                user = User.builder()
                        .id(1L)
                        .lastname("Doe")
                        .firstname("John")
                        .isDriver(true)
                        .mail("john.doe@example.com")
                        .actif(true)
                        .dateOfBirth(LocalDate.of(1985, 5, 5))
                        .password("password")
                        .points(42)
                        .role(Role.USER)
                        .build();
            }

            @Test
            public void testGettersAndSetters() {
                Assertions.assertEquals(1L, user.getId());
                Assertions.assertEquals("john.doe@example.com", user.getMail());
                Assertions.assertEquals("password", user.getPassword());

                user.setId(2L);
                user.setMail("jane.doe@example.com");
                user.setPassword("new-password");

                Assertions.assertEquals(2L, user.getId());
                Assertions.assertEquals("jane.doe@example.com", user.getMail());
                Assertions.assertEquals("new-password", user.getPassword());
            }


            @Test
            public void testGetUsername() {
                Assertions.assertEquals("john.doe@example.com", user.getUsername());
            }

            @Test
            public void testIsAccountNonExpired() {
                Assertions.assertTrue(user.isAccountNonExpired());
            }

            @Test
            public void testIsAccountNonLocked() {
                Assertions.assertTrue(user.isAccountNonLocked());
            }

            @Test
            public void testIsCredentialsNonExpired() {
                Assertions.assertTrue(user.isCredentialsNonExpired());
            }

            @Test
            public void testIsEnabled() {
                Assertions.assertTrue(user.isEnabled());
            }

        }


