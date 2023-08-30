package com.incubateur.codrive.enums;

public enum StatusBooking {

    ACCEPTED("ACCEPTED"),

    WAITING("WAITING"),

    REFUSED("REFUSED");

    final String value;

    StatusBooking(String value){
        this.value = value;
    }


    @Override
    public String toString() {
        return value;
    }
}
