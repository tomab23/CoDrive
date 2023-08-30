package com.incubateur.codrive.model;

import com.incubateur.codrive.enums.Status;
import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Mess {

    private String senderName;
    private String receiverName;
    private String message;
    private String date;

    private Status status;
}