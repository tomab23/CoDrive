package com.incubateur.codrive.service;

import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class PrivateRoomService {
    private final SimpMessagingTemplate messagingTemplate;
    private final Map<String, Set<String>> privateRooms;

    public PrivateRoomService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
        this.privateRooms = new ConcurrentHashMap<>();
    }

    public void createPrivateRoom(String roomId, String user) {
        privateRooms.computeIfAbsent(roomId, key -> new HashSet<>()).add(user);
    }

    public void broadcastPrivateRoomUpdate(String roomId, List<String> updatedUsers) {
        Set<String> usersInRoom = privateRooms.getOrDefault(roomId, new HashSet<>());

        for (String user : updatedUsers) {
            if (usersInRoom.contains(user)) {
                messagingTemplate.convertAndSendToUser(user, "/topic/private-room-updates", roomId);
            }
        }
    }
}

