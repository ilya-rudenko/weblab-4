package com.ilyarudenko.lab4_backend.model.dto;

import lombok.Data;

@Data
public class EntryDto {
    private double x;
    private double y;
    private double r;
    private String username;
    private String password;
}
