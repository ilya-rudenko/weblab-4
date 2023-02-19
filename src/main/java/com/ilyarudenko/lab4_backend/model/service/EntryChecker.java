package com.ilyarudenko.lab4_backend.model.service;

import com.ilyarudenko.lab4_backend.model.entity.Entry;
import org.springframework.stereotype.Component;

@Component
public class EntryChecker {

    public void check(Entry entry){
        entry.setResult(
                checkFirst(entry.getX(), entry.getY(), entry.getR())
                || checkSecond(entry.getX(), entry.getY(), entry.getR())
                || checkThird(entry.getX(), entry.getY(), entry.getR())
        );
    }

    private boolean checkFirst(double x, double y, double r) {
        return x >= 0 && y >= 0 && x * x + y * y <= r * r / 4;
    }
    private boolean checkSecond(double x, double y, double r) {
        return x <= 0 && y >= 0 && y <= r && x >= -r/2;
    }
    private boolean checkThird(double x, double y, double r) {
        return x <= 0 && y <= 0 && x + y >= -r/2;
    }

}
