package com.incubateur.codrive.entity;

public enum Role {
    USER("USER"),
    ADMIN("ADMIN"),
    USER_DRIVER("USER_DRIVER");

    final String value;

    Role(String value){
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
