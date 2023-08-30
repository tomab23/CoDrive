package com.incubateur.codrive.controller;

import com.incubateur.codrive.model.Mess;
import com.incubateur.codrive.service.UserSessionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.Payload;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.messaging.SessionConnectedEvent;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Controller
@CrossOrigin
public class ChatController {

    @Autowired
    private SimpMessagingTemplate simpMessagingTemplate;

    private final Map<String, String> connectedUsers = new HashMap<>();
    @Autowired
    private UserSessionService userSessionService;
    private final SimpMessagingTemplate messagingTemplate;

    @Autowired
    public ChatController(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    @MessageMapping("/message")
    @SendTo("/chatroom/public")
    private Mess receiverPublicMessage(@Payload Mess message) {
        return message;
    }

    @MessageMapping("/private-message")
    public Mess recMessage(@Payload Mess message) {
        simpMessagingTemplate.convertAndSendToUser(message.getReceiverName(), "/private", message);
        System.out.println(message.toString());
        return message;
    }

    @EventListener
    public void handleWebSocketConnectListener(SessionConnectedEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        String senderName = accessor.getFirstNativeHeader("senderName");
        System.out.println("Sending user list update: " + connectedUsers);

        if (senderName != null) {
            connectedUsers.put(sessionId, senderName);
            userSessionService.userConnected(senderName);
            sendUpdatedUserList(senderName);
        }
    }


    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor accessor = StompHeaderAccessor.wrap(event.getMessage());
        String sessionId = accessor.getSessionId();
        String senderName = connectedUsers.get(sessionId);

        if (senderName != null) {
            connectedUsers.remove(sessionId);
            userSessionService.userDisconnected(senderName);
            sendUpdatedUserList(senderName);
        }
    }

    @MessageMapping("/get-connected-users")
    private void sendUpdatedUserList(String receiverName) {
        List<String> updatedUserList = new ArrayList<>(userSessionService.getConnectedUsersList());
        messagingTemplate.convertAndSendToUser(receiverName, "/topic/user-list-update", updatedUserList);
        System.out.println("Sending user list update to " + receiverName + ": " + updatedUserList);
    }

}

