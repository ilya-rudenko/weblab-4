package com.ilyarudenko.lab4_backend.model.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@Table(name = "s335157EntriesLab4")
public class Entry {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private double x;

    private double y;

    private double r;

    private Boolean result;

    private String date;

    private String username;

    private long executionTime; // milliseconds

    public Entry(double x, double y, double r){
        this.x=x;
        this.y=y;
        this.r=r;
    }
}
