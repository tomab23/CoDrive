package com.incubateur.codrive.service;

import com.incubateur.codrive.entity.User;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.Set;

@Service
public class UserSessionService {

    private final Set<String> connectedUsers = new HashSet<>();

    public void userConnected(String senderName) {
        connectedUsers.add(senderName);
        System.out.println("User connected: " + senderName);
    }

    public void userDisconnected(String senderName) {
        connectedUsers.remove(senderName);
        System.out.println("User disconnected: " + senderName);
    }

    public Set<String> getConnectedUsersList() {
        return connectedUsers;
    }
}


